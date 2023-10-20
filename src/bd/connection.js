const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario_mysql',
  password: 'tu_contraseña_mysql',
  database: 'nombre_de_tu_base_de_datos',
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

module.exports = connection;