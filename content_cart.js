'use strict'

function open(){
    content.style.display = "grid"
    panel.style.display = "grid"
    filtered.style.display = "block"
}




let items = []
let categories = []

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then((json) => showProduct(json))


let content = document.querySelector('.content')
let panel = document.querySelector(".panel")

let price_btn = document.querySelector('.price_btn')
price_btn.addEventListener("click", sortByPrice)



function showProduct(json){

    items = json["products"]
    //console.log(items)
    
    for (const iterator of items) {
        content.innerHTML += `<div class="item" data-id="${iterator["id"]}" price="${iterator["price"]}"><div class="text">${iterator["title"]}</div><img src="${iterator["images"][0]}"></img><div class="price">${iterator["price"]}</div><div class="Buy">Купить</div></div>`
    }

    getCategory()
}


function sortByPrice(){

    for(let i = 0; i < content.children.length; i++){
        for(let j = i; j < content.children.length; j++){

            if(+content.children[i].getAttribute('price') > +content.children[j].getAttribute('price')){

                //  Эта переменная хранит заменённое значение для возвращения обратно в список
                let replaceNode = content.replaceChild(content.children[j], content.children[i])
                insertAfter(replaceNode, content.children[i])
            }
        }
    }
}


function insertAfter(elem, refElem){
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
}





let cart = {}

document.onclick = event => {
    if(event.target.classList.contains("Buy")){

        let selectedId = event.target.parentNode.dataset.id - 1
        
        cart[selectedId] = items[selectedId]
        cart[selectedId].count = 1
    }

    //Корзина
    else if(event.target.classList.contains("plus")){
    
        let selectedId = event.target.parentNode.dataset.id
        cart[selectedId]["count"] += 1
        redraw()
    }
    else if(event.target.classList.contains("minus")){

        let selectedId = event.target.parentNode.dataset.id
        if(cart[selectedId]["count"] > 1){
            cart[selectedId]["count"] -= 1
            redraw()
        }
        else{
            delete cart[selectedId]
            redraw()
        }
    }
}

let cartView = document.querySelector(".cart")

let cart_btn = document.querySelector(".cart_btn")
cart_btn.addEventListener("click", openCart)
let isCartOpen = false
let isReDraw = false

function openCart(){

    if(!isCartOpen){
        isCartOpen = true
        content.style.display = "none"
        filtered.style.display = "none"
        cartView.style.display = "block"

        for (const key in cart) {
            cartView.innerHTML += `<div class="cartItem" data-id="${key}"><div class="cartTitle">${cart[key]["title"]}</div><div class="cartPrice">${cart[key]["price"]}</div><div class="cartCount">${cart[key]["count"]}</div><div class="plus">+</div><div class="minus">-</div></div>`
        }
        cartView.innerHTML += `<div class="total"><div class="summ">Сумма: ${summ()}</div><div class="count">Общее количество товаров: ${count()}</div></div>`
    }
    else{
        isCartOpen = false
        content.style.display = "grid"
        cartView.style.display = "none"
        filtered.style.display = "block"
        cartView.innerHTML = null
    }
}

function redraw(){
    cartView.innerHTML = null
    for (const key in cart) {
        cartView.innerHTML += `<div class="cartItem" data-id="${key}"><div class="cartTitle">${cart[key]["title"]}</div><div class="cartPrice">${cart[key]["price"]}</div><div class="cartCount">${cart[key]["count"]}</div><div class="plus">+</div><div class="minus">-</div></div>`
    }
    cartView.innerHTML += `<div class="total"><div class="summ">Сумма: ${summ()}</div><div class="count">Общее количество товаров: ${count()}</div></div>`
}

function summ(){

    let totalSumm = 0
    for (const key in cart) {
        totalSumm += cart[key]["price"] * cart[key]["count"]
    }

    return totalSumm
}

function count(){

    let totalcount = 0
    for (const key in cart) {
        totalcount += cart[key]["count"]
    }

    return totalcount
}



function getCategory(){

    let index = 0

    for (const key in items) {

        let isNew = true

        if(categories.length == 0){
            categories[index] = items[key]["category"]
            index += 1
            continue
        }

        for (const iterator of categories) {
            
            if(items[key]["category"] == iterator){
                isNew = false
            }
        }

        if(isNew){
            categories[index] = items[key]["category"]
            index += 1
        }

    }
    

    for (const iterator of categories) {
        console.log(iterator)
    }

    innerRadio()
}



let filtered = document.querySelector(".filtered")
filtered.addEventListener("click", filter)

function innerRadio(){

    for (const iterator of categories) {
        filtered.innerHTML += `<input type="checkbox" name="${iterator}" id="" value="${iterator}">${iterator}`
    }
}

function filter(){

    let checkedfilter = document.querySelectorAll("input:checked")

    let params = []

    checkedfilter.forEach(function(elem){
        console.log(elem.value)
        params.push(elem.value)
    })

    content.innerHTML = null

    

    if(params.length != 0){
        for (const iterator of items) {
        
            for (const selectedCategory of params) {
                if(iterator["category"] == selectedCategory){
                    content.innerHTML += `<div class="item" data-id="${iterator["id"]}" price="${iterator["price"]}"><div class="text">${iterator["title"]}</div><img src="${iterator["images"][0]}"></img><div class="price">${iterator["price"]}</div><div class="Buy">Купить</div></div>`
                    break
                }
            }
        }
    }
    else{
        for (const iterator of items) {
            content.innerHTML += `<div class="item" data-id="${iterator["id"]}" price="${iterator["price"]}"><div class="text">${iterator["title"]}</div><img src="${iterator["images"][0]}"></img><div class="price">${iterator["price"]}</div><div class="Buy">Купить</div></div>`
        }
    }
}