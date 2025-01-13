import { ChangeEvent, FormEvent, useState } from 'react'

interface SigninFormProps {
  onSubmit: (formValues: { email: string; password: string }) => void
}

export const SigninForm = (props: SigninFormProps) => {
  const { onSubmit } = props

  const [formValues, setFormValues] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
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
        <button>로그인하기</button>
      </form>
    </>
  )
}
