const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="bg-gray-200 rounded-xl overflow-hidden">
                {/* Image skeleton */}
                <div className="aspect-video bg-gray-300"></div>

                {/* Content skeleton */}
                <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="pt-4 border-t border-gray-200">
                        <div className="h-8 bg-gray-300 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
