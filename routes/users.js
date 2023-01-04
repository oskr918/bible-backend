const express = require('express')
const connection = require('../conexion')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/', (req, res) => {
    connection.query('SELECT * FROM users;', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

    
  router.get('/:id', (req, res) => {
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
  
  router.post('/', (req, res) => {
    const { id, name, email} = req.body;
    const password = req.body.password

    const salt = bcrypt.genSaltSync(10);

    const hashedPasword = bcrypt.hashSync(password, salt);

    connection.query(
      `
      INSERT INTO users (id, name, email, password)
      VALUES (?, ?, ?, ?)
    `,
      [id, name, email, hashedPasword],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send('Usuario agregado correctamente');
        }
      }
    );
  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const user = result[0];
          if (user) {
            // Compara la contraseña en texto sin formato con la contraseña encriptada
            if (bcrypt.compareSync(password, user.password)) {
              // La contraseña es correcta, inicia sesión al usuario
              console.log("Usuario logeado correctamente")
              res.status(200).json({
                message: 'Inicio de sesión correcto'
              });
              
            } else {
              // La contraseña es incorrecta
              console.log("contraseña incorrecta")
              res.send('Contraseña incorrecta');
            }
          } else {
            // Usuario no encontrado
            console.log("usuario no encontrado")
            res.send('Usuario no encontrado');
          }
        }
      }
    );
  });
  
 
  
  router.put('/:id', (req, res) => {
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

 
  router.put('/:id', (req, res) => {
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
  
  router.delete('/:id', (req, res) => {
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
  
  
  module.exports = router;