import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { resetAuthState } from "../features/auth/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
      dispatch(resetAuthState());
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="pt-20 px-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Register"}
        </button>
      </form>
      <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 font-medium">
                Login
              </a>
            </p>
      </div>
    </div>
  );
}
