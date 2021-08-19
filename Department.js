DbConnector = require('./dbconnect');
const dbConnectObj = new DbConnector();

class Department{
   
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
        getDepartment = (request, response) => {
            const sortby = String(request.query.sortby);
            console.log(request.query.sortby);
            var query = 'SELECT * FROM Department ORDER BY Department_id ASC';
            if(sortby=='Department_id'){
                query = 'SELECT * FROM Department ORDER BY Department_id ASC';
            }
            else if(sortby=='Department_name'){
                query = 'SELECT * FROM Department ORDER BY Department_name ASC';
            }
            dbConnectObj.getPool().query(query,(error, results) => {
              if (error) {
                throw error
              }
              response.status(200).json(results.rows)
            })
          }
        
        getDepartmentById = (request, response) => {
          const id = parseInt(request.params.id)
          console.log(request.params.id);
            dbConnectObj.getPool().query('SELECT * FROM Department WHERE Department_id = $1', [id], (error, results) => {
            if (error) {
              throw error
            }
            
            response.status(200).json(results.rows)
          })
        }
        
        createDepartment = (request, response) => {
          const { Department_name } = request.body
          //console.log(Employee_name);
          //console.log(age);
          //console.log(department);
          //console.log(request.body);
          dbConnectObj.getPool().query('INSERT INTO Department (Department_name) VALUES ($1)', [ Department_name ], (error, results) => {
            if (error) {
              throw error
            }
            //console.log(request.body);
            //console.log(results);
            //console.log(error);
            response.status(201).send(`Department added`) //with ID: ${Results.insertId}`)
        
          })
        }
        
        updateDepartment = (request, response) => {
          const id = parseInt(request.params.id)
          const { Department_name } = request.body
        
          dbConnectObj.getPool().query(
            'UPDATE Department SET Department_name = $1 WHERE Department_id = $2',
            [ Department_name, id],
            (error, results) => {
              if (error) {
                throw error
              }
              response.status(200).send(`Department modified with ID: ${id}`)
            }
          )
        }
        
        deleteDepartment = (request, response) => {
          const id = parseInt(request.params.id)
        
          dbConnectObj.getPool().query('DELETE FROM Department WHERE Department_id = $1', [id], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).send(`Department deleted with ID: ${id}`)
          })
        }
    }
    module.exports = Department;