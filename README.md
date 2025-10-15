# Quick Links

- [Current unit tests](https://github.com/Onyelechie/WorkoutPal-Frontend/tree/main/src/utils/__unit_tests__) - tests our utils logic
- [Current acceptance tests](https://github.com/Onyelechie/WorkoutPal-Frontend/tree/main/cypress/e2e) - tests authentication (login and register). no direct user story.
- [Sprint 1 Test Coverage report](/documentation/tests/sprint_1_test_coverage.png)

# Top 3 tests of each category

### Unit tests
1. [apiRequests.ts](/src/utils/__unit_tests__/apiRequests.test.ts) - tests that our helper for making api requests correctly appends the endpoint to the backend URL for all request types (GET, POST, PUT, DELETE) and that it correctly makes the requests.
2. [routineHelpers.ts](/src/utils/__unit_tests__/routineHelpers.test.ts) - tests that it correctly filters routines, build routine payloads and toggle selection.
3. [date.ts](/src/utils/__unit_tests__/date.test.ts) - tests that getTodayIndex() returns values within the bounds

### Acceptance tests
1. Only one so far: [auth.cy.ts](/cypress/e2e/auth.cy.ts). The top 3 test functions here would be:
    1. 'user can register, login and logout' - line 47
    2. user cannot have duplicate username and email - line 98
    3. user cannot login with invalid password for an existing account - line 153

# Prerequisites

1. Node.js v22.20.0 - https://nodejs.org/en/download
2. Backend needs to be running to ensure that frontend functionality works. [Backend repo](https://github.com/Onyelechie/WorkoutPal-Backend)

# How to run WorkoutPal-Frontend

1. Clone the repository:
```bash
git clone <repository-url>
cd WorkoutPal-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm run dev
```

# How to run tests

### Unit tests

1. Install dependencies (if not yet done):
```bash
npm install
```

2. Run all the unit tests:
```bash
npm run test
```

### To run only a very specific unit test

```bash
npm run test path/to/file/here.test.ts
```

### To run with test coverage

1. Run the unit tests with coverage:
```bash
npm run test:coverage
```

### Acceptance tests

1. Prerequisites and assumptions:
    1. Backend is running and is healthy
    2. Database is running and is healthy
    3. Frontend is running on the baseUrl set in cypress.config.ts in the root folder

2. Additional notes:
    1. The database needs to be running BEFORE the backend starts. See our [backend repo.](https://github.com/Onyelechie/WorkoutPal-Backend)
    2. Double check that the frontend is running on the baseUrl set in cypress.config.ts in the root folder. At this point, it should be 'http://localhost:5173'.
    3. Tests will fail without the prerequisites and assumptions.

3. Run all the acceptance tests:
```bash
npm run cy:run
```

### To run acceptance test using the Cypress GUI

Same prerequisites, assumptions and notes apply here.

1. Open the UI
```bash
npm run cy:open
```

2. Select 'E2E Testing'

3. Choose any browser and start E2E Testing

4. Select any of the tests in cypress/e2e

5. See the test run to completion


