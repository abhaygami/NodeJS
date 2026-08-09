import { Link } from 'react-router-dom';

export default function Page1() {
    return (
        <div className="card p-4 shadow-sm text-center">
            <h2>Page 1 (Step 1)</h2>
            <p className="text-muted">You are on the first routing page.</p>
            <Link to="/page2" className="btn btn-primary mt-2">Go to Page 2 &rarr;</Link>
        </div>
    );
}