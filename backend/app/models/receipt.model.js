const sql = require("./db.js");

// constructor
const Receipt = function(receipt) {
  this.customer_name = receipt.customer_name;
  this.sale_managements = receipt.sale_managements;
  this.price= receipt.price;
  this.createdTime= receipt.createdTime;
};

Receipt.create = (newReceipt, result) => {
    sql.query("INSERT INTO receipt SET ?", newReceipt, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created Receipt: ", { id: res.insertId, ...newReceipt });
      result(null, { id: res.insertId, ...newReceipt });
    });
};
  
Receipt.findById = (id, result) => {
    sql.query(`SELECT * FROM receipt WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Receipt: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Receipt with the id
      result({ kind: "not_found" }, null);
    });
};
  
Receipt.getAll = (customer_name, createdTime, result) => {
    let query = "SELECT * FROM receipt";
  
    if (customer_name) {
      query += ` WHERE customer_name LIKE '%${customer_name}%'`;
    }

    if (createdTime) {
      query += ` WHERE createdTime LIKE '%${createdTime}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Receipt: ", res);
      result(null, res);
    });
};

module.exports = Receipt;