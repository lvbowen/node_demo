//var express = require('express');
//var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

var crypto = require('crypto'),  //crypto 是 Node.js 的一个核心模块，我们用它生成散列值来加密密码
	//Vue=require('vue'),
    User = require('../models/user.js'),
    List=require('../models/list.js');

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { 
      title: '主页' ,
     // user: req.session.user,
     // success: req.flash('success').toString(),
     // error: req.flash('error').toString()
    });
  });

  app.get('/reg', function (req, res) {
    res.render('reg', { 
      title: '注册' ,
     // user: req.session.user,
     // success: req.flash('success').toString(),
     // error: req.flash('error').toString()
    });
  });
  app.post('/reg', function (req, res) {
    var name=req.body.name,
        password=req.body.password,
        password_re=req.body['password-repeat'];
         // 检验用户两次输入的密码是否一致
        if(password_re!=password){
          req.flash('error','两次输入的密码不一致!');
          return res.redirect('/reg');  //返回注册页
        }
        //生成密码的 md5 值
        var md5 = crypto.createHash('md5'),
             password = md5.update(req.body.password).digest('hex');
        var newUser = new User({
            name: name,
            password: password,
            email: req.body.email,
            sex:req.body.sex,
            age:req.body.age,
        });
        console.log(newUser)
        debugger
        //检查用户名是否存在
        User.get(newUser.name,function(err,user){
          if(err){
            req.flash('error',err);
            return res.redirect('/');
          }
          if(user){
            req.flash('error','用户已经存在');
            return res.redirect('/reg');
          }
          //如果不存在则新增用户
          newUser.save(function(err,user){
            if(err){
              req.flash('error',err);
              return res.redirect('/reg');
            }
            req.session.user = newUser;//用户信息存入 session
            req.flash('success', '注册成功!');
            res.redirect('/');//注册成功后返回主页
          })
        })
  });

  app.get('/login', function (req, res) {
    res.render('login', { title: '登录' });
  });
  app.post('/login', function (req, res) {
  });

  app.get('/post', function (req, res) {
    res.render('post', { title: '发表' });
  });
  app.post('/post', function (req, res) {
  });

  app.get('/logout', function (req, res) {
  });

  app.get('/list', function (req, res) {
  	//调getPageList接口
  	List(function(err,userList){    //userList对应接口成功时返回的结果docs
  		if(err){
  			console.log(err);
  			userList=[];
  		}
  	//	console.log(userList)
  		res.render('list',{
	  		title:'用户列表页',
	  		users:userList,
  		})
  		//
  		
  	})
  	
  });
};