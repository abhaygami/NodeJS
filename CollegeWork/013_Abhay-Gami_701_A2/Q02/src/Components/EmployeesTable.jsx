import employeesData from './Data/employees.json';

export default function EmployeesTable() {
    return (
        <div className="card p-3 shadow-sm">
            <h3>Requirement 8: Fetch Employees JSON</h3>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Salary (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesData.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}