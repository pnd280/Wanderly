const mockData = [
  {
    id: 1,
    name: 'Tropical Beach Paradise',
    details: {
      description:
        'Experience the ultimate beach vacation in a tropical paradise, with crystal-clear waters, pristine white sand beaches, and luxurious beachfront villas. Enjoy a week of relaxation, adventure, and unforgettable memories.',
      duration: 7,
      guides: 2,
      accommodations: 'Beachfront villas',
      min: 10,
      max: 12,
    },
    price_per_person: 1500,
  },
  {
    id: 2,
    name: 'Snowy Mountain Getaway',
    details: {
      description:
        'Escape to a winter wonderland in the heart of the mountains, where you can enjoy skiing, snowboarding, and other winter sports. Stay at a luxury ski resort and unwind by the fireplace after a day on the slopes.',
      duration: 5,
      guides: 3,
      accommodations: 'Luxury ski resort',
      min: 5,
      max: 8,
    },
    price_per_person: 1200,
  },
  {
    id: 3,
    name: 'Ancient City Exploration',
    details: {
      description:
        'Step back in time and explore the rich history and culture of ancient cities. Visit iconic landmarks, museums, and archaeological sites, and learn about the civilizations that once thrived in these remarkable places.',
      duration: 8,
      guides: 2,
      accommodations: 'Historic boutique hotels',
      min: 6,
      max: 10,
    },
    price_per_person: 1800,
  },
  {
    id: 4,
    name: 'Wildlife Safari Adventure',
    details: {
      description:
        "Embark on an unforgettable wildlife safari adventure, where you'll have the opportunity to observe majestic animals in their natural habitat. Experience the thrill of game drives, guided walks, and birdwatching in some of the world's most renowned national parks and reserves.",
      duration: 10,
      guides: 4,
      accommodations: 'Luxury safari lodges',
      min: 4,
      max: 6,
    },
    price_per_person: 2500,
  },
  {
    id: 5,
    name: 'Culinary and Wine Tour',
    details: {
      description:
        "Indulge your senses on a culinary and wine tour, where you'll savor the flavors of local cuisine and sample world-class wines. Visit local markets, vineyards, and farms, and learn the art of cooking from expert chefs.",
      duration: 6,
      guides: 2,
      accommodations: 'Charming boutique hotels',
      min: 8,
      max: 12,
    },
    price_per_person: 2000,
  },
  {
    id: 6,
    name: 'Scenic Hiking Expedition',
    details: {
      description:
        'Discover breathtaking landscapes and challenge yourself on a scenic hiking expedition. Trek through diverse terrains, from lush forests to rugged mountains, and experience the beauty of nature up close.',
      duration: 7,
      guides: 3,
      accommodations: 'Eco-lodges and mountain huts',
      min: 4,
      max: 8,
    },
    price_per_person: 1700,
  },

  {
    id: 7,
    name: 'Desert Adventure Expedition',
    details: {
      description:
        'Embark on an exhilarating desert adventure, exploring vast sand dunes, unique rock formations, and ancient oases. Experience camel rides, off-road driving, and stargazing under the clear desert sky.',
      duration: 6,
      guides: 2,
      accommodations: 'Luxury desert camps',
      min: 6,
      max: 10,
    },
    price_per_person: 1600,
  },
  {
    id: 8,
    name: 'Island Hopping Cruise',
    details: {
      description:
        'Discover the beauty of multiple islands on an island-hopping cruise. Enjoy snorkeling, diving, and kayaking in crystal-clear waters, and relax on pristine beaches while soaking up the sun.',
      duration: 10,
      guides: 4,
      accommodations: 'Cruise ship cabins',
      min: 8,
      max: 16,
    },
    price_per_person: 2200,
  },
  {
    id: 9,
    name: 'Cultural City Tour',
    details: {
      description:
        "Immerse yourself in the vibrant culture of world-renowned cities. Visit iconic landmarks, museums, and galleries, and experience local cuisine, music, and festivals that showcase the city's unique character.",
      duration: 5,
      guides: 2,
      accommodations: 'Boutique city hotels',
      min: 6,
      max: 12,
    },
    price_per_person: 1300,
  },
  {
    id: 10,
    name: 'Rainforest Exploration',
    details: {
      description:
        'Venture into the heart of the rainforest and explore its diverse ecosystems. Encounter exotic wildlife, hike through lush vegetation, and learn about the importance of conservation efforts.',
      duration: 7,
      guides: 3,
      accommodations: 'Eco-lodges',
      min: 4,
      max: 8,
    },
    price_per_person: 1900,
  },
  {
    id: 11,
    name: 'Northern Lights Adventure',
    details: {
      description:
        'Experience the magic of the Northern Lights on a guided tour in the Arctic Circle. Enjoy snowshoeing, dog sledding, and other winter activities while marveling at the breathtaking aurora displays.',
      duration: 6,
      guides: 2,
      accommodations: 'Cozy cabins',
      min: 4,
      max: 6,
    },
    price_per_person: 2100,
  },
  {
    id: 12,
    name: 'Whale Watching Expedition',
    details: {
      description:
        "Join a thrilling whale watching expedition, where you'll have the opportunity to observe these majestic creatures up close in their natural habitat. Learn about marine life and conservation efforts from expert guides.",
      duration: 4,
      guides: 2,
      accommodations: 'Seaside hotels',
      min: 6,
      max: 12,
    },
    price_per_person: 1400,
  },
  {
    id: 13,
    name: 'Majestic Castles Tour',
    details: {
      description:
        'Discover the grandeur of historic castles on a guided tour through picturesque countryside. Explore the opulent interiors, manicured gardens, and fascinating stories behind these magnificent structures.',
      duration: 8,
      guides: 2,
      accommodations: 'Charming country inns',
      min: 8,
      max: 14,
    },
    price_per_person: 2000,
  },
  {
    id: 14,
    name: 'Scuba Diving Adventure',
    details: {
      description:
        "Dive into an underwater world of vibrant coral reefs and diverse marine life on a scuba diving adventure. Learn from experienced instructors and explore some of the world's most breathtaking dive sites.",
      duration: 7,
      guides: 3,
      accommodations: 'Beach resorts',
      min: 4,
      max: 8,
    },
    price_per_person: 2300,
  },
  {
    id: 15,
    name: 'Yoga and Wellness Retreat',
    details: {
      description:
        'Rejuvenate your mind, body, and spirit on a yoga and wellness retreat. Practice daily yoga, meditation, and mindfulness, while enjoying nourishing meals, spa treatments, and serene natural surroundings.',
      duration: 6,
      guides: 2,
      accommodations: 'Wellness resorts',
      min: 6,
      max: 10,
    },
    price_per_person: 1800,
  },
  {
    id: 16,
    name: 'Photography Workshop',
    details: {
      description:
        'Hone your photography skills on a guided workshop led by professional photographers. Capture stunning landscapes, wildlife, and cultural experiences while learning tips and techniques to improve your craft.',
      duration: 5,
      guides: 2,
      accommodations: 'Boutique hotels',
      min: 6,
      max: 10,
    },
    price_per_person: 1700,
  },
  {
    id: 17,
    name: 'Biking and Wine Tasting',
    details: {
      description:
        'Combine your love for biking and wine on a guided tour through picturesque wine country. Cycle through rolling vineyards, visit local wineries, and sample world-class wines and cuisine.',
      duration: 6,
      guides: 2,
      accommodations: 'Charming bed and breakfasts',
      min: 6,
      max: 12,
    },
    price_per_person: 1900,
  },
  {
    id: 18,
    name: 'Hot Air Balloon Festival',
    details: {
      description:
        "Experience the magic of a hot air balloon festival, where you'll have the opportunity to soar above the landscape in a colorful balloon. Enjoy live music, food, and festivities on the ground.",
      duration: 3,
      guides: 1,
      accommodations: 'Local hotels',
      min: 8,
      max: 16,
    },
    price_per_person: 1100,
  },
  {
    id: 19,
    name: 'Volunteer and Cultural Immersion',
    details: {
      description:
        'Make a positive impact on a local community while immersing yourself in the culture. Participate in volunteer projects, learn the local language, and engage in authentic cultural experiences.',
      duration: 14,
      guides: 2,
      accommodations: 'Homestays',
      min: 4,
      max: 8,
    },
    price_per_person: 2500,
  },
  {
    id: 20,
    name: 'Canyon and Waterfall Hike',
    details: {
      description:
        'Embark on a thrilling hiking adventure through breathtaking canyons and waterfalls. Traverse challenging trails, swim in crystal-clear pools, and marvel at the stunning natural beauty of the landscape.',
      duration: 5,
      guides: 2,
      accommodations: 'Rustic lodges',
      min: 4,
      max: 8,
    },
    price_per_person: 1600,
  },
  {
    id: 21,
    name: 'Art and Architecture Tour',
    details: {
      description:
        "Discover the world's most iconic art and architecture on a guided tour through historic cities. Visit renowned museums, galleries, and architectural masterpieces while learning about their fascinating stories and creators.",
      duration: 7,
      guides: 2,
      accommodations: 'Boutique hotels',
      min: 6,
      max: 12,
    },
    price_per_person: 2100,
  },
  {
    id: 22,
    name: 'Birdwatching Expedition',
    details: {
      description:
        'Explore diverse habitats on a birdwatching expedition led by expert guides. Observe and identify a wide variety of bird species, while learning about their unique behaviors, calls, and conservation efforts.',
      duration: 6,
      guides: 2,
      accommodations: 'Eco-lodges',
      min: 4,
      max: 8,
    },
    price_per_person: 1800,
  },
  {
    id: 23,
    name: 'Gourmet Food and Cooking Tour',
    details: {
      description:
        'Savor the flavors of local cuisine on a gourmet food and cooking tour. Visit markets, farms, and artisan producers, and learn the art of preparing authentic dishes from expert chefs in hands-on cooking classes.',
      duration: 8,
      guides: 2,
      accommodations: 'Luxury hotels',
      min: 6,
      max: 10,
    },
    price_per_person: 2400,
  },
];


export default mockData;