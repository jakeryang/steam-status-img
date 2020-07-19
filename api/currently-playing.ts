import { NowRequest, NowResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { decode } from "querystring";
import { getCurrentlyPlaying, getIDFromUser } from "../utils/steam";
import { Status } from "../components/NowPlayingSteam";

async function toBase64(url: string){
    const buff = await (await fetch(url)).arrayBuffer();
    return `data:image/jpeg;base64,${Buffer.from(buff).toString("base64")}`;
}

function getTextContent(data: HTMLElement | Element, tagName: string){
    return data.getElementsByTagName(tagName).item(0).textContent
}

function getProfile(data: HTMLElement){
    return {
        steamID: getTextContent(data, "steamID"),
        avatar: getTextContent(data, "avatarFull"),
        onlineState: getTextContent(data, "onlineState")
    }
}

function getGameInfo(data: HTMLElement){
    const gameInfoElement = data.getElementsByTagName("inGameInfo").item(0)
    return {
        gameName: getTextContent(gameInfoElement, "gameName"),
        gameIcon: toBase64(getTextContent(gameInfoElement, "gameIcon"))
    }
}

export default async function (req: NowRequest, res: NowResponse) {
    const params = decode(req.url.split("?")[1]) as any;

    if(params && (params.steamid || params.username)){    
        let textContent = "";

        if(params.username && !params.steamid){
            let steamid = await getIDFromUser(params.username)
            if(steamid === null)
                return res.status(404).send(`Username: ${params.username} not found.`)
            else
                params.steamid = steamid
        }
        const data = await getCurrentlyPlaying(params.steamid)
        data.avatar = await toBase64(data.avatarmedium)
    
        textContent = renderToString(Status({username: data.personaname, gameextrainfo: data.gameextrainfo, avatar: data.avatar, state: data.personastate}))
        
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
        return res.status(200).send(textContent)
    }
    return res.status(204)
}
