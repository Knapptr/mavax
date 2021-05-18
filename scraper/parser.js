const { JSDOM } = require("jsdom");
const getData = require("./getData");
const getDetails = require("./getDetails");

const getLocationsFromData = async (html) => {
  const locations = [];
  const { document } = new JSDOM(html).window;
  const tbody = document.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    const locationInfo = row.querySelector("a");
    const locationString = locationInfo.textContent.trim();
    let [cityName, placeName] = locationString.split(":");
    cityName = cityName.trim();
    placeName = placeName.trim();
    const distanceString = row
      .querySelector(".location-distance")
      .textContent.trim();
    const distance = distanceString.split("miles")[0].trim();
    const locationHref = locationInfo.href;
    const information = {
      distance,
      url: `https://vaxfinder.mass.gov${locationHref}`,
      placeName,
      cityName,
    };
    locations.push(information);
  });

  const detailPromises = locations.map((location) => getDetails(location.url));

  const detailsForLocations = await Promise.all(detailPromises);

  locations.forEach((location, index) => {
    location.details = detailsForLocations[index];
  });

  return locations;
};

module.exports = getLocationsFromData;
