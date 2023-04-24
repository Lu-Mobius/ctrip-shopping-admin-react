let mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1/hotels').then((res) =>{
//     console.log('链接成功');
// }).catch((err) =>{
//     console.log(err);
// });
let Schema = mongoose.Schema

const userSchema = new Schema({
phoneNum: {
    type: Number,
},
name: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,
},
balance: {
    type: Number,
    required: true,
    default: 0,
},
role: {
    type:String,
    required:true,
},
// createdAt: {
//     type: Number,
//     default: Date.now(),
//   },
//   updatedAt: {
//     type: Number,
//     default: Date.now(),
//   },
},
  {
    timestamps: true,
    // _id:false,
}
);
   
// const User = mongoose.model('User', userSchema);


// User.create(
//     {
//       name: '李杰66',
//       email: '42613121219@126.com',
//       password: '123456',
//       balance: '10000',
//       phoneNum: '12566667771',
//       role:'admin',
      
// }).then((r) =>{
//     console.log(r);
//     console.log('成功创建用户');
// })

module.exports =  userSchema