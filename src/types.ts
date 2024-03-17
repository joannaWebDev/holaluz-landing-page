export interface Client {
  full_name: string
  address: string
  cups: string
  role: string
  building_type: string
}

export interface SupplyPoint {
  cups: string
  tariff: string
  invoiced_amount: string
  power: {
    p1: string
    p2: string
  }
  neighbors: string[]
}

export interface CombinedClientSupplyPoint extends Client {
  supplyPoint: SupplyPoint
}

export interface OfferDetails {
  offerType: string
  discount: number
}
