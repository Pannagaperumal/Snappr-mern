const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Snappr API Documentation',
        version: '1.0.0',
        description: 'Check out all the api endpoints of snappr here',
      },
      basePath: '/', // Base path of the API
    },
    apis: ['routes/UserRoutes.js'], // Path to the API route files
  };
  
  export default swaggerOptions;
  