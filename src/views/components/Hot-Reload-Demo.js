import React from 'react'
import PropTypes from 'prop-types'

const Textbox = ({value, onChange, children}) => (
  <label>
    <div>{children}</div>
    <input type="text" placeholder="type something here..." value={value} onChange={onChange}/>
  </label>
);

export default class HotReloadDemo extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      value1: props.value,
      value2: ''
    }

    this.onChange = e => {
      this.setState({value1: e.target.value}, () => {
        this.props.setValue(this.state.value1);
      });
    }
  }

  render () {

    return (
      <section className="hot-reload">
        <h1>Hot-Reload Demo. <span className="devOnly">(development only)</span></h1>
        <p className="instruction">To test hot-reload, type something in the textbox and then modify any content on this page.</p>
        <Textbox value={this.state.value1} onChange={this.onChange}>Redux Store State</Textbox>
        <Textbox value={this.state.value2} onChange={(e)=>this.setState({value2: e.target.value})}>React Component State</Textbox>
        <Textbox>HTML DOM State</Textbox>
        <p className="instruction">&#x0226A;Modify me here&#x0226B;</p>
        <p className="comment">
          {this.props.children}
        </p>
      </section>
    )
  }
}

HotReloadDemo.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.string
}
