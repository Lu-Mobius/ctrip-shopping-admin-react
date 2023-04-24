var express = require('express');
var router = express.Router();
let { Hotel, User, Order} = require('../model');


//   用户获取全部订单信息
router.get('/', async function(req, res){
    const { userId, status } = req.query;
    const current = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 10
    // const total = await Order.countDocuments({
    //   ...(user && { userId: user }),
    //   ...(status && { status }),
    // });
    const userOn = await User.findById(userId)
    let newUser = 1
    let balance = userOn.balance
    const data = await Order.find({
        ...(newUser && { userId }),
        ...(status && { status }),
      })
        .sort({ updatedAt: -1 })
        .skip((Number(current) - 1) * Number(pageSize));
        // .populate(['userId']);
    
      
  
    res.status(200).json({ message: true, data, total: data.length, balance: balance});
  

})
// 若要是管理员点击用户生成
// 用户充值
router.put('/recharge/', async function(req, res) {
  const {userId } = req.query
  // console.log("🚀 ~ file: indent.js:41 ~ router.put ~ useId:", userId)
  const amount = parseInt(req.query.amount);
  const userAccount = await User.findOne({ _id: userId });
  if (userAccount){
    if (amount > 0){
          userAccount.balance += amount;
          // console.log("🚀 ~ file: indent.js:46 ~ router.put ~ userAccount.balance:", userAccount.balance)
          userAccount.updatedAt = Date.now();
          await userAccount.save();
          res.status(200).json({ message:'账户充值成功', success:true, balance:userAccount.balance });
    } else {
          res.status(500).json({ message:'输入金额有误' });
    }
  } else {
      res.status(500).json({ message: '该用户不存在' });
  }
});
  
module.exports = router;