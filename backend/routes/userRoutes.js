const router = require('express').Router();

// Call Entitys
const List = require('../models/List');
const User = require('../models/User');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user && user.password === password) {
      res.status(200).json({ success: true, message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro na autenticação' });
    console.error(error);
  }
});

// Create
router.post('/', async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(422).json({ error: 'Invalid username, email or password' });
        return;
    }

    // Object to send to server
    const user = {
        username,
        email,
        password,
    };

    try {
        // Create user
        const newUser = await User.create(user);

        const myList = new List({ listname: 'MyList', owner: newUser._id });
        await myList.save();

        newUser.lists.push(myList);
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Read
router.get('/', async (req, res) => {
    try {
        // get data
       const user = await User.find()
        return res.status(200).json(user);
    } catch(e){
        return res.status(500).json({error: e});
    }
})

// Read by Id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        // extrair o dado da requisiçaõ pela url = req.params
        const user = await User.findOne({_id: id})

        if(!user){
            res.status(422).json({message: 'User not found'})
            return
        }
        
        res.status(200).json(user);
    } catch(e){
        res.status(500).json({error: e});
    }
})

// Put
router.put('/:id', async (req, res) => {

    const id = req.params.id

    const {username, email, password } = req.body;

    // Object to send to server
    const user = {
        username, 
        email, 
        password
    }

    // Updated - Salve - Send
    try {
        // extrair o dado da requisição pela url = req.params
        const updadtedUser = await User.updateMany({_id: id}, user)

        // Quantidade de registros que atualizou
        if(!updadtedUser.matchedCount === 0){
            res.status(422).json({message: 'User not found'})
            return
        }

        console.log(updadtedUser)

        res.status(200).json(user);
    } catch(e){
        res.status(500).json({error: e});
    }
})

// Delete by Id
router.delete('/:id', async (req, res) => {

    const userId = req.params.id

    try {

        // Find the user by ID
        const user = await User.findOne({_id: userId})
        if(!user){
            res.status(422).json({message: 'User not found'})
            return
        }

        // Find and delete all lists associated with the user
        await List.deleteMany({ owner: userId });

        // Delete the user
        await User.deleteOne({ _id: userId });

        return res.status(200).json({ message: 'User and associated lists deleted successfully' });
    } catch(e){
        return res.status(500).json({error: e});
    }
})

module.exports = router;
