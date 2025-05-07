import React from 'react';

function Footer(props) {
    return (
        <div className="w-full h-20 flex justify-center text-center bg-black">
            <div className="w-full h-50 dark:bg-gray-900 transition-colors flex items-center justify-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    &copy; 2023 Art. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer;