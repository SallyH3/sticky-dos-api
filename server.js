const express = require('express')
const app = express()
// app.use(cors())
// const cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });
 
 app.get('/', function(req, res, next) {
  // Handle the get for this route
 });
 
 app.post('/', function(req, res, next) {
 // Handle the post for this route
 });

app.locals.cardList = [
  { 
    id: 0, 
    title: 'test', 
    content: [
      {
        type: 'string',
        text: 'sample string',
        checked: null
      }
    ]
  },
  {
    id: 01, 
    title: 'test2', 
    content: [
      {
        type: 'list',
        text: 'sample list',
        checked: true
      }
    ]
  }
]

app.set('port', process.send.PORT || 3000)
app.locals.title = 'Sticky-Dos'
app.get('/', (request, response) => response.send('Oh hey there'))

app.get('/api/v1/cardList', (request, response) => {
  const cardList = app.locals.cardList
    return response.json({ cardList })
})

app.use(express.json())
app.listen(app.get('port'), () => console.log(`${app.locals.title} is running on localhost:${app.get('port')}`))