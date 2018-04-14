const Goal = require('../models').goal;
const updateDataset = require('../scripts/update-dataset');

const _isCreateAction = action =>
  action.entity_type === 'story'
  && action.action === 'create';

const _isUpdateWorkflow = action =>
  action.entity_type === 'story'
  && action.action === 'update'
  && !!action.changes.workflow_state_id;

const _isArchived = action =>
  action.entity_type === 'story'
  && action.action === 'update'
  && !!action.changes.archived;

const update = (req, res) => Goal.all().then(goals => {
  res.status(200).send();

  const cards = goals
    .map(goal => goal.toJSON())
    .reduce((acc, goal) => {
      const cards = goal.cards || [];
      acc = [ ...acc, ...cards ];
      return acc;
    }, []);

  const updates = req.body.actions
    .filter(action => cards.includes(action.id))
    .filter(action =>
      _isCreateAction(action)
      || _isUpdateWorkflow(action)
      || _isArchived(action));

  if (updates.length) {
    updateDataset();
  }
});

module.exports = {
  update,
};