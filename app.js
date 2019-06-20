const express = require('express');
//requires express

const cors = require('cors');
//requires cors

const app = express();
//connecting app with express

app.use(express.json());
//app now uses express middleware in json form

app.use(cors());
//app now uses cors middlware, CORS exists for security reasons and to limit which resources a browser can gain access to, from another website.


app.use(function(req, res, next) {
  //app uses a function that takes in a request, response, and next holds reference to the next action to perform and is called once the function is done
  res.header("Access-Control-Allow-Origin", "*");
  //set a header on your response that will enable CORS
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //enable CORS for all resources on your server
  next();
  //if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
 });
 
 app.locals.cardList = [
   //The app.locals object has properties that are local variables within the application. Once set, the value of app.locals properties persist throughout the life of the application. Here, we named the properties cardList and use it throughout the app file. 
  { 
    //created a response object that appears in Postman 
    id: 0, 
    title: "Welcome to Sticky Do's", 
    content: [
      {
        //created a response object that appears in Postman 
        id: 1,
        type: 'note',
        text: 'This is a standard note. Which is the default when you start typing in our input box ⤴️',
        checked: null
      }
    ]
  },
  { 
    //created a response object that appears in Postman 
    id: 2, 
    title: "Example #2", 
    content: [
      {
        //created a response object that appears in Postman 
        id: 1,
        type: 'list',
        text: 'This is a list item. If you click the ☑️ button in the input box',
        checked: false
      },
      {
        //created a response object that appears in Postman 
        id: 2,
        type: 'list',
        text: 'You can add as many checkList items as you would like!',
        checked: true
      }
    ]
  }
]

 //this below is for post of data
 app.post('/api/v1/cardList', (request, response) => {
   //we post our data with the request and response
  const cardList = request.body;
  //we assign cardList to the request body, request.body contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().

  if (!cardList) {
    //if theres no request.body, return a 422 status code and sends the HTTP error code with a property of error and value of the request body
    return response.status(422).send({
      error: request.body
    });
    //otherwise, push all of the properties from the cardList object into the app.locals object
    //and return a response status of 201 (created) and json the spread cardList object's properties
  } else {
    app.locals.cardList.push({...cardList});
    return response.status(201).json({...cardList});
  }
})

app.locals.title = 'Sticky-Dos'
//app.locals property of 'title' is set and assigned to the string of 'sticky-dos'
app.get('/', (request, response) => response.send('Oh hey there'))
//app- the instance of our express application, get - the method specified when the request is made from the client, '/' - the endpoint that we are requesting, a HANDLER - the function we write that contains the logic for how the request should be dealt with, and what kind of response it should return, in this case it is returning bacl the string 'oh hey there'

app.get('/api/v1/cardList', (request, response) => {
  //app- the instance of our express application, get - the method specified when the request is made from the client(we are requesting an api endpoint), pass in request and response
  const cardList = app.locals.cardList
  //assigning cardList to the app.locals object
  if(app.locals.cardList) {
    //if the app.locals.cardList exists, return a json response of cardList
    return response.json({ cardList })
  } else {
    //otherwise, send back a response of 404 - not found and set the error property to have a value of the request body
    response.status(404).send({
      error: request.body
    })
  }
})

app.delete('/api/v1/cardList/:id', (request, response) => {
  //app- the instance of our express application, delete - the method specified when the request is made from the client (we will be removing something), pass in the api endpoint based off of id so that we can remove a specific note that was created, pass in request and response
  const cardIndex = app.locals.cardList.findIndex(card => card.id == request.params.id)
  //create new variable of cardIndex and assign it to our locals cardList object and use the prototype method findIndex which is looking for the card.id to loosely equal the request parameters' (paramaters to the callback function in which we're working with) id

  if( cardIndex == -1 ) return response.status(404).json('card not found');
  //if cardIndex doesnt exist, return a response of 404 json into string 'card not found'
  
  app.locals.cardList.splice(cardIndex, 1);
  //splice the app.locals cardList at index 1
    return response.sendStatus(204);
    //return and set the response HTTP status code to statusCode 204 (no content) and send its string representation as the response body.
});

app.put('/api/v1/cardList/:id', (request, res) => {
    //app- the instance of our express application, put - the method specified when the request is made from the client(we are requesting an api endpoint with an id variable), pass in request and response
  const { title, content } = request.body;
  //take the title and content and reassign it to the request body
  let { id } = request.params;
  //reassign the id to the request parameters
  let { cardList } = app.locals;
  //take the cardList and reassign it to be our app.locals cardList

  id = parseInt(id);
  //reassign our id to become a number with parseInt
  let cardFound = false;
  //create variable of cardFound and assign it to boolean that starts as false
  const updatedCards = cardList.map(card => {
    //map over cardList and look at each card, if the cardList id lossley equals the request parameters' id then change the cardFound bool to true and return the id, title, and content
    if ( card.id == request.params.id) {
      cardFound = true;
      return { id, title, content };
      //otherwise return the card
    } else {
      return card;
    }
  });

  if (!title || !content ) return response.status(422).json('Missing a title or content ');
  //if there is no title and no content, return a response HTTP status code of 422 (Unprocessable Entity response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.) and json a message of 'mising a title or content'
  if (!cardFound) return response.status(404).json('card was not found')
//if there is not cardFound variable present, return a response HTTP status code of 404- not found and json a message of 'card was not found'

  app.locals.cardList = updatedCards;
  //reassign app.locals cardList to updatedCards
  return res.sendStatus(204)
  //return and set the response HTTP status code to statusCode 204 (no content) and send its string representation as the response body.
})

module.exports= app 
//exports our module object of app and makes objects or values available for other modules to import and use.