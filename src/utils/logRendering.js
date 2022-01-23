/* eslint-disable no-console */
export function logRendering ( component, ...args ) {
  return console.log( `✨ rendering comppnent %c${component}%c ✨`, 'font-size: 1.5em; text-transform: capitalize;', '', ...args )
}