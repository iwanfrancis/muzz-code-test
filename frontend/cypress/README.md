# E2E Tests with Cypress

This directory contains end-to-end tests for the Muzz chat application using Cypress.

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
```

## Test Structure

### App Navigation Tests

- ✅ Home page display and layout
- ✅ Current user display
- ✅ User list sections
- ✅ User switching functionality
- ✅ Navigation to chat
- ✅ Responsive design (mobile/tablet)
- ✅ Error handling

### Chat Functionality Tests

- ✅ Message input and sending
- ✅ Message display and formatting
- ✅ Chat header and navigation
- ✅ Tab switching (Chat/Profile)
- ✅ Real-time messaging
- ✅ Message timestamps
- ✅ Multiple message handling

## Custom Commands

The tests use custom Cypress commands defined in `cypress/support/commands.ts`:

- `cy.navigateToChat(userIndex?)` - Navigate to chat by messaging a user
- `cy.sendMessage(message)` - Send a message in the chat interface
- `cy.switchUser(userIndex?)` - Switch to a different user
- `cy.waitForApp()` - Wait for the app to be fully loaded

## Test Data Attributes

The tests rely on `data-testid` attributes added to components:

- `data-testid="user-card"` - User card components
- `data-testid="current-user"` - Current user display
- `data-testid="user-list-section"` - User list sections
- `data-testid="chat-header"` - Chat header
- `data-testid="tab"` - Navigation tabs
- `data-testid="message-list"` - Message list container
- `data-testid="chat-input"` - Message input form
- `data-testid="message-item"` - Individual message items
- `data-testid="message-timestamp"` - Message timestamps
- `data-testid="profile-tab"` - Profile tab content
- `data-testid="back-button"` - Back navigation button

## Configuration

The Cypress configuration is set in `cypress.config.js`:

- Base URL: `http://localhost:5173`
- Viewport: 1280x720
- Video recording: Disabled
- Screenshots on failure: Enabled

## Tips for Writing Tests

1. **Use data-testid attributes** instead of CSS classes or complex selectors
2. **Wait for elements** to be visible before interacting
3. **Use custom commands** for common actions
4. **Test user flows** rather than individual components
5. **Consider responsive behavior** with different viewport sizes
6. **Mock external dependencies** when necessary (WebSockets, APIs)

## Debugging

When tests fail:

1. Check the Cypress Test Runner for detailed error messages
2. Use `.pause()` in tests to inspect the state
3. Screenshots are automatically taken on failure
4. Use `cy.debug()` to debug specific elements
5. Check browser console for JavaScript errors
