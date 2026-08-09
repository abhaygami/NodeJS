import { Link } from 'react-router-dom';

export default function Page2() {
    return (
        <div className="card p-4 shadow-sm text-center">
            <h2>Page 2 (Step 2)</h2>
            <p className="text-muted">You are on the second routing page.</p>
            <Link to="/page3" className="btn btn-warning mt-2">Go to Page 3 &rarr;</Link>
        </div>
    );
}