/**
 * vuex localSessionStorage plugin
 */

export default (store) => {

  let serialize = JSON.stringify,
    deserialize = JSON.parse,
    namespace = 'heatCloudState';

  const getState = () => {
    return deserialize(sessionStorage.getItem(namespace))
  };
  const setState = (state) => {
    sessionStorage.setItem(namespace, serialize(state));
  };

  let state = store.state;

  // 获取持久化的state
  store.replaceState(
    Object.assign(
      {},
      state,
      (() => {
        return getState() ? {app : getState()} : {}
      })()
    )
  );

  // 持久化state
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('app/')) {
      setState(state.app);
    }
  })
}
