import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actions from 'models/actions'
import Home from 'views/Home'

const mapStateToProps = (state, ownProps) => {
  const { features } = state
  return {
    isFetching: features.isFetching,
    features: features.contents
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFeatures: () => {
      dispatch(actions.fetchFeaturesIfNeeded());
    }
  }
}

// note: withRouter will reload the component (Home).
// Such that the component state will be reset upon changing the source code under development,
// which defect the purpose of hot-reload.
// However, the state in Redux store will not be affected though.
let container;
if (process.env.NODE_ENV === 'production')
  container = withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Home));
else  // Moreover withRouter doesn't work in Unit Testing.
  container = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Home);

export default container;
