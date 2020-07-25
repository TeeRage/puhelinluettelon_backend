/* eslint-disable no-undef */
const mongoose = require('mongoose')

//Käyttö vaatii salasanan syöttämisen komentoriville
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

//Komentoriville syötettävät muuttujat
const password = process.argv[2]

//Mongon yhteys
const url = `mongodb+srv://fullstack:${password}@cluster0.bieu1.mongodb.net/puhelinluettelo?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

//Skeema, joka kertoo Mondooselle, miten tieto tallennettava tietokantaan
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

//Luodaan uusi henkilö, tallentaa oliot kokoelmaan notes, koska eka parametri Note:n monikko automaagisesti
const Person = mongoose.model('Person', personSchema)

//Jos syötetään vain salasana, tulostetaan puhelinluettelon sisältö ja suljetaan yhteys
if (process.argv.length===3) {
  //Koska hakuehtona tyhjä olio {}, tuloksena tulee kaikki tulokset
  Person.find({}).then(result => {
    console.log('Puhelinluettelon sisältö:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

//Jos käyttäjä haluaa lisätä uusia nimiä puhelinluetteloon
if (process.argv.length>3) {

  //Komentoriville syötetyt muuttujat
  const nimi = process.argv[3]
  const numero = process.argv[4]

  //Uusi olio, jolle annetaan tallennettavat tiedot
  const person = new Person({
    name: nimi,
    number: numero
  })

  //save-metodi, tallentaa luodun yhteystiedon, ilmoittaa logiin ja sulkee yhteyden
  person.save().then(() => {
    console.log('Henkilö lisätty puhelinluetteloon.')
    mongoose.connection.close()
  })
}