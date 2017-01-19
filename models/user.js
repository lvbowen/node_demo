//接口服务（与数据库进行交互）
var mongodb=require('./db.js');

function User(user){
	this.name=user.name;
	this.password=user.password;
	this.email=user.email;
	this.sex=user.sex;
	this.age=user.age;
};

module.exports=User;

//存储用户信息
User.prototype.save = function(callback){
	 // 要存入数据库的用户文档
	 var user={
	 	name:this.name,
	 	password:this.password,
	 	email:this.email,
	 	sex:this.sex,
	 	age:this.age,
	 };
	 debugger
	 //打开数据库
	 mongodb.open(function(err,db){
	 	if(err){
	 		return callback(err);
	 	}
	 	//读取users集合
	 	db.collection('users',function(err,collection){
	 		if(err){
	 			mongodb.close();
	 			return callback(err);
	 		}
	 		//将用户数据插入users集合
	 		collection.insert(user,{safe:true},function(err,user){
	 			mongodb.close();
	 			if(err){
	 				//mongodb.close();
	 				return callback(err);
	 			}
	 			callback(null,user[0]); //成功！err 为 null，并返回存储后的用户文档
	 		})
	 	})
	 })  //open()  END
};

//读取用户信息
User.get = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, user);//成功！返回查询的用户信息
      });
    });
  });
};