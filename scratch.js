const $showsList = $("#shows-list");
const $searchForm = $('#search-form')
const $episodesList = $('#episodes-list')


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
    console.log(tvShow.data.image.original)
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
    episodeResults = []
    for (let item of episodeData.data){
        episodeResults.push([
            {
            'id': num,
            'episode_name': item.name,
            'season': item.season,
            'number': item.number 
                    }])
    }
    // for debugging purposes

    // for (let result of episodeResults){
    //     console.log(result[0])
    // }
    for (let result of episodeResults){
        let item = `<li>${result[0].episode_name} (ep # ${result[0].number}, season ${result[0].season})</li>`
        $('#episodes-list').append(item)
    }
}
// console.log(getEpisodes(50))
    // end my code

// $searchForm.on('submit', function(evt){
//     evt.preventDefault()
//     console.log('fart')
// })

$searchForm.on('submit', async function(evt){
    evt.preventDefault()
    let query = $('#search-query').val()

    console.log(query)
})


    
$searchForm.on('submit', async function(evt) {
    evt.preventDefault()
    let query = $('#search-query').val() 
    


    // ADD: Remove placeholder & make request to TVMaze search shows API.
    let termShows = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
    // return episodeResults
    

//     // for debugging purposes (inspecting the show data to grab what I want)
//     // for (let thing of termShows.data){
//     //     if(!(thing.show.image)){
//     //         console.log('oops')
//     //     } else {
//     //         console.log('image here')
//     //     }
//     // }


    $showsList.empty();
    
    shows = []
    for (let item of termShows.data){

        // if the show has no image, use a stock image
        if (!(item.show.image)){
            shows.push({
                'id': item.show.id,
                'name': item.show.name,
                'summary': item.show.summary,
                'original': 'https://tinyurl.com/tv-missing'
            })
        } else{
            // if it does have an image, push it into the shows array.
            shows.push({
                'id': item.show.id,
                'name': item.show.name,
                'summary': item.show.summary,
                'original': item.show.image.original
            })
        }
    }

    for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
        <div class="media">
            <img 
                src="${show.original}" 
                alt="oops" 
                class="w-25 mr-3">
            <div class="media-body">
            <h5 class="text-primary">${show.name}</h5>
            <div><small>${show.summary}</small></div>
            <button class="btn btn-outline-light btn-sm Show-getEpisodes">
                Episodes
            </button>
            </div>
        </div>  
        </div>
        `);

    $showsList.append($show);  }

    // console.log('fart')
})

// const epButt = $('.Show-getEpisodes')

$(document).on('click', '.Show-getEpisodes', function(evt){
    evt.preventDefault()

    $episodesList.empty()

    let tvShowID = ($(this).parent().parent().parent()[0].attributes[0].value) // This looks terrible, there has get to be a better way
    getEpisodes(tvShowID)

})





