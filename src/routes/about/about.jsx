import React from 'react'
import { logLoading } from '../../utils'

logLoading( 'about' )

// console.log( 'load About' )

// export default class About extends React.PureComponent {
//   render () {
//     return (
//       <div className="about">
//         <h1>About...</h1>
//         <h1>Lazy Loading</h1>

//         <HotReloadDemo>
//           All the states should be maintained even the content of this page has been changed.
//         </HotReloadDemo>

//       </div>
//     )
//   }
// }

// Prefer React.PureComponent then pure function, otherwise findRenderedComponentWithType from react-dom/test-utils won't work.

export default class About extends React.PureComponent {

  hints

  // In order for React class component to work, add a dummy empty field called 'hints' into the class. 

  render () {
    return (
      <div className="about">
        <h1>About...</h1>
        <input type="text" />
        <h1>Lazy Loading Not Working</h1>
      </div>
    )
  }
}

// export function About () {
//   return (
//     <div className="about">
//       <h1>About...</h1>
//       <h1>FIXME: Lazy Loading Not Working</h1>
//     </div>
//   )
// }