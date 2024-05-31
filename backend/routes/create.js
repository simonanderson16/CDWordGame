const express = require("express");
const router = express.Router();

const db = require("../firebase");
const { getDoc, doc, setDoc } = require("firebase/firestore");

// Create a new game
router.post("/", async (req, res) => {
  const date = req.body.date;
  const data = req.body.data;

  const docSnap = await getDoc(doc(db, "games", date));
  if (docSnap.exists()) {
    res
      .status(403)
      .json({
        error:
          "A game for the given date already exists. Please edit or delete the existing game.",
      });
  } else {
    await setDoc(doc(db, "games", date), data);
    res.status(200).json({ message: `Game for ${date} created successfully` });
  }
});

module.exports = router;
