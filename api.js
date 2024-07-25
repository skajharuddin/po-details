const axios = require("axios"); // Import axios for making HTTP requests

// Function to get API data
async function getApiData(pin) {
  try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pin}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = { getApiData };
