/* eslint-disable */
import mutations from '../../store/mutations';
import state from '../../store/state';

describe('Store mutations', () => {
  it('toggleLoader should update state', () => {
    const userState = { ...state };

    mutations.toggleLoader(userState, true);
    expect(userState.loader).toBeTruthy();

    mutations.toggleLoader(userState, false);
    expect(userState.loader).toBeFalsy();

    const prevState = userState.loader;
    mutations.toggleLoader(userState);
    expect(userState.loader).toBe(!prevState);
  });
});
