var express = require('express');
var router = express.Router();
let { Hotel, User, Order} = require('../model');
const { use } = require('./users');
// const { openDelimiter } = require('ejs');


router.post('/', async function(req, res) {
    try {
        const {userId, hotelId, packageOptionsIndex, quantity,  RangeDiff, DateRange, residents} = req.body;
        // console.log("🚀 ~ file: order.js:11 ~ router.post ~ hotel_name:", hotel_name)
        // 根据酒店id查找对应的套餐信息

        
        const hotelInfo = await Hotel.findById(hotelId);//.packageOptions
        console.log("🚀 ~ file: order.js:16 ~ router.post ~ hotelInfo:", hotelInfo)
        const packageInfo = hotelInfo.packageOptions[packageOptionsIndex];
        const userAccount = await User.findById(userId) 
        const userName = userAccount.name;
        // console.log("🚀 ~ file: order.js:17 ~ router.post ~ packageInfo:", packageInfo)

        const packageOptionName =  packageInfo.name;
        const hotelLoc = hotelInfo.location
        const totalPrice = packageInfo.price * quantity * RangeDiff;//天数 
        console.log("🚀 ~ file: order.js:19 ~ router.post ~ totalPrice:", totalPrice)
        if (packageInfo.stock >= quantity){
           try{const newOrder = await Order.create({
                userId: userId,
                userName: userName,
                hotelId: hotelId,
                hotel_name: hotelInfo.hotel_name,
                RangeDiff: RangeDiff,
                DateRange: DateRange,
                location: hotelLoc,
                packageOptionName: packageOptionName,
                packageOptionIndex: packageOptionsIndex,
                quantity: quantity,
                residents: residents,
                totalPrice: totalPrice,
                status: '0'
            })
                const packageOptReplace = hotelInfo.packageOptions;
                const orderId = newOrder._id
                console.log(orderId);
                packageOptReplace[packageOptionsIndex].stock -= quantity;
                await Hotel.findByIdAndUpdate({_id: hotelId}, { $set: {'packageOptions' : packageOptReplace}});
                // console.log(packageOptReplace);
                res.status(200).json({
                msg:"成功生成订单",
                orderId,
                success: true,
              
            })
        } catch{((err) => {
            res.status(500).json({
                msg:"生成订单失败",
                err: err,
                success : false
                });
              })
            }
        } else {
            res.status(200).json({
                msg:"生成订单失败，房间数量不足",
                success:false,
              });
        }
    }catch (error) {
    console.error(error);
    return res.status(200).json({ message: 'Server error' , success: false});
  }
  });

  //用户支付订单后，修改订单状态，从 用户的余额中扣除订单金额
  router.put('/pay', async function(req, res){
    const {orderId} = req.query
    // console.log("🚀 ~ file: order.js:74 ~ router.put ~ orderId:", orderId)
    // console.log("🚀 ~ file: order.js:70 ~ router.put ~ query:", req.query)
    
    const orderDetail = await Order.findOne({_id: orderId });
    // console.log("🚀 ~ file: order.js:71 ~ router.put ~ orderDetail:", orderDetail)
    if (orderDetail){
        if (orderDetail.status === 2){
            res.status(500).json({ message: '该订单已取消，无法支付' });
        } else if (orderDetail.status === 1) {
            res.status(500).json({ message: '该订单已支付，无法支付' });
        } else {
            const userId = orderDetail.userId
            // console.log("🚀 ~ file: order.js:85 ~ router.put ~ userId:", userId)
            const userAccount = await User.findOne({ _id: userId})
            console.log("🚀 ~ file: order.js:86 ~ router.put ~ userAccount:", userAccount)
            if(userAccount.balance > orderDetail.totalPrice){
                userAccount.balance -= orderDetail.totalPrice;
                orderDetail.status = 1;
                orderDetail.updatedAt = Date.now();
                await orderDetail.save();
                await userAccount.save();
                res.status(200).json({ message:'该订单已支付成功', success: true});
            } else {
                res.status(500).json({ message:'该订单支付失败，余额不足' });
            }
            // console.log(userAccount);
            
        }
    } else {
        res.status(500).json({ message: '该订单不存在' });
    }
  } )

  //用户取消订单时 修改订单状态 更新库存
  router.put('/cancel/:oid', async function(req, res, next) {
    const orderDetail = await Order.findOne({ _id: req.params.oid });
    if (orderDetail){
        if (orderDetail.status === 2){
            res.status(500).json({ message: '当前订单已取消，无法再次取消' });
        } else if (orderDetail.status === 0){
            orderDetail.status = 2;
            orderDetail.updatedAt = Date.now();
            await orderDetail.save();
            // 订单取消后更新库存
            // 未付款订单取消不需要退还金额
            const hotelstock = await Hotel.findById(orderDetail.hotelId)
            hotelstock.packageOptions[orderDetail.packageOptionIndex].stock += orderDetail.quantity
            await hotelstock.save()
            res.status(200).json({ message:'该订单已取消',success:true });
        } else {
            orderDetail.status = 2;
            orderDetail.updatedAt = Date.now();
            await orderDetail.save();
            // 订单取消后更新库存
            // 订单取消还需要退还金额
            const hotelstock = await Hotel.findById(orderDetail.hotelId)
            hotelstock.packageOptions[orderDetail.packageOptionIndex].stock += orderDetail.quantity
            await hotelstock.save()
            const userAccount = await User.findOne({_id: orderDetail.userId});
            userAccount.balance += orderDetail.totalPrice;
            await userAccount.save();
            // console.log(hotelstock);
            res.status(200).json({ message:'该订单已取消',success:true });
        }
    } else {
        res.status(404).json({ message: '该订单不存在' });
    }
  });

 //用户订单已完成时更新酒店库存，更新订单状态
 router.put('/finish/:oid', async function(req, res) {
    const orderDetail = await Order.findOne({ _id: req.params.oid });
    if (orderDetail){
        if (orderDetail.status === 1){
            orderDetail.status = 3;
            orderDetail.updatedAt = Date.now();
            await orderDetail.save();
            const hotelstock = await Hotel.findById(orderDetail.hotelId)
            hotelstock.packageOptions[orderDetail.packageOptionIndex].stock += orderDetail.quantity
            await hotelstock.save()
            res.status(200).json({ message: '当前订单已完成' ,success:true});
        } else {
            // console.log(hotelstock);
            res.status(500).json({ message:'当前订单状态有误，无法完成', success:true });
        }
    } else {
        res.status(404).json({ message: '该订单不存在' });
    }
  });

 //用户订单的删除，更新订单状态，自己删除自己的订单
 router.put('/delete/:oid', async function(req, res) {
    const orderDetail = await Order.findOne({ _id: req.params.oid });
    if (orderDetail){
        if (orderDetail.status === 2 || orderDetail.status === 3){
            orderDetail.status = 4;
            orderDetail.updatedAt = Date.now();
            await orderDetail.save();
            res.status(200).json({ message: '当前订单已删除' ,success:true});
        } else {
            // console.log(hotelstock);
            res.status(500).json({ message:'当前订单状态有误，无法删除', success:true });
        }
    } else {
        res.status(404).json({ message: '该订单不存在' });
    }
  });


  module.exports = router;