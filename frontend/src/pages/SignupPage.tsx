import { useNavigate } from 'react-router'
import * as UserApi from '../remote/users'
import { ClientError } from '../remote/errors'
import { SignupForm, SignupFormValues } from '../components/sign/SignupForm'
import { Text } from '../components/shared/Text'
import { Spacing } from '../components/shared/Spacing'
import { useAlert } from '../components/shared/Alert/useAlert'

export const SignupPage = () => {
  const navigate = useNavigate()
  const { alert } = useAlert()

  const handleSubmit = async (formValues: SignupFormValues) => {
    try {
      await UserApi.signup(formValues)
      // TODO: Toast나 폭죽터지는 GIF 이미지로 바꾸기 (그 아래에다가 버튼 두기)
      window.alert('회원가입이 완료되었습니다. 로그인해주세요')
      navigate('/signin')
    } catch (error) {
      if (error instanceof ClientError) {
        alert({
          title: '회원가입 실패',
          description: '이미 가입된 이메일이에요',
        })
        return
      }
      alert({
        title: '다시 시도해주세요',
        description: '알 수 없는 문제가 발생했어요',
      })
    }
  }

  return (
    <>
      <Text display="block" textAlign="center" typography="t2" bold style={{ marginTop: 16 }}>
        회원가입
      </Text>
      <Spacing size={16} />
      <div style={{ padding: 12 }}>
        <SignupForm onSubmit={handleSubmit} />
      </div>
    </>
  )
}
