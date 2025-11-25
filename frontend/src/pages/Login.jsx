import './Login.scss'
import { SpotifyLogo } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import authStore from '../stores/authStore'

const Login = observer(() => {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await authStore.login()
      navigate('/index')
    } catch {
      //   error se vec vata
    }
  }

  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <SpotifyLogo className='login-logo' size={60} weight='fill' />
        <h1 className='login-title'>Welcome back</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <label className='login-label' htmlFor='login-identifier'>Email address or username</label>
          <input
            className='login-input'
            type='text'
            id='login-identifier'
            name='identifier'
            placeholder='name@domain.com'
            required
            value={authStore.loginForm.identifier}
            onChange={(event) => authStore.setLoginField('identifier', event.target.value)}
          />
          <label className='login-label' htmlFor='login-password'>Password</label>
          <input
            className='login-input'
            type='password'
            id='login-password'
            name='password'
            placeholder='Password'
            required
            value={authStore.loginForm.password}
            onChange={(event) => authStore.setLoginField('password', event.target.value)}
          />
          <a className='login-forgot' href='#'>Forgot your password?</a>
          {authStore.error && <p className='login-error'>{authStore.error}</p>}
          {authStore.message && <p className='login-message'>{authStore.message}</p>}
          <button className='login-submit' type='submit' disabled={authStore.loading}>
            {authStore.loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <div className='login-divider'><span>or</span></div>
        <div className='login-providers'>
          <button className='login-provider' type='button' disabled={authStore.loading}>GOOGLE</button>
        </div>
        <div className='login-footer'>
          <span>Dont have an account?</span>
          <Link to='/register'>Sign up</Link>
        </div>
      </div>
    </div>
  )
})

export default Login