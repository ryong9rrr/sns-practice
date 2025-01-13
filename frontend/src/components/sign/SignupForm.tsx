import { ChangeEvent, FormEvent, useState } from 'react'

export type SignupFormValues = {
  email: string
  password: string
  nickname: string
}

interface SigupFormProps {
  onSubmit: (formValues: SignupFormValues) => void
}

export const SignupForm = (props: SigupFormProps) => {
  const { onSubmit } = props

  const [formValues, setFormValues] = useState<SignupFormValues>({
    email: '',
    password: '',
    nickname: '',
  })

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임</label>
          <input
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            value={formValues.nickname}
            onChange={handleChangeValue}
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            name="email"
            placeholder="이메일을 입력해주세요"
            value={formValues.email}
            onChange={handleChangeValue}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="이메일을 입력해주세요"
            value={formValues.password}
            onChange={handleChangeValue}
          />
        </div>
        <button>가입 신청하기</button>
      </form>
    </>
  )
}
