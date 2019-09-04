import React from "react"

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.initialValue || "" }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ value: this.props.initialValue || "" })
    }
  }

  onChange = e => {
    e.preventDefault()
    const { value } = e.target
    this.setState(
      {value},
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.value)
        }
      }
    )
  }

  render() {
    const {
      editMode,
      initialValue,
      tag,
      onChange,
      required,
      ...rest
    } = this.props

    const props = {
      ...rest,
      onChange: this.onChange,
      value: this.state.value,
      required
    }

    return React.createElement(tag, props)
  }
}