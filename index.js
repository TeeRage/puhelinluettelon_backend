const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(express.json())

//Konfiguroidaan Morgan logaamaan konsoliin, app.use(morgan('tiny')) 
morgan.token('content', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

//aloitussivu
app.get('/', (req, res) => {
  res.send('<p>Puhelinluettelo</p>')
})

//MongoDB:stä haettu puhelinluettelon sisältö osoitteeseen http://localhost:3001/api/persons
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error)) //Välitetään virheviesti eteenpäin middlewarelle
})

//../info kertoo pyynnön tekohetken sekä yhteystietojen lukumäärän
app.get('/info', (req, res) => {  
  Person.countDocuments(function(err, count){
    res.send('<p>Puhelinluettelossa on ' + count.toString() +':n henkilön tiedot</p>' + '<p>' + new Date(Date.now()).toUTCString() + '</p>')
  })  
})

//Uuden yhteystiedon lisääminen MondoDB tietokantaan
app.post('/api/persons', (request, response, next) => {
  
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {    
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

//Yksittäisen yhteystiedon näyttäminen id:n perusteella
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }
      else{
        console.log("Annetulla haulla ei löytynyt tuloksia")
        response.status(404).end()
      }
  })
  .catch(error => next(error))
})

//Poistaminen MongoDB-tietokannasta id:n perusteella
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {//Onnistunut joko poistettu tai ei löytynyt id:tä, mutta se on oikeaa muotoa
      console.log("Poistaminen onnistui")
      response.status(204).end()
    })
    .catch(error => next(error))
})

//Puhelinnumeron päivittäminen
app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body

  const person ={
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updateNumber => {
      console.log("Numeron pävitys onnistui")
      response.json(updateNumber)
    })
    .catch(error => next(error))
})

//Virheidenkäsittelijä
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  //Onko virhe CastError (virheellinen olioId) vai joku muu
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){ //Validointivirhe
    return response.status(400).json({error:error.message})
  }//Jos ei ole CastError tai validointivirhe, siirretään Expressin oletusarvoisen virheidenkäsittelijän hoidettavavksi
  next(error)
}
app.use(errorHandler)

//Portti, jota kuunnellaan, jos ei ole .env -tiedostoa, niin const PORT = process.env.PORT || 3100
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})