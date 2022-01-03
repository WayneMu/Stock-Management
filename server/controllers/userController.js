const mysql = require('mysql');
const passport = require('passport');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');

// Connection Pool
/*let mysqlConnection = mysql.createConnection({
  host:'localhost',
  user: process.env.db_user_name,
  password: process.env.db_password,
  database: process.env.db_name
});*/

/*let mysqlConnection = mysql.createConnection({
  host:'localhost',
  user: process.env.db_user_name,
  password: process.env.db_password,
  database: process.env.db_name
});*/
const users = []

  users.push({
    id: Date.now().toString(),
    name: 'Admin',
    email: process.env.login_id,
    password: process.env.login_password
  })
  



if(process.env.CLEARDB_DATABASE_URL){
  var mysqlConnection= mysql.createPool(process.env.CLEARDB_DATABASE_URL);
  }else{
  
    var mysqlConnection = mysql.createConnection({
  //process.env.CLEARDB_DATABASE_URL
  host:'localhost',
  user: process.env.db_user_name,
  password: process.env.db_password,
  database: process.env.db_name
  });
  }

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  //res.redirect('/login')




const initializePassport = require('../../passport-config')
const e = require('express')
initializePassport(

passport,
email => users.find(user => user.email === email),
id => users.find(user => user.id === id)
)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// View Users
exports.view = (req, res) => {
  // User the mysqlConnection
  mysqlConnection.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
    // When done with the mysqlConnection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from users table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the mysqlConnection
  mysqlConnection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from users table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  let searchTerm = req.body.search;
///////////////////////////////////////////////////////////////////////////////////

try {
 
  users.push({
    id: Date.now().toString(),
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  })
  console.log(users)
 // res.redirect('/login')
} catch {
  res.redirect('/register')
}


//////////////////////////////////////////////////////////////////////////////////
  // User the mysqlConnection
  mysqlConnection.query('INSERT INTO users SET first_name = ?, last_name = ?, email = ?, password = ?, role = ?', [first_name, last_name, email, password, role], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from users table: \n', rows);
  });
}


// Edit users
exports.edit = (req, res) => {
  // User the mysqlConnection
  mysqlConnection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from users table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  // User the mysqlConnection
  mysqlConnection.query('UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, role = ? WHERE id = ?', [first_name, last_name, email, password, role, req.params.id], (err, rows) => {

    if (!err) {
      // User the mysqlConnection
      mysqlConnection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the mysqlConnection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from users table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from users table: \n', rows);
  });
}

// Delete User
exports.deleter = (req, res) => {

  // Delete a record

  // User the mysqlConnection
   mysqlConnection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {

     if(!err) {
      res.redirect('/user');
     } else {
     console.log(err);
     }
    console.log('The data from users table: \n', rows);

   });

  // Hide a record

  /*mysqlConnection.query('UPDATE users SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/user?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });*/

}

// View Users
exports.viewall = (req, res) => {

  // User the mysqlConnection
  mysqlConnection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}