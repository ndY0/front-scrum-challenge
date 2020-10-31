import { applyMiddleware } from "redux";
import { configureSagaMiddleware } from "./saga";

const getMiddlewares = () => [applyMiddleware(configureSagaMiddleware())];

export { getMiddlewares };
