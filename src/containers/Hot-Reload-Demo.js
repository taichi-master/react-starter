import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'

import * as actions from 'models/actions'
import HotReloadDemo from 'components/Hot-Reload-Demo'

const mapStateToProps = (state, ownProps) => {
  const { value } = state
  return {
    value
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setValue: (value) => {
      dispatch(actions.setValue(value));
    }
  }
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(HotReloadDemo));
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(HotReloadDemo);
