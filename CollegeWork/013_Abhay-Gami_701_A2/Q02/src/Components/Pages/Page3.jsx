import { Link } from 'react-router-dom';

export default function Page3() {
  return (
    <div className="card p-4 shadow-sm text-center">
      <h2>Page 3 (Step 3)</h2>
      <p className="text-muted">You are on the final page of this flow.</p>
      <Link to="/" className="btn btn-success mt-2">&larr; Return to Home ("/")</Link>
    </div>
  );
}