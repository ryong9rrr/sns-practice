import { ChangeEvent, FormEvent, useState } from 'react'
import validate from 'validator'
import { TextField } from '../shared/TextField'
import { Flex } from '../shared/Flex'
import { Spacing } from '../shared/Spacing'
import { FixedBottomButton } from '../shared/FixedBottomButton'

export type SigninFormValues = {
  email: string
  password: string
}

interface SigninFormProps {
  onSubmit: (formValues: SigninFormValues) => void
}

export const SigninForm = (props: SigninFormProps) => {
  const { onSubmit } = props

  const [formValues, setFormValues] = useState<SigninFormValues>({
    email: '',
    password: '',
  })

  const 제출가능 = validate.isEmail(formValues.email) && !!formValues.password

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (제출가능) {
      onSubmit(formValues)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column">
        <TextField
          label="이메일"
          placeholder="sns123@gmail.com"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <Spacing size={24} />
        <TextField
          label="비밀번호"
          placeholder="******"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <Spacing size={24} />
      </Flex>
      <FixedBottomButton
        type="submit"
        label="로그인하기"
        onClick={handleSubmit}
        disabled={!제출가능}
      />
    </form>
  )
}
