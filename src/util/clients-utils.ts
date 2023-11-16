export function getClientIdFunctionGenerator() {
  let clientId = 0;
  return () => {
    return clientId++;
  };
}
