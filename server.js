require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
const cors = require('cors');
app.use("public", express.static("public"))

// fonctions pour la connexion à mongodb
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }catch(err){
       console.log(err)
    }
}

connectDB()

mongoose.connection.once("open", () => {
    console.log("connected to MongoDB")
    app.listen(process.env.PORT || 8000, () => console.log("port 8000"))
})
mongoose.connection.on("error", err => {
    console.log(err)
})

app.use(cors({
    origin: '*'
}));


// lier avec le route de gestion de l'equipe
const gestionDeLequipe = require("./routes/gestionDeLequipe")
app.use("/admin", gestionDeLequipe)

// lier avec le route de gestion des enfants
const gestionDesEnfants = require("./routes/gestionDesEnfants")
app.use("/gestionDesEnfants", gestionDesEnfants)

//lier avec le route de gestion du site
const gestionDuSite = require("./routes/gestionDuSite")
app.use("/gestionDuSite", gestionDuSite)

//lier avec le route de contact us
const contactUs = require("./routes/contactUs")
app.use("/contactUs", contactUs)

//lier avec le route de annonces
const annonces = require("./routes/annonces")
app.use("/affich", annonces)

//lier avec le route de menu
const menu = require("./routes/menu")
app.use("/menu", menu)

//lier avec le route de accueil equipe
const accueil = require("./routes/accueilEquipe")
app.use("/accueil", accueil)

//lier avec le route de accueil equipe
const avis = require("./routes/avis")
app.use("/avis", avis)

//lier avec le route de l'interface orthophoniste
const orthophoniste = require("./routes/orthophoniste")
app.use("/ortho", orthophoniste)

//lier avec le route de l'interface psychologue
const psychologue = require("./routes/psychologue")
app.use("/psycho", psychologue)

//lier avec le route de l'interface nourrice
const nourrice = require("./routes/nourrice")
app.use("/nourrice", nourrice)

//lier avec le route de l'interface parent
const parent = require("./routes/parent")
app.use("/parent", parent)

//lier avec le route du signUp
const signUp = require("./routes/signUp")
app.use("/signUp", signUp)

//lier avec le route du signIn
const signIn = require("./routes/signIn")
app.use("/signIn", signIn)

//lier avec le route du finirInscriptions
const finirInscription = require("./routes/finirInscriptions")
app.use("/finirInscriptions", finirInscription)






