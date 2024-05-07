// order-management-service.js

const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());
// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'dpirds.clmcwsesapgy.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'scalable123',
    database: 'DPIDB'
});

// Connect to MySQL
connection.connect();

// Define routes
app.post('/api/create/orders', (req, res) => {
  // Create a new order
  console.log(req.body);
  const {prod_id, quantity, cust_id,status} = req.body;
  const order = {prod_id,quantity, cust_id, status};
  console.log(order);
  connection.query('INSERT INTO order_dpi SET ?', order, (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Order placed successfully', orderId: results.insertId });
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Order management service running on port ${PORT}`);
});
