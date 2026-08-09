import React, { useReducer, useState } from 'react'

const Todo = () => {

    const initialState = [
        { id: 1, task: 'Learn React', completed: false },
        { id: 2, task: 'Build a Todo App', completed: false },
        { id: 3, task: 'Deploy the App', completed: false }
    ];

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TODO':
                return [...state, { id: state.length + 1, task: action.payload, completed: false }];
            case 'TOGGLE_TODO':
                return state.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
                );
            case 'REMOVE_TODO':
                return state.filter(todo => todo.id !== action.payload);
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [todo, setTodo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'ADD_TODO', payload: todo });
        setTodo('');
    }

    return (
        <div className="min-h-screen bg-slate-900 py-10 px-4 text-white font-sans">
            <h1 className="text-center text-3xl font-bold mb-6">Manage Your Todos</h1>

            {/* Input & Add Form */}
            <form onSubmit={handleSubmit} className="flex max-w-2xl mx-auto mb-8 rounded-lg overflow-hidden shadow-lg">
                <input
                    type="text"
                    placeholder="Write Todo..."
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-800 text-white outline-none placeholder-slate-400"
                />
                <button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-bold transition-colors"
                >
                    Add
                </button>
            </form>

            {/* Cards List */}
            <div className="max-w-2xl mx-auto flex flex-col gap-3">
                {state.map((task) => {
                    const isCompleted = task.completed;
                    return (
                        <div
                            key={task.id}
                            className={`flex justify-between items-center px-5 py-3.5 rounded-lg transition-colors text-black ${
                                isCompleted 
                                    ? 'bg-[#c6e9a7]' 
                                    : 'bg-[#ccbed7]'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: task.id })}
                                    className="w-5 h-5 cursor-pointer accent-green-600"
                                />
                                <span className={`text-lg font-medium ${isCompleted ? 'line-through' : ''}`}>
                                    {task.task}
                                </span>
                            </div>

                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-md font-bold text-sm transition-colors"
                                onClick={() => dispatch({ type: 'REMOVE_TODO', payload: task.id })}
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Todo