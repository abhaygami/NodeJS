import { useState } from 'react';

export default function ManualValidationForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Real-time Live Manual Validation
        if (name === 'email') {
            if (!value) {
                setErrors((prev) => ({ ...prev, email: 'Email is required' }));
            } else if (!emailRegex.test(value)) {
                setErrors((prev) => ({ ...prev, email: 'Enter a valid email address (e.g. name@domain.com)' }));
            } else {
                setErrors((prev) => ({ ...prev, email: '' }));
            }
        }

        if (name === 'password') {
            if (!value) {
                setErrors((prev) => ({ ...prev, password: 'Password is required' }));
            } else if (!passwordRegex.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    password: 'Password must have min 6 chars, 1 uppercase, 1 lowercase, 1 digit & 1 special char (@$!%*?&)'
                }));
            } else {
                setErrors((prev) => ({ ...prev, password: '' }));
            }
        }
    };

    return (
        <div className="card p-4 shadow-sm">
            <h3 className="mb-3">Requirement 6: Live Manual Validation</h3>
            <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
                <div className="mb-3">
                    <label className="form-label font-weight-bold">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        className={`form-control ${errors.email ? 'is-invalid' : formData.email ? 'is-valid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="user@example.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label font-weight-bold">Password</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        className={`form-control ${errors.password ? 'is-invalid' : formData.password ? 'is-valid' : ''}`}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter secure password"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
            </form>
        </div>
    );
}