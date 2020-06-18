const getters = {
  sidebar: state => state.app.sidebar,
  currentActivePath: state => state.app.currentActivePath,
  device: state => state.app.device,
  token: state => state.app.token,
  avatar: state => state.app.avatar,
  name: state => state.app.name,
  userInfo: state => state.app.userInfo
}
export default getters
