import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { ref } from 'vue'

import ClientOffer from '@/components/ClientOffer.vue'

jest.mock('@/composables/useClientsAndSupply', () => {
  return {
    useClientsAndSupply: jest.fn(() => ({
      clients: ref([]),
      // To be able to simulate the loading, we mock the searchClient function to return a promise that resolves after 100ms
      searchClient: jest.fn().mockResolvedValue(new Promise(resolve => setTimeout(resolve, 100)))
    }))
  }
})

describe('ClientOffer', () => {
  beforeEach(() => jest.clearAllMocks())

  it('displays the SearchInput component', () => {
    render(ClientOffer)

    expect(screen.getByPlaceholderText('Enter CUPS (supply point identifier number)')).toBeInTheDocument()
  })

  it('displays loading state during search if connection is slow', async () => {
    render(ClientOffer)

    await userEvent.type(screen.getByPlaceholderText('Enter CUPS (supply point identifier number)'), '123456')
    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('Searching...')).toBeInTheDocument()
    })
  })

  it('displays error for invalid CUPS value', async () => {
    render(ClientOffer)

    await userEvent.type(screen.getByPlaceholderText('Enter CUPS (supply point identifier number)'), '123')
    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid CUPS value consisting of 6 digits.')).toBeInTheDocument()
    })
  })
})
