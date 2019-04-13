import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Foo extends Component {
  componentDidMount () {
    const { onMountCallback } = this.props
    onMountCallback()
  }

  render () {
    const { currentUser } = this.props
    const { email } = currentUser
    return (
      <div>
        I am connected with
        {email}
        !
      </div>
    )
  }
}

Foo.defaultProps = {
  onMountCallback: () => {}
}

Foo.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onMountCallback: PropTypes.func
}

export default Foo
