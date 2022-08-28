const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    addThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controller');

//set up get all and post at /api/thoughts
router
    .route('/:<userId>')
    .get(getAllThoughts)
    .post(addThought);

//set up get one, put, and remove at /api/thoughts/:id
router
    .route('/:<userId>')
    .get(getThoughtsById)
    .put(updateThought)
    .delete(removeThought);

module.exports = router;