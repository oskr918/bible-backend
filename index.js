const express = require('express');
const cors = require('cors');
const connection = require('./conexion');

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usersRouter = require('./routes/users');

app.get('/', (req, res)=>{
  res.send('Bienvenido a la home')
})

app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
