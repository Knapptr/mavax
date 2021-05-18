const fetcher = require("./request");
const parser = require("./parser.js");

const getData = async (zipInMA, callback) => {
  try {
    const html = await fetcher(zipInMA);
    const locations = await parser(html);
    if (callback) {
      callback(locations);
    }

    locations.sort((a, b) => a.distance - b.distance);
    return locations;
  } catch {
    return false;
  }
};

module.exports = getData;
