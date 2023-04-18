import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Footer, Header } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import {
  Context,
  Error,
  List,
} from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { AccessDeniedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  })

  useEffect(() => {
    function load(): void {
      loadSurveyList
        .loadAll()
        .then((surveys) => {
          setState({ ...state, surveys })
        })
        .catch((error) => {
          if (error instanceof AccessDeniedError) {
            setCurrentAccount(undefined)
            history.replace('/login')
          } else {
            setState({ ...state, error: error.message })
          }
        })
    }
    load()
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <Context.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <List />}
        </Context.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
