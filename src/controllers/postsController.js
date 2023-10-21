const router = require('express').Router();
const creatureService = require('../services/creatureService');
const { isAuth } = require('./../middleware/authMiddleware');

// All posts
router.get('/all', async (req, res) => {
  const creatures = await creatureService.getAll().lean();

  res.render('post/all-posts', { creatures });
});

// Create posts
router.get('/create', isAuth, (req, res) => {
  res.render('post/create');
});

router.post('/create', async (req, res) => {
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };

  await creatureService.create(payload);
  res.redirect('/posts/all')
});

// Profile posts
router.get('/profile', isAuth, async (req, res) => {
  const { user } = req;

  const myCreatures = await creatureService.getMyCreatures(user?._id).lean();

  res.render('post/profile', { myCreatures });
});

// Details
router.get('/:creatureId/details', async (req, res) => {
  const { creatureId } = req.params;
  const creature = await creatureService.singleCreature(creatureId).lean();

  const { user } = req;
  const { owner } = creature;
  const isOwner = user?._id === owner.toString();
  const hasVoted = creature.votes?.some((v) => v?._id.toString() === user?._id);
  const joinedEmailOwners = creature.votes.map((v) => v.email).join(', ');

  res.render('post/details', { creature, isOwner, hasVoted, joinedEmailOwners });
});

// Edit
router.get('/:creatureId/edit', async (req, res) => {
  const { creatureId } = req.params;


  const creature = await creatureService.singleCreature(creatureId).lean();
  res.render('post/edit', { creature });
});

router.post('/:creatureId/edit', async (req, res) => {
  const { creatureId } = req.params;

  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };

  await creatureService.update(creatureId, payload);
  res.redirect(`/posts/${creatureId}/details`);
});

// Delete
router.get('/:creatureId/delete', async (req, res) => {
  const { creatureId } = req.params;

  await creatureService.delete(creatureId);
  res.redirect('/posts/all');
});

router.get('/:creatureId/vote', async (req, res) => {
  const { creatureId } = req.params;
  const { _id } = req.user;

  await creatureService.addVotesToCreature(creatureId, _id);

  res.redirect(`/posts/${creatureId}/details`);
})

module.exports = router;
