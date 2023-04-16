// const pattern = /^https?:\/\/(www.)?[-.:/?#@!$&%'()_+~,;=a-zA-Z0-9]+$/;

const patternUrl = (/(^(https?:\/\/)?(www\.)?[^/\s]+\.[^/\s]+(\/[^/\s]*)*#?$)/);
module.exports = patternUrl;
