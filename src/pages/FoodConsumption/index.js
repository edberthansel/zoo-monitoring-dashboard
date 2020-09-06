import React, { useEffect, useState } from 'react'
// import Highcharts from 'highcharts'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { Box, Grid, Paper } from '@material-ui/core'

import { generateHighchartsData } from './helper'

const FoodConsumption = () => {
  const [foodConsumptionData, setFoodConsumptionData] = useState([])

  const convertToValidDate = (data) => {
    let fixData = data.map((value) => {
      value.full_date = new Date(value.year, value.month, value.day);
      return value;
    });
    return fixData;
  }
  const sortByDate = (data) => data.sort((a, b) => a.full_date - b.full_date);

  useEffect(() => {
    fetch('/api/food-consumption.json')
      .then((res) => res.json())
      .then((res) => {
        // convertToValidDate function is used for adding "full_date" element in the "daily" array list based on the day, month, and year element
        let mappedFood = convertToValidDate(res.data.foodConsumption.daily);     
        // then sort the element in the list by "full_date" (ascending) 
        let sortedData = sortByDate(mappedFood);
        
        setFoodConsumptionData(sortedData);
      })
  }, [])

  return (
    <Grid spacing={3} container>
      <Grid xs={12} item>
        <Box component={Paper} height="100%">
          <Box p={3}>
            <HighchartsReact highcharts={Highcharts} options={generateHighchartsData(foodConsumptionData)} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FoodConsumption
