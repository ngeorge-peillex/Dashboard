import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import widgets from '../models/Widget'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

const Config = () => {
  const classes = useStyles()

  const [widgetStates, setWidgetStates] = React.useState([])

  // Hook to force rerender the component
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  // Load widgets
  React.useEffect(async () => {
    setWidgetStates(await widgets)
  }, [])

  // Set isVisible property of widgets to true on toggle
  const handleToggle = index => async () => {
    await widgetStates[index].update({
      isVisible: !widgetStates[index].isVisible
    })
    setWidgetStates(widgetStates)
    forceUpdate()
  }

  // Set isVisible property of widgets to true on "Connect" click
  const handleConnect = index => async () => {
    await widgetStates[index].update({
      isConnected: !widgetStates[index].isConnected
    })
    setWidgetStates(widgetStates)
    forceUpdate()
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
            <ListItemSecondaryAction>
              {!widget.isConnected && (
                <IconButton edge='end' onClick={handleConnect(i)}>
                  <AddIcon />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default Config
