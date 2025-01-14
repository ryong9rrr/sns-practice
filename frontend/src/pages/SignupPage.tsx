import { useState } from 'react'
import { useNavigate } from 'react-router'
import * as UserApi from '../remote/users'
import { ClientError } from '../remote/errors'
import { SignupForm, SignupFormValues } from '../components/sign/SignupForm'
import { Text } from '../components/shared/Text'
import { Spacing } from '../components/shared/Spacing'
import { useAlert } from '../components/shared/Alert/useAlert'
import { Lottie } from '../components/shared/Lottie'
import { Flex } from '../components/shared/Flex'
import { useUserStore } from '../stores/users'
import checkLottieJson from '../assets/check-lottie.json'
import congratulationLottieJson from '../assets/congratulation-lottie.json'

export const SignupPage = () => {
  const [isEndSignup, setIsEndSignup] = useState(false)
  const navigate = useNavigate()
  const { alert } = useAlert()
  const { signin } = useUserStore()

  const handleSubmit = async (formValues: SignupFormValues) => {
    try {
      await UserApi.signup(formValues)

      setIsEndSignup(true)

      alert({
        title: (
          <Flex>
            <div css={{ paddingTop: '1px' }}>
              <Lottie src={checkLottieJson} size={20} />
            </div>
            <Spacing size={4} direction="horizontal" />
            <Text>회원가입이 끝났어요!</Text>
          </Flex>
        ),
        description: '바로 로그인 시켜드릴게요',
        onCloseAfter: async () => {
          try {
            await signin({ email: formValues.email, password: formValues.password })
            navigate('/', {
              replace: true,
            })
          } catch (error) {
            console.error(error)
            alert({
              title: '다시 시도해주세요',
              description: '알 수 없는 문제가 발생했어요',
            })
            navigate('/signin')
          }
        },
      })
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
      <Text display="block" textAlign="center" typography="t2" bold css={{ marginTop: 16 }}>
        회원가입
      </Text>
      <Spacing size={16} />
      <div css={{ padding: 12 }}>
        <SignupForm onSubmit={handleSubmit} />
      </div>
      {isEndSignup && (
        <div
          css={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Lottie src={congratulationLottieJson} />
        </div>
      )}
    </>
  )
}
