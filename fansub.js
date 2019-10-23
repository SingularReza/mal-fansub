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
var url = "http://localhost:3300/api/fansubs/"+id;

function createComment(commentItem, groupElem) {
    var comment = document.createElement("div");
    comment.appendChild(document.createTextNode(commentItem.comment));
    groupElem.appendChild(comment)
}

function showComments(e) {
    console.log("sdbwhjbd");
    console.log(e.target.id);
    var groupid = e.target.id;
    fetch("http://localhost:3300/api/fansubs/" + id+ "/"+groupid)
        .then(res => {
            res.json()
                .then(data => {
                    console.log(data);
                    var group = document.getElementById(groupid);
                    console.log(group);
                    data.forEach((item) => createComment(item, group));
                    console.log("here too");
                })
        });
    console.log("here");
}

function createGroup(groupdata) {
    var group = document.createElement("div");
    group.appendChild(document.createTextNode(groupdata.groupname));
    group.appendChild(document.createTextNode(groupdata.approve +" of "+groupdata.total_users+" approve"));
    group.appendChild(document.createTextNode(groupdata.language));
    group.id = groupdata.groupid;
    group.onclick = showComments;
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
