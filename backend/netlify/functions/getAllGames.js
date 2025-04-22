const db = require("../../firebase");
const { getDocs, collection } = require("firebase/firestore");

exports.handler = async function () {
  try {
    const allGamesSnapshot = await getDocs(collection(db, "games"));
    const allGames = [];
    allGamesSnapshot.forEach((doc) => {
      allGames.push({ id: doc.id, ...doc.data() });
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(allGames),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Failed to retrieve games." }),
    };
  }
};
