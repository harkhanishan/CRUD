let form = document.querySelector('.container .part1 .form form');
let list = document.querySelector('.part2 .products ul');
let products = [];
let isEditing = false;
let oldID = ''; 
createProductList();
//updateProductList();
console.log(products);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let values = {
        id: form.elements[0].value.trim(),
        name: form.elements[1].value.trim(),
        price: form.elements[3].value.trim(),
        desc: form.elements[4].value.trim(),
    }

    console.log(isEditing);
    if (isEditing) {

        let index = products.findIndex(pro => pro.id == oldID);
        // deleteProduct(i);
        console.log(index);
        products[index].id = form.elements[0].value.trim();
        products[index].name = form.elements[1].value.trim();
        products[index].price = form.elements[3].value.trim();
        products[index].desc = form.elements[4].value.trim();

        localStorage.setItem("Products", JSON.stringify(products));
        createProductList();
        isEditing = false;
        form.reset();
    }
    else if (checktheform(values)) {
        storeData(values);
        form.reset();
        updateProductList(values);
        console.log("isrunning");
    }
    else {
        alert("Please enter valid values only");
        return;
    }
});

function checktheform(v) {
    if (v.id == "" || v.name == "" || v.price == "" || v.desc == "")
        return false;
    else
        return true;
}

function storeData(x) {
    products.push(x);
    console.log(products);
    localStorage.setItem("Products", JSON.stringify(products));
    // console.log(JSON.parse(localStorage.getItem("Products")));
}

function getData() {
    products = JSON.parse(localStorage.getItem("Products"));
}


function createProductList() {
    getData();
    list.innerHTML = "";
    for (p of products) {
        list.innerHTML += '<li><div class="image"> <img src="' + '" alt="image of product"> </div> <div class="id">ID: ' + p.id +
        '</div> <div class="name">' + p.name + '</div><div class="price">' + p.price + ' ₹</div> <div class="buttons"><a class="view"><img src="images/view.png"'
        + 'alt="view"></a><a class="edit" onclick="updateProduct(\'' + p.id + '\')"><img src="images/edit.png" alt="edit"></a><a class="delete" onclick="deleteProduct(\'' + p.id + '\')"><img src="images/delete.png" alt="delete"></a></div></li>';
    }
    console.log(products);
    if(checkToHide()){
        return;
    }
}

function updateProductList(p) {
    list.innerHTML += '<li><div class="image"> <img src="' + '" alt="image of product"> </div> <div class="id">ID: ' + p.id +
    '</div> <div class="name">' + p.name + '</div><div class="price">' + p.price + ' ₹</div> <div class="buttons"><a class="view"><img src="images/view.png"'
    + 'alt="view"></a><a class="edit" onclick="updateProduct(\'' + p.id + '\')"><img src="images/edit.png" alt="edit"></a><a class="delete" onclick="deleteProduct(\'' + p.id + '\')"><img src="images/delete.png" alt="delete"></a></div></li>';
    if(checkToHide()){
        return;
    }
}

function updateProduct(i) {
    isEditing = true;
    let EditItem = findProduct(i);

    oldID = EditItem.id;
    form.elements[0].value = EditItem.id;
    form.elements[1].value = EditItem.name;
    form.elements[3].value = EditItem.price;
    form.elements[4].value = EditItem.desc;
}

function deleteProduct(i) {
    console.log(i);
    let deleteItem = findProduct(i);

    products = products.filter(p => p.id != deleteItem.id);
    localStorage.setItem("Products", JSON.stringify(products));
    createProductList();
    form.reset();
}

function findProduct(i) {
    return products.find(pr => {
        return pr.id == i;
    });
}

function checkToHide(){
    if(products.length > 0){
        document.querySelector('.part2 .products .warn').classList.add("nowarn");
        list.style.display = 'flex';
        return false;
    }
    else{
        list.style.display = 'none';
        document.querySelector('.part2 .products .warn').classList.remove("nowarn");
        return true;
    }
}