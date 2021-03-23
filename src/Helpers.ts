export function isNullOrUndefined (val: any): val is (null | undefined) {
  return val === null || val === undefined
}
