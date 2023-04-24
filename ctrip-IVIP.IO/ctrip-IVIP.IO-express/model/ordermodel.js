let mongoose = require('mongoose')

let Schema = mongoose.Schema
// 定义用户详情页的一个结构 还需要添加订单状态 用户余额
// UNIQE的标志一定要不一样
const orderSchema = new Schema({
    hotelId: {
      type: String,
    //   ref: 'Hotelmsg',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    hotel_name: {
      type: String,
      required: true,
    },
    RangeDiff: {
      type:Number,
      required: true,
    },
    DateRange: {
      type:Array,
      required: true,
    },
    packageOptionName: { 
      type: String, 
      required: true },
    packageOptionIndex: { 
      type: Number, 
      required: true },
    quantity: {
      type: Number,
      required: true,
    },
    location:{
      type: String,
      required: true,
    },
    residents:{
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    status: { //0 代表已下单 1 代表已使用（收货） 2代表已取消
        type: Number,
        required: true,
    },
 },
 {
    timestamps: true,
  }
 );

 module.exports = orderSchema;