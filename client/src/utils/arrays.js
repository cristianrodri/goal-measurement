export const updateObjInArray = (obj, arr) => {
  const index = arr.findIndex(item => item._id === obj._id)
  arr.splice(index, 1, obj)

  return arr
}

export const firstItemToLast = arr => {
  arr.push(arr.shift())

  return arr
}
