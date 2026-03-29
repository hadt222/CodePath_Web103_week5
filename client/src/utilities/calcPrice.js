const prices = {
  cpu: {
    'Intel i5': 200,
    'Intel i7': 320,
    'Intel i9': 480,
    'AMD Ryzen 5': 190,
    'AMD Ryzen 7': 310,
    'AMD Ryzen 9': 470
  },
  gpu: {
    'RTX 4060': 300,
    'RTX 4070': 550,
    'RTX 4080': 850,
    'RX 7700 XT': 450,
    'RX 7800 XT': 620,
    'No dedicated GPU': 0
  },
  ram: {
    '8GB': 35,
    '16GB': 60,
    '32GB': 110,
    '64GB': 220,
    '128GB': 420
  },
  storage: {
    '256GB SSD': 30,
    '512GB SSD': 50,
    '1TB SSD': 90,
    '2TB SSD': 160,
    '4TB SSD': 290
  },
  cooling: {
    'Air Cooling': 40,
    'Liquid Cooling': 120,
    'Premium Liquid Cooling': 180
  },
  rgb: {
    true: 35,
    false: 0
  }
}

export function calculatePrice(build) {
  return (
    prices.cpu[build.cpu] +
    prices.gpu[build.gpu] +
    prices.ram[build.ram] +
    prices.storage[build.storage] +
    prices.cooling[build.cooling] +
    prices.rgb[String(Boolean(build.rgb))]
  )
}
