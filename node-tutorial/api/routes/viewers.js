const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

const Viewer = require("../models/viewers");

router.get("/", (req, res, next) => {
  Viewer.find()
    .select("name points _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        viewers: docs.map(doc => {
          return {
            name: doc.name,
            points: doc.points,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3001/viewers/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {

  let data = {
    _id: ObjectId(req.body._id),
    name: req.body.name,
    points: req.body.points
  }
  console.log('111', data);
  const viewer = new Viewer(data);
  console.log('222', data);
  viewer
    .save()
    .then(result => {
      console.log('result', result);
      res.status(201).json({
        message: "Created viewer successfully",
        createdViewer: {
          name: result.name,
          points: result.points,
          _id: result._id,
          request: {
            type: 'GET',
            url: "http://localhost:3001/viewers/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(500, err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:viewerId", (req, res, next) => {
  // const id = req.params.viewerId;
  try {
    const id = ObjectId(req.params.viewerId);

    Viewer.findById(id)
      .select('name points _id')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            viewer: doc,
            request: {
              type: 'GET',
              url: 'http://localhost:3001/viewers'
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.log('ERROR', error);
  }
});

router.patch("/:viewerId", (req, res, next) => {
  
  const id = req.params.viewerId;
  const updateOps = {};
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }
  console.log(updateOps);
  Viewer.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3001/viewers/' + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:viewerId", (req, res, next) => {
  const id = req.params.viewerId;
  Viewer.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result.deletedCount);
      res.status(200).json({
        message: 'Product deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3001/viewers',
          body: { name: 'String', price: 'Number' }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;