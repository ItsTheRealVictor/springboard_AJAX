const $showsList = $("#shows-list");

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
    // return results
    

    // for debugging purposes (inspecting the show data to grab what I want)
    for (let thing of termShows.data){
        if(!(thing.show.image)){
            console.log('oops')
        } else {
            console.log('image here')
        }
    }


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
  }
getShowsByTerm('space')














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
    // }