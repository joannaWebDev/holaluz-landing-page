import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { ref } from 'vue'

import { Client } from '@/types'
import HomeView from '@/views/HomeView.vue'

jest.mock('@/composables/useClientsAndSupply', () => ({
  useClientsAndSupply: jest.fn(() => {
    return {
      clients: ref<Client[]>([
        {
          full_name: 'Client Name',
          address: '123 Main St',
          cups: '123456',
          role: 'User',
          building_type: 'Apartment'
        }
      ])
    }
  })
}))

describe('HomeView', () => {
  it('shows the ClientOffer component after a valid search', async () => {
    render(HomeView)

    const searchButton = screen.getByRole('button', { name: 'check-eligibility' })
    await fireEvent.click(searchButton)

    await waitFor(() => {
      expect(screen.getByText('Client Name')).toBeInTheDocument()
    })
  })
})
