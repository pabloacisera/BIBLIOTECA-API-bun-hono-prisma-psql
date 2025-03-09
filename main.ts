import { Hono } from 'hono'
import { config } from 'dotenv';
import bookRoutes from './src/routes/BookRoutes'
import swaggerJSDoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'
import memberRoutes from './src/routes/memberRoutes'

config();

// validar definicion de PORT
if(!process.env.PORT){
  throw new Error("Variable port is not defined")
}

// guardar el puerto
const PORT = parseInt(process.env.PORT)

const app = new Hono()

// Configuracion de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Biblioteca',
      version: '0.0.1',
      description: 'Documentacion de api para sistema de bibliotecas',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      }
    ],
  },
  apis: ['./src/routes/*.ts'],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

// Ruta para servir la documentación de Swagger en formato JSON
app.get('/api-docs.json', (c)=> c.json(swaggerSpec))

// Ruta para servir la interfaz de swagger swaggerUI
app.get('/docs', (c)=> {
  return c.html(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Swagger UI</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
      <script>
        SwaggerUIBundle({
          url: '/api-docs.json',
          dom_id: '#swagger-ui',
        });
      </script>
    </body>
    </html>`)
})

//routes
app.route('/api/books', bookRoutes)
app.route('/api/members', memberRoutes)

export default{
  port: PORT,
  fetch: app.fetch,
}



