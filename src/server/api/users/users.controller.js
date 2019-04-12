const MyApp = require("../../app");
const app = MyApp.app;
const bodyParser = MyApp.bodyParser;

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'capstone',
  password: '123123',
  database: 'capstone'
});

connection.connect();

exports.show = (req,res) => {
  const username = req.params.username;
  connection.query('select * from user where username = ?',[username],function(err,row){
    if(err){
      console.log("user show api error");
      throw err;
    }
    if(row.length!=0){
      const user = {
        id: row[0].id,
        password: row[0].password,
        username: row[0].username,
        email: row[0].email
      };
      return res.status(200).json(user);
    }else{
      return res.status(404).send();
    }
  });
}

exports.join = (req,res) => {
  const user = {
    id: req.body.id,
    password: req.body.password,
    username: req.body.username,
    email: req.body.email
  };
  connection.query('insert into user values (?,?,?,?)',[user.id,user.password,user.username,user.email],function(err,result){
    if(err){
      console.log("user create api error");
      throw err;
    }
    return res.status(201).json(user);
  });
}

exports.login = (req,res) => {
  const id = req.body.id;
  const password = req.body.password;
  connection.query('select * from user where id = ?',[id],function(err, row){
    if(err){
      console.log("user login api error");
      throw err;
    }
    if(row.length!=0){
      if(row[0].password==password){
        const user = {
          id: row[0].id,
          password: row[0].password,
          username: row[0].username,
          email: row[0].email
        };
        return res.status(200).json(user);
      }else{
        return res.status(404).send();
      }
    }else{
      return res.status(404).send();
    }
  })
}

/*
exports.update = (req,res) => {

}
*/

/*
exports.modify = (req,res) => {

}
*/

/*
exports.destroy = (req,res) => {
  const id = req.params.id;
  connection.query('delete from user where id = ?',[id],function(err,result){
    if(err){
      console.log("user delete api error");
      throw err;
    }
    if(result){
      return res.status(204).send();
    }else{
      return res.status(400).send();
    }
  });
}
*/
