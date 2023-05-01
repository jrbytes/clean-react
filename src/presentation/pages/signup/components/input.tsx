import React from 'react'
import { useRecoilState } from 'recoil'

import { InputBase } from '@/presentation/components'
import { signUpState } from '@/presentation/pages/signup/components'

type Props = {
  type: string
  name: string
  placeholder: string
}

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  const [state, setState] = useRecoilState(signUpState)

  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  )
}

export default Input
