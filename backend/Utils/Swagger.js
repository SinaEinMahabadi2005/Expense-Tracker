import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "حرکات ورزشی",
      version: "1.0.0",
      description: " یک سیستم برای مدیریت حرکات ورزشی است.",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Modules/**/docs.js"],
};
export const swaggerSpace = swaggerJSDoc(options);
