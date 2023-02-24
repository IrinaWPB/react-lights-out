import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Board from './Board'

// test('renders without crashing', function() {
//     render(<Board />)
// })

it('matches snapshot', function() {
    const { asFragment } = render(<Board chanceLightStartsOn={0}/>)
    expect(asFragment()).toMatchSnapshot()
})
// 
it('matches snapshot', function() {
    const { asFragment } = render(<Board chanceLightStartsOn={1}/>)
    expect(asFragment()).toMatchSnapshot()
})

test('shows "you WON when all lights are lit', function () {
    const { getByText } = render(<Board chanceLightStartsOn={1}/>)
    const youWon = getByText('You WON!')
    expect(youWon).toBeInTheDocument()
})

test('flips correct cells', function() {
    const { getByTestId} = render(<Board chanceLightStartsOn={0}/>)
    const cell00 = getByTestId('0-0')
    const cell01 = getByTestId('0-1')
    const cell02 = getByTestId('0-2')
    const cell10 = getByTestId('1-0')
    const cell20 = getByTestId('2-0')
    const cell33 = getByTestId('3-3')
    expect(cell00).not.toHaveClass('Cell-lit')
    expect(cell01).not.toHaveClass('Cell-lit')
    expect(cell02).not.toHaveClass('Cell-lit')
    expect(cell10).not.toHaveClass('Cell-lit')
    expect(cell20).not.toHaveClass('Cell-lit')
    expect(cell33).not.toHaveClass('Cell-lit')

    fireEvent.click(cell00)
    expect(cell00).toHaveClass('Cell-lit')
    expect(cell01).toHaveClass('Cell-lit')
    expect(cell02).toHaveClass('Cell-lit')
    expect(cell10).toHaveClass('Cell-lit')
    expect(cell20).toHaveClass('Cell-lit')
    //cell that is not in the same row ar col should stay the same
    expect(cell33).not.toHaveClass('Cell-lit')
})

