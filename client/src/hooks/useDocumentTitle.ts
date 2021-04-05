import { useEffect } from 'react'
import { textCapitalize } from '../utils/text'

export const useDocumentTitle = (title: string | undefined) => {
  useEffect(() => {
    if (title) document.title = textCapitalize(title)
  }, [title])
}
