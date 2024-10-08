import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJSDoc.Options = {
  definition:{
    openapi: '3.0.0',
    info: {
      title: 'API Anjo Bom',
      version: '1.0.0',
      description: 'API para gerenciamento de doações e doadores.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local development server'
      },
      {
        url: 'https://apianjobom.victordev.shop',
        
        description: 'Production server'
      }
    ]
  
  },
  apis:[`${path.join(__dirname, '../**/**/routes/*')}`]
}
const swaggerSpec = swaggerJSDoc(options) ;
export default swaggerSpec;