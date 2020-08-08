$(document).ready(function(){

  var data = [ { 
"id": 9090, 
"name": "Item1",
"price": 200, 
"discount": 10, 
"type": "fiction", 
"img_url": "https://place-hold.it/40.jpg" }, 
{ 

"id": 9091, 
"name": "Item2", 
"price": 250, 
"discount": 15, 
"type": "literature", 
"img_url": "https://place-hold.it/40.jpg" }, 
{ 

"id": 9092, 
"name": "Item3", 
"price": 320, 
"discount": 5, 
"type": "literature", 
"img_url": "https://place-hold.it/40.jpg" }, 
{ 

"id": 9093, 
"name": "Item4", 
"price": 290, 
"discount": 0, 
"type": "thriller", 
"img_url": "https://place-hold.it/40.jpg" }, 
{ 

"id": 9094, 
"name": "Item5", 
"price": 500, 
"discount": 25, 
"type": "thriller", 
"img_url": "https://place-hold.it/40.jpg" }, 
{ 

"id": 9095, 
"name": "Item6", 
"price": 150, 
"discount": 5, 
"type": "literature", 
"img_url": "https://place-hold.it/40.jpg" }, 
{ 


"id": 9096, 
"name": "Item7", 
"price": 700, 
"discount": 22, 
"type": "literature", 
"img_url": "https://place-hold.it/40.jpg" }, 
{ 

"id": 9097,
"name": "Item8", 
"price": 350, 
"discount": 18, 
"type": "fiction", 
"img_url": "https://place-hold.it/40.jpg" 
} ]

var htmlText = data.map(function(o){
  return `
      <div class="product"><div class="product-image">
      <img src="${o.img_url}">
    </div>
    <div class="product-details">
      <div class="product-title">Name: ${o.name}</div>
      <div class="product-type">Type: ${o.type}</div>
    </div>
    <div class="product-price">${o.price}</div>
    <div class="product-quantity">
      <input type="number" value="1" min="1">
    </div>
    <div class="product-removal">
      <button class="remove-product btn btn-outline-danger" onclick="document.getElementById('demo').innerHTML = 'ITEM DELETED'">
        Remove
      </button>
    </div>
    <div class="product-line-price">${o.price}</div></div>
  `;
});
$('.json-product').append(htmlText);

$("button.remove-product").click(function(){
$('#demo').addClass('hide-ele');
  setTimeout(function(){
    $('#demo').removeClass('hide-ele');
},1000);
});
  /* Set rates + misc */
var discountRate = 0.05;
var shippingRate = 15.0;
var fadeTime = 300;

/* Assign actions */
$(".product-quantity input").change(function () {
  updateQuantity(this);
});

$(".product-removal button").click(function () {
  removeItem(this);
});

/* Recalculate cart */
function recalculateCart() {
  var subtotal = 0;

  /* Sum up row totals */
  $(".product").each(function () {
    subtotal += parseFloat($(this).children(".product-line-price").text());
  });

  /* Calculate totals */
  var discount = subtotal * discountRate;
  var shipping = subtotal > 0 ? shippingRate : 0;
  var total = (subtotal + shipping) - discount;

  /* Update totals display */
  $(".totals-value").fadeOut(fadeTime, function () {
    $("#cart-subtotal").html(subtotal.toFixed(2));
    $("#cart-tax").html(discount.toFixed(2));
    $("#cart-shipping").html(shipping.toFixed(2));
    $("#cart-total").html(total.toFixed(2));
    if (total == 0) {
      $(".checkout").fadeOut(fadeTime);
    } else {
      $(".checkout").fadeIn(fadeTime);
    }
    $(".totals-value").fadeIn(fadeTime);
  });
}

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children(".product-price").text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children(".product-line-price").each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}

/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
  });
}
});