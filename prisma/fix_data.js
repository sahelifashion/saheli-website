const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  for (const product of products) {
    // If it has no subCategory, assume it's one of the dummy data where name == subcategory
    if (!product.subCategory) {
      const subCategory = product.name;
      // Provide a nice name
      const newName = `Elegant ${subCategory}`;

      await prisma.product.update({
        where: { id: product.id },
        data: {
          name: newName,
          subCategory: subCategory
        }
      });
      console.log(`Updated ${product.id}: name -> ${newName}, subCategory -> ${subCategory}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
