const express = require('express');
const router = express.Router();


// Make sure to require your models in the files where they will be used.
const db = require('../models');
const { response } = require('express');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
 try {
   const pokeFind = await db.pokemon.findAll();
   res.render('favorites', {pokemon:pokeFind})
 } catch (err){
   console.log('Error')
 }
  // }).spread(function(pokemon, created) {
  //   console.log(pokemon); 
  // });
  // db.pokemon.findAll().then(function(poke) {
  //   console.log('Found: ', poke.name)

 
  

  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      },
    })
    res.redirect('/pokemon')

  } catch (err){
    console.log('Error')
  }
});

module.exports = router;
