import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  COMMON_REQUEST_SEARCH_BEGIN,
  COMMON_REQUEST_SEARCH_SUCCESS,
  COMMON_REQUEST_SEARCH_FAILURE,
  COMMON_REQUEST_SEARCH_DISMISS_ERROR,
} from 'src/features/common/redux/constants';

import {
  requestSearch,
  dismissRequestSearchError,
  reducer,
} from 'src/features/common/redux/requestSearch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/requestSearch', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestSearch succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestSearch())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_REQUEST_SEARCH_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_REQUEST_SEARCH_SUCCESS);
      });
  });

  it('dispatches failure action when requestSearch fails', () => {
    const store = mockStore({});

    return store.dispatch(requestSearch({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_REQUEST_SEARCH_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_REQUEST_SEARCH_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestSearchError', () => {
    const expectedAction = {
      type: COMMON_REQUEST_SEARCH_DISMISS_ERROR,
    };
    expect(dismissRequestSearchError()).to.deep.equal(expectedAction);
  });

  it('handles action type COMMON_REQUEST_SEARCH_BEGIN correctly', () => {
    const prevState = { requestSearchPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_REQUEST_SEARCH_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestSearchPending).to.be.true;
  });

  it('handles action type COMMON_REQUEST_SEARCH_SUCCESS correctly', () => {
    const prevState = { requestSearchPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_REQUEST_SEARCH_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestSearchPending).to.be.false;
  });

  it('handles action type COMMON_REQUEST_SEARCH_FAILURE correctly', () => {
    const prevState = { requestSearchPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_REQUEST_SEARCH_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestSearchPending).to.be.false;
    expect(state.requestSearchError).to.exist;
  });

  it('handles action type COMMON_REQUEST_SEARCH_DISMISS_ERROR correctly', () => {
    const prevState = { requestSearchError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_REQUEST_SEARCH_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestSearchError).to.be.null;
  });
});
