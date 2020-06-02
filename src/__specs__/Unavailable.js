import PropTypes from 'prop-types'
import { PureComponent } from 'react'

class Unavailable extends PureComponent {
  componentDidMount() {
    const { onMountCallback } = this.props
    onMountCallback()
  }

  render() {
    return null
  }
}

Unavailable.defaultProps = {
  onMountCallback: () => {},
}

Unavailable.propTypes = {
  onMountCallback: PropTypes.func,
}

export default Unavailable
