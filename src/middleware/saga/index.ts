import createSagaMiddleware from "redux-saga";
import { testSagaWatcher } from "./testWatcher";

const configureSagaMiddleware = () => {
  const sagaMiddleware = createSagaMiddleware();
  sagaMiddleware.run(testSagaWatcher);
  return sagaMiddleware;
};

export { configureSagaMiddleware };
