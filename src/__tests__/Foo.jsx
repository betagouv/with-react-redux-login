import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

class Foo extends PureComponent {
  componentDidMount() {
    const { onMountCallback } = this.props
    onMountCallback()
  }

  render() {
    const { currentUser } = this.props
    const { email } = currentUser
    return (
      <div>
        {'I am connected with'}
        {email}
        {'!'}
      </div>
    )
  }
}

Foo.defaultProps = {
  onMountCallback: () => {},
}

Foo.propTypes = {
  currentUser: PropTypes.shape({
    __IS_CURRENT__: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onMountCallback: PropTypes.func,
}

export default Foo
