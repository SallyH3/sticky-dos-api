const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });
 
 app.locals.cardList = [
  { 
    id: 0, 
    title: 'test', 
    content: [
      {
        id: 2,
        type: 'string',
        text: 'sample string',
        checked: null
      }
    ]
  },
  {
    id: 1, 
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

 //these below are for home path
 app.get('/', function(req, res, next) {
  // Handle the get for this route
 });
 
 app.post('/', function(req, res, next) {
 // Handle the post for this route
 });

 //this below is for post of data
 app.post('/api/v1/cardList', (request, response) => {
   console.log('request', request)
  const cardList  = request.body;
  const id = Date.now();

  if (!cardList) {
    return response.status(422).send({
      error: request.body
    });
  } else {
    app.locals.cardList.push({ id, cardList });
    return response.status(201).json({ id, cardList });
  }
})

// app.set('port', process.send.PORT || 3000)
app.locals.title = 'Sticky-Dos'
app.get('/', (request, response) => response.send('Oh hey there'))

app.get('/api/v1/cardList', (request, response) => {
  const cardList = app.locals.cardList
    return response.json({ cardList })
})

app.delete('/api/v1/cardList/:id', (request, response) => {
  console.log(request.params.id)
  const cardIndex = app.locals.cardList.findIndex(card => card.id == request.params.id)

  console.log('this is cardIndex', cardIndex)
  if( cardIndex == -1 ) return response.status(404).json('card not found');
  
  app.locals.cardList.splice(cardIndex, 1);
    return response.sendStatus(204);
});

module.exports= app 