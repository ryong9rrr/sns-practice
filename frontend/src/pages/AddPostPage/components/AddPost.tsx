import { Button } from '../../../components/shared/Button'
import { Flex } from '../../../components/shared/Flex'
import { Spacing } from '../../../components/shared/Spacing'
import { FunnelStepProps } from '../AddPostPage'
import { Layout } from '../Layout'

export const AddPost = (props: FunnelStepProps) => {
  const { onPrev, onNext } = props

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
      <h1>게시물의 내용을 작성하는 퍼널</h1>
    </Layout>
  )
}
