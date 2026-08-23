import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
/*🔥 STEP 1 — UI Skeleton (Navbar + Routes + Pages)
•	Navbar component
•	React Router setup
•	Home / Courses / Login / Register pages
•	Placeholder pages
•	Tailwind layout
👉 After UI skeleton is built, API integration becomes easy.
________________________________________
🔥 STEP 2 — AUTH MODULE (Redux Toolkit + axios + createAsyncThunk)
•	createAsyncThunk(login)
•	createAsyncThunk(register)
•	axios instance with baseURL
•	authSlice (token, user)
•	Login page works with backend
•	Register page works
•	Logout button
👉 You become expert in Redux Toolkit async flow.
________________________________________
🔥 STEP 3 — COURSES MODULE (RTK Query)
•	apiSlice setup (already done)
•	injecting endpoints for:
o	getCourses
o	getCategories
o	getCourseById
•	Building CourseCard UI
•	Display featured courses
•	Filter by category
•	Category page slider
•	Course Details page
👉 You become expert in RTK Query.
________________________________________
🔥 STEP 4 — PROTECTED ROUTES
•	If NO token → redirect to login
•	If admin → show admin routes
•	If student → show enrolled courses
•	useSelector + Outlet + Navigate
________________________________________
🔥 STEP 5 — MERGING BOTH APPROACHES
We answer these:
❓ How does Redux Toolkit login interact with RTK Query?
→ token is saved → RTK Query auto attaches token via prepareHeaders
❓ How does RTK Query update Redux store?
→ no need, it caches internally
❓ Why some APIs use RTK Query & some use Redux?
→ perfect interview explanation
________________________________________
🔥 STEP 6 — OPTIONAL ADVANCED
•	File uploads
•	Video uploads
•	Optimistic updates for reviews
•	WebSocket integration (future)

*/