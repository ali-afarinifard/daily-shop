import { useState } from "react"
import { Link } from "react-router-dom";

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            placeholder="Enter name"
            autoComplete="off"
            name="name"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            name="email"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            name="password"
          />
        </div>

        <button type="submit">
          Register
        </button>

      </form>

      <p>Already have an account?</p>
      <Link to={'/login'}>
        Login
      </Link>
    </div>
  )
}

export default Register