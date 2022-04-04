import styled from 'styled-components'
import colors from '../../theme/colors'

export const Row = styled.div`
    padding: 1rem 0;
    font-weight: 300;
    font-size: 14px;
    width: 100%;
    border-bottom: 1px solid ${props => props.active ? colors.hotPink : colors.black}
`

export const Panel = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
`