import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  CardTitle,
  StyledButton,
  StyledCard,
  StyledInput,
  StyledLabel
} from './styles'

function LoginForm () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/all-boards')
      }
    } catch (error) {
      toast.error('Bad User Credentials')
    }
  }
  return (
    <StyledCard>
      <CardTitle>Log In</CardTitle>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: '1.2rem', marginBottom: '2rem' }}>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="joe@example.com"
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <StyledInput
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your Password"
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          {/* <button className="btn">Login</button> */}
          <StyledButton>Log In</StyledButton>
        </div>
      </form>
      <Link to={'/register'}>Register Instead</Link>
    </StyledCard>
  )
}

export default LoginForm
