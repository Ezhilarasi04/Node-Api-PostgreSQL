const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const db = require('./queries');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const port = 3002;
const employee = require('./Employee')
const department = require('./Department')
app.use(cors())

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info:{
      title: 'Employee API',
      version: "1.0.0",
      description: "Employee API Information",
    },
      servers: [
        {
          url: "http://localhost:3002"
        }
      ],
    },
      apis: ["index.js"]
};

const swaggerDocs =  swaggerjsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

//Employee-API

// app.get('/employees', db.getEmployee)
// app.get('/employees/:id', db.getEmployeeById)
// app.post('/employees', db.createEmployee)
// app.put('/employees/:id', db.updateEMPLOYEE)
// app.delete('/employees/:id', db.deleteEmployee)
const empObj = new employee();
app.get('/employees', empObj.getEmployee)
app.get('/employees/:id',empObj.getEmployeeById)
app.post('/employees', empObj.createEmployee)
app.put('/employees/:id', empObj.updateEmployee)
app.delete('/employees/:id', empObj.deleteEmployee)

//Department-API

// app.get('/departments', db.getDepartment)
// app.get('/departments/:id', db.getDepartmentById)
// app.post('/departments', db.createDepartment)
// app.put('/departments/:id', db.updateDepartment)
// app.delete('/departments/:id', db.deleteDepartment)
const depObj = new department();
app.get('/departments', depObj.getDepartment)
app.get('/departments/:id',depObj.getDepartmentById)
app.post('/departments', depObj.createDepartment)
app.put('/departments/:id', depObj.updateDepartment)
app.delete('/departments/:id', depObj.deleteDepartment)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})