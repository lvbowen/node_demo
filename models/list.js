//接口服务（与数据库进行交互）
var mongodb=require('./db.js');

//获取用户列表接口
function getPageList(callback){
	//打开数据库
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		//读取 users 集合
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//查找集合里的全部文档
			collection.find({}).toArray(function(err,docs){    //toArray以数组形式返回查询的结果docs
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,docs);
			})
		})
	})
}

module.exports=getPageList;