let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let handymen = require('./routes/handymen');
let HandyMan = require('./model/handyman');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://benjaminvalleix:bricobriconetpulse@cluster0.yffw3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options = {};

// Données initiales
const initialData = [
    {
        "id": 1,
        "name": "Caroline API",
        "avatarUrl": "https://picsum.photos/500/500?random=1",
        "address": "Saint-Pierre-du-Mont ; 5km",
        "phoneNumber": "+33 6 86 57 90 14",
        "aboutMe": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor id sem ut blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed hendrerit ex. Cras a tempus risus. Aliquam egestas nulla non luctus blandit. Aenean dignissim massa ultrices volutpat bibendum. Integer semper diam et lorem iaculis pulvinar.",
        "favorite": true,
        "webSite": "www.facebook.fr/caroline"
    },
    {
        "id": 2,
        "name": "Jack API",
        "avatarUrl": "https://picsum.photos/500/500?random=2",
        "address": "Saint-Pierre-du-Mont ; 5km",
        "phoneNumber": "+33 6 00 55 90 14",
        "aboutMe": "Sed eget fringilla mauris, ac rutrum mauris. Curabitur finibus felis id justo porttitor, vitae hendrerit justo imperdiet. Donec tempus quam vulputate, elementum arcu a, molestie felis. Pellentesque eu risus luctus, tincidunt odio at, volutpat magna. Nam scelerisque vitae est vitae fermentum. Cras suscipit pretium ex, ut condimentum lorem sagittis sit amet. Praesent et gravida diam, at commodo lorem. Praesent tortor dui, fermentum vitae sollicitudin ut, elementum ut magna. Nulla volutpat tincidunt lectus, vel malesuada ante ultrices id.\n\nUt scelerisque fringilla leo vitae dictum. Nunc suscipit urna tellus, a elementum eros accumsan vitae. Nunc lacinia turpis eu consectetur elementum. Cras scelerisque laoreet mauris ac pretium. Nam pellentesque ut orci ut scelerisque. Aliquam quis metus egestas, viverra neque vel, ornare velit. Nullam lobortis justo et ipsum sodales sodales. Etiam volutpat laoreet tellus, ultrices maximus nulla luctus ultricies. Praesent a dapibus arcu. In at magna in velit placerat vehicula nec in purus.",
        "favorite": true,
        "webSite": "www.facebook.fr/jack"
    },
    {
        "id": 3,
        "name": "Chloé API",
        "avatarUrl": "https://picsum.photos/500/500?random=3",
        "address": "Saint-Pierre-du-Mont ; 6km",
        "phoneNumber": "+33 6 86 13 12 14",
        "aboutMe": "Sed ultricies suscipit semper. Fusce non blandit quam.",
        "favorite": false,
        "webSite": "www.facebook.fr/chloe"
    },
    {
        "id": 4,
        "name": "Vincent API",
        "avatarUrl": "https://picsum.photos/500/500?random=4",
        "address": "Saint-Pierre-du-Mont ; 11km",
        "phoneNumber": "+33 6 10 57 90 19",
        "aboutMe": "Etiam quis neque egestas, consectetur est quis, laoreet augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ipsum sem, commodo in nisi maximus, semper dignissim metus. Fusce eget nunc sollicitudin, dignissim tortor quis, consectetur mauris.",
        "favorite": true,
        "webSite": "www.facebook.fr/vincent"
    },
    {
        "id": 5,
        "name": "Elodie API",
        "avatarUrl": "https://picsum.photos/500/500?random=5",
        "address": "Saint-Pierre-du-Mont ; 8km",
        "phoneNumber": "+33 6 86 57 90 14",
        "aboutMe": "Fusce in ligula mi. Aliquam in sagittis tellus. Suspendisse tempor, velit et cursus facilisis, eros sapien sollicitudin mauris, et ultrices lectus sapien in neque.",
        "favorite": true,
        "webSite": "www.facebook.fr/elodie"
    },
    {
        "id": 6,
        "name": "Sylvain API",
        "avatarUrl": "https://picsum.photos/500/500?random=6",
        "address": "Saint-Pierre-du-Mont ; 6km",
        "phoneNumber": "+33 6 86 12 22 02",
        "aboutMe": "Integer pulvinar lacinia augue, a tempor ex semper eget. Nam lacinia lorem dapibus, pharetra ante in, auctor urna. Praesent sollicitudin metus sit amet nunc lobortis sodales. In eget ante congue, vestibulum leo ac, placerat leo. Nullam arcu purus, cursus a sollicitudin eu, lobortis vitae est. Sed sodales sit amet magna nec finibus. Nulla pellentesque, justo ut bibendum mollis, urna diam hendrerit dolor, non gravida urna quam id eros.",
        "favorite": false,
        "webSite": "www.facebook.fr/sylvain"
    },
    {
        "id": 7,
        "name": "Laetitia API",
        "avatarUrl": "https://picsum.photos/500/500?random=7",
        "address": "Saint-Pierre-du-Mont ; 14km",
        "phoneNumber": "+33 6 96 57 90 01",
        "aboutMe": "Vestibulum non leo vel mi ultrices pellentesque.",
        "favorite": true,
        "webSite": "www.facebook.fr/laetitia"
    },
    {
        "id": 8,
        "name": "Dan API",
        "avatarUrl": "https://picsum.photos/500/500?random=8",
        "address": "Saint-Pierre-du-Mont ; 1km",
        "phoneNumber": "+33 6 86 57 90 14",
        "aboutMe": "Cras non dapibus arcu.",
        "favorite": true,
        "webSite": "www.facebook.fr/dan"
    },
    {
        "id": 9,
        "name": "Joseph API",
        "avatarUrl": "https://picsum.photos/500/500?random=9",
        "address": "Saint-Pierre-du-Mont ; 2km",
        "phoneNumber": "+33 6 86 57 90 14",
        "aboutMe": "Donec neque odio, eleifend a luctus ac, tempor non libero. Nunc ullamcorper, erat non viverra feugiat, massa odio facilisis ligula, ut pharetra risus libero eget elit. Nulla malesuada, purus eu malesuada malesuada, est purus ullamcorper ipsum, quis congue velit mi sed lorem.",
        "favorite": false,
        "webSite": "www.facebook.fr/joseph"
    },
    {
        "id": 10,
        "name": "Emma API",
        "avatarUrl": "https://picsum.photos/500/500?random=10",
        "address": "Saint-Pierre-du-Mont ; 1km",
        "phoneNumber": "+33 6 14 71 70 18",
        "aboutMe": "Aliquam erat volutpat. Mauris at massa nibh. Suspendisse auctor fermentum orci, nec auctor tortor. Ut eleifend euismod turpis vitae tempus. Sed a tincidunt ex. Etiam ut nibh ante. Fusce maximus lorem nibh, at sollicitudin ante ultrices vel. Praesent ac luctus ante, eu lacinia diam. Quisque malesuada vel arcu vitae euismod. Ut egestas mattis euismod.\n\nVestibulum non leo vel mi ultrices pellentesque. Praesent ornare ligula non elit consectetur, pellentesque fringilla eros placerat. Etiam consequat dui eleifend justo iaculis, ac ullamcorper velit consectetur. Aliquam vitae elit ac ante ultricies aliquet vel at felis. Suspendisse ac placerat odio. Cras non dapibus arcu. Fusce pharetra nisi at orci rhoncus, vitae tristique nibh euismod.",
        "favorite": false,
        "webSite": "www.facebook.fr/emma"
    },
    {
        "id": 11,
        "name": "Patrick API",
        "avatarUrl": "https://picsum.photos/500/500?random=11",
        "address": "Saint-Pierre-du-Mont ; 5km",
        "phoneNumber": "+33 6 20 40 60 80",
        "aboutMe": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor molestie libero, nec porta lectus posuere a. Curabitur in purus at enim commodo accumsan. Nullam molestie diam a massa finibus, in bibendum nulla ullamcorper. Nunc at enim enim. Maecenas quis posuere nisi. Mauris suscipit cursus velit id condimentum. Ut finibus turpis at nulla finibus sollicitudin. Nunc dolor mauris, blandit id ullamcorper vel, lacinia ac nisi. Vestibulum et sapien tempor, egestas lorem vitae, faucibus urna. Duis id velit lacus.",
        "favorite": true,
        "webSite": "www.facebook.fr/patrick"
    },
    {
        "id": 12,
        "name": "Ludovic API",
        "avatarUrl": "https://picsum.photos/500/500?random=12",
        "address": "Saint-Pierre-du-Mont ; 5km",
        "phoneNumber": "+33 6 00 01 10 11",
        "aboutMe": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor molestie libero, nec porta lectus posuere a. Curabitur in purus at enim commodo accumsan. Nullam molestie diam a massa finibus, in bibendum nulla ullamcorper. Nunc at enim enim. Maecenas quis posuere nisi. Mauris suscipit cursus velit id condimentum. Ut finibus turpis at nulla finibus sollicitudin. Nunc dolor mauris, blandit id ullamcorper vel, lacinia ac nisi. Vestibulum et sapien tempor, egestas lorem vitae, faucibus urna. Duis id odio massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        "favorite": false,
        "webSite": "www.facebook.fr/ludovic"
    }
]

// Fonction pour initialiser la base de données
async function initializeDatabase() {
    try {
        // Vérifier si la collection est vide
        const count = await HandyMan.countDocuments();
        
        if (count === 0) {
            console.log('Base de données vide, initialisation avec les données de test...');
            
            // Transformer les données pour correspondre au schéma
            const formattedData = initialData.map(item => ({
                id: item.id,
                name: item.name,
                avatarUrl: item.avatarUrl,
                address: item.address,
                phone: item.phoneNumber, // Notez le changement de phoneNumber à phone
                aboutMe: item.aboutMe,
                isFavorite: item.favorite, // Notez le changement de favorite à isFavorite
                webSite: item.webSite
            }));

            // Insérer les données
            await HandyMan.insertMany(formattedData);
            console.log('Données initiales insérées avec succès!');
        } else {
            console.log('La base de données contient déjà des données, pas d\'initialisation nécessaire.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
    }
}

mongoose.connect(uri, options)
    .then(async () => {
        console.log("Connecté à la base MongoDB dans le cloud !");
        console.log("at URI = " + uri);

        await HandyMan.deleteMany({});
        console.log('Collection "handymen" cleared');

        await initializeDatabase(); // Initialiser la base de données après la connexion
        console.log("vérifiez with http://localhost:8010/api/handymans que cela fonctionne");


    })
    .catch(err => {
        console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/handymans')
    .get(handymen.getAll)
    .post(handymen.create);

app.route(prefix + '/handymans/:id')
    .get(handymen.getOne)
    .delete(handymen.deleteOne)
    .put(handymen.update);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;