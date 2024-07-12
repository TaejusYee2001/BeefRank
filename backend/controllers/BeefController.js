const mongoose = require('mongoose')

const User = require('../models/UserModel');
const Beef = require('../models/BeefModel');
const eventEmitter = require('../utils/EventEmitter');

const getBeef = async(req, res) => {
  const { id } = req.params; 
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection is not ready');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid beef ID' }); 
    }

    const beef = await Beef.findById(id); 
    if (!beef) {
      return res.status(404).json({ error: 'Beef not found' }); 
    }

    res.status(200).json(beef); 
  }
  catch (error) {
    console.error('Error fetching beef:', error); 
    res.status(500).json({ error: 'Internal server error' }); 
  }
};

const getAllBeefs = async(req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection is not ready');
    }

    // TODO: implement pagination or limit number of returned results for improved performance.
    const beefs = await Beef.find({}).sort({createdAt: -1}); 
    res.status(200).json(beefs); 
  }
  catch (error) {
    console.error('An error occurred:', error); 
    res.status(500).json({ error: 'Internal server error' }); 
  }
};

const createBeef = async(req, res) => {
  const { title, description, user1, user2 } = req.body; 
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection is not ready'); 
    }

    const findUserIdByUsername = async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return user._id;
      } else {
        throw new Error(`User with username ${username} not found`);
      }
    };

    const userID1 = await findUserIdByUsername(user1); 
    const userID2 = await findUserIdByUsername(user2); 

    const beef = await Beef.create({
      title, 
      description, 
      user1: userID1, 
      user2: userID2
    });

    const responseData = {
      _id: beef._id,
      title: beef.title,
      description: beef.description,
      user1: userID1,
      user2: userID2,
      votesForUser1: 0,
      votesForUser2: 0,
      usersThatVotedForUser1: [],
      usersThatVotedForUser2: [],
      createdAt: beef.createdAt,
      updatedAt: beef.updatedAt,
      __v: beef.__v
    };

    eventEmitter.emit('beefCreated', { beef }); 
    res.status(201).json(responseData); 
  }
  catch (error) {
    console.error('Error creating beef:', error); 
    res.status(400).json({ error: error.message });
  }
};


const deleteBeef = async(req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection is not ready'); 
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid beef ID' });
    }

    const beef = await Beef.findOneAndDelete({ _id: id }); 
    if (!beef) {
      return res.status(404).json({ error: 'Beef not found' }); 
    }

    const users = await User.find({ mybeefs: id }); 
    await Promise.all(users.map(async (user) => {
      user.mybeefs.pull(id); 
      await user.save();
    })); 

    return res.status(204).end(); 
  }
  catch (error) {
    console.error('Error deleting beef:', error); 
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateBeef = async(req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection is not ready'); 
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid beef ID' });
    }
    const beef = await Beef.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!beef) {
      return res.status(404).json({ error: 'Beef not found' });
    }

    return res.status(204).end();
  } 
  catch (error) {
    console.error('Error updating beef:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    getBeef,
    getAllBeefs,
    createBeef,
    deleteBeef,
    updateBeef, 
};