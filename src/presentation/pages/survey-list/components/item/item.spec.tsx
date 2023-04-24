import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockSurveyModel } from '@/domain/test'
import { Item } from '@/presentation/pages/survey-list/components'
import { IconName } from '@/presentation/components'

describe('Item Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
    })
    render(<Item survey={survey} />)
    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbUp)
    expect(
      screen.getByText(survey.question, { selector: 'p' })
    ).toBeInTheDocument()
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
    })
    render(<Item survey={survey} />)
    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbDown)
    expect(
      screen.getByText(survey.question, { selector: 'p' })
    ).toBeInTheDocument()
  })
})
