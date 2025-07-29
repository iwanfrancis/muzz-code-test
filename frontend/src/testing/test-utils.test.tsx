import { render, screen } from '@/testing/test-utils'
import { describe, it, expect } from 'vitest'
import { QueryClient } from '@tanstack/react-query'

// Example component that uses React Query
function ExampleComponent() {
  return (
    <div>
      <h1>Test Component</h1>
      <p>This component has providers!</p>
    </div>
  )
}

describe('Test Utils Example', () => {
  it('renders with default providers', () => {
    render(<ExampleComponent />)
    expect(screen.getByText('Test Component')).toBeInTheDocument()
    expect(
      screen.getByText('This component has providers!')
    ).toBeInTheDocument()
  })

  it('can use custom query client', () => {
    const customQueryClient = new QueryClient({
      defaultOptions: {
        queries: { staleTime: 0 },
      },
    })

    render(<ExampleComponent />, { queryClient: customQueryClient })
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('provides user event setup', async () => {
    const { user } = render(<button onClick={() => {}}>Click me</button>)

    const button = screen.getByRole('button', { name: 'Click me' })

    // user is automatically set up and ready to use
    await user.click(button)

    expect(button).toBeInTheDocument()
  })

  it('supports all testing-library utilities', () => {
    render(
      <div>
        <button>Load content</button>
      </div>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
