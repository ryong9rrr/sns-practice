import { createContext } from 'react'

export type AlertProps = {
  title: React.ReactNode
  description?: React.ReactNode
}

export type AlertContextType = {
  alert: (alertProps: AlertProps) => void
}

export const AlertContext = createContext<AlertContextType>({
  alert: () => {},
})
