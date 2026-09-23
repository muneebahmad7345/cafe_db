
    let cart = JSON.parse(localStorage.getItem('cafeCart')) || [];

    // Page Navigation
    function showPage(pageId) {
        document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        event.target.classList.add('active');
        window.scrollTo(0,0);
    }

    // Cart Functions
    function saveCart() { localStorage.setItem('cafeCart', JSON.stringify(cart)); }
    function addToCart(name, price) {
        let item = cart.find(i => i.name === name);
        if(item) { item.qty += 1; } else { cart.push({name, price, qty: 1}); }
        saveCart(); updateCart(); alert(name + " added to cart!");
    }
    function updateCart() {
        let cartDiv = document.getElementById('cart-items');
        let total = 0; cartDiv.innerHTML = "";
        cart.forEach(item => {
            let itemTotal = item.price * item.qty;
            total += itemTotal;
            cartDiv.innerHTML += `<div class="cart-item"><div>${item.name} x ${item.qty}</div><div>$${itemTotal.toFixed(2)}</div></div>`;
        });
        document.getElementById('total').innerText = total.toFixed(2);
        document.getElementById('cart-count').innerText = cart.reduce((sum, i) => sum + i.qty, 0);
    }
    function toggleCart() { document.getElementById('cart').classList.toggle('active'); }
    function placeOrder() {
        if(cart.length === 0) { alert("Cart is empty!"); return; }
        alert("Order Placed Successfully! Total: $" + document.getElementById('total').innerText);
        cart = []; saveCart(); updateCart(); toggleCart();
    }

    // Login + Contact
    function sendMsg(event) {
    // Form ko reload hone se rokne ke liye
    event.preventDefault(); 

    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;

    // Screen par success message dikhana
    alert(`Thank you, ${name}! Your message has been sent successfully. ✨`);

    // Form ko reset karna
    form.reset();
}

    
    function sendMsg(e) {
        e.preventDefault();
        alert("Message Sent! We will contact you soon.");
        e.target.reset();
    }

    document.addEventListener('DOMContentLoaded', updateCart);
