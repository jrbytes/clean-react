import React from 'react'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder='Digite seu e-mail' />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name='password' placeholder='Digite sua senha' />
          <span className={Styles.status}>🔴</span>
        </div>
        <button className={Styles.submit} type='submit'>Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
