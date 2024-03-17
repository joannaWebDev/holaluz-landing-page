import { useClientsAndSupply } from '@/composables/useClientsAndSupply'

// Mock data
const mockClientsData = [{ id: 1, cups: '123456', name: 'John Doe' }]
const mockSupplyPointsData = [{ id: 1, cups: '123456', address: '123 Main St' }]

const mockEligibility = {
  offerType: 'Special',
  discount: 10
}

// Mock imports
jest.mock('@/composables/useEligibility', () => ({
  useEligibility: jest.fn(() => Promise.resolve(mockEligibility))
}))

jest.mock('../data/clients.json', () => mockClientsData)
jest.mock('../data/supply-points.json', () => mockSupplyPointsData)

describe('useClientsAndSupply', () => {
  it('searches for a client and supply point by CUPS and combines the data', async () => {
    const { clients, searchClient } = useClientsAndSupply()

    await searchClient('123456')

    expect(clients.value).toHaveLength(1)
    expect(clients.value[0]).toEqual(
      expect.objectContaining({
        ...mockClientsData[0],
        supplyPoint: mockSupplyPointsData[0],
        offerDetails: mockEligibility
      })
    )
  })

  it('returns an empty array if no client or supply point is found', async () => {
    const { clients, searchClient } = useClientsAndSupply()

    await searchClient('654321')

    expect(clients.value).toHaveLength(0)
  })
})
