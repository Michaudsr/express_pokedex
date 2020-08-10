const express = require('express');
const router = express.Router();


// Make sure to require your models in the files where they will be used.
const db = require('../models');
const { response } = require('express');
const axios = require('axios');



// GET /pokemon - return a page with favorited Pokemon
  router.get('/', async (req, res) => {
    try{
      const pokeFind = await db.pokemon.findAll(); 
      res.render("favorites", {pokemon: pokeFind})
    } catch (err){
      res.send(err, "Error");
    }
  });
 
// router.get('/', (req, res) => {
//   db.pokemon.findall().then(pokeFind =>{
//     res.render("favorites", {pokemon: pokeFind})
//   }).catch(err => {
//     res.send(err)
//   })

// })
  

router.post('/', async (req, res) => {
  
  try {
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      },
    })
    res.redirect('/pokemon')

  } catch (err){
    console.log('Error', err)
  }
});



router.get('/:name', async (req,res) => {
 try {
    if (req.params && req.params.name){
      let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`;
      let result = await axios.get(pokemonURL);
      let pokemonDetails = result.data;
      res.render("show", {pokedata: pokemonDetails})
    }
  } catch(err) {
    res.send("error", err);
  }
})

router.delete('/', async (req, res) => {
  try {
    console.log(req.body.name);
    await db.pokemon.destroy({
      where: {
        name: req.body.name
      },
    })
    res.redirect('/pokemon');

  } catch(err){
    console.log('Error')
    res.send("err");
  }
});


module.exports = router;
