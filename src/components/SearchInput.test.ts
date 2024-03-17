import { mount } from '@vue/test-utils'

import SearchInput from '@/components/SearchInput.vue'

describe('SearchInput', () => {
  beforeEach(() => jest.clearAllMocks())

  it('emits the search event with the correct query when the search button is clicked', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.find('input')
    const button = wrapper.find('button')

    // Simulate typing into the input
    await input.setValue('123456')
    // Simulate clicking the search button
    await button.trigger('click')

    // Check that the search event was emitted with the correct query
    expect(wrapper.emitted()).toHaveProperty('search')
    expect(wrapper.emitted('search')![0]).toEqual(['123456'])
  })

  it('emits the clear-error event when the input is modified', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.find('input')

    // Simulate typing into the input
    await input.setValue('123456')
    // Simulate modifying the input
    await input.setValue('654321')

    // Check that the clear-error event was emitted
    expect(wrapper.emitted()).toHaveProperty('clear-error')
  })
})
