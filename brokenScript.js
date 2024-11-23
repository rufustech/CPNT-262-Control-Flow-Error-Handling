//Script broken, fetches NBA game stats but throw an error
const fetch = require("node-fetch");
const dayjs = require("dayjs");

const url = "https://v2.nba.api-sports.io/games";

//Passed in  bad API key to check error handliNg
const API_KEY = "45cc0f7498098df0c7fdbc72f337ad72ccc"; // good Key =  45cc0f7498098df0c7fdbc72f337ad72

// Get the formatted date using dayjs
const getFormattedDate = () => dayjs().format("YYYY-MM-DD");

const fetchNBAData = async () => {
  // show begining of the fetching of the data
  console.log("Fetching NBA Data while we get cooked...");
  try {
    // Fetch data from the API
    const response = await fetch(`${url}?date=${getFormattedDate()}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v2.nba.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    });

    // LLog response to make sure we are gettign data from NBA api for Debug
    console.log("Received response status:", response.status);

    if (!response.ok) {
      // The error we intentionally want to display to showcase proper error handling.
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // show error message
    if (!data.errors.token) {
      console.log("Fetched data:", JSON.stringify(data, null, 2));
    }
    // Custom clear message for the error to help user
    const APIerrorMessage = "Please check your key for errors :";
    console.log(
      `Fetched Error data: ${APIerrorMessage}`,
      JSON.stringify(data.errors.token, null, 2)
    );

    // Validate that the data contains a response array
    if (!data || !Array.isArray(data.response)) {
      throw new Error("Invalid data format or no games found.");
    }

    // Loop through each game in the response array
    data.response.forEach((game, index) => {
      try {
        const teams = game.teams || {};
        const scores = game.scores || {};
        const periods = game.periods || {};

        if (!teams || !scores || !periods) {
          throw new Error(`Missing expected data in game ${index + 1}`);
        }

        // Log the game infomation
        console.log(`Game ${index + 1}:`);
        console.log("Teams:", teams);
        console.log("Scores:", scores);
        console.log("Periods:", periods);
      } catch (gameError) {
        // Catch errors within the game loop (e.g., missing data for a game)
        console.error(`Error processing game ${index + 1}:`, gameError.message);
      }
    });
  } catch (error) {
    // Catch any error during the API call or response processing
    console.error("Error fetching or processing data:", error.message);
  }
};

fetchNBAData();
