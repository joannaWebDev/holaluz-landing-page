import { useEligibility } from '@/composables/useEligibility'
import { Client, SupplyPoint } from '@/types'

jest.mock('../data/supply-points.json', () => [
  { cups: '222222', invoiced_amount: '60', power: { p1: '8', p2: '15' } },
  { cups: '333333', invoiced_amount: '45', power: { p1: '9', p2: '18' } }
])

const mockedClient: Client = {
  full_name: 'John Doe',
  address: 'Calle Falsa 123',
  cups: '111111',
  role: 'customer',
  building_type: 'house'
}

const mockedSupplyPoint: SupplyPoint = {
  cups: '111111',
  tariff: '2.0A',
  invoiced_amount: '50',
  power: { p1: '10', p2: '20' },
  neighbors: ['222222', '333333']
}

describe('useEligibility', () => {
  it('returns Standard offer for clients with no neighbors', async () => {
    const client: Client = { ...mockedClient, building_type: 'house', cups: '321654' }
    const supplyPoint: SupplyPoint = {
      ...mockedSupplyPoint,
      cups: '345678',
      neighbors: [],
      power: { p1: '4200', p2: '4200' }
    }

    const result = await useEligibility(client, supplyPoint)

    expect(result).toBeNull()
  })

  it('calculates basic discount for eligible clients', async () => {
    const client: Client = { ...mockedClient, building_type: 'house', cups: '123456' }
    const supplyPoint: SupplyPoint = {
      ...mockedSupplyPoint,
      cups: '123456',
      neighbors: ['234567', '345678'],
      power: { p1: '5', p2: '20' }
    }

    const result = await useEligibility(client, supplyPoint)

    expect(result).toEqual({ offerType: 'Basic discount', discount: 5 })
  })

  it('calculates special discount for eligible clients with high total invoiced amount', async () => {
    const client: Client = { ...mockedClient, building_type: 'house', cups: '111111' }
    const supplyPoint: SupplyPoint = {
      ...mockedSupplyPoint,
      cups: '111111',
      neighbors: ['222222', '333333'],
      power: { p1: '10', p2: '20' }
    }

    const result = await useEligibility(client, supplyPoint)

    expect(result).toEqual({ offerType: 'Special discount', discount: 12 })
  })
})
