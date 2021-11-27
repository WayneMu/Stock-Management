const mysql = require('mysql');

// Connection Pool
/*let connection = mysql.createConnection({
  host:'localhost',
  user: process.env.db_user_name,
  password: process.env.db_password,
  database: process.env.db_name
});*/

/*let connection = mysql.createConnection({
  host:'localhost',
  user: process.env.db_user_name,
  password: process.env.db_password,
  database: process.env.db_name
});*/

if(process.env.CLEARDB_DATABASE_URL){
  var connection= mysql.createPool(process.env.CLEARDB_DATABASE_URL);
  }else{
  
    var connection = mysql.createConnection({
  //process.env.CLEARDB_DATABASE_URL
  host:'localhost',
  user: process.env.db_user_names,
  password: process.env.db_passwords,
  database: process.env.db_names
  });
  }
// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
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
  // User the connection
  connection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
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
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
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
  // User the connection
  connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
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
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  connection.query('UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
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
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  // connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from users table: \n', rows);

  // });

  // Hide a record

  connection.query('UPDATE users SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/user?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}