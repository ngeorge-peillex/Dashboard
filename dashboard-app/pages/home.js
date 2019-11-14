import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { Drawer } from '@material-ui/core';
import Config from '../pages/config';
import { Container } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import Weather from '../components/Weather'
import Temperature from '../components/Temperature'
import Humidity from '../components/Humidity'
import Calendar from '../components/Calendar'
import Currency from '../components/Currency'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 140,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const NavigationBar = () => (
        <AppBar position="absolute" className={clsx(classes.appBar)}>
            <Toolbar className={classes.toolbar}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Dashboard
          </Typography>
                <IconButton color="inherit" onClick={toggleDrawer('right', true)}>
                    <SettingsIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );

    const RightNavBar = () => (
        <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
            {Config()}
        </Drawer>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavigationBar />
            <RightNavBar />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Weather */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper >
                                <Weather />
                            </Paper>
                        </Grid>
                        {/* Weather */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper >
                                <Temperature />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper >
                                <Humidity />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper >
                                <Calendar />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper >
                                <Currency />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>

        </div>
    );
}
