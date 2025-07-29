import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
}

// Create a custom render function
export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  const user = userEvent.setup()

  return {
    user,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

// Helper function to create a test query client
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Don't retry failed queries in tests
        staleTime: Infinity, // Data never goes stale in tests
      },
      mutations: {
        retry: false, // Don't retry failed mutations in tests
      },
    },
  })
}

// Re-export commonly used testing utilities
export {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react'

// Override render with our custom version
export { renderWithProviders as render }
