import { ref } from 'vue'

import { useEligibility } from '@/composables/useEligibility'
import { Client, SupplyPoint } from '@/types'

export function useClientsAndSupply() {
  const clients = ref<Client[]>([])
  const supplyPoints = ref<SupplyPoint[]>([])

  // Fetch supply point data
  const fetchSupplyPointData = async () => {
    const supplyDataModule = await import('../data/supply-points.json')
    supplyPoints.value = supplyDataModule.default
  }

  const searchClient = async (cups: string) => {
    const normalizedInput = cups.trim().toLowerCase()

    // Ensure supply point data is loaded
    if (supplyPoints.value.length === 0) {
      await fetchSupplyPointData()
    }

    const dataModule = await import('../data/clients.json')
    const clientsData = dataModule.default

    const client = clientsData.find((client: Client) => client.cups.toLowerCase() === normalizedInput)
    const supplyPoint = supplyPoints.value.find((sp: SupplyPoint) => sp.cups.toLowerCase() === normalizedInput)

    if (client && supplyPoint) {
      const offerDetails = await useEligibility(client, supplyPoint)
      const combinedData = { ...client, supplyPoint, offerDetails }
      clients.value = [combinedData]
    } else {
      clients.value = []
    }
  }

  return { clients, searchClient }
}
