import embercoreImage from '../assets/embercore-real.jpg'
import frostbyteImage from '../assets/frostbyte-real.jpg'
import nebulaImage from '../assets/nebula-real.jpg'
import { calculatePrice } from '../utilities/calcPrice'

const rawPrebuiltBuilds = [
  {
    build_name: 'Frostbyte Elite',
    case_color: 'White',
    cpu: 'Intel i7',
    gpu: 'RTX 4060',
    ram: '32GB',
    storage: '1TB SSD',
    cooling: 'Air Cooling',
    rgb: true,
    image: frostbyteImage,
    tagline: 'A clean white tower for smooth 1440p gaming and streaming.',
    photoCredit: 'Andy Holmes',
    photoLink: 'https://unsplash.com/photos/black-and-blue-computer-tower-EOAKUQcsFIU'
  },
  {
    build_name: 'Embercore X',
    case_color: 'Red',
    cpu: 'AMD Ryzen 7',
    gpu: 'RX 7700 XT',
    ram: '32GB',
    storage: '2TB SSD',
    cooling: 'Liquid Cooling',
    rgb: true,
    image: embercoreImage,
    tagline: 'A fiery AMD-first setup with fast storage and liquid cooling.',
    photoCredit: 'Sadshah.',
    photoLink: 'https://unsplash.com/photos/red-and-black-computer-tower-cR0bLCSpGfw'
  },
  {
    build_name: 'Nebula Rush',
    case_color: 'Blue',
    cpu: 'Intel i7',
    gpu: 'RTX 4070',
    ram: '64GB',
    storage: '2TB SSD',
    cooling: 'Air Cooling',
    rgb: true,
    image: nebulaImage,
    tagline: 'A premium creator-and-gaming machine with extra memory headroom.',
    photoCredit: 'Ethan Cull',
    photoLink: 'https://unsplash.com/photos/black-gigabyte-computer-tower-R192FFk-rEU'
  },
  {
    build_name: 'Shadow Core',
    case_color: 'Black',
    cpu: 'AMD Ryzen 5',
    gpu: 'RTX 4060',
    ram: '16GB',
    storage: '1TB SSD',
    cooling: 'Air Cooling',
    rgb: false,
    image: frostbyteImage,
    tagline: 'A balanced entry build for esports, school, and everyday gaming.',
    photoCredit: 'Andy Holmes',
    photoLink: 'https://unsplash.com/photos/black-and-blue-computer-tower-EOAKUQcsFIU'
  },
  {
    build_name: 'Crimson Apex',
    case_color: 'Red',
    cpu: 'Intel i7',
    gpu: 'RTX 4070',
    ram: '32GB',
    storage: '2TB SSD',
    cooling: 'Liquid Cooling',
    rgb: true,
    image: embercoreImage,
    tagline: 'A high-tier Intel and RTX build made for demanding AAA sessions.',
    photoCredit: 'Sadshah.',
    photoLink: 'https://unsplash.com/photos/red-and-black-computer-tower-cR0bLCSpGfw'
  },
  {
    build_name: 'Blue Nova',
    case_color: 'Blue',
    cpu: 'AMD Ryzen 7',
    gpu: 'RX 7700 XT',
    ram: '64GB',
    storage: '1TB SSD',
    cooling: 'Air Cooling',
    rgb: true,
    image: nebulaImage,
    tagline: 'A roomy multitasking rig with AMD power and an eye-catching finish.',
    photoCredit: 'Ethan Cull',
    photoLink: 'https://unsplash.com/photos/black-gigabyte-computer-tower-R192FFk-rEU'
  },
  {
    build_name: 'Polar Pulse',
    case_color: 'White',
    cpu: 'AMD Ryzen 7',
    gpu: 'RTX 4060',
    ram: '32GB',
    storage: '512GB SSD',
    cooling: 'Air Cooling',
    rgb: true,
    image: frostbyteImage,
    tagline: 'A clean white setup with strong midrange performance and bright RGB.',
    photoCredit: 'Andy Holmes',
    photoLink: 'https://unsplash.com/photos/black-and-blue-computer-tower-EOAKUQcsFIU'
  }
]

export const PREBUILT_BUILDS = rawPrebuiltBuilds.map((build) => ({
  ...build,
  total_price: calculatePrice(build)
}))
