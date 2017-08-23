const express = require("express")
const router = express.Router()
const Longboard = require("../models/Longboard")

router.get("/", function(req, res) {
  Longboard.find().then(function(cities) {
    res.render("index", {
      cities: cities
    })
  })
})

router.get("/longboard/new", function(req, res) {
  res.render("new")
})

router.post("/longboard", function(req, res) {
  const name = req.body.name
  const material = req.body.material
  const deck = req.body.deck
  const newBoard = new Longboard()
  newBoard.name = name
  newBoard.material = material
  newBoard.deck = deck
  newBoard
    .save()
    .then(function(newBoard) {
      res.redirect("/")
    })
    .catch(function(error) {
      console.log("error", error)
      res.render("new", {
        newBoard: newBoard,
        errors: error.errors
      })
    })
})

router.post("/longboard/:id", function(req, res) {
  Longboard.findOne({
    _id: req.params.id
  }).then(function(newBoard2) {
    const name = req.body.name
    const material = req.body.material
    const deck = req.body.deck

    newBoard2.name = name
    newBoard2.material = material
    newBoard2.deck = deck
    newBoard2
      .save()
      .then(function(newBoard2) {
        res.redirect("/")
      })
      .catch(function(error) {
        res.render("edit", {
          newBoard2: newBoard2,
          errors: error.errors
        })
      })
  })
})

router.get("/longboard/:id", function(req, res) {
  Longboard.findOne({
    _id: req.params.id
  }).then(function(newBoard) {
    res.render("detail", {
      newBoard: newBoard
    })
  })
})

router.get("/longboard/:id/edit", function(req, res) {
  Longboard.findOne({
    _id: req.params.id
  }).then(function(newBoard) {
    res.render("edit", {
      newBoard: newBoard
    })
  })
})

router.get("/longboard/:id/delete", function(req, res) {
  Longboard.deleteOne({
    _id: req.params.id
  }).then(function() {
    res.redirect("/")
  })
})

module.exports = router
