const db = require("../../firebase");
const { doc, setDoc, getDocs, collection } = require("firebase/firestore");

exports.handler = async function (event) {
  // Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Method Not Allowed",
    };
  }

  const { id, data } = JSON.parse(event.body);
  let fromDate = new Date(data.dates.from);
  let toDate = new Date(data.dates.to);

  fromDate.setUTCHours(4, 0, 0, 0);
  toDate.setDate(toDate.getDate() + 1);
  toDate.setUTCHours(3, 59, 59, 999);

  data.dates.from = fromDate.toISOString();
  data.dates.to = toDate.toISOString();

  const allGames = await getDocs(collection(db, "games"));

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
    return {
      statusCode: 403,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "A game already exists with overlapping dates.",
      }),
    };
  }

  await setDoc(doc(db, "games", id), data);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "Game created successfully!" }),
  };
};
