const express = require("express");
const router = express.Router();

const db = require("../firebase");
const {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} = require("firebase/firestore");

// Create a new game
router.post("/", async (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
  let fromDate = new Date(req.body.data.dates.from);
  let toDate = new Date(req.body.data.dates.to);
  
  // Set the "from" date to midnight EST (00:00:00)
  fromDate.setUTCHours(5, 0, 0, 0); // 5 hours behind UTC for EST

  // Add one day to the "to" date to ensure it's the end of that day in EST
  toDate.setDate(toDate.getDate() + 1);
  
  // Set the "to" date to 11:59:59 PM EST
  toDate.setUTCHours(4, 59, 59, 999); // 4 hours behind UTC for EST

  data.dates.from = fromDate.toISOString();
  data.dates.to = toDate.toISOString();

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
    res.status(200).json({
      message: `Game created successfully!`,
    });
  }
});

// get all games
router.get("/", async (req, res) => {
  try {
    const allGamesSnapshot = await getDocs(collection(db, "games"));
    const allGames = [];
    allGamesSnapshot.forEach((doc) => {
      allGames.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    res.status(200).json(allGames);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve games. Please try again later.",
    });
  }
});

// delete a game
router.delete("/:id", async (req, res) => {
  const gameId = req.params.id;
  try {
    const gameRef = doc(db, "games", gameId);
    await deleteDoc(gameRef);
    res.status(200).json({
      message: `Game with id ${gameId} deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete the game. Please try again later.",
    });
  }
});

module.exports = router;
