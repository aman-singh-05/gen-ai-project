import React from 'react'
import {useNavigate} from 'react-router'
const Register = () => {

    const navigate = useNavigate();

      const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  }
       
    return (
      

         <main>

       <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>  
        

           <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="username" id="username" name="username" required placeholder="Enter your username"/>
          </div>


          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="Enter your email"/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="Enter your password"/>
          </div>
          <button className="button primary-button">Register </button>


            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
</div>
    </main>
    )
}

export default Register