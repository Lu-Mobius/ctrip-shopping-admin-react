var express = require('express');
var router = express.Router();
let { Hotel, User, Order } = require('../model');


//   管理员获取全部订单信息
router.get('/', async function (req, res) {
  const { userName, status, hotel_name } = req.query;
  // const current = parseInt(req.query.page) || 1
  // const pageSize = parseInt(req.query.pageSize) || 10
  // const total = await Order.countDocuments({
  //   ...(user && { userId: user }),
  //   ...(status && { status }),
  // });
  let query = {}
  const session = req.session
  if (session.user.role === 'admin') {
    if (hotel_name || userName || status) {
      query.hotel_name = new RegExp(hotel_name, 'i');
      query.userName = new RegExp(userName, 'i');
      if (status) {
        query.status = Number(status)
      }
      const data = await Order.find(query)
        .sort({ updatedAt: -1 })
      // .skip((Number(current) - 1) * Number(pageSize));
      // .populate(['userId']);
      const total = data.length
      if (total !== 0) {
        return res.status(200).json({ data, total });
      } else {
        return res.status(500).json({ message: '未找到匹配项' });
      }
    } else {
      const data = await Order.find(query)
        .sort({ updatedAt: -1 })
      // .skip((Number(current) - 1) * Number(pageSize));
      const total = data.length
      return res.status(200).json({ data, total })
    }

  } else {
    return res.status(500).json({ message: '权限不足' })
  }




})


module.exports = router;