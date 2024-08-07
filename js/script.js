
let cartIcon = document.querySelector('.cart-icon')
let cart = document.querySelector('.cart')
let cartClose = document.querySelector('.close-cart')

cartIcon.onclick = () => {
    cart.classList.add("active");
}

cartClose.onclick = () => {
    cart.classList.remove("active");
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready(){
    //remove item
    var removeCartButton = document.getElementsByClassName("remove-cart")
    console.log(removeCartButton)
    for (var i = 0; i < removeCartButton.length; i++){
        var button = removeCartButton[i]
        button.addEventListener("click", removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('quantity-cart')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    //add to cart
    var addCart = document.getElementsByClassName("add-cart")
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener("click", addCartClicked)
    }
    //buy
    document.getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked)
}

function buyButtonClicked(){
    alert('your order is placed')
    var cartContent = document.getElementsByClassName("box-cart")[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal(); 
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

//add to cart

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("judul")[0].innerText;
    var price = shopProducts.getElementsByClassName("harga")[0].innerText;
    var img = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, img);
    updateTotal();
}
function addProductToCart (title, price, img){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('box-cart')[0]
    var cartItemNames = cartItems.getElementsByClassName('title-cart')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('You already add this to your cart');
            return;
        }
    }
    var cartBoxContent = `
                        <img src="${img}" alt="" class="img-cart">
                        <div class="detail-cart">
                            <div class="title-cart">${title}</div>
                            <div class="price-cart">${price}</div>
                            <input type="number" value="1" class="quantity-cart">
                        </div>
                        <a href="#" class="remove-cart">Remove</a>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('remove-cart')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('quantity-cart')[0].addEventListener('change', quantityChanged);
}

function updateTotal(){
    var cartContent = document.getElementsByClassName("box-cart")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName("price-cart")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantityElement = cartBox.getElementsByClassName("quantity-cart")[0];
        var quantity = quantityElement.value;
        total= total + (price * quantity);
    }
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
} 