# Full-Stack-Project-03
DEMO: N/A (Lisään joskus myöhemmin // adding some other time)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Kolmas projekti Laurean Full Stack kurssille. Tämän projektin ideana on API, jonka kautta käyttäjä voi lisätä, hakea, muokata ja poistaa musiikki albumeihin liittyvää dataa.
Tämä data on tallennettuna MongoDB tietokannassa. API:ssa on 5 eri reittiä.

1. /api/getall - Hakee tietokannasta kaikki dokumentit.

2. /api/:id - Hakee tietokannasta yhden dokumentin syötetyn ID:n perusteella.

3. /api/add - Lisää tietokantaan uuden dokumentin. Dokumentin arvot syötetään URL parametreina. **Esimerkki:** /api/add/?title=Zero+Point&artist=Rob+Clouth&year=2020&label=Mesh&catno=MESH029&cover=https://f4.bcbits.com/img/a3010879936_10.jpg

4. /api/update/:id - Päivittää yhden dokumentin annetun ID:n perusteella. Käyttäjä itse syöttää ne paramterit, jotka haluaa päivittää ja antaa niille uudet arvot.

5. /api/delete/:id - Poistaa yhden dokumentin annetun ID:n perusteella.

Projektissa on hyödynnetty seuraavia Node.js paketteja: Express, Mongoose

Projektiin on tarkoitus vielä saada graafinen käyttöliittymä. Tämä tapahtuu seuraavassa Full Stack projektissa, jossa rakennan käyttöliittymän React kirjaston avulla.
API:n toiminnallisuutta voisi vielä laajentaa, jotta tiedon hakeminen ja filteröinti olisi sujuvampaa. Esim. hakeminen artistin tai levy-yhtiön mukaan olisi hyödyllistä. Teen nämä lisäkset ehkä myöhemmin.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

The third project for Laurea's Full Stack development course. The idea of the project is an API, which allows the user to add, search, edit and delete data about music albums.
The data is stored on a MongoDB database. The API has 5 different routes.

1. /api/getall - Fetches all documents from the database.

2. /api/:id - Fetches data from a single document based on the given ID.

3. /api/add - Adds a new document to the database. The document values are provided as URL parameters. **Example:** /api/add/?title=Zero+Point&artist=Rob+Clouth&year=2020&label=Mesh&catno=MESH029&cover=https://f4.bcbits.com/img/a3010879936_10.jpg

4. /api/update/:id - Updates a single document based on the given ID. The user inputs only the parameters they want to update and gives them new values.

5. /api/delete/:id - Deletes a single document based on the given ID.

This project utilizes the following Node.js packages: Express, Mongoose

The goal is to eventually get a graphical user interface for the project. This is done in the next Full Stack project, where I will build a UI with React.
The functionality of the API could still be expanded, so searching and filtering data would be more convenient. E.g. searching by artist or label would be useful. I might do these additions later.
