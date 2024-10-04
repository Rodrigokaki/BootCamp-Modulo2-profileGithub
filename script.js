function search(){
    var username = document.getElementById("inputUserName").value

    var url = `https://api.github.com/users/${username}`

    $.getJSON(url, (user) =>{
        setUserData(user)
        showError()
    }).fail( () => {
        setUserData({})
        showError("Não encontrado!")

    })

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