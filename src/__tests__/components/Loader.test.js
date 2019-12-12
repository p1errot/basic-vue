import { mount, shallowMount } from "@vue/test-utils";
import Loader from '../../components/Loader';

describe('Loader component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Loader);
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('should have loader-cont element', () => {
    const wrapper = mount(Loader);
    const loaderContEl = wrapper.find('.loader-cont');

    expect(loaderContEl.exists()).toBe(true);
  });
});
