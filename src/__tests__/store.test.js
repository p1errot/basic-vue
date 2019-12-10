import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import storeConfig from '../store';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('vuex store should', () => {
  it('have state', () => {
    expect(storeConfig.state).toEqual( { loader: false } );
  });

  it('have mutations', () => {
    expect(storeConfig._mutations.toggleLoader).toBeDefined();
  });
});
