// require the stuff
const mongoose = require("mongoose")
// do the stuff

// define the schema
const longboardSchema = new mongoose.Schema({
  name: {
    type: String
  },
  material: {
    type: String
  },
  deck: {
    type: String
  },

})

const longBoardInfo = mongoose.model("Longboard", longboardSchema)
// create a model using that schema

// export the stuff
module.exports = longBoardInfo
