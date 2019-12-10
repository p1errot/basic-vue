import state from '../../store/state';

describe('Store state', () => {
  it('should have loader', () => {
    expect(state).toEqual({ loader: false });
  });
});
