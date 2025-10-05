const { Schema, model } = require("mongoose")

const revenueSchema = new Schema(
  {
    amount: { type: Number, required: true },
    source: { 
      type: String, 
      enum: ["POS", "EATCLUB", "LABOUR"], 
      required: true 
    },
    date: { type: Date, required: true }
  },
  { timestamps: true }
)

revenueSchema.index({ date: 1, source: 1 })

const Revenue = model("Revenue", revenueSchema)

module.exports = Revenue
