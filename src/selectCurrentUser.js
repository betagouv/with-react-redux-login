import { createSelector } from 'reselect'

export default createSelector(
  state => state.data.users,
  users => {
    if (!users) return
    return users.find(user => user && user.__IS_CURRENT__)
  }
)
