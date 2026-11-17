export const PATHS = {
  home: '/',
  request: '/request',
  result: '/result',
};

export function parseRouteId(value: string | null): number | null {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
