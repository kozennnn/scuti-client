export function getWallpaper(id) {
    return fetch('http://127.0.0.1:8081/room/spaces/paperdata.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            return json.paper_wall[id];
        })
}