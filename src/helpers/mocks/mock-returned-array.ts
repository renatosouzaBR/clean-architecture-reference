export const mockReturnedArray = (arrayLength: number, arrayObj: any) => {
  const array = []

  for (let i = 0; i < arrayLength; i++) {
    array.push(arrayObj)
  }

  return array
}
