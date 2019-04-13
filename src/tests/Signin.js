import PropTypes from 'prop-types'
import { Component } from 'react'

export class Signin extends Component {
  componentDidMount () {
    const { onMountCallback } = this.props
    onMountCallback()
  }

  render () {
    return null
  }
}

Signin.defaultProps = {
  onMountCallback: () => {}
}

Signin.propTypes = {
  onMountCallback: PropTypes.func
}

export default Signin
