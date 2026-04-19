export const destinationsMocks = [
  {
    id: 'dest-1',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      { src: 'https://loremflickr.com/248/152?random=1', description: 'Chamonix parliament building' },
      { src: 'https://loremflickr.com/248/152?random=2', description: 'Chamonix park' }
    ]
  },
  {
    id: 'dest-2',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman.',
    name: 'Geneva',
    pictures: []
  }
];

export const pointsMocks = [
  {
    id: 'point-0',
    basePrice: 1100,
    dateFrom: '2026-04-10T22:55:56.845Z',
    dateTo: '2026-04-11T11:22:13.375Z',
    destination: 'dest-1',
    isFavorite: false,
    offers: ['luggage-1'],
    type: 'taxi'
  },
  {
    id: 'point-1',
    basePrice: 800,
    dateFrom: '2026-04-12T10:00:00.000Z',
    dateTo: '2026-04-12T12:00:00.000Z',
    destination: 'dest-2',
    isFavorite: true,
    offers: [],
    type: 'train'
  }
];

export const offersMocks = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'luggage-1',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 'comfort-1',
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'meal-1',
        title: 'Add meal',
        price: 15
      },
      {
        id: 'seats-1',
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'train',
    offers: []
  }
];
