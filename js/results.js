// Graph CSV data using chart.js

// Parse the CSV data into the necessary arrys
async function getData(){
    const response = await fetch('data/heights-deaths-included.csv')
    const data = await response.text() // CSV in TEXT format

    const xDays = [] 
    const negControl = [] 
    const posControl = []
    const exOne = []
    const exTwo = []
    const exThree = []


    const table = data.split('\n').slice(1) // split by line and remove the 0th row

    table.forEach(row => {              // operate on each row
        const columns = row.split(',')  // split each row into columns
        const day = columns[0]
        xDays.push(day)
        const heightNeg = columns[1]
        negControl.push(heightNeg)
        const heightPos = columns[2]
        posControl.push(heightPos)
        const heightOne = columns[3]
        exOne.push(heightOne)
        const heightTwo = columns[4]
        exTwo.push(heightTwo)
        const heightThree = columns[5]
        exThree.push(heightThree)
    })
    return {xDays, posControl, negControl, exOne, exTwo, exThree}
}

async function createChart(){
    const data = await getData()                     // wait until getData() processes
    
    // Configured for chart.JS 3.x and above
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xDays,
            datasets: [{
                label: 'Negative Control Heights',
                data: data.negControl,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Positive Control Heights',
                data: data.posControl,
                backgroundColor: 'rgba(99, 155, 132, 0.2)',
                borderColor: 'rgba(99, 155, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Experimental 1 Heights',
                data: data.exOne,
                backgroundColor: 'rgba(132, 99, 255, 0.2)',
                borderColor: 'rgba(132, 99, 255, 1)',
                borderWidth: 1
            },
            {
                label: 'Experimental 2 Heights',
                data: data.exTwo,
                backgroundColor: 'rgba(255, 132, 99, 0.2)',
                borderColor: 'rgba(255, 132, 99, 1)',
                borderWidth: 1
            },
            {
                label: 'Experimental 3 Heights',
                data: data.exThree,
                backgroundColor: 'rgba(99, 132, 255, 0.2)',
                borderColor: 'rgba(99, 132, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {
                    title: {
                        display: true,
                        text: 'Day #',
                        font: {
                            size: 20
                        },
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Plant Height (cm)',
                        font: {
                            size: 20
                        },
                    },
                },
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: 'Wisconsin Fast Plants Heights vs Time (Deaths Included)',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    },
                },
                legend: {
                    position: 'bottom'
                },
            },
        },
    });
}

createChart()