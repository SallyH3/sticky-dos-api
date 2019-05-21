const express = require('express')
const app = express()
app.locals.cardList = [{ id: 0, title: 'test', content: 'lorem ipsum' }]

app.set('port', process.send.PORT || 3000)
app.locals.title = 'Sticky-Dos'
app.get('/', (request, response) => response.send('Oh hey there'))

app.get('/api/v1/cardList', (request, response) => {
  const cardList = app.locals.cardList
    return response.json({ cardList })
})

app.use(express.json())
app.listen(app.get('port'), () => console.log(`${app.locals.title} is running on localhost:${app.get('port')}`))