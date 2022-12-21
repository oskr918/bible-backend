const express = require('express');
const cors = require('cors');
const connection = require('./conexion');

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users;', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/users', (req, res) => {
  const { id, name, email, password } = req.body;

  connection.query(
    `
    INSERT INTO users (id, name, email, password)
    VALUES (?, ?, ?, ?)
  `,
    [id, name, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Usuario agregado correctamente');
      }
    }
  );
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    `DELETE FROM users WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Usuario eliminado correctamente');
      }
    }
  );
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const {name, email, password } = req.body;
  connection.query(
    `
    UPDATE users
    SET name = ?, email = ?, password = ?
    WHERE id = ?
  `,
    [ name, email, password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Usuario actualizado correctamente');
      }
    }
  );
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM users WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
