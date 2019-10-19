var heading = document.createElement("h2");
heading.appendChild(document.createTextNode("Fansubs"));
document.getElementsByClassName("pb24")[0].appendChild(document.createElement("br"));
document.getElementsByClassName("pb24")[0].appendChild(heading);

var loader = document.createElement("a");
loader.setAttribute('href', "javascript:void(0)");
loader.innerText = "loading...";
document.getElementsByClassName("pb24")[0].appendChild(loader);

document.body.style.border = "5px solid red";
var id = document.getElementById("myinfo_anime_id").value;
console.log(id)
var url = "http://localhost:3300/api/fangroups/"+id;

function createGroup(groupdata) {
    var group = document.createElement("div");
    group.appendChild(document.createTextNode(groupdata.groupname));
    group.appendChild(document.createTextNode(groupdata.approve_line));
    document.getElementsByClassName("pb24")[0].appendChild(group);
}

fetch(url)
    .then(res => {
       res.json()
        .then(data => {
            console.log(data);
            loader.innerHTML = "";
            data.forEach((item)=>createGroup(item));
        })
    });
