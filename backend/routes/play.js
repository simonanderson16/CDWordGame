const express = require("express");
const router = express.Router();

const db = require("../firebase");
const {
  doc,
  getDocs,
  collection,
  where,
  query,
  updateDoc,
} = require("firebase/firestore");

// get today's game
router.get("/", async (req, res) => {
  try {
    const today = new Date();
    const todayUTC = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    );
    const todayStringNoTimeUTC = todayUTC.toISOString();

    const querySnap = query(
      collection(db, "games"),
      where("dates.from", "<=", todayStringNoTimeUTC),
      where("dates.to", ">=", todayStringNoTimeUTC)
    );

    const todayGamesSnapshot = await getDocs(querySnap);
    const todayGames = [];

    todayGamesSnapshot.forEach((game) => {
      todayGames.push({
        id: game.id,
        ...game.data(),
      });
    });

    if (todayGames.length === 0) {
      res.status(200).json({ message: "No games found for today." });
    } else {
      res.status(200).json(todayGames);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve game. Please try again later.",
    });
  }
});

// update number of plays for a game
router.put("/", async (req, res) => {
  const { id, currentPlays } = req.body;
  await updateDoc(doc(db, "games", id), {
    plays: currentPlays + 1,
  });
  res.status(200).json({ message: "updated number of plays successfully" });
});

module.exports = router;
