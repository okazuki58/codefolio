import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 何もしない
  console.log("シード処理はスキップされました");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
