import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="card p-3 shadow-sm">
            <h3>Requirement 3: Counter Component</h3>
            <h4 className="my-3">Count: <span className="badge bg-primary">{count}</span></h4>
            <div className="btn-group">
                <button className="btn btn-success" onClick={() => setCount(count + 1)}>Increment</button>
                <button className="btn btn-danger" onClick={() => setCount(count - 1)}>Decrement</button>
                <button className="btn btn-secondary" onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    );
}