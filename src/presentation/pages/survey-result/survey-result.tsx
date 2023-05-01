import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import Styles from './styles.scss'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import {
  Result,
  surveyResultState,
  onSurveyAnswerState,
} from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult,
}) => {
  const handlerError = useErrorHandler((error: Error) => [
    setState((old) => ({
      ...old,
      surveyResult: null,
      isLoading: false,
      error: error.message,
    })),
  ])
  const [state, setState] = useRecoilState(surveyResultState)

  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }
    setState((old) => ({ ...old, isLoading: true }))
    saveSurveyResult
      .save({ answer })
      .then((surveyResult) =>
        setState((old) => ({ ...old, isLoading: false, surveyResult }))
      )
      .catch(handlerError)
  }

  const reload = (): void =>
    setState((old) => ({
      isLoading: false,
      surveyResult: null,
      error: '',
      reload: !old.reload,
    }))

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => setState((old) => ({ ...old, surveyResult })))
      .catch(handlerError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />

      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <Result surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>

      <Footer />
    </div>
  )
}

export default SurveyResult
