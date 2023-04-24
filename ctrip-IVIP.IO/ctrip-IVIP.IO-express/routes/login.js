var express = require('express');
var router = express.Router();
let session = require('express-session')
let { User } = require('../model');

router.post('/', async function(req, res, next) {
    let {name, password} = req.body
    // console.log("🚀 ~ file: login.js:8 ~ router.post ~ req.body:", req.body)
    try {
        const user = await User.findOne({name: name});
        console.log("🚀 ~ file: login.js:11 ~ router.post ~ user:", user)
        const data = user?.toJSON();
        if (data){
            if (data.password ===password){
                delete data?.password;
                req.session.user = user;
                console.log(req.session);
                return res.status(200).json({ data, success: true });
            } else {
                return res.status(500).json({ message: '账号密码错误', success: false });
            }
        } else {
            return res.status(500).json({ message: '该用户不存在' , success: false, exist: true});
        }
    } catch (error) {
        return res.status(500).json({ message: '服务器出错' });
      }
    });
    

    module.exports = router;
