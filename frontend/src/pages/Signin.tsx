import { useNavigate } from 'react-router'
import { setAccessToken } from '../components/auth/token'
import { SigninForm } from '../components/signin/SigninForm'
import { ClientError } from '../remote/errors'
import { signin } from '../remote/users'

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

  return (
    <>
      <SigninForm onSubmit={handleSubmit} />
    </>
  )
}
