import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import GoalDragWrapper from './goal-drag-wrapper';

const mapStateToProps = (state, props) => {
  let stories = [];
  const storyIds = props.goal.cards || [];

  storyIds.forEach(id => {
    const story = state.stories.entities.find(x => x.id === id);

    if (story) {
      stories.push(story);
    }
  });

  return {
    stories,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onDelete: () => dispatch(actions.deleteGoal(props.goal.id)),
});

const GoalConnector = connect(mapStateToProps, mapDispatchToProps)(
  GoalDragWrapper,
);

export default GoalConnector;
