import { traverse } from "./traverse"

export const sort = <TObjectArray extends Record<string, unknown>>(
  objectArray: TObjectArray[],
  key: keyof TObjectArray | string
): TObjectArray[] => {
  // Copying array to avoid manipulating original array
  const arrayCopy = [...objectArray]

  const sortedArray = arrayCopy.sort((a, b) => {
    const [valueA, valueB] = [
      traverse(a, key as string),
      traverse(b, key as string)
    ]

    return String(valueA).toLowerCase() > String(valueB).toLowerCase() ? 1 : -1
  })

  return sortedArray
}
