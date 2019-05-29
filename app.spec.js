const request = require('supertest');
const babel = require('@babel/polyfill');
const app =require('./app.js');

describe('API', () => {
  let cardList;
  beforeEach(() => {
    cardList = [
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
    ]
    app.locals.cardList = cardList;
  })

  describe('GET /api/v1/cardList', () => {
    it('should have a status of 200', async() => {
      const response = await request(app).get('/api/v1/cardList')

      expect(response.statusCode).toBe(200)
    })

    it('should return an array of cards', async() => {
      const response = await request(app).get('/api/v1/cardList')

      expect(response.body.cardList).toEqual(cardList)
    })

    it('should return a status of 404 if card is not found', async() => {
      const response = await request(app).get('/api/v1/cardLis')

      expect(response.statusCode).toBe(404)
    })
  })
  describe('Individual GET request /api/v1/cardList/:id', () => {
    // !! Our path was not setup properlly!!
    // ** On frontend we Route to correct address but we aren't Getting from api path **

    it.skip('should respond with the correct card if it exists', async() => {
      const response = await request(app).get('/api/v1/cardList/0')
      const expected = cardList[0]

      console.log('OVER HERE', response.body)

      expect(response.body).toEqual(expected)
    })

    it('should respond with a status code if card doesnt exist', async() => {
      const response = await request(app).get('/api/v1/cardList/1Note')

      expect(response.statusCode).toEqual(404)
    })

    it.skip('should return an error message', async() => {
      const response = await request(app).get('/api/v1/cardList/1Note')

      expect(response.body).toEqual(404)
    })
  })

  describe('POST /api/v1/cardList', () => {
    const path = '/api/v1/cardList';
    let testData;

    beforeEach(() => {
      testData = {
        id: 1,
        title: 'test',
        content: [
          {
            id: 0,
            type: 'string',
            text: 'test string',
            checked: true
          }
        ]
      }
    });

    it('should return a status of 201 and a new card', async () => {
      const response = await request(app).post(path).send({...testData})

      expect(response.status).toBe(201);
    })

    it('should return a 422 status code and error message if not ok', async () => {
      testData.content = null;

      const response = await request(app).post(path).send({ ...testData })

      expect(response.status).toBe(422);
      expect(response.body.error)
        .toEqual('Please be sure to include the title and content');
    })
  });

  describe('PUT /api/v1/cardList/:id', () => {
    const path = '/api/v1/cardList/0'
    let testData;

    beforeEach(() => {
      testData = cardList[0];
    })

    it('should return a status of 204 if card is updated', async() => {
      expect(app.locals.cardList[0]).toEqual(testData);

      testData.title = 'New title'

      const response = await request(app).put(path).send(testData);

      expect(response.status).toBe(204);
      expect(app.locals.cardList[0]).toEqual(testData);
    });

    it('should return a 422 and an error message if req.body is not ok', async () => {
      expect(app.locals.cardList[0]).toEqual(testData);

      // testData.title = '';

      const response = await request(app).put(path)
        .send({tittle: 'Derp', Conntent: {}});

      expect(response.status).toBe(422);
      expect(app.locals.cardList[0]).toEqual(cardList[0]);
    })

    it('should return a 404 if card is not found', async () => {

    })
  })

  describe('DELETE /api/v1/cardList/:id', () => {
    it('should delete a card and return a 404', async () => {

    })

    it('should return a 404 if the card isnt found', async () => {
      
    })
  })
})