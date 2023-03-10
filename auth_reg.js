'use strict'

let auth = document.querySelector(".auth")
let auth_login = document.querySelector("#auth_login")
let auth_password = document.querySelector("#auth_password")

let go_to_reg_submit = document.querySelector(".go_to_reg_submit")
go_to_reg_submit.addEventListener("click", showReg)

let auth_submit = document.querySelector(".auth_submit")
auth_submit.addEventListener("click", auth_func)



let reg = document.querySelector(".reg")
let reg_name = document.querySelector("#reg_name")
let reg_login = document.querySelector("#reg_login")

let reg_password = document.querySelector("#reg_password")

let go_to_auth_submit = document.querySelector(".go_to_auth_submit")
go_to_auth_submit.addEventListener("click", backToAuth)

let reg_submit = document.querySelector(".reg_submit")
reg_submit.addEventListener("click", reg_func)



function reg_func(){

    let name = reg_name.value
    let login = reg_login.value
    let password = reg_password.value

    fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: name,
            username: login,
            password: password
        })
    })
    .then(res => res.json())
    .then(json => receive(json))
}

function auth_func(){

    let login = auth_login.value
    let password = auth_password.value

    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
    
        username: login,
        password: password,
    
        })
    })
    .then(res => res.json())
    .then(json => receive(json))

}

function receive(json){

    if (json["id"]){
        console.log("успех")
        success(json["id"])
    }
}



function showReg(){
    auth.style.display = "none"
    reg.style.display = "block"

    auth_login.value = ""
    auth_password.value = ""
}
function backToAuth(){
    auth.style.display = "block"
    reg.style.display = "none"

    reg_name.value = ""
    reg_login.value = ""
    reg_password.value = ""
}


function success(id){
    
    localStorage.setItem("userId", id)
    reg.style.display = "none"
    auth.style.display = "none"
    
    open()
}