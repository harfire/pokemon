const action = () => ({
  increment(state) {
    return { count: state.count + 1 };
  }
});

export default action;
