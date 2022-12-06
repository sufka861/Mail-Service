const { Schema, model } = require("mongoose");
const { validate } = require("uuid");

const templateSchema = new Schema(
  {
    template_id: { type: String, index: 1, required: true },
    name: { type: String },
    creator: { type: String },
    date: { type: String },
    html: { type: String },
  },
  {
    collection: "templates",
  }
);

templateSchema.path("template_id").validate((id) => validate(id));

const Template = model("template", templateSchema);
module.exports = { Template };
