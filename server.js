const express = require('express')

const cors = require('cors');

const app = require('./app.js')
app.use(cors())

app.set('port', 3001);

app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')}`)
});

