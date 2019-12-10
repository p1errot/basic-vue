import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "../App";
import storeDefault from "../store";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("App component", () => {
  it("is a Vue instance", () => {
    const store = new Vuex.Store({
      ...storeDefault,
      mutations: {
        toggleLoader: jest.fn()
      }
    });

    const wrapper = shallowMount(App, { store, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe('updateTerm should', () => {
    let store;
    let wrapper;

    beforeEach(() => {
      store = new Vuex.Store({
        ...storeDefault,
        mutations: {
          toggleLoader: jest.fn()
        }
      });

      wrapper = shallowMount(App, { store, localVue });
    });

    afterEach(() => {
      store = undefined;
      wrapper = undefined;
      jest.clearAllMocks();
    });

    it('change term', () => {
      const instance = wrapper.vm;
      const prevTerm = instance.term;

      instance.updateTerm('some');
      const nextTerm = instance.term;

      expect(nextTerm).not.toEqual(prevTerm);

      instance.updateTerm('some');
      expect(nextTerm).toEqual(nextTerm);
    });

    it('call toggleLoader', () => {
      const instance = wrapper.vm;
      const spy = jest.spyOn(instance, 'toggleLoader');
      instance.updateTerm('some');

      expect(spy).toHaveBeenCalled();
    });
  });

  it('toggleLoader should update the loader state', () => {
    const store = new Vuex.Store({
      ...storeDefault,
      mutations: {
        toggleLoader: jest.fn()
      }
    });

    const wrapper = shallowMount(App, { store, localVue });
    const instance = wrapper.vm;
    const spy = jest.spyOn(instance.$store, 'commit');
    instance.toggleLoader();

    expect(spy).toHaveBeenCalled();
  })
});
