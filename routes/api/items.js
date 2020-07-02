const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();
// Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All items
// @access Public
router.get('/', (req, res) => {
  // fetch data dari database & menyimpannya dalam variabel items, Promise-based
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @desc Create an item
// @access Public / Private with auth middleware
router.post('/', auth, (req, res) => {
  // POST data ke database dengan menggunakan model Item
  const newItem = new Item({
    name: req.body.name,
    price: req.body.price,
  });

  // save() Promise-based
  newItem.save().then((item) => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public / Private with auth middleware
router.delete('/:id', auth, (req, res) => {
  // DELETE data dari database dengan model Item berdasarkan ID, Promise-based
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
