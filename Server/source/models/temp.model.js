import mongoose from "mongoose"

const tempSchema = new mongoose.Schema({

    device_id: String,
    temperature: String,
    ph: String,
    tds: String,
    do: String,
    ec: String,
    turbidity: String

},{timestamps: true})


export const Temp = mongoose.model("Temp", tempSchema)