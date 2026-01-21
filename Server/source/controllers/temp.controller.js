import { Temp } from "../models/temp.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { appendToSheet } from "../utils/googleSheet.js";

const setdata = async (req, res) => {
  const { deviceId, temp, turb, do_val, tds } = req.body;
  console.log(req.body)

  if ( deviceId === undefined || temp === undefined || turb === undefined || do_val === undefined || tds === undefined) {
    throw new ApiError(400, "All fields required");
  } 
  try {
    const tempData = await Temp.create({
      deviceId,
      temperature: temp,
      turbidity: turb,
      do: do_val,
      tds,
    });

    appendToSheet({ deviceId, temp, turb, do_val, tds })
      .catch(err => console.error("Sheet Error:", err.message));

    return res.status(201).json(
      new ApiResponse(200, "Data saved to DB & Sheet", tempData, true)
    );

  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { setdata };
