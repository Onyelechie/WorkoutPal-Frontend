# WorkoutPal-Frontend

React-based frontend for WorkoutPal fitness tracking application with enhanced profile management and social features.

## Features

- **User Authentication**: Login and registration
- **Workout Routines**: Create and manage custom exercise routines
- **Achievements**: Earn achievements by doing certain challenges (workout, social challenges, and more)
- **Social Features**: Create and post a workout post, comment on other people's posts
- **Enhanced Profile Management**: Edit profile with age, height, weight, and metrics
- **Profile Display**: Enhanced profile cards with social stats display
- **Responsive Design**: Full-width profile layouts with improved UI

## Quick Links

- [Current unit tests](https://github.com/Onyelechie/WorkoutPal-Frontend/tree/main/src/utils/__unit_tests__) - tests our utils logic and components
   - [Services unit tests](./src/services/__unit_tests__/)
- [Current acceptance tests](https://github.com/Onyelechie/WorkoutPal-Frontend/tree/main/cypress/e2e)
- [Sprint 2 Test Coverage report](#accessing-the-report)
- [Worksheets and Testing plan](https://github.com/Onyelechie/WorkoutPal-Backend/tree/main/docs) (in our backend repo)

## Backend Repository

- [WorkoutPal-Backend](https://github.com/Onyelechie/WorkoutPal-Backend)

## Prerequisites

1. Node.js v22.20.0 - https://nodejs.org/en/download
2. **Backend and database needs to be running to ensure that frontend functionality works**. [Backend repo](https://github.com/Onyelechie/WorkoutPal-Backend)

## How to run WorkoutPal-Frontend

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

4.  Visit the link shown in the terminal e.g. `http://localhost:5173/` to view our frontend application.

**Note**: Please make sure the [backend](https://github.com/Onyelechie/WorkoutPal-Backend) is running.

## Continuous Deployment (CD)

WorkoutPal-Backend uses GitHub Actions to automatically build, push, and deploy Docker images to Azure App Service whenever changes are merged into the main branch.

### How It Works

On every push to main, GitHub Actions checks out the code and pushes it to azure static web app. Deployed frontend can be found [here](https://brave-coast-0eeb4d10f.3.azurestaticapps.net)

## How to run tests

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

1. Run the unit tests with coverage (**terminal output**):

```bash
npm run test:coverage
```

2. Optionally, generate the coverage through html

```bash
npm run test:coverage:html
```

- Output file can be found in `coverage/index.html`

### Coverage Report

- [Instructions to view the html generated report](#accessing-the-report)

### Acceptance tests

1. Prerequisites and assumptions:
   1. Backend is running and is healthy
   2. Database is running and is healthy
   3. Frontend is running on the baseUrl set in cypress.config.ts in the root folder

2. Additional notes:
   1. The database needs to be running **BEFORE** the backend starts. See our [backend repo.](https://github.com/Onyelechie/WorkoutPal-Backend)
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

## Coverage Report

### Accessing the report

1. Click on the **Actions** tab at the top.
2. Select the workflow "**Coverage Report**".
3. Select the latest workflow run created from the **main** branch or **development** branch.
4. You will see the artifact (**coverage-report**) uploaded by that run.
5. Click on the artifact name to **download** the ZIP file.
6. **Extract** the zip, **Navigate** to `coverage-report/index.html` to access the html generated report.

## Regression Testing Suite

- **What runs:** Unit tests (Vitest), E2E tests (Cypress), Coverage analysis. (Full Regression)
- **Tools:** GitHub Actions, Vitest, Cypress
- **Script:** `npm run regression`
- **Latest results:** [GitHub Actions](https://github.com/Onyelechie/WorkoutPal-Frontend/actions)

### How to Rerun Tests

**Locally:**
ensure backend and frontend are running

```bash
npm run regression
```

**On GitHub:**

1. Go to Actions tab
2. Select "Coverage Report" workflow
3. Click "Run workflow" button
4. Choose branch and click "Run workflow"

**After failed PR:**

1. Fix the code
2. Push changes (automatically triggers rerun)
3. Or manually trigger via Actions tab
