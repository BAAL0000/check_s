import { images } from './images'
import type { MarketRate, Product, Review } from '../types'

export { images }

export const FARM_PHONE_DISPLAY = '(555) 014-8200'
export const FARM_PHONE_E164 = '15550148200'
export const FARM_EMAIL = 'hello@greenacre.example'
export const FARM_ADDRESS = '1842 Meadow Ridge Road, Green Acre, sample town'
export const WHATSAPP_URL = `https://wa.me/${FARM_PHONE_E164}`

export const categoryLabels: Record<Product['category'], string> = {
  'live-birds': 'Live birds',
  'fresh-meat': 'Fresh meat',
  'farm-eggs': 'Farm eggs',
  wholesale: 'Wholesale',
  chicks: 'Chicks',
}

export const unitLabels: Record<Product['unit'], string> = {
  bird: 'per bird',
  kg: 'per kg',
  tray: 'per tray',
  dozen: 'per dozen',
  crate: 'per crate',
  carton: 'per carton',
  pack: 'per pack',
}

export const seedProducts: Product[] = [
  {
    id: 'p-broiler',
    name: 'Freedom Ranger broilers',
    slug: 'freedom-ranger-broilers',
    category: 'live-birds',
    description:
      'Pasture-raised table birds with firm meat and a slow, even finish. Sold live by the bird.',
    details:
      'These sample birds are listed around 2.0 to 2.4 kg live weight. Pickup is at the farm gate. A health check is completed before loading. Prices on this page are sample figures for the demo storefront.',
    image: images.liveBirds,
    imageAlt: 'Pasture chickens walking on grass at Green Acre Poultry Farm',
    unit: 'bird',
    samplePrice: 18.5,
    stock: 42,
    featured: true,
    tags: ['pasture', 'table bird', 'weekend pickup'],
  },
  {
    id: 'p-layers',
    name: 'Rhode Island Red layers',
    slug: 'rhode-island-red-layers',
    category: 'live-birds',
    description:
      'Point-of-lay hens selected for brown-egg production in small flocks and backyard coops.',
    details:
      'Sample listing for vaccinated, farm-reared layers. Buyers should confirm housing and feed plans before collection. All prices are sample data.',
    image: images.rhodeIsland,
    imageAlt: 'Rhode Island Red hen standing in a farmyard',
    unit: 'bird',
    samplePrice: 24,
    stock: 18,
    featured: true,
    tags: ['layers', 'brown eggs', 'backyard'],
  },
  {
    id: 'p-country',
    name: 'Dual-purpose country birds',
    slug: 'dual-purpose-country-birds',
    category: 'live-birds',
    description:
      'Hardy mixed flock birds suited to mixed meat and egg use on small holdings.',
    details:
      'These sample birds are not a pedigree strain. They are listed to show how mixed farm stock can appear in the shop. Sample price only.',
    image: images.countryBirds,
    imageAlt: 'Mixed farm chickens gathered near a coop',
    unit: 'bird',
    samplePrice: 16.75,
    stock: 27,
    featured: false,
    tags: ['hardy', 'mixed use'],
  },
  {
    id: 'p-barred',
    name: 'Heritage Barred Rocks',
    slug: 'heritage-barred-rocks',
    category: 'live-birds',
    description:
      'Classic barred plumage birds for keepers who want a calm, dual-purpose flock.',
    details:
      'Sample heritage listing. Availability is limited and shown as demo stock. Confirm collection windows on the Contact page.',
    image: images.barredRocks,
    imageAlt: 'Barred Rock chickens foraging outdoors',
    unit: 'bird',
    samplePrice: 28,
    stock: 9,
    featured: false,
    tags: ['heritage', 'calm flock'],
  },
  {
    id: 'p-chicks',
    name: 'Day-old mixed chicks',
    slug: 'day-old-mixed-chicks',
    category: 'chicks',
    description:
      'Warm-room started mixed chicks for growers restocking small batches.',
    details:
      'Sample hatch listing. Chicks are shown in boxes of 10. This demo does not process live-animal shipping. Local pickup only in the sample workflow.',
    image: images.chicks,
    imageAlt: 'Yellow day-old chicks gathered under a heat lamp',
    unit: 'pack',
    samplePrice: 32,
    stock: 14,
    featured: true,
    tags: ['hatch', 'starter pack'],
  },
  {
    id: 'p-whole',
    name: 'Whole dressed chicken',
    slug: 'whole-dressed-chicken',
    category: 'fresh-meat',
    description:
      'Air-chilled whole birds, packed for family roasts. Sold by the kilogram.',
    details:
      'Sample meat cut from the farm processing room. Keep chilled and cook thoroughly. Weights on the product card are for demonstration.',
    image: images.wholeChicken,
    imageAlt: 'Raw whole chicken prepared on a kitchen board',
    unit: 'kg',
    samplePrice: 7.4,
    stock: 36,
    featured: true,
    tags: ['roast', 'family pack'],
  },
  {
    id: 'p-pieces',
    name: 'Bone-in mixed pieces',
    slug: 'bone-in-mixed-pieces',
    category: 'fresh-meat',
    description:
      'A balanced mix of thighs, drums, and breast portions for weekday cooking.',
    details:
      'Sample mixed-piece pack. Ideal for stews and grilling. All weights and prices are labeled sample data.',
    image: images.chickenPieces,
    imageAlt: 'Seasoned raw chicken pieces arranged for cooking',
    unit: 'kg',
    samplePrice: 6.9,
    stock: 48,
    featured: true,
    tags: ['stew', 'grill'],
  },
  {
    id: 'p-breast',
    name: 'Boneless breast fillets',
    slug: 'boneless-breast-fillets',
    category: 'fresh-meat',
    description:
      'Skinless fillets trimmed for quick cooking. Sold by the kilogram.',
    details:
      'Sample fillet listing. Not a vacuum-sealed commercial brand. Handle as fresh poultry and keep below 4°C in the demo guidance.',
    image: images.breastFillets,
    imageAlt: 'Raw chicken breast fillets on a wooden board',
    unit: 'kg',
    samplePrice: 9.25,
    stock: 22,
    featured: false,
    tags: ['fillet', 'weekday meals'],
  },
  {
    id: 'p-drums',
    name: 'Drumsticks and thighs pack',
    slug: 'drumsticks-and-thighs-pack',
    category: 'fresh-meat',
    description:
      'Dark-meat pack for roasting trays and outdoor cooking.',
    details:
      'Sample pack size is about 1.5 kg. Price is per pack and clearly marked as a sample figure.',
    image: images.drumsticks,
    imageAlt: 'Cooked chicken drumsticks on a serving board',
    unit: 'pack',
    samplePrice: 11.5,
    stock: 19,
    featured: false,
    tags: ['dark meat', 'tray bake'],
  },
  {
    id: 'p-dozen',
    name: 'Farm-fresh mixed dozen',
    slug: 'farm-fresh-mixed-dozen',
    category: 'farm-eggs',
    description:
      'A dozen mixed-size eggs collected the same morning from the layer house.',
    details:
      'Sample egg listing. Shell color varies. Store chilled. Prices are sample only and not a live market quote.',
    image: images.mixedEggs,
    imageAlt: 'Brown and white farm eggs in a rustic bowl',
    unit: 'dozen',
    samplePrice: 4.8,
    stock: 80,
    featured: true,
    tags: ['breakfast', 'same-day collect'],
  },
  {
    id: 'p-tray',
    name: 'Brown layer egg tray',
    slug: 'brown-layer-egg-tray',
    category: 'farm-eggs',
    description:
      'Thirty brown eggs in a pulp tray for households and small cafes.',
    details:
      'Sample tray of 30. Grade is mixed large and extra-large for demonstration. Not a certified commercial grade.',
    image: images.brownEggs,
    imageAlt: 'Brown eggs nested in straw',
    unit: 'tray',
    samplePrice: 11.25,
    stock: 40,
    featured: true,
    tags: ['tray of 30', 'cafe'],
  },
  {
    id: 'p-jumbo',
    name: 'Jumbo breakfast eggs',
    slug: 'jumbo-breakfast-eggs',
    category: 'farm-eggs',
    description:
      'Larger breakfast eggs packed in a carton of twelve.',
    details:
      'Sample jumbo carton. Size banding is illustrative. Reviews and rates elsewhere on the site are also sample content.',
    image: images.jumboEggs,
    imageAlt: 'Close-up of brown eggs in a carton',
    unit: 'carton',
    samplePrice: 6.1,
    stock: 26,
    featured: false,
    tags: ['jumbo', 'carton'],
  },
  {
    id: 'p-pasture-eggs',
    name: 'Pasture egg carton',
    slug: 'pasture-egg-carton',
    category: 'farm-eggs',
    description:
      'Eggs from hens with daytime pasture access, packed in a twelve-egg carton.',
    details:
      'Sample pasture listing. Foraging conditions change with season. This is demonstration catalog copy.',
    image: images.pastureEggs,
    imageAlt: 'Eggs in a carton surrounded by hay',
    unit: 'carton',
    samplePrice: 6.75,
    stock: 33,
    featured: false,
    tags: ['pasture', 'carton of 12'],
  },
  {
    id: 'p-crate-birds',
    name: 'Wholesale broiler crate',
    slug: 'wholesale-broiler-crate',
    category: 'wholesale',
    description:
      'Ten live broilers in a farm crate for restaurants and bulk buyers.',
    details:
      'Sample wholesale unit. Minimum order is one crate in this demo. No transport contract is created by placing a sample order.',
    image: images.wholesaleFlock,
    imageAlt: 'Large flock of chickens in an open farm yard',
    unit: 'crate',
    samplePrice: 165,
    stock: 8,
    featured: true,
    tags: ['bulk', 'restaurant'],
  },
  {
    id: 'p-egg-flats',
    name: 'Wholesale egg flats',
    slug: 'wholesale-egg-flats',
    category: 'wholesale',
    description:
      'Five flats of 30 eggs each for bakeries, hotels, and market stalls.',
    details:
      'Sample bulk eggs. 150 eggs per order unit. Rates on the Market Rates page are sample snapshots, not live exchange data.',
    image: images.eggFlats,
    imageAlt: 'Stacked cartons of brown eggs ready for packing',
    unit: 'crate',
    samplePrice: 52,
    stock: 12,
    featured: false,
    tags: ['bakery', 'bulk eggs'],
  },
  {
    id: 'p-case-meat',
    name: 'Restaurant meat case pack',
    slug: 'restaurant-meat-case-pack',
    category: 'wholesale',
    description:
      'A mixed case of dressed poultry portions sized for kitchen prep.',
    details:
      'Sample case weight is about 10 kg. This demo does not include cold-chain booking or invoicing software.',
    image: images.meatCase,
    imageAlt: 'Raw chicken portions packed for kitchen use',
    unit: 'pack',
    samplePrice: 68,
    stock: 6,
    featured: false,
    tags: ['kitchen', 'case pack'],
  },
]

export const seedRates: MarketRate[] = [
  {
    id: 'r-broiler',
    item: 'Live broiler',
    unit: 'bird',
    sampleRate: 18.5,
    change: 0.4,
    notes: 'Sample farm-gate figure for 2.2 kg class birds.',
    updatedAt: '2026-10-18',
  },
  {
    id: 'r-dressed',
    item: 'Dressed whole bird',
    unit: 'kg',
    sampleRate: 7.4,
    change: -0.15,
    notes: 'Sample retail counter rate. Not a live commodity feed.',
    updatedAt: '2026-10-18',
  },
  {
    id: 'r-pieces',
    item: 'Mixed pieces',
    unit: 'kg',
    sampleRate: 6.9,
    change: 0.1,
    notes: 'Sample butcher-counter rate.',
    updatedAt: '2026-10-18',
  },
  {
    id: 'r-eggs-dozen',
    item: 'Mixed farm eggs',
    unit: 'dozen',
    sampleRate: 4.8,
    change: 0.2,
    notes: 'Sample dozen price after morning collection.',
    updatedAt: '2026-10-19',
  },
  {
    id: 'r-eggs-tray',
    item: 'Brown egg tray',
    unit: 'tray of 30',
    sampleRate: 11.25,
    change: 0,
    notes: 'Sample tray rate for cafe buyers.',
    updatedAt: '2026-10-19',
  },
  {
    id: 'r-chicks',
    item: 'Day-old chicks',
    unit: 'pack of 10',
    sampleRate: 32,
    change: -1,
    notes: 'Sample hatch-week figure. Not a booking confirmation.',
    updatedAt: '2026-10-17',
  },
  {
    id: 'r-wholesale-crate',
    item: 'Broiler crate (10 birds)',
    unit: 'crate',
    sampleRate: 165,
    change: 2.5,
    notes: 'Sample wholesale crate. Volume discounts are illustrative.',
    updatedAt: '2026-10-18',
  },
]

export const seedReviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Mara Ellison',
    role: 'Sample household customer',
    quote:
      'The egg trays arrived labeled clearly and the birds looked lively at pickup. This is a sample review written for the demo site.',
    rating: 5,
  },
  {
    id: 'rev-2',
    name: 'Jonah Reed',
    role: 'Sample cafe buyer',
    quote:
      'We used the wholesale egg flats for weekend brunch service in this story. Sample feedback only — not a verified purchase.',
    rating: 4,
  },
  {
    id: 'rev-3',
    name: 'Priya Nandakumar',
    role: 'Sample backyard keeper',
    quote:
      'The layer hens settled quickly in our coop in this sample testimonial. Ratings here are illustration, not live scores.',
    rating: 5,
  },
]

export const faqs = [
  {
    q: 'Are the prices on this website real?',
    a: 'No. Every price, market rate, and review is labeled as sample data for this demo storefront. Nothing is billed.',
  },
  {
    q: 'Do you process card payments?',
    a: 'No. Checkout stores a sample order in your browser only. There is no payment gateway, invoice, or bank transfer.',
  },
  {
    q: 'Can I buy live birds from this demo?',
    a: 'This site does not complete live-animal sales. Use the sample cart to see how a farm shop could work, then contact a real farm independently.',
  },
  {
    q: 'How is delivery shown?',
    a: 'Delivery windows on the Home and Services pages are sample schedules for a local radius. No driver is dispatched from this demo.',
  },
  {
    q: 'Where is stock stored?',
    a: 'Product stock, orders, and rates live in browser storage on this device. Clearing site data resets the catalog to the seed list.',
  },
  {
    q: 'Is the admin dashboard a real back office?',
    a: 'It is a local demo. There is no login, staff account, or server. Changes stay in this browser until you reset data.',
  },
]
