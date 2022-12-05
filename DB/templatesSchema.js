const { Schema, model } = require("mongoose");

const templateSchema = new Schema(
  {
    template_id: { type: String, index: 1, required: true },
    name: { type: String },
    creator: { type: String },
    date: { type: Date },
    html: { type: String },
  },
  {
    collection: "templates",
  }
);

const Template = model("template", templateSchema);
module.exports = { Template };
