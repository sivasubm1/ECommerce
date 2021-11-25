const taskReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "CREATE_TASKS":
      return { items: [...state.items, action.payload] };
    default:
      return state;
  }
};

export default taskReducer;

// const taskReducer = (state = null, action) => {
//   switch (action.type) {
//     case "CREATE_TASK":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export default taskReducer;
