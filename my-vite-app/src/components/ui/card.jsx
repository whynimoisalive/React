import React from 'react';

export const Card = ({ children, className }) => (
    <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ children }) => (
    <div className="mb-4 border-b pb-2">
        {children}
    </div>
);

export const CardTitle = ({ children }) => (
    <h2 className="text-2xl font-bold text-gray-800">
        {children}
    </h2>
);

export const CardContent = ({ children }) => (
    <div className="text-gray-700">
        {children}
    </div>
);
