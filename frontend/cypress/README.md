# E2E Tests with Cypress

This directory contains end-to-end tests for the Muzz chat application using Cypress. I had some trouble congfigurting this on my windows machine so apologies if there are any issues.

## Test Files

- **`app-navigation.cy.js`** - Tests for main app navigation, home page functionality, user switching, and responsive design
- **`chat-functionality.cy.js`** - Tests for chat interface, message sending/receiving, tabs, and real-time messaging

## Running the Tests

### Prerequisites

1. Ensure the development server is running on `http://localhost:5173`:

   ```bash
   npm run dev
   ```

2. Make sure the backend is also running if testing WebSocket functionality.

### Running Tests

**Interactive Mode (recommended for development):**

```bash
npm run e2e:open
# or
npm run cypress:open
```

**Headless Mode (for CI/CD):**

```bash
npm run e2e
# or
npm run cypress:run

## Debugging

When tests fail:

1. Check the Cypress Test Runner for detailed error messages
2. Use `.pause()` in tests to inspect the state
3. Screenshots are automatically taken on failure
4. Use `cy.debug()` to debug specific elements
5. Check browser console for JavaScript errors
```
