const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mystore2',
});

// Conecta-se ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rota para realizar uma consulta SELECT na tabela products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).json({ error: 'Erro na consulta' });
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});