const db = require("../../firebase");
const { collection, where, query, getDocs } = require("firebase/firestore");

exports.handler = async function () {
  try {
    const nowUTC = new Date().toISOString();
    const q = query(
      collection(db, "games"),
      where("dates.from", "<=", nowUTC),
      where("dates.to", ">=", nowUTC)
    );

    const snapshot = await getDocs(q);
    const games = [];
    snapshot.forEach((doc) => {
      games.push({ id: doc.id, ...doc.data() });
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(games.length ? games : []),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Failed to retrieve game." }),
    };
  }
};
