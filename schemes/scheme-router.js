const express = require('express');

const schemeHelper = require('./scheme-model.js');

const router = express.Router();

router.route("/")
.get((req, res) => {
  schemeHelper.find()
    .then(schemes => {
      res.status(200).json(schemes);
    })
    .catch(err => {
      res.status(500).send({ message: "Something went wrong." })
    })
})
.post((req, res) => {
  const schemeData = req.body;

  schemeHelper.add(schemeData)
  .then(scheme => {
    res.status(201).json(scheme);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new scheme' });
  });
});

router.route("/:id")
.get((req, res) => {
  const { id } = req.params;

  schemeHelper.findById(id)
  .then(scheme => {
    if (scheme) {
      res.status(200).json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
})
.put((req, res) => {
  const { id } = req.params;
  const newScheme = req.body;

  schemeHelper.findById(id)
  .then(scheme => {
    if (scheme) {
      schemeHelper.update(newScheme, id)
      .then(updatedScheme => {
        res.json(updatedScheme);
      });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme' });
  });
})
.delete((req, res) => {
  const { id } = req.params;

  schemeHelper.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

router.route("/:id/steps")
.get((req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps' });
  });
})
.post((req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      Schemes.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

module.exports = router;