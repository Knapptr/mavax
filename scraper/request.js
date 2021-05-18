const fetch = require("node-fetch");

const COVIDURL = "";

const getHTML = async (zipCodeInMA) => {
  const url = `https://vaxfinder.mass.gov/?zip_or_city=${zipCodeInMA}&q=&vaccines_available=on`;
  const data = await fetch(url);
  const html = await data.text();
  return html;
};

module.exports = getHTML;
