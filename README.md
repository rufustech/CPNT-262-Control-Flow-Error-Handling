# CPNT-262-Control-Flow-Error-Handling

## NBA Data Fetching Script

A simple Node.js script that fetches NBA game data using the [API-Sports](https://www.api-football.com/documentation-v3) service. The script demonstrates error handling and how to write good error messages

---

## Challenges the I encountered

This challenge involved writing a script that fetches NBA game data from the API-Sports service. My primary goals were:

1. **Fetch and display data**: Retrieve and display games data for the current day, it was very difficult to figure out the Documentation, took lots of hours to figure it our.
2. **Handle errors gracefully**: Account for invalid API keys, missing data, and unexpected API responses.
3. **Validate data**: Ensure the script processes only valid, expected data structures.

---

## Problem-Solving Notes

How I managed to resolve the challenges:

1. **Fetch Implementation**:

   - Used `node-fetch` to make requests.
   - Integrated `dayjs` to dynamically fetch the current date.

2. **Error Handling**:

   - I Checked for HTTP response errors using `response.ok`.
   - Threw detailed custom errors when issues were detected, such as "Error fetching or processing data:".

3. **Data Validation**:

   - I Ensured the API response contained the necessary fields (`response`, `teams`, `scores`, `periods`) before processing.
   - Applied default empty values to handle missing fields gracefully.

4. **Logging**:
   - Added informative console messages to aid debugging and understand script behavior.
   - Logged fetched data and error messages to give context to any issues.

---

## Script Overview

### Features

- **Dynamic Date Fetching**: Automatically fetches games for the current date.
- **Custom Error Messages**: Provides user-friendly error messages for debugging.
- **Data Validation**: Ensures valid and expected data before processing.
- **Error Logging**: Captures and logs errors for both the API response and individual games.

---

### Prerequisites

- Node.js installed on your system.
- An [API-Sports](https://www.api-football.com/documentation-v3) account and API key.

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rufustech/CPNT-262-Control-Flow-Error-Handling.git
   ```
