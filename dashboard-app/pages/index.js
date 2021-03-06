import React from 'react'
import Router from 'next/router'
import GoogleLogin from 'react-google-login'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { signIn, oAuthSignIn } from '../services/user'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignIn () {
  const classes = useStyles()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    if ((await signIn({ email, password })) == true) {
      Router.push('/home')
    } else {
      alert('Invalid email or password.')
    }
  }

  const oAuthLoginSuccess = async result => {
    if (
      (await oAuthSignIn({
        email: result.w3.U3,
        authType: 'Google',
        idToken: result.googleId
      })) == true
    ) {
      Router.push('/home')
    } else {
      alert('Sorry, something went wrong. Please try again.')
    }
  }

  const oAuthLoginFailure = async error => {
    if (error.error != 'popup_closed_by_user') {
      console.log(error)
      alert('Sorry, something went wrong. Please try again.')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            value={password}
            onChange={event => setPassword(event.target.value)}
            label='Password'
            type='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item container justify='center'>
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Grid item container justify='center'>
              <GoogleLogin
                clientId='793712980515-ldaaa1jtnofj1huop8mhkqubfe9m47fc.apps.googleusercontent.com'
                scope='profile email https://www.googleapis.com/auth/calendar'
                buttonText='Login'
                onSuccess={oAuthLoginSuccess}
                onFailure={oAuthLoginFailure}
                cookiePolicy='single_host_origin'
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

SignIn.componentDidMount = () => {
  if (localStorage.getItem('apiToken')) Router.push('/home')
}
