const api_key = "563492ad6f917000010000019c24b0af382f4d809230f39605775f6f";

export async function getPicture(query, pageSize){
    let memo_results = JSON.parse(localStorage.getItem("pexels_cached_results"));

    if(!memo_results || new Date() > new Date(memo_results["expiry"])){
        let url = "https://api.pexels.com/v1/search?locale=en-US&query=";
        url += encodeURI(query) + "&per_page=" + pageSize;
        let response = await fetch(url, {
            headers: new Headers({
                Authorization: api_key
            })
        });
        memo_results = await response.json();
        memo_results["expiry"] = new Date(new Date().setDate(new Date().getDate() + 14));
    }
    if(!memo_results["expiry"]){
        memo_results["expiry"] = new Date(new Date().setDate(new Date().getDate() + 14));
    }
    localStorage.setItem("pexels_cached_results", JSON.stringify(memo_results));
    return memo_results;
}