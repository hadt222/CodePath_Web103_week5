export function validateBuild(build) {
  if (!build.build_name?.trim()) {
    return 'Build name is required.'
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
