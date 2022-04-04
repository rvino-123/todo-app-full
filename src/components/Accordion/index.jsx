import { useEffect, useState } from 'react'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../theme/colors'
import { Row, Panel } from './styles'

const StyledContainer = styled.div`
  padding: 0;
  font-weight: 300;
  font-size: 14px;
  display: flex;
  width: 100%;
  flex-direction: column;
`

const StyledText = styled.div`
  color: ${(props) => props.color};
`

function Accordion ({ children, name, route }) {
  const [open, setOpen] = useState(false)
  const [routeMatched, setRouteMatched] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === `/${route}`) {
      setRouteMatched(true)
      setOpen(true)
      console.log('pathname matches route')
    } else {
      setRouteMatched(false)
      setOpen(false)
      console.log('pathname DOES NOT match route')
    }
  }, [location, route])

  console.log(location.pathname)

  const handleNavigate = () =>
    routeMatched ? setOpen(!open) : navigate(`/${route}`)
  console.log(location.pathname === route)
  console.log(route)

  return (
    <StyledContainer>
      <Row onClick={handleNavigate} active={open}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledText color={open ? colors.hotPink : colors.white}>
            {name}
          </StyledText>
          {open
            ? (
            <MdOutlineKeyboardArrowDown color={colors.hotPink} size={'26px'} />
              )
            : (
            <MdOutlineKeyboardArrowRight size={'26px'} />
              )}
        </div>
      </Row>
      {open && <Panel>{children}</Panel>}
    </StyledContainer>
  )
}

export default Accordion
