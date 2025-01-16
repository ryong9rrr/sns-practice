import { PropsWithChildren, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../components/shared/Button'
import { Flex } from '../../components/shared/Flex'
import { Spacing } from '../../components/shared/Spacing'
import { Navigation } from '../../components/Navigation'

export const AddPostPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<'사진추가' | '게시물작성' | '최종확인'>('사진추가')

  if (step === '사진추가') {
    return (
      <Layout>
        <Flex justify="space-between" align="center">
          <Button
            weak
            full
            onClick={() => {
              window.alert('뒤로가기')
            }}
            css={{ flex: 1 }}
          >
            이전
          </Button>
          <Spacing size={8} direction="horizontal" css={{ flex: 2 }} />
          <Button full onClick={() => setStep('게시물작성')} css={{ flex: 1 }}>
            다음
          </Button>
        </Flex>
        <Spacing size={8} />
        <h1>사진을 추가하는 퍼널</h1>
      </Layout>
    )
  }

  if (step === '게시물작성') {
    return (
      <Layout>
        <Flex justify="space-between" align="center">
          <Button weak full onClick={() => setStep('사진추가')} css={{ flex: 1 }}>
            이전
          </Button>
          <Spacing size={8} direction="horizontal" css={{ flex: 2 }} />
          <Button full onClick={() => setStep('최종확인')} css={{ flex: 1 }}>
            다음
          </Button>
        </Flex>
        <Spacing size={8} />
        <h1>게시물의 내용을 작성하는 퍼널</h1>
      </Layout>
    )
  }

  if (step === '최종확인') {
    return (
      <Layout>
        <Flex justify="space-between" align="center">
          <Button weak full onClick={() => setStep('게시물작성')} css={{ flex: 1 }}>
            이전
          </Button>
          <Spacing size={8} direction="horizontal" css={{ flex: 2 }} />
          <Button
            full
            onClick={() => {
              window.alert('게시물이 성공적으로 작성되었습니다.')
            }}
            css={{ flex: 1 }}
          >
            완료
          </Button>
        </Flex>
        <Spacing size={8} />
        <h1>게시물을 최종 확인하는 퍼널</h1>
      </Layout>
    )
  }

  return null
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div css={{ padding: 1 }}>{children}</div>
      <Navigation />
    </div>
  )
}
