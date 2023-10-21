const Creature = require('../model/Creature');

exports.create = (createData) => Creature.create(createData);

exports.getAll = () => Creature.find();

exports.singleCreature = (creatureId) => Creature.findById(creatureId).populate('votes');

exports.update = (creatureId, createData) => Creature.findByIdAndUpdate(creatureId, createData);

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);

exports.getMyCreatures = (ownerId) => Creature.find({ owner: ownerId }).populate('owner');

exports.addVotesToCreature = async (creatureId, userId) => {
  const creature = await this.singleCreature(creatureId);
  const isExistingInVotes = creature.votes.some((v) => v?.toString() === userId);

  if (isExistingInVotes) {
    return
  }

  creature.votes.push(userId);
  return creature.save();
}