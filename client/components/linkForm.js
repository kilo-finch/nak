import React, {Component} from 'react'

export default class LinkForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div>
        <form>
          <input name="title" defaultValue="" />
          <button type="submit" />
        </form>
      </div>
    )
  }
}
