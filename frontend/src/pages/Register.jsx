import './Register.scss'
import { SpotifyLogo } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import authStore from '../stores/authStore'

const Register = observer(() => {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await authStore.register()
      navigate('/index')
    } catch {
    //   error se vec vata
    }
  }

  return (
    <div className='register-wrapper'>
      <div className='register-container'>
        <SpotifyLogo className='register-logo' size={64} weight='fill' />
        <h1 className='register-title'>Sign up to start listening</h1>
        <form className='register-form' onSubmit={handleSubmit}>
          <label className='register-label' htmlFor='register-email'>Email address</label>
          <input
            className='register-input'
            type='email'
            id='register-email'
            name='email'
            placeholder='name@domain.com'
            required
            value={authStore.registerForm.email}
            onChange={(event) => authStore.setRegisterField('email', event.target.value)}
          />
          <label className='register-label' htmlFor='register-password'>Password</label>
          <input
            className='register-input'
            type='password'
            id='register-password'
            name='password'
            placeholder='Create a password'
            required
            value={authStore.registerForm.password}
            onChange={(event) => authStore.setRegisterField('password', event.target.value)}
          />
          {authStore.error && <p className='register-error'>{authStore.error}</p>}
          {authStore.message && <p className='register-message'>{authStore.message}</p>}
          <button className='register-submit' type='submit' disabled={authStore.loading}>
            {authStore.loading ? 'Signing up...' : 'Next'}
          </button>
        </form>
        <div className='register-divider'><span>or</span></div>
        <div className='register-providers'>
          <button className='register-provider' type='button' disabled={authStore.loading}>GOOGLE</button>
        </div>
        <div className='register-footer'>
          <span>Already have an account?</span>
          <Link to='/login'>Log in</Link>
        </div>
      </div>
    </div>
  )
})

export default Register
