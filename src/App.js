import "./App.css";
import axios from "axios";
import React, { useState } from "react";

function App() {
    const [employeeList, setEmployeeList] = useState([]);

    const getEmployees = () => {
        axios.get("http://localhost:3001/employees").then((resp) => {
            setEmployeeList(resp.data);
        });
    };

    return (
        <div className=" container">
            <h1 className="app mt-5 mb-4">Employee Informations</h1>
            <div className="informations">
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                            Age:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter age"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label">
                            Country:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter country"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position" className="form-label">
                            Position:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter position"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wage" className="form-label">
                            Wage:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter wage"
                        />
                    </div>
                    <button className="btn btn-success">Add Employee</button>
                </form>
            </div>
            <hr />
            <div className="employees">
                <button className="btn btn-primary" onClick={getEmployees}>
                    Show Employees
                </button>
                <br />
                <br />
                {employeeList.map((val, key) => {
                    return (
                        <div className="employee card">
                            <div className="card-body text-start">
                                <p className="card-texr">Name: {val.name}</p>
                                <p className="card-texr">Age: {val.age}</p>
                                <p className="card-texr">
                                    Country: {val.country}
                                </p>
                                <p className="card-texr">
                                    Position: {val.position}
                                </p>
                                <p className="card-texr">Wage: {val.wage}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
