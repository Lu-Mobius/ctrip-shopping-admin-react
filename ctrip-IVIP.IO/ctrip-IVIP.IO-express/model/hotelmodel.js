let mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1/hotels').then((res) =>{
//     console.log('链接成功');
// }).catch((err) =>{
//     console.log(err);
// });

// 先定义一个商品种类的列表
let Schema = mongoose.Schema
let packageOptionSchema = new Schema(
    {
        packageOptionsIndex: Number,
        name: String,
        price: Number,
        stock: Number,
})      

// 定义酒店表的一个结构
let HotelSchema = new Schema(
    {
        _id : {
            type:String,
            required: true,
            unique:true,
        },
        hotel_name: {
            type:String,
            required: true,
        },
        star_number: {
            type:Number,
            required: true,
        },
        area: {
            type:String,
            required: true,
        },
        rating: {
            type:Number,
            required: true,
        },
        price: {
            type:Number,
            required: true,
        },
        img_show: {
            type:String,
            required: true,
        },
        comments_number: {
            type:Number,
            required: true,
        },
        cooperation_level: {
            type:Number,
            required: true,
        },
        information: {
            type:String,
            required: true,
        },
        location: {
            type:String,
            required: true,
        },
        img_other: {
            type: Array,
            required: true,
          },
        packageOptions: [packageOptionSchema],
    },
    {
        timestamps: true,
        _id: false,
    }
)

module.exports =  HotelSchema, packageOptionSchema;


// let Hotelmsg = mongoose.model("Hotelmsg", HotelSchema);

// // 创建数据 插入对象
//  Hotelmsg.create([
//     ]).then((r) =>{
//         console.log(r);
//         console.log('成功创建');
//  })