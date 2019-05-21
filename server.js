const express = require('express')
const app = express()

app.set('port', process.send.PORT || 3000)
app.locals.title = 'Sticky-Dos'
app.listen(app.get('port'), () => console.log(`${app.locals.title} is running on localhost:${app.get('port')}`))