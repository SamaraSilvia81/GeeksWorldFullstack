const router = require('express').Router();

// Call Entitys
const List = require('../models/List');
const User = require('../models/User');

// Create
router.post('/', async (req, res) => {
  
  const { listname, ownerId, character } = req.body;

  if (!listname || !ownerId || !character) {
    res.status(422).json({ error: 'Invalid listname, ownerId or character' });
    return;
  }

  try {
    
    // Create data with owner
    const newList = await List.create({ listname, owner: ownerId, character });

    // Find the user by ID
    const user = await User.findById(ownerId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Add the new list to the user's 'lists' array
    user.lists.push(newList);

    // Save the user
    await user.save();

    res.status(201).json({ message: 'List created successfully' });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// Read
router.get('/', async (req, res) => {
  try {
    // Get data
    const lists = await List.find();
    return res.status(200).json(lists);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// Read by Id
router.get('/:id', async (req, res) => {

  const listId = req.params.id;

  try {
    // Extract the data from the request by URL = req.params
    const list = await List.findOne({ _id: listId });

    if (!list) {
      res.status(422).json({ message: 'List not found' });
      return;
    }

    res.status(200).json(list);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// Put/Patch
router.put('/:id', async (req, res) => {

  const listId = req.params.id;

  const { listname, character } = req.body;

  // Object to send to server
  const list = {
    listname,
    character
  };

  try {
    // Extract the data from the request by URL = req.params
    const updatedList = await List.updateMany({ _id: listId }, list);

    // Check the number of matched records
    if (updatedList.matchedCount === 0) {
      res.status(422).json({ message: 'List not found' });
      return;
    }

    console.log(updatedList);

    res.status(200).json({message: 'List Updated successfully'});
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// Delete by Id
router.delete('/:id', async (req, res) => {

    const listId = req.params.id;
  
    try {

      // Find the list by ID
      const list = await List.findOne({ _id: listId });
      if (!list) {
        res.status(422).json({ message: 'List not found' });
        return;
      }

      // Find the owner of the list
      const ownerId = list.owner;
      const owner = await User.findOne({ _id: ownerId });
      if (!owner) {
          res.status(422).json({ message: 'Owner not found' });
          return;
      }

      // Remove the list ID from the owner's lists array
      const listIndex = owner.lists.indexOf(listId);
      if (listIndex !== -1) {
          owner.lists.splice(listIndex, 1);
      }

       // Save the updated owner
       await owner.save();

      // Delete the list
      await List.deleteOne({ _id: listId });
  
      return res.status(200).json({ message: 'List deleted successfully' });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
});

module.exports = router;
