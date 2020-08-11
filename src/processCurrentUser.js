export default userFromRequest => {
  if (!userFromRequest) {
    return null
  }
  return {
    __IS_CURRENT__: true ,
    ...userFromRequest
  }
}
