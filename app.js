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
    title: "Welcome to Sticky Do's", 
    content: [
      {
        id: 1,
        type: 'note',
        text: 'This is a standard note. Which is the default when you start typing in our input box ⤴️',
        checked: null
      }
    ]
  },
  { 
    id: 2, 
    title: "Example #2", 
    content: [
      {
        id: 1,
        type: 'list',
        text: 'This is a list item. If you click the ☑️ button in the input box',
        checked: false
      },
      {
        id: 2,
        type: 'list',
        text: 'You can add as many checkList items as you would like!',
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
  const cardList = request.body;
  const {id, title, content} = cardList;

  if (!title || !content) {
    return response.status(422).send({
      error: 'Please be sure to include the title and content'
    });
  } else {
    app.locals.cardList.push({...cardList});
    return response.status(201).json({...cardList});
  }
})

// app.set('port', process.send.PORT || 3000)
app.locals.title = 'Sticky-Dos'
app.get('/', (request, response) => response.send('Oh hey there'))

app.get('/api/v1/cardList', (request, response) => {
  const cardList = app.locals.cardList
  if(app.locals.cardList) {
    return response.json({ cardList })
  } else {
    response.status(404).send({
      error: request.body
    })
  }
})

app.delete('/api/v1/cardList/:id', (request, response) => {
  const cardIndex = app.locals.cardList.findIndex(card => card.id == request.params.id)

  if( cardIndex == -1 ) return response.status(404).json('card not found');
  
  app.locals.cardList.splice(cardIndex, 1);
    return response.sendStatus(204);
});

app.put('/api/v1/cardList/:id', (request, res) => {
  const { title, content } = request.body;
  let { id } = request.params;
  let { cardList } = app.locals;

  id = parseInt(id);
  let cardFound = false;
  const updatedCards = cardList.map(card => {
    if ( card.id == request.params.id) {
      cardFound = true;
      return { id, title, content };
    } else {
      return card;
    }
  });

  if (!title || !content ) return response.status(422).json('Missing a title or content ');
  if (!cardFound) return response.status(404).json('card was not found')

  app.locals.cardList = updatedCards;
  return res.sendStatus(204)
})

module.exports= app 