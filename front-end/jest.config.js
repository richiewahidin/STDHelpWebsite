module.exports = {
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/tests/svgTransform.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/fileMock.js",
  },
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
  testEnvironment: 'jsdom',
};
