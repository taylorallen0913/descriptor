import { TEST } from '../actions/types';

const initialState = {
  test: true,
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        test: false,
      };
    default:
      return state;
  }
};

export default testReducer;
