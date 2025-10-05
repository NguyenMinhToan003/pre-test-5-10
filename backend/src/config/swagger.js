// config/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Revenue Admin API",
      version: "1.0.0",
      description: "API documentation for Revenue Admin Dashboard",
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}/api` }
    ],
    components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
      },
    },
  },

  },
  // Đường dẫn tuyệt đối tới file routes
  apis: [path.join(__dirname, "../routes/*.js")],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log("Swagger docs available at: /api/docs");
  console.log("Swagger paths:", Object.keys(specs.paths));
};

module.exports = setupSwagger;
