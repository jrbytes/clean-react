import React from 'react'

import Styles from './list-styles.scss'
import { Item, ItemEmpty } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({ surveys }) => {
  return (
    <ul className={Styles.listWrap}>
      {surveys.length ? (
        surveys.map((survey: LoadSurveyList.Model) => (
          <Item key={survey.id} survey={survey} />
        ))
      ) : (
        <ItemEmpty />
      )}
    </ul>
  )
}

export default List
