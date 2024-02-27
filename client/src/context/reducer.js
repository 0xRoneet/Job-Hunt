export const actionType = {
  SET_USER: "SET_USER",
  SET_JOB: "SET_JOB",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_JOB:
      return {
        ...state,
        jobData: action.jobData,
      };
    default:
      return state;
  }
};

export default reducer;
