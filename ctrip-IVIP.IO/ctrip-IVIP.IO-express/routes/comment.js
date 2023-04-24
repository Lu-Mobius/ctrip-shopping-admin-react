var express = require('express');
var mongoose =require('mongoose')
var router = express.Router();
let { Hotel, User, Order, Comment} = require('../model');

// 创建评论

router.post('/', async function(req, res){  
    try {
        const {userId, hotelId, comment} = req.body;
        const userAccount = await User.findById(userId);
        // console.log("🚀 ~ file: comment.js:11 ~ router.post ~ userAccount:", userAccount)
        const userName =userAccount.name
        Comment.create({
            userId: userId,
            hotelId: hotelId,
            userName: userName,
            comment: comment,
        }) 
        return res.status(200).json({success: true});
        
    } catch (error){
        return res.status(500).json({message: "服务端异常，创建评论失败"})
    }
})

router.delete('/', async function(req, res){
    try{
        const {_id, userId} =req.query
        const comOn = await Comment.findById(_id);
        const authority = await User.findById(userId);
        if(String(comOn.userId)===userId || authority.role === 'admin'){
            await Comment.deleteOne({_id: _id});
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ message:'权限不足', success: false});
        }
    } catch(error){
        return res.status(500).json({ message: "评论不存在" });
    }
})

module.exports = router;