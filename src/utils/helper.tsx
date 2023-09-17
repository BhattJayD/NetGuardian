export const generateIPRange = (startIP: string, count: number) => {
  const ipParts = startIP.split('.');
  const ipAddresses = [];

  // Convert IP parts to numbers
  const [a, b, c, d] = ipParts.map(Number);

  for (let i = 0; i < d + count; i++) {
    if (i > 255) break; // Prevent going beyond 255 in the last part
    ipAddresses.push(`${a}.${b}.${c}.${i}`);
  }

  return ipAddresses;
};
