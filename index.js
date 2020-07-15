const express = require('express')
const app = express()

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
  }
]

//http://localhost:3001/api/persons kovakoodattu taulukko puhelinnumerotiedoista
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

//http://localhost:3001/info kertoo pyynnön tekohetken sekä kuinka monta puhelinluettelotietoa sovelluksen muistissa olevassa taulukossa on
app.get('/info', (req, res) => {

  let pvm = new Date(Date.now()).toUTCString()
  let teksti = "Puhelinluettelossa on " + persons.length +":n henkilön tiedot"

  res.send('<p>'+ teksti +'</p>' + '<p>' + pvm + '</p>')
})

//Portti, jota kuunnellaan
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})