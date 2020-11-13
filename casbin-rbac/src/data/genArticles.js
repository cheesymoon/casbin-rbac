const { writeFileSync } = require('fs');
const faker = require('faker');

const articles = [...Array(15)].map((_, index) => (
  {
    id: index,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    material: faker.commerce.productMaterial(),
    color: faker.commerce.color(),
    department: faker.commerce.department(),
    price: faker.random.number(100),
    adminOnly: {
      isFake: faker.random.boolean(),
      isScam: faker.random.boolean(),
      isPoisoned: faker.random.boolean(),
    },
    managerOnly: {
      managerStake: faker.random.number(20),
      realMaterial: faker.commerce.productMaterial(),
    },
    viewOnly: {
      realPrice: faker.random.number(100),
      additionalDescription: faker.commerce.productDescription(),
      manufacturer: faker.address.country(),
      manufacturerCountryCode: faker.address.countryCode(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
    },
  }
));

writeFileSync(`${__dirname}/articles.json`, JSON.stringify(articles, null, 2));
