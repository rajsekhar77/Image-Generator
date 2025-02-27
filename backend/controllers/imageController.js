import FormData from "form-data";
import axios from "axios";
import userModel from "../models/userModel.js";

export const generateImage = async (req, res) => {
  try {
    const { userID, prompt } = req.body;

    const user = await userModel.findById(userID);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();

    console.log("formdata before append: ", formData);

    formData.append("prompt", prompt);

    console.log("formdata after append: ", formData);

    const result = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );
    // console.log("result: ", result);

    const { data } = result;
    console.log("data: ", data);

    const base64Image = Buffer.from(data, "binary").toString("base64");
    // console.log("base64Image: ", base64Image);

    const resultImage = `data:image/png;base64,${base64Image}`;
    // console.log('resultImage: ', resultImage);

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
