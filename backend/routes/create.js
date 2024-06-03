const express = require("express");
const router = express.Router();

const db = require("../firebase");
const {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
} = require("firebase/firestore");

// Create a new game
router.post("/", async (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
  const fromDate = new Date(req.body.data.dates.from);
  const toDate = new Date(req.body.data.dates.to);

  const allGames = await getDocs(collection(db, "games"));

  // check for existing games with overlapping dates
  let overlapExists = false;
  allGames.forEach((doc) => {
    const gameFromDate = new Date(doc.data().dates.from);
    const gameToDate = new Date(doc.data().dates.to);
    if (
      (fromDate >= gameFromDate && fromDate <= gameToDate) ||
      (toDate >= gameFromDate && toDate <= gameToDate) ||
      (fromDate <= gameFromDate && toDate >= gameToDate)
    ) {
      overlapExists = true;
    }
  });
  if (overlapExists) {
    res.status(403).json({
      error:
        "A game already exists whose dates overlap with the game you attempted to create. Please edit or delete the existing game.",
    });
  } else {
    // no overlap found, add game to database
    await setDoc(doc(db, "games", id), data);
    res
      .status(200)
      .json({
        message: `Game for ${fromDate} - ${toDate} created successfully`,
      });
  }
});

module.exports = router;
