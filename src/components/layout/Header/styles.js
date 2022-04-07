import styled from 'styled-components'
import colors from '../../../theme/colors';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  font-weight: 700;
  align-items: center;
  padding-right: 2rem;
  height: 15%;
`;

export const UserContainer = styled.div`
    display: flex;
    justify-content: right;
    gap: 1rem;
    font-weight: 700;
    align-items: center;
`

export const DropDownDiv = styled.div`
    position: absolute;
    right: 1rem;
    margin-top: 12rem;
    background-color: ${colors.white};
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`

export const DropDownItem = styled.div`
    display: block;
    padding: 1rem;
    
    &:hover {
        background-color: ${colors.darkBlue};
        color: ${colors.white};
        cursor: pointer;
    }
    &:active {
        color: ${colors.hotPink};
    }
`