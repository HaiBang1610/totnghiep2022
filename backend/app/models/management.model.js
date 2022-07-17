const sql = require("./db.js");

// constructor
const Management = function(management) {
    this.product_name= management.product_name;
    this.sell_amount= management.sell_amount;
    this.total_price= management.total_price;
    this.datetime= management.datetime;
};

Management.create = (newManagement, result) => {
    sql.query("INSERT INTO sell_management SET ?", newManagement, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created management: ", { id: res.insertId, ...newManagement });
      result(null, { id: res.insertId, ...newManagement });
    });
};

Management.findById = (id, result) => {
    sql.query(`SELECT * FROM sell_management WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Management: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Management with the id
      result({ kind: "not_found" }, null);
    });
};

Management.getTotalPrice = (datetime, result) => {
  console.log(datetime);
  sql.query(`SELECT SUM(total_price) AS total_price FROM sell_management WHERE datetime like '%${datetime}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("total price is: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not get total price
    result({ kind: "not_get" }, null);
  });
};

Management.getAll = (product_name, datetime, category, result) => {
    let query = "SELECT * from sell_management inner join products on sell_management.product_name = products.name";
  
    if (product_name) {
      query += ` WHERE product_name LIKE '%${product_name}%'`;
    }
    if (datetime) {
      query += ` WHERE datetime LIKE '%${datetime}%'`;
    }
    if (category) {
      query += ` WHERE category LIKE '%${category}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("management: ", res);
      result(null, res);
    });
  };

Management.remove = (id, result) => {
    sql.query("DELETE FROM sell_  management WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Management with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted management with id: ", id);
      result(null, res);
    });
  };

module.exports = Management;