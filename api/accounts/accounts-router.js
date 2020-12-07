const express = require('express');
const router = express.Router();
const Acc = require('./accounts-model');

const validateFields = (req, res, next) => {
  const { name, budget } = req.body;

  !name || !budget
    ? res
        .status(404)
        .json({ message: 'missing required fields: name + budget' })
    : next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  !id ? req.status(404).json({ message: "id doesn't exist" }) : next();
};

// GET /api/accounts
router.get('/', (req, res) => {
  Acc.getAll()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json(err));
});

// GET /api/accounts/:id
router.get('/:id', validateId, (req, res) => {
  const { id } = req.params;

  Acc.getById(id)
    .then(item =>
      item
        ? res.status(200).json(item)
        : res.status(404).json({ message: 'id not found' })
    )
    .catch(err => res.status(500).json(err));
});

// POST /api/accounts
router.post('/', validateFields, (req, res) => {
  const data = req.body;

  Acc.create(data)
    .then(item => res.status(201).json({ message: 'success!' }))
    .catch(err => res.status(500).json(err));
});

// PUT /api/accounts/:id
router.put('/:id', validateId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Acc.update(id, changes)
    .then(res => res.status(200).json({ message: 'update successful', res }))
    .catch(err => res.status(500).json(err));
});

// DELETE /api/accounts/:id
router.delete('/:id', validateId, (req, res) => {
  const { id } = req.params;

  Acc.delete(id)
    .then(item =>
      res.status(200).json({ status: 'success', deleted_id: `${id}` })
    )
    .catch(err => res.status(500).json(err));
});

module.exports = router;
