# fullstack-hy2020_Teht_3.1.-3.6.
## Osan 3.1-3.6 tehtäväsarja

Tehtäväsarja tehty kurssin ohjeiden mukaan omaan git-repositorioonsa.

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