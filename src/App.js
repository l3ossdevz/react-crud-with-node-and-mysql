import "./App.css";
import axios from "axios";
import React, { useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState(0);
    const [newWage, setNewWage] = useState(0);

    const [employeeList, setEmployeeList] = useState([]);

    const getEmployees = () => {
        axios.get("http://localhost:3001/").then((resp) => {
            setEmployeeList(resp.data);
        });
    };

    const addEmployee = () => {
        axios
            .post("http://localhost:3001/create", {
                name,
                age,
                country,
                position,
                wage,
            })
            .then(() => {
                setEmployeeList([
                    ...employeeList,
                    { name, age, country, position, wage },
                ]);
            });
    };

    const updateEmployeeWage = (id) => {
        axios
            .put("http://localhost:3001/update", { wage: newWage, id: id })
            .then((resp) => {
                setEmployeeList(
                    employeeList.map((val) => {
                        return val.id === id
                            ? {
                                  id: val.id,
                                  name: val.name,
                                  age: val.age,
                                  country: val.country,
                                  position: val.position,
                                  wage: newWage,
                              }
                            : val;
                    })
                );
            });
    };

    const deleteEmployeeWage = (id) => {
        axios.delete(`http://localhost:3001/delete/ ${id}`).then((resp) => {
            setEmployeeList(
                employeeList.filter((val) => {
                    return val.id !== id;
                })
            );
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
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setAge(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setCountry(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setPosition(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setWage(e.target.value);
                            }}
                        />
                    </div>
                    <button className="btn btn-success" onClick={addEmployee}>
                        Add Employee
                    </button>
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
                        <div className="employee card mb-5" key={key}>
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
                                <div className="d-flex">
                                    <input
                                        type="number"
                                        placeholder="15000..."
                                        className="form-control"
                                        style={{ width: "300px" }}
                                        onChange={(e) => {
                                            setNewWage(e.target.value);
                                        }}
                                    />
                                    &nbsp;
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => {
                                            updateEmployeeWage(val.id);
                                        }}>
                                        Update
                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            deleteEmployeeWage(val.id);
                                        }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
