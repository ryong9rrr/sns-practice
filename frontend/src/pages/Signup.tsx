import { Link } from 'react-router'
import { FormValueType, SignupForm } from '../components/signup/SignupForm'
import axios from 'axios'

export const SignupPage = () => {
  const onSubmit = async (formValues: FormValueType) => {
    const { data } = await axios.post('http://localhost:8000/users/signup', {
      ...formValues,
    })

    console.log(data)
  }

  return (
    <>
      <h1>회원가입 페이지</h1>
      <SignupForm onSubmit={onSubmit} />
      <Link to="/">홈으로</Link>
    </>
  )
}
