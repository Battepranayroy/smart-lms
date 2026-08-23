export default function CourseSidebar({ course, onEnroll, enrolling }) {
  return (
    <div className="sticky top-24 bg-white shadow rounded-xl p-6 space-y-4">
      <p className="text-3xl font-bold">
        ₹ {course.price}
      </p>

      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
        Add to Cart
      </button>

      <button
        onClick={onEnroll}
        disabled={enrolling}
        className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg"
      >
        {enrolling ? "Processing..." : "Buy Now"}
      </button>

      <div className="border-t pt-4 text-sm text-gray-600 space-y-2">
        <p>⏱ Full lifetime access</p>
        <p>
          👥 {course.studentsEnrolled?.length || 0} students enrolled
        </p>
      </div>
    </div>
  );
}
