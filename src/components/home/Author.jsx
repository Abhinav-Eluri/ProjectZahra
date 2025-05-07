import React from 'react';

function Author(props) {
    return (
        <div className="w-full h-screen bg-gray-100 dark:bg-gray-900 transition-colors flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-4xl font-bold mb-4">Author</h1>
                <p className="text-lg">This is the author page.</p>
            </div>
        </div>
    );
}

export default Author;