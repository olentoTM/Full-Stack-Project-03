var port = process.env.PORT || 5000;
var express = require("express");
var app = express();

var mongoose = require("mongoose");
var uri = "mongodb+srv://db_user_01:k777ksDqw9blDqPF@cluster0.hebq5.mongodb.net/projectData?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Seuraavat 7 koodiriviä ovat vain tietokantayhteyden tarkistamista varten. Tietokantayhteyden onnistuessa tai epäonnistuessa asiasta ilmoitetaan konsolin kautta.
var DBconnection = mongoose.connection;
DBconnection.on("error", function() {
    console.log("Database connection failed.");
});
DBconnection.once("open", function() {
    console.log("Database connection succesfull.");
});


//Tässä määritellään tietokanta dokumentin rakenne.
const Albums = mongoose.model(
    "Albums",
    {                       //Dokumentti koostuu seuraavista osista:
        title: String,      //1. Albumin nimi
        artist: String,     //2. Artistin nimi
        year: Number,       //3. Julkaisu vuosi
        label: String,      //4. Levy-yhtiön nimi
        catno: String,      //5. Levy-yhtiön antama kataloginumero
        cover: String       //6. Web-linkki kansikuvaan
    }
    , "Albums" //Yhdistetään tämä rakenne jo valmiiksi tietokannassa olevaan kokoelmaan nimeltä "Albums".
);

//Haetaan kaikki tietokannassa olevat dokumentit.
app.get("/api/getall", function(req, res) {
    Albums.find({}, function(err, results) {
        if (err) console.log(err);
        console.log(results);
        res.json(results, 200); //Palautetaan tulokset
    });
});

//Haetaan tietokannasta dokumetti ID:n avulla.
app.get("/api/:id", function(req, res) {
    Albums.find({_id: req.params.id}, function(err, results) {
        if (err) console.log(err);
        console.log(results);
        res.json(results, 200); //Palautetaan tulokset
    });
})

//Lisätään tietokantaan uusi dokumentti aiemmin määritellyn rakenteen mukaisesti.
app.post("/api/add", function(req, res) {
    //Tässä kohtaa kerätään kaikki tiedot. Nämä tiedot voi syöttää URL parametrien avulla. Alla on yksi esimerkki siitä, miten tiedot tulee syöttää:
    // /api/add/?title=The+All+Attracting&artist=Current+Value&year=2021&label=YUKU&catno=YUKU013&cover=https://f4.bcbits.com/img/a1576622529_10.jpg
    var newAlbum = new Albums({
        title: req.query.title,
        artist: req.query.artist,
        year: req.query.year,
        label: req.query.label,
        catno: req.query.catno,
        cover: req.query.cover
    });

    //Tämä tallentaa uuden albumin tietokantaan tai antaa virheilmoituksen jos jokin menee pieleen.
    newAlbum.save(function(err, result) {
        if (err) console.log(err);
        console.log("New album saved to the database: " + result);
        res.json(result, 200); //Palautetaan vielä lähetetyt tiedot takaisin, jotta niiden oikeellisuuden voi heti tarkistaa.
    });
});

//Päivitetään jokin tietty dokumentti ID:n perusteella.
app.put("/api/update/:id", function(req, res) {
    var id = req.params.id;
    Albums.findByIdAndUpdate(
        id, 
        {
            //Pistetään kaikki osiot tänne, jotta käyttäjä voi halutessaa muttaa niistä mitä haluaa.
            //Kaikkia näitä ei ole pakko päivittää. Sen sijaan käyttäjä itse syöttää parametrit, jotka haluaa päivittää ja antaa niille uudet arvot.
            //Parametreja, joita ei syötetä ei myöskään päivitetä.
            title: req.query.title,
            artist: req.query.artist,
            year: req.query.year,
            label: req.query.label,
            catno: req.query.catno,
            cover: req.query.cover
        },
        function(err) {
            if (err) console.log(err);
            //Yritin tässä vaiheessa palauttaa muokatun dokumentin, mutta API palautti dokumentin vanhan version sen sijaan. 
            //Tästä syystä annamme käyttäjälle seuraavan viestin:
            console.log("Album with the following ID has been updated: " + id);
            res.json("Album with the following ID has been updated: " + id); 
    });
});

//Poistetaan jokin dokumentti ID:n perusteella.
app.delete("/api/delete/:id", function(req, res) {
    var id = req.params.id;
    Albums.findByIdAndDelete(id, function(err) {
        if (err) console.log(err);
        console.log(id + " has been deleted from the database.");
        res.json(id + " has been deleted from the database.")
    });
});

app.listen(port, () => console.log("The server is listening to port number " + port));