import React from 'react'
import { useParams } from 'react-router-dom'

import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'
import { SurveyResult } from '@/presentation/pages'

type ParamsProp = {
  id: string
}

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<ParamsProp>()
  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />
}
