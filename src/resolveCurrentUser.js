export default (userFromRequest, previousUser) => {
  if (!userFromRequest) {
    return null
  }
  return {
    __IS_CURRENT__: true,
    ...previousUser,
    ...userFromRequest
  }
}
