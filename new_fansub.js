var id = documet.getElementById("myinfo_anime_id").value;

var loader = document.createElement("a");
loader.setAttribute('href', "javascript:void(0)");
loader.innerText = "loading...";

fetch('http://localhost:3300/api/fansubs/'+id)
    .then(res => {
        var groups = res.data;
        // groups on click fetch comments
    })