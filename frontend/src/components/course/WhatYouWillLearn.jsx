export default function WhatYouWillLearn({ tags }) {
  if (!tags?.length) return null;

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        What you'll learn
      </h2>

      <div className="grid grid-cols-2 gap-3 text-sm">
        {tags.map((tag, index) => (
          <div key={index} className="flex gap-2">
            <span className="text-green-500">✔</span>
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
