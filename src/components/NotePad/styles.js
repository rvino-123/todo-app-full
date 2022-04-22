import styled from 'styled-components'
import colors from '../../theme/colors'

export const StyledContainer = styled.div`
  background-color: ${colors.white};
  display: flex;
  padding: 1rem;
  flex-direction: column;
  border-radius: 1rem;
  margin-top: 1rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`

export const StyledTextArea = styled.textarea`
  width: 100%;
  max-height: 20rem;
  height: auto;
  resize: none;
  min-height: 10rem;
`

export const StyledText = styled.p`
  border: 1px solid ${colors.black};
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 5px;
  white-space: pre-line;
`
