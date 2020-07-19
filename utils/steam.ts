import fetch from "isomorphic-unfetch";

const { 
    STEAM_WEB_API_KEY,
} = process.env;

// export async function getCurrentlyPlaying(username){
//     return fetch(`https://steamcommunity.com/id/${username}?xml=1`)
//         .then(response => response.text())
//         .then(str => (new DOMParser()).parseFromString(str, "text/xml"))
//         .then(data => {return data.documentElement})
// }

export async function getCurrentlyPlaying(steamid: string){
    return fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_WEB_API_KEY}&steamids=${steamid}`)
        .then(response => response.json())
        .then(json => {
            return json.response.players[0]
        })
}

export async function getIDFromUser(username: string){
    return fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_WEB_API_KEY}&vanityurl=${username}`)
    .then(response => response.json())
    .then(json => {
        if(json.response.success === 42)
            return null
        else
            return json.response.steamid
    })
}