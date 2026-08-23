export default function TopBar({ total, filters, setFilters }) {
  return (
    <div className="bg-white rounded-xl shadow px-5 py-4 mb-6 flex justify-between items-center">
      <p className="text-sm text-gray-600">
        Showing {total} courses
      </p>

      <div className="flex items-center gap-2 text-sm">
        <span>Sort by:</span>
        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters(prev => ({ ...prev, sort: e.target.value }))
          }
          className="border rounded-md px-2 py-1"
        >
          <option value="popularity">Popularity</option>
          <option value="rating">Highest Rated</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
