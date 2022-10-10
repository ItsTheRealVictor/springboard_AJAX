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


// console.log(displayTVshowObject(5))


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
// console.log(getBasicDataFromID(5))


async function getEpisodes(num){
    // solution code
//     let response = await axios.get(`http://api.tvmaze.com/shows/${num}/episodes`)

//     let episodes = response.data.map(episode => ({
//         id: episode.id,
//         name: episode.name,
//         season: episode.season,
//         number: episode.number,
//     }))

//     return episodes
// }
// end solution code
    
    // my code
    
    const episodeData = await axios.get(`http://api.tvmaze.com/shows/${num}/episodes`)
    results = []
    for (let item of episodeData.data){
        results.push([
            {
            'id': num,
            'episode name': item.name,
            'season': item.season,
            'number': item.number 
                    }])
    }
    return results
}
    // end my code

async function getShowsByTerm(query) {
    // ADD: Remove placeholder & make request to TVMaze search shows API.
    let termShows = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
    results = []
    for (let item of termShows.data){
        results.push({
            'id': item.show.id,
            'name': item.show.name,
            'summary': item.show.summary})
    }
    return results

    // return [
    //     {
    //     id: 1767,
    //     name: "The Bletchley Circle",
    //     summary:
    //         `<p><b>The Bletchley Circle</b> follows the journey of four ordinary 
    //             women with extraordinary skills that helped to end World War II.</p>
    //         <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their 
    //             normal lives, modestly setting aside the part they played in 
    //             producing crucial intelligence, which helped the Allies to victory 
    //             and shortened the war. When Susan discovers a hidden code behind an
    //             unsolved murder she is met by skepticism from the police. She 
    //             quickly realises she can only begin to crack the murders and bring
    //             the culprit to justice with her former friends.</p>`,
    //     image:
    //         "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
    //     }
    // ]
    }