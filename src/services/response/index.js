export const success = (res, status) => entity => {
  if (entity) {
    res.status(status || 200).json({ error: false, payload: entity })
  }
  return null
}

export const notFound = res => entity => {
  if (entity) {
    return entity
  }
  res.status(404).send({ error: true })
  return null
}

export const authorOrAdmin = (res, user, userField) => entity => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).send({ error: true })
  }
  return null
}
