const caseColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Silver']

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

export function normalizeBuildInput(build) {
  return {
    build_name: String(build.build_name || '').trim(),
    case_color: build.case_color,
    cpu: build.cpu,
    gpu: build.gpu,
    ram: build.ram,
    storage: build.storage,
    cooling: build.cooling,
    rgb: build.rgb === true || build.rgb === 'true'
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

export function validateBuild(build) {
  if (!build.build_name) {
    return 'Build name is required.'
  }

  if (!caseColors.includes(build.case_color)) {
    return 'Selected case color is invalid.'
  }

  if (!prices.cpu[build.cpu] && prices.cpu[build.cpu] !== 0) {
    return 'Selected CPU is invalid.'
  }

  if (!prices.gpu[build.gpu] && prices.gpu[build.gpu] !== 0) {
    return 'Selected GPU is invalid.'
  }

  if (!prices.ram[build.ram] && prices.ram[build.ram] !== 0) {
    return 'Selected RAM option is invalid.'
  }

  if (!prices.storage[build.storage] && prices.storage[build.storage] !== 0) {
    return 'Selected storage option is invalid.'
  }

  if (!prices.cooling[build.cooling] && prices.cooling[build.cooling] !== 0) {
    return 'Selected cooling option is invalid.'
  }

  if (build.cpu === 'Intel i5' && ['RTX 4070', 'RTX 4080'].includes(build.gpu)) {
    return 'Intel i5 cannot be paired with RTX 4070 or RTX 4080 in this build.'
  }

  if (build.cpu === 'AMD Ryzen 5' && ['64GB', '128GB'].includes(build.ram)) {
    return 'Ryzen 5 cannot be paired with 64GB or 128GB RAM in this build tier.'
  }

  if (build.ram === '64GB' && !['Intel i7', 'Intel i9', 'AMD Ryzen 7', 'AMD Ryzen 9'].includes(build.cpu)) {
    return '64GB RAM requires Intel i7/i9 or AMD Ryzen 7/9.'
  }

  if (build.ram === '128GB' && !['Intel i9', 'AMD Ryzen 9'].includes(build.cpu)) {
    return '128GB RAM requires Intel i9 or AMD Ryzen 9.'
  }

  if (build.gpu === 'RTX 4080' && !['Intel i7', 'Intel i9', 'AMD Ryzen 7', 'AMD Ryzen 9'].includes(build.cpu)) {
    return 'RTX 4080 requires Intel i7/i9 or AMD Ryzen 7/9.'
  }

  if (build.gpu === 'No dedicated GPU' && ['Liquid Cooling', 'Premium Liquid Cooling'].includes(build.cooling)) {
    return 'Liquid cooling is not available without a dedicated GPU.'
  }

  if (build.case_color === 'White' && build.cooling === 'Premium Liquid Cooling') {
    return 'White cases are currently out of stock for premium liquid cooling.'
  }

  return null
}
