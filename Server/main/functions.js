module.exports = function cleanUpSpecialChars(str) {
  // we need this function so we can use pg promise set column, they only accept variables as strings
  return str
    .replace(/[ĖĘ]/g, "E")
    .replace(/[ėę]/g, "e")
    .replace(/[č]/g, "c")
    .replace(/[Č]/g, "C")
    .replace(/[ą]/g, "a")
    .replace(/[Ą]/g, "A")
    .replace(/[į]/g, "i")
    .replace(/[Į]/g, "I")
    .replace(/[ųū]/g, "u")
    .replace(/[ŲŪ]/g, "U")
    .replace(/[Š]/g, "S")
    .replace(/[š]/g, "s")
    .replace(/[ž]/g, "z")
    .replace(/ /g, "_")
    .replace(/[^a-zA-Z0-9_]/, "");
};
