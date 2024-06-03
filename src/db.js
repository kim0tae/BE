import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1q2w3e4r!',
  database: 'test_db',
});

export default connection;
