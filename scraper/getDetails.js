const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const getDetails = async (url) => {
  const data = await fetch(url);
  const html = await data.text();
  const document = new JSDOM(html).window.document;
  const scheduleInfo = document.querySelector("section>a");
  const scheduleUrl = scheduleInfo.href;
  const grid = document.querySelector(".detail-sidebar.grid");
  const gridHeaders = grid.querySelectorAll("h3");
  let addressHeading;
  let servesHeading;
  let contactHeading;
  let offeredHeading;
  gridHeaders.forEach((header) => {
    const headerText = header.textContent.trim();
    switch (headerText) {
      case "Address":
        addressHeading = header;
        break;
      case "Serves":
        servesHeading = header;
        break;
      case "Contact":
        contactHeading = header;
        break;
      case "Vaccines Offered":
        offeredHeading = header;
        break;
      default:
        break;
    }
  });
  const addressItem = addressHeading.nextElementSibling.querySelector("li");
  const mapsLink = addressItem.querySelector("a");
  const address = addressItem.textContent.trim().split("(Google Maps)")[0];
  const googleMapUrl = mapsLink.href;
  const servesItem =
    servesHeading.nextElementSibling.querySelector("li") || false;
  const serves = servesItem.querySelector("p").textContent.trim();
  const offering = [];
  if (offeredHeading) {
    const offeringListItems =
      offeredHeading.nextElementSibling.querySelectorAll("li");
    offeringListItems.forEach((item) => {
      offering.push(item.textContent.trim());
    });
  }
  const contactItem = contactHeading
    ? contactHeading.nextElementSibling.querySelector("li")
    : null;
  let contactInfo;
  if (contactItem) {
    contactInfo = contactItem.querySelector("p").textContent.trim();
  }

  return {
    address,
    contactInfo,
    serves,
    googleMapUrl,
    scheduleUrl,
    offering,
  };
};

module.exports = getDetails;
