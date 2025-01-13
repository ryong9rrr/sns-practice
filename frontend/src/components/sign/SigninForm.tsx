import { ChangeEvent, FormEvent, useState } from 'react'
import styled from '@emotion/styled'
import { TextField } from '../shared/TextField'
import { Flex } from '../shared/Flex'
import { Spacing } from '../shared/Spacing'
import { FixedBottomButton } from '../shared/FixedBottomButton'

interface SigninFormProps {
  onSubmit: (formValues: { email: string; password: string }) => void
}

export const SigninForm = (props: SigninFormProps) => {
  const { onSubmit } = props

  const [formValues, setFormValues] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formValues)
  }

  return (
    <>
      <Container>
        <Flex as="form" onSubmit={handleSubmit} direction="column">
          <TextField
            label="이메일"
            placeholder="이메일을 입력해주세요"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            hasError={true}
            helpMessage="올바른 이메일을 입력해주세요"
          />
          <Spacing size={24} />
          <TextField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            hasError={false}
          />
          <Spacing size={24} />
        </Flex>
      </Container>
      <FixedBottomButton label="로그인하기" onClick={() => {}} disabled={true} />
    </>
  )
}

const Container = styled.div`
  padding: 48px 12px 12px 12px;
`
