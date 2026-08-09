# Practical Assignment 2

## Question 1: CDN-Based React Application
Create two React components using the **CDN approach** without using any build tools (Vite/CRA).

### Requirements:
* Load `react`, `react-dom`, and `@babel/standalone` using CDN `<script>` tags inside a single `index.html` file.
* Define two distinct functional components (e.g., `Header` and `UserProfile`).
* Render both components into the DOM using `ReactDOM.createRoot()`.

---

## Question 2: Vite React Application with Bootstrap & Client-Side Routing
Create a **Vite/CRA-based React application**, integrate **Bootstrap** for styling, and implement **React Router** to navigate between components satisfying the following sub-requirements:

1. **Functional Component:** Create and display a basic functional component.
2. **Component Features & Containment:** Develop components demonstrating:
   * Conditional Rendering
   * List Rendering (using `.map()`)
   * Nested Components
   * Component Containment (using `props.children`)
3. **State Management:** Develop a Counter component with **Increment**, **Decrement**, and **Reset** actions.
4. **Hooks Demonstration:** Create components using `useState` for state updates and `useRef` for DOM reference manipulation.
5. **Lifecycle Management:** Develop a live **Digital Clock** component using `useState` and `useEffect` (with interval clean-up).
6. **Manual Form Validation:** Implement live/real-time form validation manually for:
   * **Email Address** (standard email format)
   * **Password** (min 6 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character)
7. **Library Form Validation:** Implement live form validation using a third-party library (e.g., `react-hook-form`) for Email and Password.
8. **JSON Data Fetching (Employees):** Import/fetch data from an `employees.json` file located in `src/components/Data/` and display it inside a Bootstrap table.
9. **Data Searching & Filtering (Students):** Fetch data from a `students.json` file in `src/components/Data/` and display it in a table with:
   * **Search:** Filter dynamically by student's **first name**.
   * **Filters:** Filter options for **Semester**, **Division**, and **Gender**.

---

## Question 3: Dynamic "To-Do" Application
Develop a dynamic **To-Do List** application using React state management (`useReducer` / `useState`) and conditional styling.

### Requirements:
* **Card-Based UI:** Display each task item inside a individual card with a **Checkbox** and a **Delete** button.
* **Dynamic Styling:**
  * **Pending Tasks:** Render card background color in **Purple**.
  * **Completed Tasks:** Render card background color in **Green** and apply a line-through text decoration.
* **Task Input:** Include an input bar with an **Add** button to add new tasks dynamically.