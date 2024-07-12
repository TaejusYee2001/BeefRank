const express = require('express'); 
const beefRouter = express.Router();
const {
  getBeef, 
  getAllBeefs,
  createBeef,
  deleteBeef,
  updateBeef, 
} = require('../controllers/BeefController'); 

beefRouter.get('/:id', getBeef);
beefRouter.get('/', getAllBeefs);
beefRouter.post('/', createBeef);
beefRouter.delete('/:id', deleteBeef);
beefRouter.patch('/:id', updateBeef);

module.exports = beefRouter;