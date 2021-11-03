type TObject = Record<string, unknown>
type ExpectedTypes = string | number | boolean

export function traverse(
  object: TObject,
  key: string
): TObject | ExpectedTypes {
  const [oldestKey, ...keys] = key.split(".")
  let innerValue = object[oldestKey] as TObject | ExpectedTypes

  for (const currentKey of keys) {
    if (innerValue === undefined || null) {
      return innerValue
    }

    if (typeof innerValue === "object") {
      innerValue = innerValue[currentKey] as TObject | ExpectedTypes
    }
  }

  return innerValue
}
