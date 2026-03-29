export const DEFAULT_BUILD = {
  build_name: '',
  case_color: 'Black',
  cpu: 'Intel i5',
  gpu: 'RTX 4060',
  ram: '16GB',
  storage: '512GB SSD',
  cooling: 'Air Cooling',
  rgb: false
}

export const CASE_COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Silver']

export const CPU_OPTIONS = [
  { label: 'Intel i5', price: 200 },
  { label: 'Intel i7', price: 320 },
  { label: 'Intel i9', price: 480 },
  { label: 'AMD Ryzen 5', price: 190 },
  { label: 'AMD Ryzen 7', price: 310 },
  { label: 'AMD Ryzen 9', price: 470 }
]

export const GPU_OPTIONS = [
  { label: 'RTX 4060', price: 300 },
  { label: 'RTX 4070', price: 550 },
  { label: 'RTX 4080', price: 850 },
  { label: 'RX 7700 XT', price: 450 },
  { label: 'RX 7800 XT', price: 620 },
  { label: 'No dedicated GPU', price: 0 }
]

export const RAM_OPTIONS = [
  { label: '8GB', price: 35 },
  { label: '16GB', price: 60 },
  { label: '32GB', price: 110 },
  { label: '64GB', price: 220 },
  { label: '128GB', price: 420 }
]

export const STORAGE_OPTIONS = [
  { label: '256GB SSD', price: 30 },
  { label: '512GB SSD', price: 50 },
  { label: '1TB SSD', price: 90 },
  { label: '2TB SSD', price: 160 },
  { label: '4TB SSD', price: 290 }
]

export const COOLING_OPTIONS = [
  { label: 'Air Cooling', price: 40 },
  { label: 'Liquid Cooling', price: 120 },
  { label: 'Premium Liquid Cooling', price: 180 }
]

export const RGB_OPTIONS = [
  { label: 'Off', value: false, price: 0 },
  { label: 'On', value: true, price: 35 }
]
