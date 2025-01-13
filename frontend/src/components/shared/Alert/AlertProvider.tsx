import { PropsWithChildren, useCallback, useState } from 'react'
import { Alert } from './Alert'
import { AlertContext, AlertProps } from './AlertContext'

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [alertPayload, setAlertPayload] = useState<AlertProps | null>(null)

  const handleClose = useCallback(() => {
    setAlertPayload(null)
  }, [])

  const handleAlert = useCallback((alertProps: AlertProps) => {
    setAlertPayload(alertProps)
  }, [])

  return (
    <AlertContext.Provider
      value={{
        alert: handleAlert,
      }}
    >
      {children}
      {alertPayload && <Alert {...alertPayload} onClose={handleClose} />}
    </AlertContext.Provider>
  )
}
