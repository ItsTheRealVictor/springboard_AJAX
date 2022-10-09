
async function getLaunches(){
    const baseLaunchesURL = await axios.get('https://api.spacexdata.com/v4/launches/upcoming')
    for (let name of baseLaunchesURL.data){
        console.log(name.name)
    }
    
}
console.log(getLaunches())