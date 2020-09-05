import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box, Grid, Paper, Typography } from '@material-ui/core'

/* import generate highcarts function from helper */

/* */

const FoodConsumption = () => {
  /* define the state */

  /* fetch data from /api/food-consumption.json */

  return (
    <Grid spacing={3} container>
      <Grid xs={12} item>
        <Box component={Paper} height="100%">
          <Box p={3}>
            <div>calling HighchartsReact here</div>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FoodConsumption
