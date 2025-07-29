# Test Utils

This file provides custom testing utilities that wrap React Testing Library with app-specific providers and setup.

## Features

- **Automatic Provider Setup**: Wraps components with QueryClientProvider
- **UserEvent Ready**: Returns a pre-configured userEvent instance
- **Custom Query Client**: Allows passing custom QueryClient for specific test scenarios
- **Re-exports**: Common testing utilities from @testing-library/react

## Usage

### Basic Usage

```tsx
import { render, screen } from '@/test/test-utils'

test('my component', () => {
  render(<MyComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

### With User Interactions

```tsx
import { render, screen } from '@/test/test-utils'

test('user interactions', async () => {
  const { user } = render(<Button>Click me</Button>)

  await user.click(screen.getByRole('button'))
  // Assertions...
})
```

### With Custom Query Client

```tsx
import { render } from '@/test/test-utils'
import { QueryClient } from '@tanstack/react-query'

test('with custom query client', () => {
  const customClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 0 } },
  })

  render(<MyComponent />, { queryClient: customClient })
  // Test with custom client...
})
```

## Available Exports

- `render` - Custom render function with providers
- `renderWithProviders` - Explicit name for the custom render
- `screen` - Testing Library screen utilities
- `waitFor` - Async testing utilities
- `fireEvent` - Event simulation
- `cleanup` - Test cleanup
- `act` - React test utilities

## Query Client Configuration

The default test query client is configured with:

- `retry: false` - No retries in tests for faster execution
- `staleTime: Infinity` - Data never goes stale during tests
