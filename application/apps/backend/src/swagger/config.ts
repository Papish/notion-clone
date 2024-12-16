import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Omni App",
      version: "1.0.0",
      description: "Application Rest API Documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [path.join(__dirname, "../api/*.ts")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
