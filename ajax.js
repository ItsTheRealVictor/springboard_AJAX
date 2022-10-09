async function getData(){
    const response = await axios.get('https://swapi.dev/api/planets/.json')
    for (let planet of response.data.results){
        console.log(planet.name)
    }
    // console.log(response.data.results)
    console.log('This line is after axios.get')
}

getData()