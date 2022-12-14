
async function getLaunches(){
    const baseLaunchesURL = await axios.get('https://api.spacexdata.com/v4/launches/upcoming')

    const ul = document.querySelector('#launches')
    const butt = document.querySelector('#getlaunches')
    const clearButt = document.querySelector('#clearLaunches')

    butt.addEventListener('click', function(){

        for (let name of baseLaunchesURL.data){
            const newItem = document.createElement('LI')
            newItem.innerText = name.name
            ul.appendChild(newItem)
        }
    })

    clearButt.addEventListener('click', function(){   
        ul.remove()
})
}
console.log(getLaunches())   
