const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    addReaction,
    updateThought,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

//set up get all and post at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

//set up get one, put, and remove at /api/thoughts/:id
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

//set up routes for post and delete reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;