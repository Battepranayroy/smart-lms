const categories = [
  "All",
  "Business",
  "Data Science",
  "Design",
  "Marketing",
  "Mobile Development",
  "Web Development",
];


export default function FilterPanel({ filters, setFilters }) {

  const handleCategoryClick = (category) => {
    setFilters(prev => ({
      ...prev,
      category: category === "All" ? "" : category
    }));
  };

  return (
    <div className="col-span-3">
      <div className="bg-white rounded-xl shadow p-5 space-y-6">

        {/* SEARCH */}
        <div>
          <h3 className="font-semibold mb-2">Search</h3>
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.title}
            onChange={(e) =>
              setFilters(prev => ({ ...prev, title: e.target.value }))
            }
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.map(cat => {
              const isActive =
                (filters.category === "" && cat === "All") ||
                filters.category === cat;

              return (
                <li
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`cursor-pointer px-3 py-1 rounded-md
                    ${isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {cat}
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>
  );
}
