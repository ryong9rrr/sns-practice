import { createContext } from 'react'

export type AlertProps = {
  title: React.ReactNode
  description?: React.ReactNode
  onCloseAfter?: () => void | Promise<void>
}

export type AlertContextType = {
  alert: (alertProps: AlertProps) => void
}

export const AlertContext = createContext<AlertContextType>({
  alert: () => {},
})
