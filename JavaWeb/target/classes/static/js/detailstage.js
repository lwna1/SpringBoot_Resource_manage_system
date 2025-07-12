document.addEventListener("DOMContentLoaded", function () {
    let resourceClassify = sessionStorage.getItem("classify");
    let resourceId = sessionStorage.getItem("resourceId");
    let userData = JSON.parse(sessionStorage.getItem("user"));
    if (resourceClassify && resourceId) {
        increaseClicks(resourceClassify, resourceId);
        getResourceData(resourceClassify, resourceId);
        getComments(resourceClassify, resourceId);
    }

    document.getElementById("favoriteButton").addEventListener("click", function () {
        favoriteResource(resourceClassify, resourceId,userData);
    });
    document.getElementById("unfavoriteButton").addEventListener("click", function () {
        unfavoriteResource(resourceClassify, resourceId,userData);
    });
    document.getElementById("postCommentButton").addEventListener("click", function () {
        postComment(resourceClassify, resourceId,userData);
    });
});

function getResourceData(classify, id) {
    axios.get(`/detailstage/resources?classify=${classify}&id=${id}`)
        .then(response => {
            console.log(classify);
            console.log(response.data);
            console.log(response.data.data[0].filmName);
            if(classify === "Book") {
                let resource = response.data.data;
                console.log(resource.bookName);
                document.getElementById("resourceImage").src = resource[0].bookImg;
                document.getElementById("resourceName").innerText = resource[0].bookName;
                document.getElementById("resourceDirector").innerText = resource[0].writer;
                document.getElementById("resourceSynopsis").innerText = resource[0].bookSynopsis;
                document.getElementById("resourceClicks").innerText = `${resource[0].bookClicks}`;
                document.getElementById("resourceUrl").href = resource[0].bookUrl;
            }
            else if(classify === "Film"){
                let resource = response.data.data;
                document.getElementById("resourceImage").src = resource[0].filmImg;
                document.getElementById("resourceName").innerText = resource[0].filmName;
                document.getElementById("resourceDirector").innerText = resource[0].director;
                document.getElementById("resourceSynopsis").innerText = resource[0].filmSynopsis;
                document.getElementById("resourceClicks").innerText = `${resource[0].filmClicks}`;
                document.getElementById("resourceUrl").href = resource[0].filmUrl;
            }
        })
        .catch(error => {
            console.error("There was an error fetching the resource data!", error);
        });
}

function increaseClicks(classify, id) {
    axios.post(`/detailstage/increaseClicks?classify=${classify}&id=${id}`)
        .catch(error => {
            console.error("There was an error increasing the resource clicks!", error);
        });
}

function favoriteResource(classify, id, userData) {
    // let userData = JSON.parse(sessionStorage.getItem("user"));
    axios.post(`/detailstage/favorite?classify=${classify}&id=${id}&userId=${userData.userId}`)
        .then(response => {
            alert("已成功加入收藏");
        })
        .catch(error => {
            console.error("There was an error favoriting the resource!", error);
        });
}
function unfavoriteResource(classify, id, userData) {
    // let userData1 = JSON.parse(sessionStorage.getItem("user"));
    console.log(userData);
    axios.post(`/detailstage/unfavorite?classify=${classify}&id=${id}&userId=${userData.userId}`)
        .then(response => {
            alert("已取消收藏");
        })
        .catch(error => {
            console.error("There was an error unfavoriting the resource!", error);
        });
}
function getComments(classify, id) {
    axios.get(`/detailstage/getcomments?classify=${classify}&id=${id}`)
        .then(response => {
            let comments = response.data.data;
            let commentsList = document.getElementById("commentsList");
            commentsList.innerHTML = "";
            for(let i=0;i<comments.length;i++)
            {
                let Data = comments[i];

                let commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");

                let commentHeader = document.createElement("div");
                commentHeader.classList.add("commentHeader");

                let userNameSpan = document.createElement("span");
                // userNameSpan.classList.add("userNameSpan");
                getUserById(Data.commentatorId, function(userName) {
                    userNameSpan.innerText = userName;
                });

                let commentTime = document.createElement("span");
                commentTime.classList.add("commentTime");
                commentTime.innerText = new Date(Data.commentDate).toLocaleString();
                // console.log("这是Time");
                // console.log(Data.commentDate);

                commentHeader.appendChild(userNameSpan);
                commentHeader.appendChild(commentTime);
                let commentContent = document.createElement("div");
                commentContent.innerText = Data.comment;

                commentDiv.appendChild(commentHeader);

                commentDiv.appendChild(commentContent);
                commentsList.appendChild(commentDiv);
            }
        })
        .catch(error => {
            console.error("There was an error fetching the comments!", error);
        });
}

function postComment(classify, id,userData) {
    let comment = document.getElementById("newComment").value;
    axios.post(`/detailstage/comments?classify=${classify}&id=${id}&userId=${userData.userId}&comment=${comment}`)
        .then(response => {
            alert("评论已发送");
            getComments(classify, id); // 更新评论区
        })
        .catch(error => {
            console.error("There was an error posting the comment!", error);
        });
}

function getUserById(userId, callback) {
    console.log(userId);
    axios.get(`/detailstage/users?userId=${userId}`)
        .then(response => {
            // console.log("这是名称");
            // console.log(response.data);
            let userName = response.data;
            callback(userName);
        })
        .catch(error => {
            console.error("There was an error fetching the user data!", error);
        });
}

