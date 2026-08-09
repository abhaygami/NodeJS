import { useForm } from 'react-hook-form';

export default function LibraryValidationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => alert('Form Submitted Successfully!\n' + JSON.stringify(data, null, 2));

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-3">Requirement 7: Live Validation (React Hook Form)</h3>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label font-weight-bold">Email Address</label>
          <input
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid email address'
              }
            })}
            autoComplete="off"
            placeholder="user@example.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="form-label font-weight-bold">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message: 'Password must have min 6 chars, 1 uppercase, 1 lowercase, 1 digit & 1 special char'
              }
            })}
            autoComplete="off"
            placeholder="Enter secure password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}