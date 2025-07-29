import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility', () => {
  it('combines multiple class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const isDisabled = false
    expect(cn('base', isActive && 'conditional')).toBe('base conditional')
    expect(cn('base', isDisabled && 'conditional')).toBe('base')
  })

  it('handles object syntax', () => {
    const isActive = true
    const isDisabled = false
    expect(cn('base', { active: isActive, disabled: isDisabled })).toBe(
      'base active'
    )
  })

  it('merges conflicting Tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', 'text-blue-600')).toBe('text-blue-600')
  })

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null, 'other')).toBe('base other')
  })

  it('handles arrays', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3')
  })
})
