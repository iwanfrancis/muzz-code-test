import { render, screen } from '@/testing/test-utils'
import Tabs from './Tabs'
import { describe, expect, it, vi } from 'vitest'

type TabId = 'tab1' | 'tab2' | 'tab3'

const tabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
] as const

describe('Tabs', () => {
  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onTabChange={() => {}} />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
  })

  it('applies active styles to the active tab', () => {
    render(<Tabs tabs={tabs} activeTab="tab2" onTabChange={() => {}} />)
    const tab2 = screen.getByText('Tab 2')
    expect(tab2.className).toMatch(/text-pink/)
    expect(tab2.className).toMatch(/border-pink/)
  })

  it('does not apply active styles to inactive tabs', () => {
    render(<Tabs tabs={tabs} activeTab="tab2" onTabChange={() => {}} />)
    const tab1 = screen.getByText('Tab 1')
    const tab3 = screen.getByText('Tab 3')
    expect(tab1.className).not.toMatch(/text-pink/)
    expect(tab3.className).not.toMatch(/text-pink/)
  })

  it('calls onTabChange with correct id when a tab is clicked', async () => {
    const onTabChange = vi.fn()
    const { user } = render(
      <Tabs tabs={tabs} activeTab="tab1" onTabChange={onTabChange} />
    )
    await user.click(screen.getByText('Tab 3'))
    expect(onTabChange).toHaveBeenCalledWith('tab3')
  })

  it('renders with no tabs', () => {
    render(
      <Tabs tabs={[]} activeTab={'tab1' as TabId} onTabChange={() => {}} />
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
