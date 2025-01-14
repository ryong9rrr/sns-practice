import { useCallback } from 'react'
import styled from '@emotion/styled'
import { AlertProps } from './AlertContext'
import { colors } from '../foundations/colorPalette'
import { Dimmed } from '../Dimmed'
import { Text } from '../Text'
import { Flex } from '../Flex'
import { Button } from '../Button'

interface PrivateAlertProps extends AlertProps {
  onClose: () => void
}

export const Alert = (props: PrivateAlertProps) => {
  const { title, description, onClose, onCloseAfter } = props

  const handleClose = useCallback(async () => {
    onClose()
    if (onCloseAfter) {
      await onCloseAfter()
    }
  }, [onClose, onCloseAfter])

  return (
    <Dimmed>
      <AlertContainer>
        <Text typography="t4" bold display="block" css={{ marginBottom: 6 }}>
          {title}
        </Text>

        {description && <Text typography="t7">{description}</Text>}

        <Flex justify="flex-end">
          <Button onClick={handleClose} weak css={{ marginTop: 12, border: 'none' }}>
            확인
          </Button>
        </Flex>
      </AlertContainer>
    </Dimmed>
  )
}

const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: var(--alert-zindex);
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`
