import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchFeaturesIfNeeded } from 'models/actions'
import Home from 'views/Home'

const mapStateToProps = (state, ownProps) => {
  const { features } = state
  return features;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFeatures: () => {
      dispatch(fetchFeaturesIfNeeded());
    }
  }
}

// note: withRouter will reload the component (Home).
// Such that the component state will be reset upon changing the source code under development,
// which defect the purpose of hot-reload.
// However, the state in Redux store will not be affected though.
export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Home));
// export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Home);
