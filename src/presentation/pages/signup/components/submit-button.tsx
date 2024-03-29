import React from 'react'
import { useRecoilValue } from 'recoil'

import { SubmitButtonBase } from '@/presentation/components'
import { signUpState } from '@/presentation/pages/signup/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const state = useRecoilValue(signUpState)

  return <SubmitButtonBase text={text} state={state} />
}

export default SubmitButton
