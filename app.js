
//declares express variable and allows use of express?
const express = require('express');

//declares cors variable and allows use of cors?
const cors = require('cors');

//declares express() as the variable app
const app = express();
//allows the server to read JSON requests
app.use(express.json());
//allows cross origin resource sharing
app.use(cors());

//I think this does the same thing as the app.us(cors()) but I am actually not sure
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });
 
 //cards we keep save in the backend to provide the user info on how to use the site
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

 //handles the get for the home path
 app.get('/', function(req, res, next) {
 });
 
 //handles the post for the home path
 app.post('/', function(req, res, next) {
 });

 //handles the post for the cardlist path
 app.post('/api/v1/cardList', (request, response) => {
//sets the body of the request as the cardList
  const cardList = request.body;

//if there is not a cardList it returns an error of 422
  if (!cardList) {
    return response.status(422).send({
      error: request.body
    });
  } else {
//if there is a cardList, add it to the main cardList and return a 201 status as well as the whole cardList
    app.locals.cardList.push({...cardList});
    return response.status(201).json({...cardList});
  }
})

//sets 'Stick-Dos' as the title
app.locals.title = 'Sticky-Dos'

//returns oh hey there if a response is successful
// app.get('/', (request, response) => response.send('Oh hey there'))

//handles a get request from the cardlist path
app.get('/api/v1/cardList', (request, response) => {
//sets the cardlist as the variable
  const cardList = app.locals.cardList
//if there is a cardList return it
  if(app.locals.cardList) {
    return response.json({ cardList })
  } else {
//if there is not a cardList return an error
    response.status(404).send({
      error: request.body
    })
  }
})

//handles the delete card from the path of that specific card
app.delete('/api/v1/cardList/:id', (request, response) => {
//finds the card in the cardlist with the matching id
  const cardIndex = app.locals.cardList.findIndex(card => card.id == request.params.id)
//if no card is found that matches it return an error
  if( cardIndex == -1 ) return response.status(404).json('card not found');
//if card matches, it is spliced out and returns a 204 status
  app.locals.cardList.splice(cardIndex, 1);
    return response.sendStatus(204);
});

//handles an edit/put of a specific card
app.put('/api/v1/cardList/:id', (request, res) => {
//declares the request body as the title and content
  const { title, content } = request.body;
//lets the id be the identifier
  let { id } = request.params;
//declares the cardlist to be the app.locals
  let { cardList } = app.locals;

//parses the id
  id = parseInt(id);
//card found originally starts as false
  let cardFound = false;
//all cards are mapped over and if a card is found then cardfound is changed to true and the new card is returned
  const updatedCards = cardList.map(card => {
    if ( card.id == request.params.id) {
      cardFound = true;
      return { id, title, content };
    } else {
      return card;
    }
  });

//if there isnt a title or a content then an error is sent 
  if (!title || !content ) return response.status(422).json('Missing a title or content ');
//if cardFound stays false then an error is sent
  if (!cardFound) return response.status(404).json('card was not found')

//cardList is redeclared as all the updated cards
  app.locals.cardList = updatedCards;
//if no errors were made it returns a 204 status
  return res.sendStatus(204)
})

//exports app file
module.exports= app 