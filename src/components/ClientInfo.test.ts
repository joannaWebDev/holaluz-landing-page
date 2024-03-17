import { render, screen, waitFor } from '@testing-library/vue'
import { ref } from 'vue'

import ClientInfo from '@/components/ClientInfo.vue'

jest.mock('@/composables/useClientsAndSupply', () => {
  return {
    useClientsAndSupply: jest.fn(() => ({
      clients: ref([]),
      searchClient: jest.fn().mockResolvedValue(void 0)
    }))
  }
})

describe('ClientInfo', () => {
  beforeEach(() => jest.clearAllMocks())

  it("renders client's basic information", async () => {
    const client = {
      full_name: 'John Doe',
      cups: '123456789',
      role: 'customer',
      address: '123 Main St',
      building_type: 'Apartment'
    }

    render(ClientInfo, {
      props: { client }
    })

    await waitFor(() => {
      {
        expect(screen.getByText(new RegExp(client.full_name))).toBeInTheDocument()
        expect(screen.getByText(new RegExp(client.cups))).toBeInTheDocument()
        expect(screen.getByText(new RegExp(client.cups))).toBeInTheDocument()
        expect(screen.getByText(new RegExp(client.address))).toBeInTheDocument()
        expect(screen.getByText(new RegExp(client.building_type))).toBeInTheDocument()
      }
    })
  })

  it('conditionally renders supply point information', async () => {
    const clientWithSupplyPoint = {
      full_name: 'Jane Doe',
      supplyPoint: {
        tariff: 'Standard',
        invoiced_amount: '100',
        power: { p1: '10', p2: '20' }
      }
    }

    render(ClientInfo, {
      props: { client: clientWithSupplyPoint }
    })

    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(`Invoiced Amount:.*${clientWithSupplyPoint.supplyPoint.invoiced_amount}`, 's'))
      ).toBeInTheDocument()
      expect(
        screen.getByText(new RegExp(`Power P1:.*${clientWithSupplyPoint.supplyPoint.power.p1}`, 's'))
      ).toBeInTheDocument()
      expect(
        screen.getByText(new RegExp(`Power P2:.*${clientWithSupplyPoint.supplyPoint.power.p2}`, 's'))
      ).toBeInTheDocument()
    })
  })

  it('conditionally renders offer details', () => {
    const clientWithOfferDetails = {
      full_name: 'John Doe',
      offerDetails: {
        offerType: 'Special',
        discount: '10%'
      }
    }

    render(ClientInfo, {
      props: { client: clientWithOfferDetails }
    })

    expect(screen.getByText(clientWithOfferDetails.offerDetails.offerType)).toBeInTheDocument()
    expect(screen.getByText(`${clientWithOfferDetails.offerDetails.discount}%`)).toBeInTheDocument()
  })
})
