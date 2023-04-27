const express = require('express');

const router = express.Router();

router.get('/todos', (request, response) => {
	response.json({message: "All todos for now"});
});


router.post('/todos', (request, response) => {

});


router.get('/todo/:id', (request, response) => {

});


router.put('/todo/:id', (request, response) => {

});


module.exports = router;