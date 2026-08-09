import { useState, useRef } from 'react';

export default function StateAndRef() {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div className="card p-3 shadow-sm">
            <h3>Requirement 4: useState & useRef</h3>
            <div className="mb-3">
                <label className="form-label">Type something (useState):</label>
                <input
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Click button below to focus me"
                />
            </div>
            <p>State output: <strong>{text}</strong></p>
            <button className="btn btn-info text-white" onClick={focusInput}>Focus Input via useRef</button>
        </div>
    );
}