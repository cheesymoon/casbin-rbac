const express = require('express');
const articlesData = require('../data/articles.json');
const { getEnforcer } = require('../rbac');

const router = express.Router();

/**
 * Get list
 */
router.get('/', async (req, res) => {
  const e = await getEnforcer();

  // await e.addRoleForUser('bob', 'role:root');
  // await e.savePolicy();

  const parameters = { ...req.query, ...req.body };
  const { username } = parameters;
  console.log(username);

  const articles = articlesData.map(async (obj) => {
    const {
      adminOnly,
      managerOnly,
      viewOnly,
      ...rest
    } = obj;
    let data = rest;

    if ((await e.enforce(username, 'article', 'read-admin')) === true) {
      data = {
        ...data,
        adminOnly,
      };
    }

    if ((await e.enforce(username, 'article', 'read-manager')) === true) {
      data = {
        ...data,
        managerOnly,
      };
    }

    return data;
  });

  res.status(200).send({ data: await Promise.all(articles) });
});

router.get('/:id/delete', async (req, res) => {
  const e = await getEnforcer();
  const parameters = { ...req.query, ...req.body };
  const { username } = parameters;
  console.log(username);

  if ((await e.enforce(username, 'article', 'delete')) === true) {
    res.status(200).send({ success: `Article ${req.params.id} has been removed` });
  } else {
    res.status(403).send({ error: 'Forbidden' });
  }
});

router.get('/:id/', async (req, res) => {
  const e = await getEnforcer();
  const parameters = { ...req.query, ...req.body };
  const { username } = parameters;
  console.log(username);

  const { id } = req.params;
  const {
    adminOnly,
    managerOnly,
    viewOnly,
    ...rest
  } = articlesData[id];

  const allowedById = await e.enforce(
    username,
    `article_${id}`,
    'full-view'
  );
  const allowedByCountry = await e.enforce(
    username,
    `article_country_${viewOnly.manufacturer}`,
    'full-view'
  );

  console.log(allowedById);

  if (allowedByCountry || allowedById) {
    res.status(200).send({
      data: {
        ...rest,
        ...viewOnly,
      },
    });
  } else {
    res.status(403).send({ error: 'Forbidden' });
  }
});

module.exports = router;
