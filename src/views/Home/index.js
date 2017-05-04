import React from 'react'
import style from './style.scss'

import HotReloadDemo from 'containers/Hot-Reload-Demo'

const pkg = require("json-loader!package.json");

console.log('load Home');

export default class Home extends React.Component {

  componentDidMount () {
    const { getFeatures } = this.props;
    getFeatures();
  }

  render () {
    const { isFetching, features } = this.props;

    return (
      <div className="home">
        <h1>Home...</h1>
        <h1 className="project">{pkg.name}</h1>

        <section className="Redux">
          <h1>Redux Async Action</h1>
          <ul>
            <lh><span>Features</span></lh>
            {
              isFetching ?
                <li>Loading...</li>
              :
                features.map((feature, i) => (<li key={i}>{feature}</li>))
            }
          </ul>
        </section>

        <HotReloadDemo>
          Only Redux store state is maintained due to the fact that the withRouter (found in src/containers/Home.js) reloads the whole component whenever hot-reload kicks in.
        </HotReloadDemo>

      </div>
    );
  }
}
