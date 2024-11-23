//Script fetches NBA live game stats
const fetch = require("node-fetch");
const dayjs = require("dayjs");

const url = "https://v2.nba.api-sports.io/games";
const API_KEY = "45cc0f7498098df0c7fdbc72f337ad72";

// Get the formatted date using dayjs
const getFormattedDate = () => dayjs().format("YYYY-MM-DD");

const fetchNBAData = async () => {
  //show begining of the fetching of the data
  console.log("Fetching NBA Data please wait while we cook...");
  try {
    // Fetch data from the API
    const response = await fetch(`${url}?date=${getFormattedDate()}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v2.nba.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Validate that the data contains array
    if (!data || !Array.isArray(data.response)) {
      throw new Error("Invalid data format or no games found.");
    }

    // Loop through each game in the response array used forEach method
    data.response.forEach((game, index) => {
      try {
        // Extract required properties with validation
        const teams = game.teams || {};
        const scores = game.scores || {};
        const periods = game.periods || {};

        if (!teams || !scores || !periods) {
          throw new Error(`Missing expected data in game ${index + 1}`);
        }

        // Log the extracted data
        console.log(`Game ${index + 1}:`);
        console.log("Teams:", teams);
        console.log("Scores:", scores);
        console.log("Periods:", periods);
      } catch (gameError) {
        // Catch errors within the game loop like missing game data
        console.error(`Error processing game ${index + 1}:`, gameError.message);
      }
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error.message);
  }
};

fetchNBAData();
