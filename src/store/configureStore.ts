import { createStore } from "redux";
import { getReducers } from "../reducers";
import { getMiddlewares } from "../middleware";

const configureStore = () => {
  createStore(getReducers(), ...getMiddlewares());
};

export { configureStore };
