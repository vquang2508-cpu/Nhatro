import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    // Helper to get first image
    const getThumbnail = (imageString) => {
        if (!imageString) return 'https://via.placeholder.com/640x360?text=No+Image';
        return imageString.split('\n')[0].trim();
    };

    return (
        <Link
            to={`/listings/${listing.id}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
            {/* Image Container - 16:9 aspect ratio */}
            <div className="relative aspect-video overflow-hidden bg-gray-200">
                <img
                    src={getThumbnail(listing.image_0)}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/640x360?text=Error'; }}
                />
                {/* Area Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                    <span className="text-sm font-semibold text-gray-700">
                        {listing.area}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {listing.title}
                </h3>

                {/* Address */}
                <div className="flex items-start mb-3">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-gray-600 line-clamp-1">
                        {listing.address}
                    </p>
                </div>

                {/* Room Count */}
                {listing.room_count && (
                    <div className="flex items-center mb-4">
                        <svg className="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <p className="text-sm text-gray-600">
                            {listing.room_count}
                        </p>
                    </div>
                )}

                {/* Price - Prominent */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text truncate">
                        {listing.price}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ListingCard;
