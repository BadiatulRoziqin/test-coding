document.addEventListener("DOMContentLoaded", () => {
  // Badges dan Keranjang
  const cartBadge = document.querySelector(".cart-badge");
  const cartContent = document.querySelector(".cart-content");
  const notification = document.querySelector("#notification");
  const itemsAdded = [];

  // Event Listener untuk Tombol "Add to Cart"
  const addCartBtns = document.querySelectorAll(".add-cart");
  addCartBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
          // Ambil informasi produk
          const product = btn.closest(".product-box");
          const title = product.querySelector(".product-title").innerText;
          const price = product.querySelector(".product-price").innerText;
          const imgSrc = product.querySelector(".product-img").src;

          // Cek apakah produk sudah ada di keranjang
          if (itemsAdded.find((item) => item.title === title)) {
              alert("Produk ini sudah ada di keranjang.");
              return;
          }

          // Tambahkan produk ke array
          itemsAdded.push({ title, price, imgSrc });

          // Buat elemen keranjang
          const cartBoxElement = `
              <div class="cart-box">
                  <img src="${imgSrc}" alt="" class="cart-img">
                  <div class="detail-box">
                      <div class="cart-product-title">${title}</div>
                      <div class="cart-price">${price}</div>
                      <input type="number" value="1" class="cart-quantity">
                  </div>
                  <!-- Tombol untuk menghapus -->
                  <i class="bx bxs-trash-alt cart-remove"></i>
              </div>`;

          // Tambahkan elemen ke keranjang
          const newNode = document.createElement("div");
          newNode.innerHTML = cartBoxElement;
          cartContent.appendChild(newNode);

          // Tambahkan Event Listener untuk produk baru
          newNode.querySelector(".cart-remove").addEventListener("click", handle_removeCartItem);
          newNode.querySelector(".cart-quantity").addEventListener("change", handle_changeItemQuantity);

          // Perbarui badge
          cartBadge.textContent = parseInt(cartBadge.textContent, 10) + 1;

          // Tampilkan notifikasi
          notification.classList.remove("hidden");
          setTimeout(() => {
              notification.classList.add("hidden");
          }, 3000);

          // Perbarui total
          updateTotal();
      });
  });

  // Fungsi untuk menghapus produk dari keranjang
  function handle_removeCartItem() {
      const parent = this.closest(".cart-box");
      const productTitle = parent.querySelector(".cart-product-title").innerText;
      parent.remove();

      // Hapus dari array itemsAdded
      const index = itemsAdded.findIndex((item) => item.title === productTitle);
      if (index !== -1) {
          itemsAdded.splice(index, 1);
      }

      // Perbarui badge
      cartBadge.textContent = Math.max(parseInt(cartBadge.textContent, 10) - 1, 0);

      // Perbarui total
      updateTotal();
  }

  // Fungsi untuk mengubah kuantitas produk
  function handle_changeItemQuantity() {
      const input = this;
      if (isNaN(input.value) || input.value < 1) {
          input.value = 1;
      }

      input.value = Math.floor(input.value);  // Jaga agar tetap integer
      updateTotal();
  }

  // Fungsi untuk memperbarui total keranjang
  function updateTotal() {
      const totalElement = document.querySelector(".total-price");
      let total = 0;

      cartContent.querySelectorAll(".cart-box").forEach((cartBox) => {
          const price = parseFloat(cartBox.querySelector(".cart-price").innerText.replace("$", ""));
          const quantity = parseInt(cartBox.querySelector(".cart-quantity").value, 10);
          total += price * quantity;
      });

      totalElement.innerText = `$${total.toFixed(2)}`;
  }

  // Menangani tombol beli
  document.querySelector(".btn-buy").addEventListener("click", () => {
      if (itemsAdded.length === 0) {
          alert("Tidak ada barang di keranjang. Silakan tambahkan beberapa produk terlebih dahulu.");
          return;
      }

      alert("Pesanan Anda berhasil! Terima kasih.");
      cartContent.innerHTML = "";  // Kosongkan keranjang
      cartBadge.textContent = "0";  // Reset badge
      itemsAdded.length = 0;  // Kosongkan array
      updateTotal();
  });
});

document.querySelector("#cart-icon").addEventListener("click", () => {
  console.log("Cart icon clicked");  // Cek apakah event listener berjalan
  const cart = document.querySelector(".cart");
  cart.classList.toggle("active");  // Buka/tutup keranjang
});

document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector("#cart-icon");
  const cart = document.querySelector(".cart");
  const closeCart = document.querySelector("#cart-close");

  cartIcon.addEventListener("click", () => {
    cart.classList.add("active");  // Buka keranjang belanja
    cartIcon.classList.add("hidden");  // Sembunyikan ikon keranjang
  });

  closeCart.addEventListener("click", () => {
    cart.classList.remove("active");  // Tutup keranjang belanja
    cartIcon.classList.remove("hidden");  // Tampilkan ikon keranjang
  });
});

