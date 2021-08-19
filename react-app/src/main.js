import React, {Component, useState} from 'react';
import './App.css';
//import { createEmployee } from './query';

function submitEmployee(Employee_name,Employee_age,Department_id){
    const data = {

        Employee_name: Employee_name,
        Employee_age: Employee_age,
        Department_id: Department_id

      }
    let apiUrl = "http://localhost:3002/employees"
    apiCall(data,apiUrl,"POST");
    hideEmployeeForm();
}
function showEmployeeForm(){
    document.getElementById("createEmpForm").style.display = "block";
}
function hideEmployeeForm(){
    alert("Employee added !!")
    document.getElementById("createEmpForm").style.display = "none";
}

function updateEmployee(Employee_name,Employee_age,Department_id,id){
  const data = {

      Employee_name: Employee_name,
      Employee_age: Employee_age,
      Department_id: Department_id

    }
  let apiUrl = "http://localhost:3002/employees/"+id;
  apiCall(data,apiUrl,"PUT");
  hideUpdateEmployeeForm();
}
function showUpdateEmployeeForm(){
  document.getElementById("updateEmpForm").style.display = "block";
}
function hideUpdateEmployeeForm(){
  alert("Employee updated !!")
  document.getElementById("updateEmpForm").style.display = "none";
}


function apiCall(data,link,methodtype){
    fetch(link, {
    method: methodtype,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => {
    return res
  }).then((data) => {
    alert(data)
  })
  }
function App() {
  const [Employee_age, setEmployee_age] = useState('');
    const [Employee_name, setEmployee_name] = useState('');
    const [Department_id, setDepartment_id] = useState('');
    const [Employee_age1, setEmployee_age1] = useState('');
    const [Employee_name1, setEmployee_name1] = useState('');
    const [Department_id1, setDepartment_id1] = useState('');
    const [Employee_id, setEmployee_id] = useState('');
  return (
    <div className="App">
      <h1>Employee Management</h1>
         <button onClick={ ()=>{showEmployeeForm()}}>CREATE-Employee</button>
         <button onClick={ ()=>{showUpdateEmployeeForm()}}>UPDATE-Employee</button>
         
         <button>READ-Employee</button>
         <button>DELETE-Employee</button>
         <button>CREATE-Department</button>
         <button>READ-Department</button>
         <button>UPDATE-Department</button>
         <button>DELETE-Department</button>
    <form id="createEmpForm" style={{display: "none"}}>
    <label for="Name"><b>Name</b></label>
    <input
            type="text"
            value={Employee_name}
            onChange={e => setEmployee_name(+e.target.value)}
            //placeholder="0"
          />
        <label for="age"><b>age</b></label>
          <input
            type="text"
            value={Employee_age}
            onChange={e => setEmployee_age(+e.target.value)}
            //placeholder="0"
          />
  
     
    <label for="Department id"><b>Department id</b></label>
    <input
            type="text"
            value={Department_id}
            onChange={e => setDepartment_id(+e.target.value)}
            //placeholder="0"
          />
    <button type="submit" onClick={ ()=>{submitEmployee(Employee_name,Employee_age,Department_id)}}>Submit</button>
    </form>

    <form id="updateEmpForm" style={{display: "none"}}>
    <label for="Name"><b>Name</b></label>
    <input
            type="text"
            value={Employee_name1}
            onChange={e => setEmployee_name1(+e.target.value)}
            //placeholder="0"
          />
        <label for="age"><b>age</b></label>
          <input
            type="text"
            value={Employee_age1}
            onChange={e => setEmployee_age1(+e.target.value)}
            //placeholder="0"
          />
  
     
    <label for="Department id"><b>Department id</b></label>
    <input
            type="text"
            value={Department_id1}
            onChange={e => setDepartment_id1(+e.target.value)}
            //placeholder="0"
          />
    <label for="Employee id"><b>Employee id</b></label>
    <input
            type="number"
            value={Employee_id}
            onChange={e => setEmployee_id(+e.target.value)}
            //placeholder="0"
          />
    <button type="submit" onClick={ ()=>{updateEmployee(Employee_name1,Employee_age1,Department_id1,Employee_id)}}>Submit</button>
    </form>
    </div>
    
  
    
  );
}

export default App;