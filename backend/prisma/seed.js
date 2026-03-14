const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');
  
  const rooms = [
    {
      name: 'Standard Room',
      description: 'A cozy standard room perfect for solo travelers or couples.',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000'
    },
    {
      name: 'Deluxe Suite',
      description: 'Spacious suite with a beautiful view and premium amenities.',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000'
    },
    {
      name: 'Executive Penthouse',
      description: 'The ultimate luxury experience with panoramic city views.',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  for (const room of rooms) {
    await prisma.room.create({
      data: room
    });
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
