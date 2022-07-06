const sql = require("./db.js");

// constructor
const Supplier = function(supplier) {
    this.supplier_name= supplier.supplier_name;
    this.supplier_description= supplier.supplier_description;
    this.supplier_phone= supplier.supplier_phone;
    this.supplier_address= supplier.supplier_address;
};

Supplier.create = (newSupplier, result) => {
    sql.query("INSERT INTO supplier SET ?", newSupplier, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created supplier: ", { id: res.insertId, ...newSupplier });
      result(null, { id: res.insertId, ...newSupplier });
    });
  };
  
Supplier.findById = (id, result) => {
    sql.query(`SELECT * FROM supplier WHERE supplier_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Supplier: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Product with the id
      result({ kind: "not_found" }, null);
    });
  };

  Supplier.findByName = (supplier_name, result) => {
    sql.query(`SELECT * FROM supplier WHERE supplier_name = '${supplier_name}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Supplier: ", res[0]);
        console.log(supplier_name)
        result(null, res[0]);
        return;
      }
  
      // not found Supplier with the name
      result({ kind: "not_found" }, null);
    });
  };
  
Supplier.getAll = (supplier_name, result) => {
    let query = "SELECT * FROM supplier";
  
    if (supplier_name) {
      query += ` WHERE supplier_name LIKE '%${supplier_name}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("supplier: ", res);
      result(null, res);
    });
  };
  
Supplier.updateById = (id, supplier, result) => {
    sql.query(
      "UPDATE supplier SET supplier_name = ?, supplier_description = ?, supplier_phone = ?, supplier_address = ? WHERE supplier_id = ?",
      [supplier.supplier_name, supplier.supplier_description, supplier.supplier_phone, supplier.supplier_address, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          console.log("name: ", supplier);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Supplier with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated supplier: ", { id: id, ...supplier });
        result(null, { id: id, ...supplier });
      }
    );
  };
  
Supplier.remove = (id, result) => {
    sql.query("DELETE FROM supplier WHERE supplier_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Supplier with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted supplier with id: ", id);
      result(null, res);
    });
  };
  
Supplier.removeAll = result => {
    sql.query("DELETE FROM supplier", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} supplier`);
      result(null, res);
    });
  };
  
  module.exports = Supplier;
