var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken')
let { User } = require('../model');

/*  注册需要上传用户信息 */
router.post('/', async function(req, res, next) {
  let {name, password, email, phoneNum, role} = req.body
  if (name && password && email && phoneNum && role){
    const oldUser = await User.findOne({name});
    const oldEmail = await User.findOne({email});
    if (oldEmail || oldUser) {
      return res.status(200).json({ message: "用户已存在", exist:true});
    } else {
      User.create(req.body);
      return res.status(200).json({ message: '成功注册' ,success: true});
    }
  } else {
    return res.status(500).json({ message: "缺少必要参数" });
  }
     
});

/*  管理员可通过查看所有用户*/
router.get('/', async function(req, res) {
  const { name, email } = req.query;
  const session = req.session
  if (session.user && session.user.role === 'admin'){
    try {
    const allData = await User.find({
      ...(name && { name }),
      ...(email && { email }),
    });
    const data = await User.find({
      ...(name && { name }),
      ...(email && { email }),
    })
      .sort({ updatedAt: -1 })
      // .skip((Number(current) - 1) * Number(pageSize))
      // .limit(Number(pageSize));
      return res.status(200).json({
        data,
        total: allData.length,
      });
    } catch (error) {
      return res.status(500).json({ message: "服务端异常,无法获取到用户数据" });
    }
  }
  // const current = parseInt(req.query.page) || 1
  // const pageSize = parseInt(req.query.pageSize) || 10
  
  });
  /* 管理员和用户获取详细的用户信息 */
  router.get("/:uid", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.uid });
      let data = user?.toJSON();
      delete data?.password;
      return res.status(200).json({ data, success: true });
    } catch (error) {
      return res.status(500).json({ message: "获取用户数据失败" });
    }
  });
  /*管理员删除用户信息 */ 
  router.delete("/:uid", async (req, res) => {
    const session = req.session
    if (session.user && session.user.role === 'admin'){
      try {
      await User.deleteOne({ _id: req.params.uid });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: "用户不存在，无法删除" });
    }
    }
    
  });

module.exports = router;
