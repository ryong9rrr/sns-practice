import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

import { setAccessToken } from '../components/auth/token'
import { ClientError } from '../remote/errors'
import { signin } from '../remote/users'
import { TextField } from '../components/shared/TextField'
import { Button } from '../components/shared/Button'

export const SigninPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const { accessToken } = await signin(values)
      setAccessToken(accessToken)
      navigate('/', {
        replace: true,
      })
    } catch (error) {
      if (error instanceof ClientError) {
        window.alert('이메일과 비밀번호를 다시 확인해주세요')
      } else {
        window.alert('다시 시도해주세요')
      }
    }
  }

  return <SigninForm onSubmit={handleSubmit} />
}

interface SigninFormProps {
  onSubmit: (formValues: { email: string; password: string }) => void
}
const SigninForm = (props: SigninFormProps) => {
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
    <form onSubmit={handleSubmit}>
      <TextField
        label="이메일"
        placeholder="이메일을 입력해주세요"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        hasError={true}
        helpMessage="올바른 이메일을 입력해주세요"
      />
      <TextField
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        hasError={false}
      />
      <Button>로그인하기</Button>
    </form>
  )
}
