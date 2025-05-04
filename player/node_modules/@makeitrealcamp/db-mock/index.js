const records = {}
let nextId = 1

function findAll() {
  return Object.values(records).map(record => ({ ...record }))
}

function findById(id) {
  return { ...records[id] }
}

function insert(record) {
  record.id = nextId
  records[nextId] = { ...record }
  nextId++
  return record
}

function update(record) {
  const id = record.id
  if (!id) throw new Error("The record doesn't have an id property")
  if (!records[id]) {
    throw new Error(`The record with id ${id} was not found`)
  }
  records[id] = record

  return record
}

function remove(id) {
  delete records[id]
}

function reset() {
  Object.keys(records).forEach(key => delete records[key])
  nextId = 1
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
  reset,
}
