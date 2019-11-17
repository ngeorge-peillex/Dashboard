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

export default function Currency (props) {
  const widget = props.widget
  const classes = useStyles()

  const tick = () => updateData()

  const updateRefreshRate = value => {
    setRefreshRate(value)
    if (value && value.length && parseInt(value)) {
      clearInterval(intervalTick)
      setIntervalTick(setInterval(tick, parseInt(value) * 1000))
    }
  }

  const [refreshRate, setRefreshRate] = React.useState('30')
  const [intervalTick, setIntervalTick] = React.useState(0)

  React.useEffect(() => {
    updateRefreshRate(refreshRate)
  }, [])

  const refreshRateInput = (
    <TextField
      variant='outlined'
      margin='normal'
      label='Refresh rate'
      value={refreshRate}
      onChange={event => updateRefreshRate(event.target.value)}
    />
  )

  const [baseAmount, setBaseAmount] = React.useState('1')
  const [wantedAmount, setWantedAmount] = React.useState('1')
  const [baseCurrency, setBaseCurrency] = React.useState('EUR')
  const [wantedCurrency, setWantedCurrency] = React.useState('USD')

  async function updateData () {
    let result = await widget.fetchData({
      convert: baseCurrency.concat('_', wantedCurrency)
    })
    if (!result || result == '') return

    const converted = baseCurrency.concat('_', wantedCurrency)
    result = JSON.parse(result)[converted]
    setWantedAmount(baseAmount * result)
  }

  React.useEffect(() => {
    updateData()
  }, [baseAmount, baseCurrency, wantedCurrency])

  return (
    <>
      <div>
        <Title>Currency exchange rate</Title>
        {refreshRateInput}
        <br />
        <TextField
          id='standard-basic'
          className={classes.textField}
          margin='normal'
          value={baseAmount}
          onChange={event => setBaseAmount(event.target.value)}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Currency</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={baseCurrency}
            onChange={event => setBaseCurrency(event.target.value)}
          >
            <MenuItem value='EUR'>Euro</MenuItem>
            <MenuItem value='USD'>Dollar</MenuItem>
            <MenuItem value='GBP'>Livre</MenuItem>
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
            onChange={event => setWantedCurrency(event.target.value)}
          >
            <MenuItem value='EUR'>Euro</MenuItem>
            <MenuItem value='USD'>Dollar</MenuItem>
            <MenuItem value='GBP'>Livre</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  )
}
