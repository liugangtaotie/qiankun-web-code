export const getActiveRule = (hash: any) => (location: any) =>
  location.hash.startsWith(hash);
