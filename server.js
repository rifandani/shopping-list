const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');
const app = express();

// body-parser middleware
app.use(express.json());

// connect to mongoDB ~ return Promise
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`MongoDB connected.`))
  .catch((err) => console.log(err));

// use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production mode
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// port untuk heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Connected di port ${port}`));
