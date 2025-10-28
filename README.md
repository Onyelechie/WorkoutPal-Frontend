### How to run WorkoutPal-Frontend

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

## Continuous Deployment (CD)

WorkoutPal-Backend uses GitHub Actions to automatically build, push, and deploy Docker images to Azure App Service whenever changes are merged into the main branch.

### How It Works
 On every push to main, GitHub Actions checks out the code and pushes it to azure app service. Deployed frontend can be found [here](workoutpal-frontend-bnauhbbafdcqh7ds.canadacentral-01.azurewebsites.net)

### How to run tests

1. Install dependencies (if not yet done):
```bash
npm install
```

2. Run all the unit tests:
```bash
npm run test
```

3. Run all the acceptance tests:
```bash
npm run cy:run
```

## To run acceptance test using the Cypress GUI

1. Open the UI
```bash
npm run cy:open
```

2. Select 'E2E Testing'

3. Choose any browser and start E2E Testing

4. Select any of the tests in cypress/e2e

5. See the test run to completion

## To run only a very specific test

```bash
npm run test path/to/file/here.test.ts
```

## To run with test coverage

1. Run the unit tests with coverage:
```bash
npm run test:coverage
```
