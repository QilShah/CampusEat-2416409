const vendors = [
  {
    id: 'warung-selera',
    name: 'Warung Selera Kita',
    location: 'Mahallah Ali, Block B',
    openHours: '7:30 am - 10:30 pm',
    isOpen: true,
    menu: [
      {
        id: 'ws-1',
        name: 'Nasi Ayam Gepuk',
        description: 'Crispy fried chicken crushed with spicy garlic-peanut sambal, served with rice',
        price: 10,
        category: 'Rice',
        available: true,
      },
      {
        id: 'ws-2',
        name: 'Roti Sarang Burung',
        description: 'Ring-shaped flatbread cooked with eggs and minced meat in the center',
        price: 5.5,
        category: 'Roti',
        available: true,
      },
      {
        id: 'ws-3',
        name: 'Teh Tarik',
        description: 'Classic pulled milk tea',
        price: 2.5,
        category: 'Drinks',
        available: true,
      },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: true,
    menu: [
      {
        id: 'ami-1',
        name: 'Nasi Ayam Penyet',
        description: 'Smashed fried chicken with sambal and rice',
        price: 9,
        category: 'Rice',
        available: true,
      },
      {
        id: 'ami-2',
        name: 'Air Bandung',
        description: 'Rose syrup with milk',
        price: 3,
        category: 'Drinks',
        available: true,
      },
    ],
  },
];

export default vendors;