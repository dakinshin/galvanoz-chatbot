export function *nextIdGenerator(): Generator<number> {
  let value: number = 0
  while (true) {
    value += 1
    yield value
  }
}
