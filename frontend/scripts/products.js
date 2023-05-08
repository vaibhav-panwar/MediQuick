let productDiv = document.getElementById("products1");
let btns = document.getElementById("btns");

fetchdata(productDiv,1)
function fetchdata(appendLoc, pageno) {
    fetch(`http://localhost:8080/product?limit=12&page=${pageno}`)
    .then((res)=>{
        console.log(res.headers.get('content-length'));
        return res.json()
    })
    .then((data)=>{
        appendData(data,appendLoc);
    })
    .catch((error)=>{
        console.log(error);
    })
}
function appendData(deta, whereto) {
    whereto.innerHTML = "";
    for (let i = 0; i < deta.length; i++) {
        let a = createCard(deta[i].title, deta[i].img, deta[i].price, deta[i].discountPrice);
        whereto.append(a);
    }
}
function createCard(name, img, ogprice, disprice) {
    let card = document.createElement("div");
    card.setAttribute("class", "crd");
    let discount = Math.floor(((ogprice - disprice) / ogprice) * 100);
    if (name.length >= 40) {
        name = name.slice(0, 40) + '...';
    }

    card.innerHTML = ` <div id="pimg">
                <img src="${img}" alt="img">
            </div>
            <div id="pcontent">
                <h2>${name}</h2>
                <p>MRP <span class="pPrice">Rs ${ogprice}</span>  <span id="pdisc">   ${discount}% off</span></p>
                <p id="op">Rs. ${disprice}</p>
            </div>`
    return card;
}