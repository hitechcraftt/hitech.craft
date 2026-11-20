/* Hi-Tech Craft — product data (prices in ₹, from the catalog PDF) */
const CONTACT = {
  phone: '919061959693',
  phoneShow: '+91 90619 59693',
  email: 'hitechcraft.hc@gmail.com'
};

const PRODUCTS = [
  { id:'s-2x25', name:'Compact Cage', price:4999, size:'Small', cat:['small'],
    dims:['2 ft wide','2 ft deep','2.5 ft high'], imgs:['c12','c13','c11'],
    note:'Our most affordable cage, with a fully enclosed mesh top. Ideal for puppies and small breeds.' },
  { id:'s-3x3', name:'Small Cage', price:6800, size:'Small', cat:['small'],
    dims:['3 ft wide','3 ft high'], imgs:['c10'],
    note:'Roofed 3 ft cage with a latch door and easy-clean grid flooring.' },
  { id:'s-dbl', name:'Small Double Compartment', price:8199, size:'Small', cat:['small','double'],
    dims:['4 ft total width','2 ft per side'], imgs:['c25','c26'],
    note:'Two separate compartments with individual doors. Ideal for two small dogs or a rest/play split.' },
  { id:'m-3x3', name:'Medium Cage', price:9500, size:'Medium', cat:['medium'],
    dims:['3 ft wide','3 ft high'], imgs:['c06'],
    note:'Roofed medium cage with blue grid flooring and a built-in food door.' },
  { id:'h-s', name:'Hi-Tech Small Cage', price:11799, size:'Small', cat:['small','hitech'],
    dims:['3 ft wide','4 ft high'], imgs:['c27'],
    note:'Raised Hi-Tech build with a tiled-style roof, side panels and a tray beneath.' },
  { id:'l-4a', name:'Heavy Large Cage', price:13000, size:'Large', cat:['large'],
    dims:['4 ft wide','4 ft high'], imgs:['c07','c08'],
    note:'Roofed large cage with an inbuilt food door and long-lasting powder-black frame.' },
  { id:'l-4b', name:'Large Cage 4×4', price:13999, size:'Large', cat:['large'],
    dims:['4 ft wide','4 ft high'], imgs:['c21','c22'],
    note:'Spacious roofed large cage with sturdy mesh walls and a food bowl door.' },
  { id:'l-3d', name:'Large Cage with Drainage', price:13999, size:'Large', cat:['large','drainage'],
    dims:['3 ft wide','4 ft high','Drainage tray'], imgs:['c23'],
    note:'Large cage with a drainage facility under the floor, so cleaning is quick and hygienic.' },
  { id:'l-4c', name:'Large Cage Classic', price:14000, size:'Large', cat:['large'],
    dims:['4 ft wide','4 ft deep','4 ft high'], imgs:['c09'],
    note:'Full 4×4×4 ft roomy cage with a side access door.' },
  { id:'l-4d', name:'Large 4×4 with Drainage', price:14999, size:'Large', cat:['large','drainage'],
    dims:['4 ft wide','4 ft deep','5 ft high','Drainage tray'], imgs:['c18'],
    note:'Tall 5 ft cage with a drainage facility and an inbuilt food door.' },
  { id:'l-5a', name:'Large 5×4 Cage', price:15500, size:'Large', cat:['large'],
    dims:['5 ft wide','4 ft deep','5 ft high'], imgs:['c24'],
    note:'Extra width for big breeds, with a roomy 5 ft interior height.' },
  { id:'l-4e', name:'Large Cage Standard', price:15800, size:'Large', cat:['large'],
    dims:['4 ft wide','4 ft high'], imgs:['c01'],
    note:'Bar-front design with a mesh side wall, roof and a built-in food door.' },
  { id:'l-5b', name:'Large 5×4 with Drainage', price:17499, size:'Large', cat:['large','drainage'],
    dims:['5 ft wide','4 ft deep','5 ft high','Drainage tray'], imgs:['c16','c17'],
    note:'Our biggest drainage model: generous floor space and a pull-out tray for easy cleaning.' },
  { id:'l-dbl', name:'Large Double Compartment', price:17799, size:'Large', cat:['large','double'],
    dims:['6 ft total width','3 ft per side','3 ft high'], imgs:['c19','c20'],
    note:'Two 3×3 ft compartments with their own doors, under one shared roof.' },
  { id:'h-4x6', name:'Hi-Tech Cage with Wheels', price:24999, size:'Large', cat:['large','hitech'],
    dims:['4 ft wide','6 ft high','Caster wheels','Access ramp'], imgs:['c14','c15'],
    note:'Gable-roof Hi-Tech cage on lockable caster wheels, with a ramp and under-floor tray.' },
  { id:'h-5x6', name:'Hi-Tech Gable Cage', price:25499, size:'Large', cat:['large','hitech'],
    dims:['5 ft wide','4 ft deep','6 ft high'], imgs:['c02','c03'],
    note:'Heavy-duty bar construction under a gable roof, with a built-in food door.' },
  { id:'h-lg', name:'Hi-Tech Large Cage', price:25500, size:'Large', cat:['large','hitech'],
    dims:['Large','Gable roof','Access ramp'], imgs:['c04','c05'],
    note:'Large Hi-Tech cage with mesh sides, a roof, a food door and an access ramp.' },
  { id:'l-red', name:'large red cage', price:18999, size:'Large', cat:['large'],
    dims:['5 ft high','5 ft long','4 ft wide'], imgs:['c29','c30'],
    note:'Large cage with a red sheet roof, red grid flooring and an access ramp, plus an inbuilt food door.' },
  { id:'l-blue', name:'Large cage with blue roof', price:17799, size:'Large', cat:['large'],
    dims:['6 ft high','4 ft long','4 ft wide'], imgs:['c31'],
    note:'Tall cage with a blue sheet gable roof, green grid flooring and a side food door.' },
  { id:'hd-dbl', name:'Hen & Duck Double Cage', price:17499, size:'Hen & Duck', cat:['birds','double'],
    dims:['6 ft high','4 ft long','2 ft wide','Double compartment'], imgs:['c32','c33','c34'],
    note:'Double compartment cage for hens and ducks, with a sheet roof, a water bucket feeder and a pull-out tray for easy cleaning.' }
  {
  id: 'cat-large',
  name: 'Cat Cage',
  price: 16999,
  size: 'Large',
  cat: ['large', 'cat'],
  dims: [
    '5 ft length',
    '4 ft width',
    '5 ft height'
  ],
  imgs: ['cat1', 'cat2'],
  note: 'Spacious large-size cat cage with a strong metal frame, secure mesh enclosure and easy-access door.',
  extraNote: 'Designed to provide cats with a comfortable and secure space. Spacious interior with durable construction and easy maintenance.'
}

{
  id: 'hitech-dog-large',
  name: 'Hi-Tech Dog Cage',
  price: 22999,
  size: 'Large',
  cat: ['large', 'hitech', 'dog'],
  dims: [
    '4 ft length',
    '3 ft width',
    '5 ft height'
  ],
  imgs: ['dog1', 'dog2', 'dog3'],
  note: 'Premium raised dog cage with a stylish tiled-style roof, strong metal frame and durable construction.',
  extraNote: 'Designed for comfortable outdoor use. Features a protective roof, secure enclosure, easy-access entrance and elevated flooring.'
}
];

const CATS = [
  ['all','All'], ['small','Small'], ['medium','Medium'], ['large','Large'],
  ['double','Double Compartment'], ['birds','Hen & Duck'], ['hitech','Hi-Tech'], ['drainage','Drainage']
];

const inr = n => '₹' + Number(n).toLocaleString('en-IN');
const wa = t => `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(t)}`;
const img = k => `img/${k}.jpg`;
