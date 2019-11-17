import { FormControl, Typography, Divider } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'

import Title from './Title'
import React from 'react'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginLeft: 8,
    minWidth: 120
  },
  textField: {
    marginLeft: 8
  }
}))

export default function Deposits (props) {
  const widget = props.widget
  const classes = useStyles()
  const [baseAmount, setBaseAmount] = React.useState('1')
  const [wantedAmount, setWantedAmount] = React.useState('1')
  const [baseCurrency, setBaseCurrency] = React.useState('EUR')
  const [wantedCurrency, setWantedCurrency] = React.useState('USD')

  const handleChangeBase = event => {
    setBaseCurrency(event.target.value)
  }

  const handleChangeWanted = event => {
    setWantedCurrency(event.target.value)
  }

  const handleChangeBaseAmount = event => {
    setBaseAmount(event.target.value)
  }

  React.useEffect(() => {
    ;(async () => {
      let result = await widget.fetchData({ convert: baseCurrency.concat('_', wantedCurrency) })
      if (!result || result == '') return

      let converted = baseCurrency.concat('_', wantedCurrency);
      result = JSON.parse(result)[converted]
      setWantedAmount(baseAmount * result)
    })()
  }, [wantedCurrency, baseAmount, baseCurrency])

  return (
    <>
      <div>
        <Title>Currency exchange rate</Title>
        <TextField
          id='standard-basic'
          className={classes.textField}
          margin='normal'
          value={baseAmount}
          onChange={handleChangeBaseAmount}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Currency</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={baseCurrency}
            onChange={handleChangeBase}
          >
            <MenuItem value="EUR">Euro</MenuItem>
            <MenuItem value="USD">Dollar</MenuItem>
            <MenuItem value="GBP">Livre</MenuItem>
          </Select>
        </FormControl>
        <Divider />
      </div>
      <div>
        <TextField
          disabled
          id='standard-basic'
          className={classes.textField}
          margin='normal'
          value={wantedAmount}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Currency</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={wantedCurrency}
            onChange={handleChangeWanted}
          >
            <MenuItem value="EUR">Euro</MenuItem>
            <MenuItem value="USD">Dollar</MenuItem>
            <MenuItem value="GBP">Livre</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  )
}
