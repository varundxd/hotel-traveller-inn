const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.menuItem.deleteMany();

  // Rooms
  const rooms = [
    {
      name: 'Standard Mountain View',
      description: 'Cozy retreat with queen bed and partial valley view. Perfect for solo travellers or couples.',
      price: 2500,
      badge: 'Available',
      amenities: 'Free Wi-Fi,AC,TV,Hot Water,Room Service',
      capacity: 2
    },
    {
      name: 'Deluxe Valley Suite',
      description: 'Spacious suite with panoramic Himalayan views, king bed, private balcony overlooking the valley.',
      price: 4200,
      badge: 'Popular',
      amenities: 'Free Wi-Fi,AC,Smart TV,Balcony,Mini Bar,Bathtub',
      capacity: 2
    },
    {
      name: 'Premium Forest Suite',
      description: 'Luxury suite surrounded by oak and pine, featuring a private sit-out, fireplace, and panoramic windows.',
      price: 6800,
      badge: 'Best Value',
      amenities: 'Free Wi-Fi,AC + Heating,Smart TV,Fireplace,Sit-out,Jacuzzi',
      capacity: 2
    },
    {
      name: 'Family Comfort Room',
      description: 'Spacious room with two queen beds, ideal for families. Includes a separate children\'s corner and mountain view.',
      price: 5500,
      badge: 'Family Pick',
      amenities: 'Free Wi-Fi,AC,TV,2 Queen Beds,Kids Corner',
      capacity: 4
    }
  ];

  for (const room of rooms) {
    await prisma.room.create({ data: room });
  }

  // Menu Items
  const menuItems = [
    // Breakfast
    { category: 'breakfast', emoji: '🥐', name: 'Continental Breakfast', description: 'Croissant, eggs, toast, jam & fresh juice', price: '₹320' },
    { category: 'breakfast', emoji: '🍽', name: 'Kumaoni Thali (Morning)', description: 'Bal mithai, aloo ke gutke, pahari dal & chaas', price: '₹280' },
    { category: 'breakfast', emoji: '🥞', name: 'Pancake Stack', description: 'Fluffy pancakes with local honey & fruit', price: '₹220' },
    { category: 'breakfast', emoji: '🍳', name: 'Full English Breakfast', description: 'Eggs, beans, sausage, toast & grilled tomato', price: '₹380' },
    // Lunch
    { category: 'lunch', emoji: '🍛', name: 'Dal Bhat Tarkari', description: 'Traditional Himalayan lentils, rice & seasonal vegetables', price: '₹260' },
    { category: 'lunch', emoji: '🥗', name: 'Fresh Garden Salad', description: 'Locally grown veggies with house dressing', price: '₹180' },
    { category: 'lunch', emoji: '🍕', name: 'Wood-fired Pizza', description: 'Thin crust with mozzarella & seasonal toppings', price: '₹320' },
    { category: 'lunch', emoji: '🍜', name: 'Veg Noodle Bowl', description: 'Stir-fried noodles with mountain herbs', price: '₹240' },
    // Dinner
    { category: 'dinner', emoji: '🍖', name: 'Grilled Mountain Trout', description: 'Freshwater trout from local streams, lemon butter', price: '₹480' },
    { category: 'dinner', emoji: '🍲', name: 'Kumaoni Mutton Curry', description: 'Slow-cooked in pahari masala with rice & raita', price: '₹420' },
    { category: 'dinner', emoji: '🥘', name: 'Paneer Makhani', description: 'Cottage cheese in rich tomato cream sauce', price: '₹280' },
    { category: 'dinner', emoji: '🍝', name: 'Pasta Arrabiata', description: 'Penne in spicy tomato basil sauce', price: '₹310' },
    // Beverages
    { category: 'beverages', emoji: '☕', name: 'Pahadi Chai', description: 'Local spiced mountain tea, freshly brewed', price: '₹60' },
    { category: 'beverages', emoji: '🫖', name: 'Shyamkhet Green Tea', description: 'Estate-grown green tea from Bhowali gardens', price: '₹90' },
    { category: 'beverages', emoji: '🥤', name: 'Buransh Juice', description: 'Refreshing rhododendron flower juice, a Kumaon specialty', price: '₹120' },
    { category: 'beverages', emoji: '🍋', name: 'Lemon Ginger Cooler', description: 'Fresh lime, ginger & mint, chilled to perfection', price: '₹100' },
    // Kumaoni Specials
    { category: 'local', emoji: '🍬', name: 'Bal Mithai', description: 'Traditional Kumaoni sweet made from roasted khoya, a must-try', price: '₹150' },
    { category: 'local', emoji: '🥣', name: 'Aloo Ke Gutke', description: 'Spiced mountain potatoes — a beloved Kumaoni staple', price: '₹180' },
    { category: 'local', emoji: '🫓', name: 'Singori', description: 'Sweet made of khoya wrapped in maalu leaves, a rare delight', price: '₹120' },
    { category: 'local', emoji: '🍛', name: 'Bhaang Ki Chutney Thali', description: 'Pahari thali with hemp seed chutney — uniquely Uttarakhand', price: '₹320' },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
