var express = require('express');
var router = express.Router();
let session = require('express-session')

router.get("/",  (req, res) => {
    req.session.user = null;
    return res.status(200).json({ success: true });
  });
  
  module.exports = router;