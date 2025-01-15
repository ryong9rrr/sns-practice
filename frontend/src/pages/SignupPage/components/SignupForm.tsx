import { ChangeEvent, FormEvent, useState } from 'react'
import validator from 'validator'
import { Flex } from '../../../components/shared/Flex'
import { TextField } from '../../../components/shared/TextField'
import { Spacing } from '../../../components/shared/Spacing'
import { FixedBottomButton } from '../../../components/shared/FixedBottomButton'
import { containsSpecialCharacters } from '../../../utils/validator'

export type SignupFormValues = {
  nickname: string
  email: string
  password: string
  passwordConfirm: string
}

interface SignupFormProps {
  onSubmit: (formValues: SignupFormValues) => void
}

export const SignupForm = (props: SignupFormProps) => {
  const { onSubmit } = props

  const [formValues, setFormValues] = useState<SignupFormValues>({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [dirty, setDirty] = useState<Partial<SignupFormValues>>({})

  const errors = validateFormValues(formValues)

  const 제출가능 = Object.keys(errors).length === 0

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [e.target.name]: 'true',
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
          label="닉네임"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          value={formValues.nickname}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!dirty.nickname && !!errors.nickname}
          helpMessage={!!dirty.nickname && errors.nickname}
        />
        <Spacing size={24} />
        <TextField
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={formValues.email}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!dirty.email && !!errors.email}
          helpMessage={!!dirty.email && errors.email}
        />
        <Spacing size={24} />
        <TextField
          type="password"
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={formValues.password}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!dirty.password && !!errors.password}
          helpMessage={!!dirty.password && errors.password}
        />
        <Spacing size={24} />
        <TextField
          type="password"
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          value={formValues.passwordConfirm}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!dirty.passwordConfirm && !!errors.passwordConfirm}
          helpMessage={!!dirty.passwordConfirm && errors.passwordConfirm}
        />
      </Flex>
      <FixedBottomButton
        type="submit"
        label="가입하기"
        onClick={handleSubmit}
        disabled={!제출가능}
      />
    </form>
  )
}

const validateFormValues = (formValues: SignupFormValues) => {
  const errors: Partial<SignupFormValues> = {}

  if (formValues.nickname.length < 2) {
    errors.nickname = '닉네임은 2글자 이상 입력해주세요'
  } else if (containsSpecialCharacters(formValues.nickname)) {
    errors.nickname = '닉네임에 특수문자는 사용할 수 없어요'
  }

  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 6) {
    errors.password = '비밀번호는 6글자 이상 입력해주세요'
  }

  if (
    formValues.passwordConfirm.length < 6 ||
    !validator.equals(formValues.password, formValues.passwordConfirm)
  ) {
    errors.passwordConfirm = '비밀번호를 확인해주세요'
  }

  return errors
}
