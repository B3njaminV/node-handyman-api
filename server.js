let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let handymen = require('./routes/handymen');
let mongoose = require('mongoose');
let os = require('os');

// 🔹 Connexion à MongoDB
mongoose.Promise = global.Promise;
const uri = 'mongodb+srv://benjaminvalleix:bricobriconetpulse@cluster0.yffw3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {})
    .then(() => {
        console.log("✅ Connecté à MongoDB !");
        console.log("📌 URI =", uri);
    })
    .catch(err => {
        console.error('❌ Erreur de connexion MongoDB:', err);
    });

// 🔹 Middleware CORS (pour éviter les blocages Cross-Origin)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// 🔹 Middleware Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 🔹 Port et IP locale
let port = process.env.PORT || 8080;

// 🔹 Définition des routes API
const prefix = '/api';

app.route(prefix + '/handymans')
    .get(handymen.getAll)
    .post(handymen.create);

app.route(prefix + '/handymans/:id')
    .get(handymen.getOne)
    .delete(handymen.deleteOne)
    .put(handymen.update);

// 🔹 Démarrage du serveur
app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Serveur Express démarré !`);
    console.log(`📌 Accédez à l'API depuis votre PC : http://localhost:${port}/api/handymans`);
    console.log(`📱 Accédez à l'API depuis internet : http://144.24.197.144:8080/api/handymans`);
});

module.exports = app;
