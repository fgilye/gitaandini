import { prisma } from "./src/lib/db";
async function main() {
  const count = await prisma.certificate.count();
  console.log("Total certificates before:", count);
  const res = await prisma.certificate.deleteMany({
    where: {
      title: {
        contains: "Ahli K3 Umum"
      }
    }
  });
  console.log("Deleted count:", res.count);
  const countAfter = await prisma.certificate.count();
  console.log("Total certificates after:", countAfter);
  
  // also let's just make absolutely sure there is no other certificate with "ak3u" in title or description.
  const ak3u = await prisma.certificate.deleteMany({
    where: {
      OR: [
        { title: { contains: "ak3u", mode: "insensitive" } },
        { title: { contains: "k3u", mode: "insensitive" } }
      ]
    }
  });
  console.log("Deleted ak3u count:", ak3u.count);
}
main().catch(console.error).finally(() => process.exit(0));
