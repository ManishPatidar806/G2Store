const Alert = ({ type, message, visible, setVisible }) => {

  const colors = {
    info: "text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800",
    danger: "text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800",
    success: "text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800",
    warning: "text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800",
    dark: "text-gray-800 border-gray-300 bg-gray-50 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600",
  };

  return (
    <div
      className={`fixed top-20 left-0 right-0 mx-auto w-full max-w-3xl px-4 z-60 ${visible ? "" : "hidden"}`}
      role="alert"
    >
      <div className={`flex items-center p-4 mb-4 border-t-4 ${colors[type]} rounded-lg shadow-lg`}>
        <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ml-3 text-sm font-medium">
        {message}
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8"
        onClick={() => setVisible && setVisible(false)}
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
      </div>
    </div>
  );
};

export default Alert;