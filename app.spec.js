const request = require('supertest');
const babel = require('@babel/polyfill');
const app =require('./app.js');

describe('API', () => {
  let mockCardList;
  beforeEach(() => {
    mockCardList = [
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
    app.locals.cardList = mockCardList
  })
  describe('GET /api/v1/cardList', () => {
    it('should have a status of 200', async() => {
      const response = await request(app).get('/api/v1/cardList')

      expect(response.statusCode).toBe(200)
    })

    it('should return an array of cards', async() => {

    })

    it('should return a status of 404 if card is not found', async() => {
      const response = await request(app).get('/api/v1/cardLis')

      expect(response.statusCode).toBe(404)
    })
  })
})