var express = require('express');
var router = express.Router();
let { Hotel ,Comment} = require('../model');

/* 根据酒店筛选获取列表
/api/hotelmsg/   query
*/

router.get('/list', async function(req, res) {
  const {hotel_name, area, location, star_number} = req.query; //获取请求的参数current = 1, pageSize = 10,
  const current = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 10
  let query = {}
  console.log("🚀 ~ file: hotel.js:11 ~ router.get ~ hotel_name:", hotel_name)
  // 查询总数
  if(hotel_name || area || location || star_number){
    if (hotel_name || area || location ){
    query.hotel_name = new RegExp(hotel_name, 'i');
    query.area = new RegExp(area, 'i');
    query.location = new RegExp(location, 'i');
    // console.log("🚀 ~ file: hotel.js:20 ~ router.get ~ query:", query)
    

  } 
  if(star_number){
    query.star_number = Number(star_number)
  }
 
  // console.log(query);
  const total = await Hotel.countDocuments(query);//{hotel_name: query.hotel_name, area:query.area, location:query.location, star_number:query.star_number}
  console.log(total);

  // 分页查询
  const data = await Hotel.find(query)
    // .populate('category')
    .sort({ price: 1 })
    .skip((Number(current) - 1) * Number(pageSize))
    .limit(Number(pageSize));

  if(total !== 0){
    return res.status(200).json({ data, total });
  } else {
    return res.status(200).json({ message: '未找到匹配项' });
  }
  } else {
    const allData = await Hotel.find(query)
    const data = await Hotel.find(query)
    // .populate('category')
    .sort({ price: -1 })
    .skip((Number(current) - 1) * Number(pageSize))
    .limit(Number(pageSize));
    return res.status(200).json({ data , total:allData.length }) //message:'请输入匹配项'
  }
  // return res.status(200).json({ message: '?' });
});
  
// 根据酒店ID获取酒店信息
router.get('/details', async function(req, res) {
  const id = req.query
  console.log(id);
  const hotelId = {hotelId: id._id}
  try {
    const hoteldetail = await Hotel.findOne(id);
    const comArry = await Comment.find(hotelId)

    if (!hoteldetail) {
      return res.status(404).send('Hotel not found');
    }

    if(!comArry){
      const comArry = []
    }

    return res.status(200).json({hoteldetail: hoteldetail, comArry: comArry});//, comArry
  } catch (err) {
    return res.status(500).send(err.message);
  }
});





module.exports = router;
