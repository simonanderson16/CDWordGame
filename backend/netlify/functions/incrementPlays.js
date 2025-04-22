const db = require("../../firebase");
const { updateDoc, doc } = require("firebase/firestore");

exports.handler = async function (event) {
  // Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "PUT, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "PUT") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Method Not Allowed",
    };
  }

  const { id, currentPlays } = JSON.parse(event.body);

  try {
    await updateDoc(doc(db, "games", id), {
      plays: currentPlays + 1,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Play count updated." }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Failed to update play count." }),
    };
  }
};
