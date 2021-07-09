const taskReducer = (state = null, action) => {
  switch (action.type) {
    case "CREATE_TASK":
      return action.payload;
    default:
      return state;
  }
};

export default taskReducer;
