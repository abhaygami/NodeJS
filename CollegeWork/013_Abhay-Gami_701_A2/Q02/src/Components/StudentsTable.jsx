import { useState } from 'react';
import studentsData from './Data/students.json';

export default function StudentsTable() {
    const [search, setSearch] = useState('');
    const [semester, setSemester] = useState('All');
    const [division, setDivision] = useState('All');
    const [gender, setGender] = useState('All');

    const filteredStudents = studentsData.filter((s) => {
        const matchesName = s.firstName.toLowerCase().includes(search.toLowerCase());
        const matchesSem = semester === 'All' || s.semester === semester;
        const matchesDiv = division === 'All' || s.div === division;
        const matchesGender = gender === 'All' || s.gender === gender;

        return matchesName && matchesSem && matchesDiv && matchesGender;
    });

    return (
        <div className="card p-3 shadow-sm">
            <h3>Requirement 9: Fetch Students JSON with Search & Filters</h3>

            {/* Search & Filters Controls */}
            <div className="row g-2 mb-3 mt-1">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by First Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                        <option value="All">All Semesters</option>
                        <option value="Sem 4">Sem 4</option>
                        <option value="Sem 6">Sem 6</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={division} onChange={(e) => setDivision(e.target.value)}>
                        <option value="All">All Divisions</option>
                        <option value="A">Div A</option>
                        <option value="B">Div B</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="All">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>

            <table className="table table-hover table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Semester</th>
                        <th>Div</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.firstName}</td>
                                <td>{s.lastName}</td>
                                <td>{s.semester}</td>
                                <td>{s.div}</td>
                                <td>{s.gender}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">No matching student found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}