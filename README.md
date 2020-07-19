# steam-status-img
Display a steam status on your GitHub profile (if you dare)...

Inspired by [@natemoo-re](https://github.com/natemoo-re)'s [Spotify Status](https://github.com/natemoo-re/natemoo-re)

## How to use
Add an `<img />` to your README (or anywhere really) where the src is 

`https://steam-status-img.vercel.app/currently-playing?username={VANITY_URL}`

The `VANITY_URL` is the custom URL you can set for your Steam profile. So for `https://steamcommunity.com/id/Borgdude`, `Borgdude` is the `VANITY_URL`. If you don't have a custom URL, you can use the numbers, which is your `STEAM_ID` like so: `https://steam-status-img.vercel.app/currently-playing?steamid={STEAM_ID}`

For game status to show, you must have your "Game details" have to be public in your privacy settings.

Example:
```
<img src="https://steam-status-img.vercel.app/currently-playing?username=Borgdude" width="256" height="64" 
    alt="Now Playing">
```

<img src="https://steam-status-img.vercel.app/currently-playing?username=Borgdude" width="256" height="64" alt="Now Playing" />

### Limitations
The size must be 256x64


## Features
Currently able to display the modes: Offline, Online and In-Game

| Offline to Online | Offline to In-Game |
| --- | --- |
| <img src="https://media3.giphy.com/media/SAI3TR6HUKOyztjbrd/giphy.gif" height="400"/> | <img src="https://media2.giphy.com/media/cJMH4o4BpjJIx2yk4Z/giphy.gif" height="400" /> |
