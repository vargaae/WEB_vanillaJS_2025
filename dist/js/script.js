/*
=============== 
Új verzió 2025
===============
*/
// Hamburger menü - mobilnézetnél
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("show");
});

// Dark mode
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

// Kosár kezelés
const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.getElementById("close-modal");

const cartItemsList = document.getElementById("cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartCount = document.querySelector(".cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = [];

cartButton.addEventListener("click", () => {
  cartModal.classList.toggle("show");
});

cartButton.addEventListener("click", () => {
  cartModal.classList.toggle("hidden");
});

closeModal.addEventListener("click", () => {
  cartModal.classList.remove("show");
});

closeModal.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0,
    maxPieces = 0; // TODO: implement MAX PIECES - DEPENDS ON product.stock

  if (cart.length === 0) {
    cartItemsList.innerHTML = "<li>Még nincs termék a kosárban.</li>";
  } else {
    for (let index = 0; index < cart.length; index++) {
      const item = cart[index];

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ${item.quantity} db - ${(
        item.price * item.quantity
      ).toLocaleString()} Ft
        <button class="remove-btn" data-index="${index}">❌</button>
      `;
      cartItemsList.appendChild(li);
      total += item.price * item.quantity;
    }
    // );
  }

  cartTotalPrice.textContent = `${total.toLocaleString()} Ft`;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Gombok működtetése
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Vásárlás / Checkout
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("A kosár üres!");
    return;
  }
  window.location.href = "thankyou.html"; // Átirányítjuk köszönő oldalra
});

// Lekérés - JSON Server - API CALL
const productList = document.getElementById("product-list");

let products = [];

async function fetchProducts() {
  await fetch("https://hur.webmania.cc/products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data.products;
    })

    let response = 
    .catch((error) => console.error(error));

  renderProducts(products);
}

function renderProducts(products) {
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.picture}" alt="${product.name}" class="product-image">
      <h2 class="product-name">${product.name}</h2>
      <p class="product-price">${product.price.toLocaleString()} Ft</p>
      ${
        product.stock
          ? `<button id="${product.id}" class="btn-primary add-to-cart">Kosárba</button>`
          : "Nem rendelhető"
      }
    `;

    const button = div.getElementsByClassName("add-to-cart");

    const buttonCount = button.length;

    const addToCart = () => {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCart();
    };

    for (let i = 0; i < buttonCount; i++) {
      button[i].addEventListener("click", addToCart);
    }

    productList.appendChild(div);
  });
}

// Betöltés
document.addEventListener("DOMContentLoaded", fetchProducts);
