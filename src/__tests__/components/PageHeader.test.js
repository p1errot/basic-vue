import { mount, shallowMount } from "@vue/test-utils";
import PageHeader from '../../components/PageHeader';

describe('PageHeader component', () => {
  let wrapper;
  const propsData = {
    image: 'link',
    items: [
      {
        id: 1,
        title: 'first title',
        active: false
      },
      {
        id: 2,
        title: 'second title',
        active: false
      },
    ]
  };

  beforeEach(() =>{
    wrapper = shallowMount(PageHeader, { propsData });
  });

  afterEach(() => {
    wrapper = undefined;
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('should emit onChangeItem when an item changes', () => {
    wrapper.setProps({
      items: [
        {
          id: 1,
          title: 'first title',
          active: false
        },
        {
          id: 2,
          title: 'second title',
          active: true
        },
      ]
    });

    expect(wrapper.emitted('onChangeItem').length).toBe(2);
  });

  it('should update item as active when click on it', () => {
    const component = mount(PageHeader, { propsData });
    const clickedItem = 1;
    const item = component.findAll('li').at(clickedItem);

    item.trigger('click');
    const eventEmitted = component.emitted('onChangeItem');

    expect(eventEmitted.length).toBe(2);
    expect(component.vm.items[clickedItem].active).toBe(true);
  });
});
