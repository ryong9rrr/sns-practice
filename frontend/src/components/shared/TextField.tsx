import { FocusEventHandler, forwardRef, InputHTMLAttributes, useState } from 'react'
import { Colors } from '../../styles/colorPalette'
import { Text } from './Text'
import { Input } from './Input'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props: TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { label, hasError, helpMessage, onFocus, onBlur, ...inputProps } = props

    const [isFocused, setIsFocused] = useState(false)

    const labelColor: Colors = hasError ? 'red' : isFocused ? 'blue' : 'black'

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setIsFocused(true)
      if (onFocus) {
        onFocus(event)
      }
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setIsFocused(false)
      if (onBlur) {
        onBlur(event)
      }
    }

    return (
      <div>
        {label && (
          <Text
            typography="t6"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        )}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps}
        />

        {helpMessage && (
          <Text typography="t7" color={labelColor} display="inline-block" style={{ marginTop: 6 }}>
            {helpMessage}
          </Text>
        )}
      </div>
    )
  },
)
