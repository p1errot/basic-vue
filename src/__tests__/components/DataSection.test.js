import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import DataSection from '../../components/DataSection';

const localVue = createLocalVue()
localVue.use(Vuex);

describe('DataSection component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DataSection, {
      localVue,
      directives: { pin: jest.fn() },
      filters: { uppercase: jest.fn() },
      propsData: { term: 'something' }
    });
  });

  afterEach(() => {
    wrapper = undefined;
  });

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  describe('when update the term', () => {
    it('should not change if it is empty or equal', () => {
      wrapper.setMethods({ fetchData: jest.fn() });

      wrapper.setProps({ term: 'something' });
      expect(wrapper.vm.fetchData.mock.calls.length).toBe(0);

      wrapper.setProps({ term: '' });
      expect(wrapper.vm.fetchData.mock.calls.length).toBe(0);

      jest.resetAllMocks();
    });

    it('should call fetchData', () => {
      wrapper.setMethods({ fetchData: jest.fn() });
      wrapper.setProps({ term: 'new term' });

      expect(wrapper.vm.fetchData.mock.calls.length).toBe(1);
      expect(wrapper.vm.fetchData.mock.calls[0][0]).toEqual('new term');
    });
  });

  describe('handleScroll', () => {
    it('should update element class', () => {
      const element = {
        classList: {
          toggle: jest.fn()
        }
      };

      wrapper.vm.handleScroll('', element);
      expect(element.classList.toggle.mock.calls[0]).toEqual(['pinned', false]);
    });
  });

  describe('getData', () => {
    it('should fetch data and return a Promise', () => {
      window.fetch = jest.fn().mockResolvedValue({ json: jest.fn() });
      const dataPromise = wrapper.vm.getData('term');

      expect(window.fetch.mock.calls.length).toBe(1);
      expect(dataPromise).toEqual(Promise.resolve());
    });
  });

  describe('getImageData', () => {
    it('should fetch data and return a Promise', () => {
      window.fetch = jest.fn().mockResolvedValue({ json: jest.fn() });
      const dataPromise = wrapper.vm.getImageData('term');

      expect(window.fetch.mock.calls.length).toBe(1);
      expect(dataPromise).toEqual(Promise.resolve());
    });
  });

  describe('fetchData', () => {
    it('should update image and data', () => {
      const getData = jest.spyOn(wrapper.vm, 'getData');
      const getImageData = jest.spyOn(wrapper.vm, 'getImageData');

      getData.mockResolvedValue({ parse: { text: { '*': 'text' } } });
      getImageData.mockResolvedValue({ items: [{ link: 'image-link' }]});

      wrapper.vm.fetchData('term');

      expect(getData).toHaveBeenCalledTimes(1);
      expect(getImageData).toHaveBeenCalledTimes(1);
    });
  });
});
