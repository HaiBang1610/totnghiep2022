const sql = require("./db.js");
var bcrypt = require("bcryptjs");
moment = require('moment')
// constructor
const User = function(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.active = user.active;
    this.roleId = user.roleId
};

User.getAll = (username, result) => {
    let query = "SELECT * FROM users inner join user_roles on users.id = user_roles.userId ";
  
    if (username) {
      query += ` WHERE username LIKE '%${username}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users inner join user_roles on users.id = user_roles.userId WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
}

User.updateById = (id, user, result) => {
    sql.query(
      " UPDATE users SET email = ?, password = ?, updatedAt = ?, active = ? WHERE id = ?",
      [user.email, bcrypt.hashSync(user.password, 8), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), user.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
};

User.updateRoleById = (id, user, result) => {
  sql.query(
    " UPDATE user_roles SET roleId = ?, updatedAt = ? WHERE userId = ?",
    [user.roleId, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user role: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.updatePassById = (id, user, result) => {
  sql.query(
    " UPDATE users SET password = ?, updatedAt = ? WHERE id = ?",
    [bcrypt.hashSync(user.password,8), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user password: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
};

module.exports = User;