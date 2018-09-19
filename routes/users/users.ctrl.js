let users = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bek'},
  {id: 3, name: 'Chris'}
]

const index =  (req, res) => {
  console.log(req.query.limit);
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  if(Number.isNaN(limit)){
    return res.status(400).end()
  }
  return res.json(users.slice(0, limit))
}

const show = (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id, 10) //10진수로 스트링을 숫자로 변경
  if(Number.isNaN(id)){
    return res.status(400).end()
  }

  const user = users.filter(user => user.id === id)[0]
  if(!user){
    return res.status(404).end()
  }
  return res.json(user)
}

const destroy = (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id, 10)
  if(Number.isNaN(id)){
    return res.status(400).end()
  }

  users = users.filter(user => user.id !== id)
  return res.status(204).end()
}

const create = (req, res) => {
  const name = req.body.name
  console.log(name);
  if(!name){
    return res.status(400).end()
  }
  const found = users.filter(user => user.name === name).length
  if(found) return res.status(409).end()

  const id = Date.now()
  const user = {id, name}
  users.push(user)

  return res.status(201).json(user)
}

module.exports = {
  index,
  show,
  destroy,
  create
}