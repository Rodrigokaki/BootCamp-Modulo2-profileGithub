
var historyList = []

function search(){
    var username = document.getElementById("inputUserName").value

    var url = `https://api.github.com/users/${username}`

    $.getJSON(url, (user) =>{
        setUserData(user)
        addUserToHistory(user)
        refreshHistory()
        showError()
    }).fail( () => {
        setUserData({})
        showError("Não encontrado!")

    })

}

function refreshHistory(){
    document.getElementById("history").innerHTML = ""
    for(let i of historyList){
        document.getElementById("history").innerHTML +=`
        <div class="col"> 
            <img id="avatar_url" src="${i.avatar_url}" width="110" height="110" class="shadow rounded" />
        </div>`
    }
}

function setUserData(user){
    document.getElementById("name").innerHTML = user.name || ""
    document.getElementById("html_url").innerHTML = user.html_url || ""
    document.getElementById("company").innerHTML = user.company || ""

    document.getElementById("avatar_url").innerHTML = user.avatar_url ? 
                                            `<img src="${user.avatar_url}" width="220" height="220" class="shadow rounded" />`
                                            :
                                            ""
}

function showError(msg){
    document.getElementById("notFoundError").innerHTML = msg ? 
    `<div class="alert alert-danger" role="alert">${msg}</div>`
    :
    ""
}

function addUserToHistory(user){
    for(let i in historyList){
        if(historyList[i].login == user.login || i == 4){
            delete historyList[i]
            break
        }
    }
    historyList.unshift(user)
}