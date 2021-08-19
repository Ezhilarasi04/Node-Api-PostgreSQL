DbConnector = require('./dbconnect');
const dbConnectObj = new DbConnector();   

    class Employee{
   
//     constructor (){
//     DbConnector = require('./dbconnect');
//     const dbConnectObj = new DbConnector();   
// }

    
   
    // getEmployee = (request, response) => {
        
    //     dbConnectObj.getPool().query('SELECT * FROM Employee ORDER BY Employee_id ASC', (error, results) => {
    //       if (error) {
    //         throw error
    //       }
    //       response.status(200).json(results.rows)
    //     })
    //   }
    getEmployee = (request, response) => {
        const sortby = String(request.query.sortby);
        console.log(request.query.sortby);
        var query = 'SELECT * FROM Employee ORDER BY Employee_id ASC';
        if(sortby=='Employee_id'){
            query = 'SELECT * FROM Employee ORDER BY Employee_id ASC';
        }
        else if(sortby=='Employee_name'){
            query = 'SELECT * FROM Employee ORDER BY Employee_name ASC';
        }
        dbConnectObj.getPool().query(query,(error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
    
    getEmployeeById = (request, response) => {
      const id = parseInt(request.params.id)
      console.log(request.params.id);
        dbConnectObj.getPool().query('SELECT * FROM Employee WHERE Employee_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        
        response.status(200).json(results.rows)
      })
    }
    
    createEmployee = (request, response) => {
      const { Employee_name, Employee_age, Department_id } = request.body
      //console.log(Employee_name);
      //console.log(age);
      //console.log(department);
      //console.log(request.body);
      dbConnectObj.getPool().query('INSERT INTO Employee (Employee_name, Employee_age, Department_id) VALUES ($1, $2, $3)', [ Employee_name, Employee_age, Department_id], (error, results) => {
        if (error) {
          throw error
        }
        //console.log(request.body);
        //console.log(results);
        //console.log(error);
        response.status(201).send(`Employee added`) //with ID: ${Results.insertId}`)
    
      })
    }
    
    updateEmployee = (request, response) => {
      const id = parseInt(request.params.id)
      const { Employee_name, Employee_age, Department_id} = request.body
    
      dbConnectObj.getPool().query(
        'UPDATE Employee SET Employee_name = $1, Employee_age = $2, Department_id = $3 WHERE Employee_id = $4',
        [ Employee_name, Employee_age, Department_id, id],
        (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Employee modified with ID: ${id}`)
        }
      )
    }
    
    deleteEmployee = (request, response) => {
      const id = parseInt(request.params.id)
    
      dbConnectObj.getPool().query('DELETE FROM Employee WHERE Employee_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Employee deleted with ID: ${id}`)
      })
    }
}


//module.exports = {
    // getEmployee,
    // getEmployeeById,
    // createEmployee,
    // updateEmployee,
    // deleteEmployee
//}
module.exports = Employee;