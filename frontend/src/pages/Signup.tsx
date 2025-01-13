import { Link } from 'react-router'
import { FormValueType, SignupForm } from '../components/sign/SignupForm'
import * as UserApi from '../remote/users'
import { ClientError } from '../remote/errors'

export const SignupPage = () => {
  const onSubmit = async (formValues: FormValueType) => {
    try {
      const user = await UserApi.signup(formValues)
      console.log(user)
    } catch (error) {
      if (error instanceof ClientError) {
        window.alert('이미 존재하는 이메일이에요.')
      } else {
        window.alert('다시 시도해주세요.')
      }
    }
  }

  return (
    <>
      <h1>회원가입 페이지</h1>
      <SignupForm onSubmit={onSubmit} />
      <Link to="/">홈으로</Link>
    </>
  )
}
