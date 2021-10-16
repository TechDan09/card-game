const sql = require('../db.js');

class Model {
  constructor(table) {
    this.table = table;
  }

  async save(obj) {
    let columns = []; //represents column of the table
    let values = []; //represents the values for each column
    let updateColumns = []; //this will be used when updating the column

    //loop through the object passed in the method and save our column names, values and update statement
    for (const key in obj) {
      if (key !== 'id') {
        columns.push(key);
        values.push(`'${obj[key]}'`);
        updateColumns.push(`${key}='${obj[key]}'`);
      }
    }

    //store our sql query string for insert and update
    let insertSql = `INSERT INTO ${this.table}(${columns}) VALUES(${values});`;
    let updateSql = `UPDATE ${this.table} SET ${updateColumns} WHERE id=${obj.id}`;

    let result;
    //check if an id is passed into the object, this will tell us if its an update or insert intent
    try {
      if (obj.id) {
        result = await sql.execute(updateSql);
        console.log(`Updated user with id ${obj.id}`);
      } else {
        result = await sql.execute(insertSql);
        console.log(`Inserted user into DB`);
      }
    } catch (error) {
      console.log(`Error on saving to db: ${error}`);
    }
    return result;
  }

  async findOne(obj) {
    // store the columns and value strings for each object key value pairs
    let columnsAndValues = [];
    for (const key in obj) {
      if (key !== 'id') {
        columnsAndValues.push(`${key}='${obj[key]}'`);
      }
    }

    //use the array.join to join the string of columns and valus for our sql staement
    let query = `SELECT * FROM ${this.table} WHERE ${columnsAndValues.join(
      ' AND '
    )};`;

    let result, _;
    try {
      [result, _] = await sql.execute(query);
      return result;
    } catch (error) {
      console.log(`Error on finding user: ${error}`);
    }
  }
}

module.exports = Model;
