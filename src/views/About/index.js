import React from 'react'

// import style from './style.scss'
import HotReloadDemo from 'containers/Hot-Reload-Demo'

console.log('load About');
// <HotReloadDemo>
//   All the states should be maintained even the content of this page has been changed.
// </HotReloadDemo>

export default () => (
  <div className="about">
    <h1>About...</h1>
    <h1>Lazy Loading</h1>

    <HotReloadDemo>
      All the states should be maintained even the content of this page has been changed.
    </HotReloadDemo>

  </div>
);
