import { Link } from 'react-router'
import { FormValueType, SignupForm } from '../components/signup/SignupForm'

export const SignupPage = () => {
  const onSubmit = (formValues: FormValueType) => {
    window
      .fetch('http://localhost:8000/users/signup', {
        method: 'POST',
        body: JSON.stringify(formValues),
        credentials: 'include', // withCredentials: true와 같음.
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return (
    <>
      <h1>회원가입 페이지</h1>
      <SignupForm onSubmit={onSubmit} />
      <Link to="/">홈으로</Link>
    </>
  )
}
