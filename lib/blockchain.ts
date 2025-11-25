// lib/blockchain.ts - DEMO MINT (FAKE TX HASH)

export async function mintBadge(to: string) {
  console.log("Pretending to mint badge for:", to);

  // create a fake tx hash for demo
  const fakeHash =
    "0x" +
    Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

  return { hash: fakeHash, demo: true };
}
