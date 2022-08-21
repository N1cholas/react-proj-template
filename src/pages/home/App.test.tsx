import { describe, it } from 'vitest'
import { render, screen } from '../../utils/test-utils'
import App from './App'
import '@testing-library/jest-dom/extend-expect'

describe('Todo test', () => {
    it('should display msg', () => {
        render(<App />)

        expect(screen.getByText('Hello 1 React')).toBeInTheDocument()
    })
})
