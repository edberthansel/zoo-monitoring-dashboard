import Highcharts from 'highcharts'

export const generateHighchartsData = (sortedData = []) => {
    // create date categories for xAxis (example: 1/3, 2/3, ..., 31/3)
    let categories = [...new Set(sortedData.map((val) => val.day + "/" + val.month))];

    // create data series for each animal
    let animals = [...new Set(sortedData.map((val) => val.animal))];
    animals = animals.map((animal) => {
        return {
            name: animal,
            data: []
        };
    });

    let objAnimal = {};
    categories.forEach((date, index) => {
        // find elements in sortedData which the date is equal with current date categories
        let currentDateData = sortedData.filter(
            (value) => value.day + "/" + value.month === date
        );
        // looping the currentDateData to get the "meat" data
        currentDateData.forEach((current) => {
            if (!objAnimal[current.animal]) 
                objAnimal[current.animal] = 0;
            
            objAnimal[current.animal] = objAnimal[current.animal] + current.meat;
            // mapping the "meat" amount to data series
            animals = animals.map((value) => {
                value.data[index] = objAnimal[value.name];
                return value;
            });
        });
    });
    
    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Daily Food Consumption',
        },
        xAxis: {
            categories: categories,
            min: 0,
            max: 9
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Meat Consumption (kg)'
            },
            stackLabels: {
              enabled: false,
              style: {
                fontWeight: "bold",
                color:
                  // theme
                  (Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color) ||
                  "gray"
              }
            }
        },
        legend: {
            align: "left",
            x: 30,
            verticalAlign: "top",
            y: -10,
            floating: false,
            backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || "white",
            shadow: false
        },
        tooltip: {
            headerFormat: "<b>Period: {point.x}</b><br/>",
            pointFormat: "<span style='color:{series.color}';>\u25CF</span> {series.name}: {point.y}<br/>",
            footerFormat: "<b>Total: {point.total}</b>",
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: animals,
        scrollbar: {
            enabled:true,
	    }
    }
  
    return options
}