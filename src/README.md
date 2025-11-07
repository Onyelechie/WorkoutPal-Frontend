## Our current structure
  - `src/`
    - `app/`
      - `constants`
        - error constants and achievement enum.
      - Main App.tsx and AppRoutes.tsx.
    - `assets/`
      - Global images used in the app (logo, etc.).
    - `components/`
      - Reusable .tsx code to be used on pages.
    - `hooks/`
      - Reuseable hooks and reuseable state management for components.
    - `pages/`
      - The **main pages** (HomePage, RoutinePage, LoginPage, etc.). 
      - Main pages that would be routed by AppRoutes.tsx.
    - `styles/`
      - global.css that is used across the entire app.
    - `types/`
      - Includes interfaces / types to enforce expected variables for a given object.
    - `services/`
      - Feature oriented API requests to send to the backend.
    - `utils/`
      - Logic utility classes.
  - `root folder`
    - `cypress/e2e` for acceptance/end to end testing.
  - `__unit_tests__`
    - can be found in the same folder as the units being tested. 


### Frontend Test Plan
- **Logic:** ≥80% coverage.
  - `utils`, `services`
- **UI:** Acceptance Test (End-To-End) **all** features to ensure full functionality that meets the user's expectations.
