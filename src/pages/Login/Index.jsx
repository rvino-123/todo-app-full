import LoginForm from "./LoginForm";
import styled from "styled-components";
import colors from "../../theme/colors";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.darkBlue};
`;

function Login() {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

// Photo by <a href="https://unsplash.com/@alifcaesar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alif Caesar Rizqi Pratama</a> on <a href="https://unsplash.com/s/photos/book?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

export default Login;
