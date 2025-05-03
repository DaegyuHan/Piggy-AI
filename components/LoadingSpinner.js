'use client';

export default function LoadingSpinner() {
    return (
        <div className="flex justify-center py-8">
            <div className="flex space-x-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
        </div>
    );
}
