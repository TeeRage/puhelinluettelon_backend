const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json()) 

//Konfiguroidaan Morgan logaamaan konsoliin
//app.use(morgan('tiny'))
morgan.token('content', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

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
    name: 'Tea Antila', 
    number: '39-23-6423122',
    id: 5
  }
]

//aloitussivu
app.get('/', (req, res) => {
  res.send('<p>Moi</p>')
})


//http://localhost:3001/info kertoo pyynnön tekohetken sekä kuinka monta puhelinluettelotietoa sovelluksen muistissa olevassa taulukossa on
app.get('/info', (req, res) => {

  let pvm = new Date(Date.now()).toUTCString()
  let teksti = "Puhelinluettelossa on " + persons.length +":n henkilön tiedot"

  res.send('<p>'+ teksti +'</p>' + '<p>' + pvm + '</p>')
})

//http://localhost:3001/api/persons kovakoodattu taulukko puhelinnumerotiedoista
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

//Yksittäisen puhelinnumerotiedon näyttäminen. Esim. id:n 3 omaavan numerotiedon url on http://localhost:3001/api/persons/3
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

//Yksittäisen yhteystiedon poistaminen tietokannasta (palautuu alkutilaansa uudelleen käynnistettäessä)
//Käyttö Postmanin tai VCS REST-clientin delete-pyynnöllä
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

//Uniikin id:n luomista varten, arvotaan jokin satunnaisluku
const generateId = () => {

  const maxId = Math.floor(Math.random() * 100000)
  return maxId
}

//Vaatii alussa määritetyn app.use(express.json())
//Lisää noteseihin uuden noten (POST)
app.post('/api/persons', (request, response) => {

  const body = request.body

  if (!body) { //Sisältö puuttuu 
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }//Nimi tai numero puuttuu
  else if(!body.name || !body.number){
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }//Nimi löytyy jo luettelosta
  else if(persons.map(function(henkilo){return henkilo.name}).includes(body.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(person)
})

//Portti, jota kuunnellaan
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})