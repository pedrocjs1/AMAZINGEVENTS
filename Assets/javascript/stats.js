const eventStatistics = document.getElementById("events-statistics")
const upcomingStatistics = document.getElementById("upcoming-statistics")

fetch('https://amazing-events.herokuapp.com/api/events')
.then((response) => response.json())
.then((json) => {
    let info = json
    let datos = info.events
    let categoriesOnly = new Set(datos.map(category => category.category))
    // let categoriesOnlyS = new Set(datos.map(category => category))
    let eventsEstiamteOnly = datos.filter(events => events.estimate)
    let eventsEstiamteCategory = new Set(eventsEstiamteOnly.map(event => event.category)) 
    printStatistics(datos, eventStatistics)
    console.log(datos)
    console.log(eventsEstiamteOnly)
    printUpcomingStatistics(eventsEstiamteCategory, upcomingStatistics)

    console.log(revenuesEstimate(eventsEstiamteOnly))

    // console.log(revenuesEstimateee(eventsEstiamteOnly))
    console.log(revenues(eventsEstiamteOnly, "cinema"))
    
})
// .catch(problems => eventStatistics.innerHTML = `<h1>We are having technical problems, try again later. 🛠</h1>`)


function highestAttendance(event){
    let high = event.map(element => element.assistance).filter(element => {
        let numero = parseInt(element)
        return numero
    }).sort((a,b) => b - a)
    return parseInt(high)
}

function lowestAttendance(event){
    let lowest = event.map(element => element.assistance).filter(element => {
        let numero = parseInt(element)
        return numero
    }).sort((a,b) => a - b)
    return (parseInt(lowest))
}

function largerCapacity(event){
    let larger = event.map(element => element.capacity).filter(element => {
        let numero = parseInt(element)
        return numero
    }).sort((a,b) => b - a)
    return parseInt(larger)
    
}


function printStatistics(event, table){
    let template = ``
    let highestAttendancee = highestAttendance(event)
    let lowestAttendancee = lowestAttendance(event)
    let largerCapacityy = largerCapacity(event)
        template += `
                <td>${highestAttendancee}</td>
                <td>${lowestAttendancee}</td>
                <td>${largerCapacityy}</td>
        `
    
    return table.innerHTML = template 
}




function revenuesEstimate(events){
    let eventsEstimate = events.map(event => {
        
        return {
            category: event.category,
            revenues: event.price * event.estimate,
            estimate: event.estimate

        }
    })
    return eventsEstimate
}

function revenuesEstimateee(events){
    let eventsEstimate = events.map(event => {
        if (event.category === events.category){
            return {
                revenues: event.price * event.estimate,
            }
            
        } 
    })
    return eventsEstimate
}



function revenues(event, category) {
    let revenuesCategory = event.filter(events => category.includes(event.category))
    return revenuesCategory
}



// if (evento.category == evento.category)





function printUpcomingStatistics(event, table){
    let template = ``
    let categories
    event.forEach(element => {
        template += `
            <tr>
                <td>${element}</td>
            </tr>
        `
    });
    return table.innerHTML = template
}




