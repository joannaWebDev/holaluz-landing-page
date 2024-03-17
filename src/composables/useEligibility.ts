import { Client, SupplyPoint, OfferDetails } from '@/types'

// Fetch neighbor data based on CUPS and return an array of neighbor supply points
const fetchNeighborsData = async (neighborsCups: string[]): Promise<SupplyPoint[]> => {
  const allSupplyPoints: SupplyPoint[] = await import('../data/supply-points.json').then(module => module.default)
  return neighborsCups.map(cups => allSupplyPoints.find(sp => sp.cups === cups)).filter(Boolean) as SupplyPoint[]
}

// Determine eligibility and calculate the offer
export async function useEligibility(client: Client, supplyPoint: SupplyPoint): Promise<OfferDetails | null> {
  if (client.building_type !== 'house' || !supplyPoint.neighbors || supplyPoint.neighbors.length === 0) {
    return null // Not eligible
  }

  const neighbors: SupplyPoint[] = await fetchNeighborsData(supplyPoint.neighbors)
  const clientP1 = parseInt(supplyPoint.power.p1, 10)
  const clientP2 = parseInt(supplyPoint.power.p2, 10)
  const totalInvoicedAmount = neighbors.reduce((sum, { invoiced_amount }) => sum + parseFloat(invoiced_amount), 0)

  let offerType = 'Standard offer' // Default offer
  let discount = 0

  // The client is eligible for the Basic discount
  // only if all neighbors have lower p1 and p2 power values.
  const eligibleForBasic = neighbors.every(
    ({ power }) => parseInt(power.p1, 10) < clientP1 && parseInt(power.p2, 10) < clientP2
  )
  if (eligibleForBasic) {
    offerType = 'Basic discount'
    discount = 5
  }

  // Special discount conditions
  if (totalInvoicedAmount > 100) {
    offerType = 'Special discount'
    discount = 12
  }

  return { offerType, discount }
}
