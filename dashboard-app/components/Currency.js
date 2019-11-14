import { FormControl } from '@material-ui/core'
import { Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import { Divider } from '@material-ui/core'
import Title from './Title';
import React from 'react';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginLeft: 8,
        minWidth: 120,
    },
    textField: {
        marginLeft: 8,
    }
}));

export default function Deposits() {
    const classes = useStyles();
    const [baseAmount, setBaseAmount] = React.useState(0);
    const [wantedAmount, setWantedAmount] = React.useState(0);
    const [baseCurrency, setBaseCurrency] = React.useState('');
    const [wantedCurrency, setWantedCurrency] = React.useState('');
    const [exchangeRate, setExchangeRate] = React.useState(0);

    const handleChangeBase = event => {
        setBaseCurrency(event.target.value);
    };
    
    const handleChangeWanted = event => {
        setWantedCurrency(event.target.value);
    };

    const handleChangeBaseAmount = event => {
        setBaseAmount(event.target.value); 
    };

    return (
        <React.Fragment>
            <div>
                <Title>Currency exchange rate</Title>
                <TextField
                    id="standard-basic"
                    className={classes.textField}
                    margin="normal"
                    value={baseAmount}
                    onChange={handleChangeBaseAmount}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={baseCurrency}
                        onChange={handleChangeBase}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Divider />
            </div>
            <div>
                <TextField
                    disabled
                    id="standard-basic"
                    className={classes.textField}
                    margin="normal"
                    value={wantedAmount}
                >
                </TextField>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={wantedCurrency}
                        onChange={handleChangeWanted}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </React.Fragment>
    );
}