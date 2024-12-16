const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Omni API",
    description: "API Documentation",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger-output.json";
const routes = ["../app.ts"];

swaggerAutogen(outputFile, routes, doc);
