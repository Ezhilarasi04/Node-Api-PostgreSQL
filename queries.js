// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'api',
//   password: 'password',
//   port: 5432,
// })
const DbConnector = require('./dbconnect');

/*----------Employee-API-----------*/

// const getEmployee = (request, response) => {
//   pool.query('SELECT * FROM Employee ORDER BY Employee_id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }
const getEmployee = (request, response) => {
  const obj = new DbConnector();
  let a = obj.tester();
  console.log(a);
  obj.getPool().query('SELECT * FROM Employee ORDER BY Employee_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEmployeeById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM Employee WHERE Employee_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createEmployee = (request, response) => {
  const { Employee_name, Employee_age, Department_id } = request.body
  //console.log(Employee_name);
  //console.log(age);
  //console.log(department);
  //console.log(request.body);
  pool.query('INSERT INTO Employee (Employee_name, Employee_age, Department_id) VALUES ($1, $2, $3)', [ Employee_name, Employee_age, Department_id], (error, results) => {
    if (error) {
      throw error
    }
    //console.log(results);
    //console.log(error);
    response.status(201).send(`Employee added`) //with ID: ${Results.insertId}`)

  })
}

const updateEMPLOYEE = (request, response) => {
  const id = parseInt(request.params.id)
  const { Employee_name, Employee_age, Department_id} = request.body

  pool.query(
    'UPDATE Employee SET Employee_name = $1, Employee_age = $2, Department_id = $3 WHERE Employee_id = $4',
    [ Employee_name, Employee_age, Department_id, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteEmployee = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM Employee WHERE Employee_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Employee deleted with ID: ${id}`)
  })
}


/*----------Department-API-----------*/

const getDepartment = (request, response) => {
  pool.query('SELECT * FROM Department ORDER BY Department_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDepartmentById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM Department WHERE Department_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createDepartment = (request, response) => {
  const { Department_name} = request.body
  //console.log(Employee_name);
  //console.log(age);
  //console.log(department);
  //console.log(request.body);
  pool.query('INSERT INTO Department (Department_name) VALUES ($1)', [Department_name], (error, results) => {
    if (error) {
      throw error
    }
    //console.log(results);
    //console.log(error);
    response.status(201).send(`Department added`) //with ID: ${Results.insertId}`)

  })
}

const updateDepartment = (request, response) => {
  const id = parseInt(request.params.id)
  const { Department_name} = request.body

  pool.query(
    'UPDATE Department SET Department_name = $1 WHERE Department_id = $2',
    [Department_name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Department modified with ID: ${id}`)
    }
  )
}

const deleteDepartment = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM Department WHERE Department_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Department deleted with ID: ${id}`)
  })
}
module.exports = {
  getEmployee,
  getEmployeeById,
  createEmployee,
  updateEMPLOYEE,
  deleteEmployee, 
  getDepartment,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}