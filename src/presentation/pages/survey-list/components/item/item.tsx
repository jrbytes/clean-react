import React from 'react'

import { Icon, IconName } from '@/presentation/components'
import Styles from './item-styles.scss'
import { SurveyModel } from '@/domain/models'

type Props = {
  survey: SurveyModel
}

const Item: React.FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} className={Styles.iconWrap} />
        <time>
          <span aria-label="day" className={Styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
          </span>
          <span aria-label="month" className={Styles.month}>
            {survey.date
              .toLocaleString('pt-BR', { month: 'short' })
              .substring(0, 3)}
          </span>
          <span aria-label="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p>{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default Item
