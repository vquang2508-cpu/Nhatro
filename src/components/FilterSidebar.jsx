import { useState } from 'react';

const CITIES = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'];

const DISTRICTS = [
    'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 'Quận 11', 'Quận 12',
    'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận', 'Tân Bình', 'Tân Phú', 'Bình Tân', 'Thủ Đức', 'Nhà Bè', 'Hóc Môn', 'Củ Chi', 'Bình Chánh', 'Cần Giờ'
];

const FilterSidebar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        minArea: '',
        district: '',
        city: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    const handleReset = () => {
        const emptyFilters = {
            minPrice: '',
            maxPrice: '',
            minArea: '',
            district: '',
            city: ''
        };
        setFilters(emptyFilters);
        onFilterChange(emptyFilters);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Bộ lọc tìm kiếm</h3>
                <button
                    onClick={handleReset}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Đặt lại
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* City */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thành phố</label>
                    <select
                        name="city"
                        value={filters.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        <option value="">Tất cả thành phố</option>
                        {CITIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* District */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quận / Huyện</label>
                    <select
                        name="district"
                        value={filters.district}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        <option value="">Tất cả quận/huyện</option>
                        {DISTRICTS.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng giá (VND)</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Từ"
                            value={filters.minPrice}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Đến"
                            value={filters.maxPrice}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>
                </div>

                {/* Area */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diện tích tối thiểu (m²)</label>
                    <input
                        type="number"
                        name="minArea"
                        placeholder="Nhập diện tích..."
                        value={filters.minArea}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Áp dụng bộ lọc
                </button>
            </form>
        </div>
    );
};

export default FilterSidebar;
