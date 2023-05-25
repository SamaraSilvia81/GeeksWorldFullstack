const router = require('express').Router();

// Call Entitys
const Character = require('../models/Character')
const List = require('../models/List')

// Create
router.post('/', async (req, res) => {

    const {
        charname,
        nickname,
        image,
        about,
        isHero,
        isMarvel
    } = req.body;

    if(!charname && !nickname && !image && !about && !isHero && !isMarvel) {
        res.status(422).json({error: 'Invalid charname, nickname, image, about, isHero or isMarvel'});
        return
    }

    // Object to send to server
    const character = {
        charname,
        nickname,
        image,
        about,
        isHero,
        isMarvel
    }

    try {
        // Create data
        await Character.create(character); // create - method do mongoose
        res.status(201).json({message: "Character created successfully"});
    } catch(e){
        res.status(500).json({error: e});
    }
})

// Add character to list
router.post('/charlist', async (req, res) => {
    const { characterId, listId } = req.body;
  
    if (!characterId || !listId) {
      res.status(422).json({ error: 'Invalid characterId or listId' });
      return;
    }
  
    try {
      // Find the character by ID
      const character = await Character.findById(characterId);
      if (!character) {
        res.status(404).json({ message: 'Character not found' });
        return;
      }
  
      // Find the list by ID
      const list = await List.findById(listId);
      if (!list) {
        res.status(404).json({ message: 'List not found' });
        return;
      }
  
      // Add the character to the list
      list.characters.push(character);
      await list.save();
  
      // Add the list to the character's 'lists' array
      character.lists.push(list);
      await character.save();
  
      res.status(200).json({ message: 'Character added to list successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e });
    }
  });   

// Read
// Read Marvel heroes and Marvel Villians
// Read DC heroes and DC Villians

// Read Marvel heroes and all characters
router.get('/', (req, res) => {
    
    const isMarvel = req.query.isMarvel;
    const isHero = req.query.isHero;
  
    let query = {};
  
    if (isMarvel === 'true' || isMarvel === 'false') {
      query.isMarvel = isMarvel === 'true';
    }
  
    if (isHero === 'true' || isHero === 'false') {
      query.isHero = isHero === 'true';
    }
  
    Character.find(query)
      .then(characters => {
        res.json(characters);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
});  
  
// Read by Id
router.get('/:id', async (req, res) => {

    const charId = req.params.id

    try {
        // extrair o dado da requisição pela url = req.params
        const character = await Character.findOne({_id: charId})

        if(!character){
            res.status(422).json({message: 'Character not found'})
            return
        }
        
        res.status(200).json(character);
    } catch(e){
        res.status(500).json({error: e});
    }
})

// Put/Patch
router.put('/:id', async (req, res) => {

    const charId = req.params.id

    const {
        charname,
        nickname,
        image,
        about,
        isHero,
        isMarvel
    } = req.body;

    // Object to send to server
    const character = {
        charname,
        nickname,
        image,
        about,
        isHero,
        isMarvel
    }

    // Updated - Salve - Send
    try {
        // extrair o dado da requisição pela url = req.params
        const updadtedCharacter = await Character.updateMany({_id: charId}, character)

        // Quantidade de registros que atualizou
        if(!updadtedCharacter.matchedCount === 0){
            res.status(422).json({message: 'Character not found'})
            return
        }

        console.log(updadtedCharacter)

        res.status(200).json({message: 'Character updated successfully'});
    } catch(e){
        res.status(500).json({error: e});
    }
})

// Delete by Id
router.delete('/:id', async (req, res) => {

    const charId = req.params.id

    const character = await Character.findOne({_id: charId})

    if(!character){
        res.status(422).json({message: 'Character not found'})
        return
    }

    try {
        await Character.deleteOne({_id:charId})
        return res.status(200).json({message: 'Character deleted successfully'});
    } catch(e){
        return res.status(500).json({error: e});
    }
})

// Delete character from list
router.delete('/charlist/:characterId/:listId', async (req, res) => {
    const { characterId, listId } = req.params;
  
    try {
      // Find the character by ID
      const character = await Character.findById(characterId);
      if (!character) {
        res.status(404).json({ message: 'Character not found' });
        return;
      }
  
      // Find the list by ID
      const list = await List.findById(listId);
      if (!list) {
        res.status(404).json({ message: 'List not found' });
        return;
      }
  
      // Check if the character is in the list
      const characterIndex = list.characters.indexOf(characterId);
      if (characterIndex === -1) {
        res.status(404).json({ message: 'Character is not in the list' });
        return;
      }
  
      // Remove the character from the list
      list.characters.splice(characterIndex, 1);
      await list.save();
  
      // Remove the list from the character's 'lists' array
      character.lists.pull(listId);
      await character.save();
  
      res.status(200).json({ message: 'Character removed from list successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e });
    }
});  

module.exports = router;
