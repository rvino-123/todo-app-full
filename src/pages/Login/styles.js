import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import Card from "../../components/Card";
import { Input } from "../../components/Forms/standalone/Input";
import colors from "../../theme/colors";

export const StyledButton = styled(Button)`
    border-radius: 4px;
    height: 50px;
    width: 100%;
    font-size: 18px;
    font-weight: bold;

    &:hover {
        cursor: pointer;
    }

    
`
export const StyledInput = styled(Input)`
    background-color: ${colors.lightGray};
    width: 20rem;
    font-size: 16px;
    height: 3rem;
`

export const StyledCard = styled(Card)`
    padding: 60px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
`
export const StyledLabel = styled.label`
    display: block;
    font-size: 24px;
`

export const CardTitle = styled.div`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
`