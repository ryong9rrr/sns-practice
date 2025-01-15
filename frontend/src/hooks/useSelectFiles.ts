import { ChangeEvent, useCallback } from 'react'

interface UseSelectFilesProps {
  handler: (files: FileList) => void
}

export const useSelectFiles = (props: UseSelectFilesProps) => {
  const { handler } = props

  const onSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) {
        return
      }
      handler(files)
    },
    [handler],
  )

  return { onSelect }
}
