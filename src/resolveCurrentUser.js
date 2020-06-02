export default userFromRequest => {
  if (!userFromRequest) {
    return null
  }
  return Object.assign({ __IS_CURRENT__: true }, userFromRequest)
}
