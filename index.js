const express = require('express')
const app = express()
const parkings = require('./parkings.json')

// Middleware
app.use(express.json())

// Liste de tous les parkings
app.get('/parkings', (req, res) => { res.status(200).json(parkings) })

// Données d'un parking particulier 
app.get('/parkings/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const parking = parkings.find(parking => parking.id === id)
  res.status(200).json(parking)
})
// Création d'un parking
app.post('/parkings', (req, res) => {  
  parkings.push(req.body)
  res.status(200).json(parkings)
})
// Modification d'un parking particulier
app.put('/parkings/:id', (req, res) => {
  const id = parseInt(req.params.id)
  let parking = parkings.find(parking => parking.id === id)
  parking.name = req.body.name,
    parking.city = req.body.city,
    parking.type = req.body.type,
    res.status(200).json(parking)
})
// Suppression d'un parking particulier
app.delete('/parkings/:id', (req, res) => {
  const id = parseInt(req.params.id)    
  let parking = parkings.find(parking => parking.id === id)    
  parkings.splice(parkings.indexOf(parking), 1)    
  res.status(200).json(parkings)
})

// Mise en écoute du serveur
app.listen(8080, () => { console.log("Serveur à l'écoute") })