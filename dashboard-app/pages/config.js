import React from 'react'
import GoogleLogin from 'react-google-login'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import widgets from '../models/Widget'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  greenText: {
    color: 'green'
  },
  redText: {
    color: 'red'
  }
}))

const Config = () => {
  const classes = useStyles()

  // Load widgets
  const [widgetStates, setWidgetStates] = React.useState([])
  React.useEffect(() => {
    ;(async () => setWidgetStates(await widgets))()
  }, [])

  // Hook to force rerender the component
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  // Set isVisible property of widgets to true on toggle
  const handleToggle = index => async () => {
    await widgetStates[index].update({
      isVisible: !widgetStates[index].isVisible
    })
    setWidgetStates(widgetStates)
    forceUpdate()
  }

  // Set isVisible property of widgets to true on "Connect" click
  const handleConnect = (index, connect) => {
    ;(async () => {
      await widgetStates[index].update({
        isConnected: connect
      })
      setWidgetStates(widgetStates)
      forceUpdate()
    })()
  }

  const googleAuthSuccess = result => {
    localStorage.setItem('accessToken', result.Zi.access_token)
    return true
  }

  const googleAuthFailure = error => {
    if (error.error != 'popup_closed_by_user') {
      alert('Sorry, something went wrong. Please try again.')
    }
  }

  return (
    <List className={classes.root}>
      {widgetStates.map((widget, i) => {
        return (
          <ListItem
            key={widget.name}
            role={undefined}
            dense
            button
            onClick={handleToggle(i)}
          >
            <ListItemIcon>
              <Checkbox
                edge='start'
                checked={widget.isVisible}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={widget.name} />
            {widget.authRequired && (
              <ListItemSecondaryAction>
                {widget.isConnected ? (
                  <Button
                    edge='end'
                    onClick={() => handleConnect(i, false)}
                    classes={{ text: classes.redText }}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <GoogleLogin
                    clientId='793712980515-ldaaa1jtnofj1huop8mhkqubfe9m47fc.apps.googleusercontent.com'
                    scope='profile email https://www.googleapis.com/auth/calendar'
                    buttonText='Login'
                    onSuccess={result =>
                      googleAuthSuccess(result) && handleConnect(i, true)}
                    onFailure={googleAuthFailure}
                    cookiePolicy='single_host_origin'
                  />
                )}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )
      })}
    </List>
  )
}

export default Config
