// Only can update especific model options
const allowedUpdates = (allowedModelOptions, updates) => {
  // if allowed model options is included in updates (req.body), valid update return true
  const isValidUpdate = updates.every(update =>
    allowedModelOptions.includes(update)
  )

  return isValidUpdate
}

module.exports = allowedUpdates
