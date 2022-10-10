async function getSomeData(){
    const someData = await axios.get("https://api.tvmaze.com/search/shows?q=monsters")
    console.log(someData.data)
    for (let title of someData.data){
        console.log(title.show.id, title.show.name)
    }
}

// console.log(getSomeData())

// Given a show ID, get from API and return (promise) array of episodes:
//       { id, name, season, number }
 
async function displayTVshowObject(num){
    const tvShow = await axios.get(`http://api.tvmaze.com/shows/${num}`)
    console.log(tvShow)
}


console.log(displayTVshowObject(5))


async function getBasicDataFromID(num){
    const idData = await axios.get(`http://api.tvmaze.com/shows/${num}`)
    
    const { name, runtime, genres } = idData.data
    const network = idData.data.network.name
    return { 
        'TV Show name': name,
        'genres': genres,
        'Network': network,
        'Average episode runtime': `${runtime} minutes` 
    }
    
}
console.log(getBasicDataFromID(5))

async function getEpisodes(num){
    const episodeData = await axios.get(`http://api.tvmaze.com/shows/${num}/episodes`)
    const {season, name, number} = episodeData.data
    for (let item of episodeData.data){
        console.log(item.season, item.name)
    }
}
getEpisodes(5)

// for (let i = 0; i<20; i++){
//     console.log(getDatafromID(i))
// }

//async function getShowData(ID){
    // const theData = await axios.get(`http://api.tvmaze.com/shows/${num}`)
    // const { }
// }