import { useEffect } from 'react'
import { Button } from '../../../components/shared/Button'
import { Flex } from '../../../components/shared/Flex'
import { Spacing } from '../../../components/shared/Spacing'
import { FunnelStepProps } from '../AddPostPage'
import { Layout } from '../Layout'

export const AddPhoto = (props: FunnelStepProps) => {
  const { onPrev, onNext } = props

  useEffect(() => {
    console.log('트랜잭션ID를 여기서 만들어서 세션스토리지에 저장하는거임.')
  }, [])

  return (
    <Layout>
      <Flex justify="space-between" align="center">
        <Button weak full onClick={onPrev} css={{ flex: 1 }}>
          이전
        </Button>
        <Spacing size={8} direction="horizontal" css={{ flex: 2 }} />
        <Button full onClick={onNext} css={{ flex: 1 }}>
          다음
        </Button>
      </Flex>
      <Spacing size={8} />
      <h1>사진을 추가하는 퍼널</h1>
    </Layout>
  )
}
