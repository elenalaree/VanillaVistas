const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts
} = require('../../controllers/thought-controller');

//set up get all and post at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

//set up get one, put, and delete at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;