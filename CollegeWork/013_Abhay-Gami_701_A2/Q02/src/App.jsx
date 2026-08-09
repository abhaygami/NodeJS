import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import FunctionalComp from './Components/FunctionalComp';
import ContainmentDemo from './Components/ContainmentDemo';
import Counter from './Components/Counter';
import StateAndRef from './Components/StateAndRef';
import DigitalClock from './Components/DigitalClock';
import ManualValidationForm from './Components/ManualValidationForm';
import LibraryValidationForm from './Components/LibraryValidationForm';
import EmployeesTable from './Components/EmployeesTable';
import StudentsTable from './Components/StudentsTable';

import Page1 from './Components/Pages/Page1';
import Page2 from './Components/Pages/Page2';
import Page3 from './Components/Pages/Page3';

function App() {
    return (
        <>
            <div className="container py-3">
                {/* Header Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-3 rounded">
                    <div className="navbar-nav flex-wrap ">
                        <Link className="nav-link" to="/">Functional Components</Link>
                        <Link className="nav-link" to="/req2">Conditional Rendering</Link>
                        <Link className="nav-link" to="/req3">Counter</Link>
                        <Link className="nav-link" to="/req4">useState and useRef</Link>
                        <Link className="nav-link" to="/req5">Digital Clock</Link>
                        <Link className="nav-link" to="/req6">Manual Validation</Link>
                        <Link className="nav-link" to="/req7">Library Validation</Link>
                        <Link className="nav-link" to="/req8">Employees Table</Link>
                        <Link className="nav-link" to="/req9">Students Table</Link>
                        {/* <span className="navbar-text px-2">|</span> */}
                        <Link className="nav-link bg-primary text-white rounded px-2" to="/page1">3-Page Routing Flow</Link>
                    </div>
                </nav>

                {/* Dynamic Content Rendering Below Header */}
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Routes>
                            <Route path="/" element={<FunctionalComp />} />
                            <Route path="/req2" element={<ContainmentDemo />} />
                            <Route path="/req3" element={<Counter />} />
                            <Route path="/req4" element={<StateAndRef />} />
                            <Route path="/req5" element={<DigitalClock />} />
                            <Route path="/req6" element={<ManualValidationForm />} />
                            <Route path="/req7" element={<LibraryValidationForm />} />
                            <Route path="/req8" element={<EmployeesTable />} />
                            <Route path="/req9" element={<StudentsTable />} />

                            {/* Sequential Routing Flow */}
                            <Route path="/page1" element={<Page1 />} />
                            <Route path="/page2" element={<Page2 />} />
                            <Route path="/page3" element={<Page3 />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
