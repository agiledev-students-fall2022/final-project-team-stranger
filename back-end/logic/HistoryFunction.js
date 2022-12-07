const express = require("express");
const HistoryRouter = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

HistoryRouter.post("/history", async (req, res) => {
  try {
    const ref = req.user._id;
    let apiResponse;
    User.find({ _id: ref })
      .populate("previousMessages")
      .exec((err, data) => {
        if (err) {
          console.log(err);
        } else {
          apiResponse = data[0].previousMessages;
          apiResponse.reverse();
          res.json(apiResponse);
        }
      });
  } catch (err) {
    res.json(err);
  }
});

module.exports = HistoryRouter;
