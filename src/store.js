import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { default as createILSReducer } from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({
  name: 'BuddySystem',
});

/**
 *  Redux Store
 *  @returns {Object} store
 */
export function configureStore() {
  const store = createStore(
    createILSReducer(),
    composeEnhancers(applyMiddleware(thunk))
  );
  store.asyncReducers = {};
  return store;
}
