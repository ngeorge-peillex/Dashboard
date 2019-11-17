import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Title from './Title'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 150
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginLeft: 8,
    minWidth: 120
  },
  textField: {
    marginLeft: 8
  },
})

function createData (month, price) {
  return { month, price }
}

const rows = [
  createData('Janvier 2019', 159),
  createData('Fevrier 2019', 237),
  createData('Mars 2019', 262),
  createData('Avril 2019', 305),
  createData('Mai 2019', 356)
]

export default function PriceEvolution (props) {
  const widget = props.widget
  const classes = useStyles()

  const [baseCurrency, setBaseCurrency] = React.useState('EUR')
  const [wantedCurrency, setWantedCurrency] = React.useState('USD')
  const [evolution, setEvolution] = React.useState({})
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  const handleChangeBase = event => {
    setBaseCurrency(event.target.value)
  }

  const handleChangeWanted = event => {
    setWantedCurrency(event.target.value)
  }

  React.useEffect(() => {
    ;(async () => {
      let result = await widget.fetchData({ base: baseCurrency, to: wantedCurrency })
      if (!result || result == '') return

      result = JSON.parse(result).rates
      console.log(result)
      setEvolution(result)
      forceUpdate()
      console.log(evolution)
    })()
  }, [wantedCurrency, baseCurrency])


  return (
    <>
      <Title>Price evolution</Title>
      <div className={classes.container}>
      <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>From currency</InputLabel>
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
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>To currency</InputLabel>
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
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow fontWeight='fontWeightBold'>
              <TableCell>Month</TableCell>
              <TableCell align='right'>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.month}
                </TableCell>
                <TableCell align='right'>{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
