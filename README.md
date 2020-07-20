# Full Stack open 2020
## Osan 3 tehtäväsarja

Tehtäväsarja tehty kurssin ohjeiden mukaan omaan git-repositorioonsa.

#### Linkki internetissä olevaan sovelluksen backendiin:

Puhelinluettelo: https://calm-savannah-45350.herokuapp.com

Info: https://calm-savannah-45350.herokuapp.com/info

Tietokanta: https://calm-savannah-45350.herokuapp.com/api/persons 

###### 3.1 puhelinluettelon backend step1
Node-sovellus, joka tarjoaa osoitteessa http://localhost:3001/api/persons kovakoodatun taulukon puhelinnumerotietoja

###### 3.2: puhelinluettelon backend step2
Osoitteeseen http://localhost:3001/info sivu, joka kertoo pyynnön tekohetken sekä sen, kuinka monta puhelinluettelotietoa sovelluksen muistissa olevassa taulukossa on.

###### 3.3: puhelinluettelon backend step3
Toiminnallisuus yksittäisen puhelinnumerotiedon näyttämiseen. 
Esim. id:n 5 omaavan numerotiedon url on http://localhost:3001/api/persons/5
Jos id:tä vastaavaa puhelinnumerotietoa ei ole, tulee palvelimen vastata asianmukaisella statuskoodilla.

###### 3.4: puhelinluettelon backend step4
Toiminnallisuus, jonka avulla puhelinnumerotieto on mahdollista poistaa numerotiedon yksilöivään URL:iin tehtävällä HTTP DELETE -pyynnöllä.
Testaus Visual Studio Coden REST-clientillä tai POSTMANilla.

###### 3.5: puhelinluettelon backend step5
Laajenna backendia siten, että uusia puhelintietoja on mahdollista lisätä osoitteeseen http://localhost:3001/api/persons tapahtuvalla HTTP POST -pyynnöllä.

Generoi uuden puhelintiedon tunniste funktiolla Math.random. Käytä riittävän isoa arvoväliä, jotta arvottu id on riittävän suurella todennäköisyydellä sellainen, joka ei ole jo käytössä.

###### 3.6: puhelinluettelon backend step6
Tee uuden numeron lisäykseen virheiden käsittely. Pyyntö ei saa onnistua, jos
- nimi tai numero puuttuu
- lisättävä nimi on jo luettelossa
Vastaa asiaankuuluvalla statuskoodilla ja liitä vastaukseen mukaan myös tieto, joka kertoo virheen syyn

###### 3.7: puhelinluettelon backend step7
Lisätty loggausta tekevä middleware morgan (https://github.com/expressjs/morgan). 
Konfiguroitu logaamaan konsoliin tiny-konfiguraation mukaisesti.

###### 3.8*: puhelinluettelon backend step8
Konfiguroi morgania siten, että se näyttää myös HTTP POST -pyyntöjen mukana tulevan datan.

###### 3.9 puhelinluettelon backend step9
Laitettu backend toimimaan edellisessä osassa tehdyn puhelinluettelon frontendin kanssa muilta osin, paitsi mahdollisen puhelinnumeron muutoksen osalta.
Cors asennettu ja otettu käyttöön.

###### 3.10 puhelinluettelon backend step10
Vie sovelluksen backend internetiin, esim. Herokuun.
Tee repositorion juureen tiedosto README.md ja lisää siihen linkki internetissä olevaan sovellukseesi.
https://calm-savannah-45350.herokuapp.com/api/persons
Testaa selaimen ja postmanin tai VS Code REST-clientin avulla, että internetissä oleva backend toimii.

###### 3.11 puhelinluettelo full stack
Generoitu frontendistä tuotantoversio ja lisätty se internetissä olevaan sovellukseesi tässä osassa esiteltyä menetelmää noudattaen.
Backendiin lisätty build sekä expressin middlewaren static (app.use(express.static('build')))
https://calm-savannah-45350.herokuapp.com 

###### 3.12: tietokanta komentoriviltä
Luotu puhelinluettelo-sovellukselle pilvessä oleva mongo Mongo DB Atlaksen avulla.
Lisätty tiedosto mongo.js, jonka avulla tietokanta voi lisätä puhelinnumeroja sekä listata kaikki kannassa olevat numerot.

Jos annetaan komentokehotteessa kolme komentoriviparametria (joista ensimmäinen on salasana) esim 'node mongo.js salasana Anna 040-1234556',
ohjelma tulostaa "Lisätty Anna 040-1234556 puhlinluetteloon" ja lisää uuden yhteystiedon tietokantaan.
Jos komentoriviparametreina ei ole muuta kuin salasana, tulostaa ohjelma tietokannassa olevat numerotiedot.
Huom. salasana on salainen.

