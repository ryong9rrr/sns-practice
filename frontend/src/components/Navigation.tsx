import { CSSProperties } from 'react'
import { Link } from 'react-router'
import { css } from '@emotion/react'
import { GoHomeFill } from 'react-icons/go'
import { GrSearch } from 'react-icons/gr'
import { MdAddToPhotos } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { Flex } from './shared/Flex'
import { colors } from '../styles/colorPalette'

export const Navigation = () => {
  return (
    <div css={containerStyles}>
      <Flex justify="space-around" align="center">
        <Link to="/">
          <GoHomeFill style={iconStyles} />
        </Link>
        <Link to="/search">
          <GrSearch style={iconStyles} />
        </Link>
        <Link to="/addpost">
          <MdAddToPhotos style={iconStyles} />
        </Link>
        <Link to="/my">
          <FaUserCircle style={iconStyles} />
        </Link>
      </Flex>
    </div>
  )
}

const containerStyles = css`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  border-top: 1px solid ${colors.grey};
  background-color: ${colors.white};
  padding: 8px;
  box-sizing: border-box;
`

const iconStyles: CSSProperties = {
  width: '28px',
  height: '28px',
}