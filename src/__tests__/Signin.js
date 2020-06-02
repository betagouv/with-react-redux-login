import PropTypes from 'prop-types'
import { PureComponent } from 'react'

class Signin extends PureComponent {
  componentDidMount() {
    const { onMountCallback } = this.props
    onMountCallback()
  }

  render() {
    return null
  }
}

Signin.defaultProps = {
  onMountCallback: () => {},
}

Signin.propTypes = {
  onMountCallback: PropTypes.func,
}

export default Signin
