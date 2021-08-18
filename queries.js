const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})
const getEmployee = (request, response) => {
  pool.query('SELECT * FROM Employee ORDER BY Employee_id ASC', (error, results) => {
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
  const { name, age, department } = request.body

  pool.query('INSERT INTO Employee (Employee_name, Employee_age, Department_id) VALUES ($1, $2, $3)', [ name, age, department], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Employee added with ID: ${result.insertId}`)
  })
}

const updateEMPLOYEE = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, age, department} = request.body

  pool.query(
    'UPDATE Employee SET Employee_name = $1, Employee_age = $2, Department_id = $3 WHERE Employee_id = $4',
    [ name, age, department, id],
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

module.exports = {
  getEmployee,
  getEmployeeById,
  createEmployee,
  updateEMPLOYEE,
  deleteEmployee,
}