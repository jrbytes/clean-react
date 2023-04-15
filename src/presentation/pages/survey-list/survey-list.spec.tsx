import React from 'react'
import { render, screen } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', () => {
    render(<SurveyList />)
    const surveyList = screen.getByRole('list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(3)
  })
})
