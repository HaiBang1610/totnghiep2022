const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.name = product.name;
  this.description = product.description;
  this.outstock = product.outstock;
  this.image = product.image;
  this.category= product.category;
  this.amount= product.amount;
  this.price= product.price;
  this.supplier_id= product.supplier_id;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (id, result) => {
  sql.query(`SELECT * FROM products inner join supplier on products.supplier_id = supplier.supplier_id WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.findByName = (name, result) => {
  sql.query(`SELECT * FROM products WHERE name = '${name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Product: ", res[0]);
      console.log(name)
      result(null, res[0]);
      return;
    }

    // not found Product with the name
    result({ kind: "not_found" }, null);
  });
};

Product.findCategory = (result) => {
  sql.query(`SELECT category FROM products group by category`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found categories: ", res);
      //console.log(name)
      result(null, res);
      return;
    }

    // not found category
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (name, category, supplier_id, result) => {
  let query = "SELECT * FROM products inner join supplier on products.supplier_id = supplier.supplier_id";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  if (category) {
    query += ` WHERE category LIKE '%${category}%'`;
  }
  if (supplier_id) {
    query += ` WHERE products.supplier_id LIKE '%${supplier_id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.getAllOutStock = result => {
  sql.query("SELECT * FROM products WHERE outstock=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.getAllStock = result => {
  sql.query("SELECT * FROM products WHERE (outstock=false and amount!=0)", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE products SET name = ?, description = ?, outstock = ?, image = ?, category = ?,  amount = ?, price = ?, supplier_id = ? WHERE id = ?",
    [product.name, product.description, product.outstock,product.image,product.category,product.amount, product.price,product.supplier_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Product;