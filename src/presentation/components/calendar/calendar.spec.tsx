import React from 'react'
import { render, screen } from '@testing-library/react'

import { Calendar } from '@/presentation/components'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Calendar', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2020-01-10T00:00:00'))
    expect(screen.getByLabelText('day').textContent).toBe('10')
    expect(screen.getByLabelText('month').textContent).toBe('jan')
    expect(screen.getByLabelText('year').textContent).toBe('2020')
  })

  test('Should render with correct values', () => {
    makeSut(new Date('2022-05-23T00:00:00'))
    expect(screen.getByLabelText('day').textContent).toBe('23')
    expect(screen.getByLabelText('month').textContent).toBe('mai')
    expect(screen.getByLabelText('year').textContent).toBe('2022')
  })
})
