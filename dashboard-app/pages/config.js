import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";

import widgets from "../models/Widget";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const Config = () => {
  const classes = useStyles();

  const widgetStates = widgets.map(widget => React.useState(widget));

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleToggle = state => () => {
    state[0].isVisible = !state[0].isVisible;
    state[1](state[0]);
    forceUpdate();
  };

  const handleConnect = state => () => {
    state[0].isConnected = !state[0].isConnected;
    state[1](state[0]);
    forceUpdate();
  };

  return (
    <List className={classes.root}>
      {widgetStates.map(state => {
        let widget = state[0];
        return (
          <ListItem
            key={widget.name}
            role={undefined}
            dense
            button
            onClick={handleToggle(state)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={widget.isVisible}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={widget.name} />
            <ListItemSecondaryAction>
              {!widget.isConnected && (
                <IconButton edge="end" onClick={handleConnect(state)}>
                  <AddIcon />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Config;
