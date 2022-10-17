import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Home from '@/pages/Home'

describe('Home test', () => {
  it('should match snapshot', () => {
    const homepage = render(<Home />)

    expect(homepage).toMatchSnapshot()
  })

  it('should plus 1', () => {
    render(<Home />)

    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveTextContent('count is 1')
  })
})
