// Nested Child Component
function StatusBadge({ isOnline }) {
    return (
        <span className={`badge ${isOnline ? 'bg-success' : 'bg-secondary'}`}>
            {isOnline ? 'Online' : 'Offline'}
        </span>
    );
}

// Containment Component (using props.children)
function CustomCard({ title, children }) {
    return (
        <div className="card shadow-sm mb-3">
            <div className="card-header bg-primary text-white fw-bold">{title}</div>
            <div className="card-body">{children}</div>
        </div>
    );
}

export default function ContainmentDemo() {
    const users = [
        { id: 1, name: 'Alice', online: true },
        { id: 2, name: 'Bob', online: false },
        { id: 3, name: 'Charlie', online: true }
    ];

    return (
        <CustomCard title="Requirement 2: Conditional, List, Nested & Children Demo">
            <h5>User Activity List</h5>
            <ul className="list-group">
                {users.map((u) => (
                    <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {u.name}
                        {/* Nested Component with Conditional prop */}
                        <StatusBadge isOnline={u.online} />
                    </li>
                ))}
            </ul>
        </CustomCard>
    );
}