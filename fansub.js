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
    commentColor = commentItem.color == "+" ? '#f6f6f6' :'#f7e0e0';
    comment.style.background = commentColor;
    comment.style.margin = '5px';
    var template = '<span style="color">' + commentItem.comment+'</span>';
    comment.innerHTML = template;
    groupElem.appendChild(comment)
}

function showComments(e) {
    if (e.target !== this)
        return;
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
                })
        });
}

function createGroup(groupdata) {
    var group = document.createElement("div");
    var template = '<span>' + groupdata.groupname + '</span>&nbsp;&nbsp;&nbsp;<span style="color:grey">' + groupdata.approve + ' of ' + groupdata.total_users + ' approve</span>&nbsp;&nbsp;&nbsp;<span style="color: blue">' + groupdata.language +'</span>&nbsp;&nbsp;&nbsp;<span>'+groupdata.total_comments+' comments</span>';
    group.innerHTML = template;
    group.id = groupdata.groupid;
    group.style.margin = '10px 0 10px 0';
    group.style.cursor = 'pointer';
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
