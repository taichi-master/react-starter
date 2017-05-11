import React from 'react'

// import style from './style.scss'
import HotReloadDemo from 'containers/Hot-Reload-Demo'

console.log('load About');

export default class About extends React.PureComponent {
  render () {
    return (
      <div className="about">
        <h1>About...</h1>
        <h1>Lazy Loading</h1>

        <HotReloadDemo>
          All the states should be maintained even the content of this page has been changed.
        </HotReloadDemo>

      </div>
    )
  }
}

// Prefer React.PureComponent then pure function, otherwise findRenderedComponentWithType from react-dom/test-utils won't work.

// const About = () => (
//   <div className="about">
//     <h1>About...</h1>
//     <h1>Lazy Loading</h1>
//
//     <HotReloadDemo>
//       All the states should be maintained even the content of this page has been changed.
//     </HotReloadDemo>
//
//   </div>
// );
//
// export default About;
