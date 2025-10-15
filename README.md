# Quick Links

- [Current unit tests](https://github.com/Onyelechie/WorkoutPal-Frontend/tree/main/src/utils/__unit_tests__)
- [Current acceptance tests](https://github.com/Onyelechie/WorkoutPal-Frontend/tree/main/cypress/e2e) 
- [Sprint 1 Test Coverage report](/documentation/tests/sprint_1_test_coverage.png)

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


