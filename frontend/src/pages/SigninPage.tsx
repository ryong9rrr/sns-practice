import { Link, useNavigate } from 'react-router'

import { ClientError } from '../remote/errors'
import { SigninForm, SigninFormValues } from '../components/sign/SigninForm'
import { Text } from '../components/shared/Text'
import { Spacing } from '../components/shared/Spacing'
import { colors } from '../styles/colorPalette'
import { Flex } from '../components/shared/Flex'
import { useUserStore } from '../stores/users'
import { useEffect } from 'react'
import { useAlert } from '../components/shared/Alert/useAlert'

export const SigninPage = () => {
  const navigate = useNavigate()
  const { user, signin } = useUserStore()
  const { alert } = useAlert()

  const handleSubmit = async (formValues: SigninFormValues) => {
    try {
      await signin(formValues)
      navigate('/', {
        replace: true,
      })
    } catch (error) {
      if (error instanceof ClientError) {
        alert({
          title: '로그인 실패',
          description: '이메일과 비밀번호를 다시 확인해주세요',
        })
        return
      }
      alert({
        title: '다시 시도해주세요',
        description: '알 수 없는 문제가 발생했어요',
      })
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/', {
        replace: true,
      })
    }
  }, [navigate, user])

  return (
    <>
      <Text display="block" textAlign="center" typography="t2" bold style={{ marginTop: 16 }}>
        로그인
      </Text>
      <Spacing size={16} />
      <div style={{ padding: 12 }}>
        <SigninForm onSubmit={handleSubmit} />
      </div>
      <Flex justify="center" align="center" direction="column" style={{ marginTop: 8 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          계정이 없으신가요?
        </Text>
        <Spacing size={4} />
        <Link
          style={{
            fontSize: 12,
            color: colors.blue,
            fontWeight: 600,
          }}
          to="/signup"
        >
          회원가입
        </Link>
      </Flex>
    </>
  )
}
