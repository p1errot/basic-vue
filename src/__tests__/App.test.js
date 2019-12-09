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
});
