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

//Konfiguroidaan Morgan logaamaan konsoliin
//app.use(morgan('tiny'))
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

//Uuden yhteystiedon lisääminen MondoDB tietokantaan
app.post('/api/persons', (request, response, next) => {
  
  const body = request.body
  
  if (!body.name || !body.number) { //Nimi tai numero puuttuu
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

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
    .then(result => {
      console.log("Annetulla haulla ei löytynyt tuloksia")
      response.status(204).end()
    })
    .catch(error => next(error))
})

//Virheidenkäsittelijä
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  //Onko virhe CastError (virheellinen olioId) vai joku muu
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  //Jos ei ole CastError, siirretään Expressin oletusarvoisen virheidenkäsittelijän hoidettavavksi
  next(error)
}
app.use(errorHandler)

//Kovakoodattu puhelinluettelo
let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  },
  {
    name: 'Kurkkumopo',
    number: '39-23-6423122',
    id: 5
  }
]

//../info kertoo pyynnön tekohetken sekä yhteystietojen lukumäärän
app.get('/info', (req, res) => {
  let pvm = new Date(Date.now()).toUTCString()
  let teksti = "Puhelinluettelossa on " + persons.length +":n henkilön tiedot"
  res.send('<p>'+ teksti +'</p>' + '<p>' + pvm + '</p>')
})

//Portti, jota kuunnellaan, jos ei ole .env -tiedostoa, niin const PORT = process.env.PORT || 3100
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})