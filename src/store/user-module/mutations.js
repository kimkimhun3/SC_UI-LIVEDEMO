export default {
  getUserInfo: (state, { user, history }) => {
    state.user = { ...user, history };
  },
  setStopStream: (state) => {
    state.user.isStreaming = false
  }
};
