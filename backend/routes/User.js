const express = require('express');
const userRouter = express.Router(); 
const {
  getUser, 
  getAllUsers, 
  createUser, 
  deleteUser, 
  updateUser
} = require('../controllers/UserController'); 

userRouter.get('/:id', getUser);
userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.delete('/:id', deleteUser);
userRouter.patch('/:id', updateUser);

module.exports = userRouter;

/*
const router2 = express.Router()
const mongoose = require('mongoose')
const { patch } = require('semver')

//THIS FUNCTION IS ONLY USED FOR POSTMAN TESTING PURPOSES (DO NOT DELETE USERS)
router2.delete('/:id', deleteUser)

//Get all Users
router2.get('/', getAllUsers)

//Get a User (based on MongoDB id)
router2.get('/:id', getUser)

//get a user by name (scuffed implementation)
router2.get('/:name/getUserByName', getUserByName)

//Create a new User
    //To-do : make it so that two users cannot have the same username
router2.post('/', createUser)

//ChangePswd
router2.patch('/:id/changeUserPswd', changeUserPswd)

//Add a friend
    //To-do : add all of their beefs to visible beefs
router2.patch('/:id/addUserFriend', addUserFriend)

router2.patch('/:id/addUserBlock', addUserBlock)

router2.patch('/:id/removeUserBlock', removeUserBlock)


router2.patch('/:id/patchUser', patchUserBeefArray)

router2.patch('/:id/makeUserRequest', makeUserRequest)

router2.patch('/:id/unsendUserRequest', unsendUserRequest)

router2.patch('/:id/acceptUserRequest', acceptUserRequest)



module.exports = router2
*/