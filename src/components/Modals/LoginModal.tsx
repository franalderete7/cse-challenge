import React from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Login successful');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-800 p-8 rounded-lg max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Sign In</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-purple-400 hover:text-purple-300 font-medium">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}; 