import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ListingCard from '../components/ListingCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import FilterSidebar from '../components/FilterSidebar';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        minArea: '',
        district: '',
        city: ''
    });
    const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

    useEffect(() => {
        fetchListings();
    }, [filters]); // Refetch when filters change

    const fetchListings = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from('listings')
                .select('*')
                .eq('is_visible', true)
                .order('created_at', { ascending: false });

            // Apply Filters
            if (filters.minPrice) {
                query = query.gte('price_num', parseInt(filters.minPrice));
            }
            if (filters.maxPrice) {
                query = query.lte('price_num', parseInt(filters.maxPrice));
            }
            if (filters.minArea) {
                query = query.gte('area_num', parseFloat(filters.minArea));
            }
            if (filters.city) {
                query = query.eq('city', filters.city);
            }
            if (filters.district) {
                query = query.ilike('address', `%${filters.district}%`);
            }

            const { data, error } = await query;

            if (error) throw error;

            setListings(data || []);
        } catch (err) {
            console.error('Error fetching listings:', err);
            setError('Không thể tải danh sách. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // Client-side search (Title/Address) - applied ON TOP of database filters
    const filteredListings = listings.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            Tìm Ngôi Nhà Mơ Ước
                        </h1>
                        <p className="text-lg text-blue-100 mb-8">
                            Hàng ngàn phòng trọ, căn hộ giá tốt tại TP.HCM
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder="Tìm theo tên đường, địa điểm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container-custom py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar (Desktop) / Toggle (Mobile) */}
                    <div className="lg:w-1/4">
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium flex justify-center items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                            </button>
                        </div>

                        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                            <FilterSidebar onFilterChange={handleFilterChange} />
                        </div>
                    </div>

                    {/* Listings Grid */}
                    <div className="lg:w-3/4">
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">
                                Kết quả tìm kiếm
                            </h2>
                            <span className="text-sm text-gray-500">
                                {filteredListings.length} tin đăng
                            </span>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(4)].map((_, index) => (
                                    <LoadingSkeleton key={index} />
                                ))}
                            </div>
                        ) : (
                            <>
                                {filteredListings.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {filteredListings.map((listing) => (
                                            <ListingCard key={listing.id} listing={listing} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                                        <p className="text-gray-500 text-lg">Không tìm thấy phòng trọ nào phù hợp.</p>
                                        <button
                                            onClick={() => setFilters({ minPrice: '', maxPrice: '', minArea: '', district: '' })}
                                            className="mt-4 text-blue-600 hover:underline"
                                        >
                                            Xóa bộ lọc
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Listings;
