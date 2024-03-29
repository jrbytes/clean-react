import React from 'react'
import { useRecoilValue } from 'recoil'

import { SubmitButtonBase } from '@/presentation/components'
import { loginState } from '@/presentation/pages/login/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const state = useRecoilValue(loginState)

  return <SubmitButtonBase text={text} state={state} />
}

export default SubmitButton
