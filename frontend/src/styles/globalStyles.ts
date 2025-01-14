import { css } from '@emotion/react'
import { colorPalette } from '../components/shared/foundations/colorPalette'
import resetStyles from './resetStyles'

export default css`
  ${colorPalette}

  :root {
    --dimmed-zindex: 10;
    --alert-zindex: 11;
  }

  ${resetStyles}
`
