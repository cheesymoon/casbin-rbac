const express = require('express');

const router = express.Router();

const info = {
  name: 'api',
};

// GET /status
// Check connection to the mongo
router.get('/', (req, res) => {
  const errors = [];
  if (!errors.length) {
    res.status(200).send(info);
  } else {
    console.log(errors.join(' '));
    res.status(500).send({
      code: 500,
      message: 'Failed to start API',
    });
  }
});

module.exports = router;
