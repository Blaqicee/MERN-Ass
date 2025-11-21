import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/example`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">MERN Deployment Starter</h1>
      <p className="text-lg">API Message: {message || 'Loading...'}</p>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Replace this with your actual frontend components
      </p>
    </div>
  );
}

export default App;
