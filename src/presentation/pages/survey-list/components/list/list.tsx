import React, { useContext } from 'react'

import Styles from './list-styles.scss'
import {
  Context,
  Item,
  ItemEmpty,
} from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

const List: React.FC = () => {
  const { state } = useContext(Context)

  return (
    <ul className={Styles.listWrap}>
      {state.surveys.length ? (
        state.surveys.map((survey: LoadSurveyList.Model) => (
          <Item key={survey.id} survey={survey} />
        ))
      ) : (
        <ItemEmpty />
      )}
    </ul>
  )
}

export default List
