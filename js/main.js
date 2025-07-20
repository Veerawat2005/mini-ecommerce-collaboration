document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    let allProducts = [];

    function showLoader() {
        loader.style.display = 'block';
        productList.style.display = 'none';
    }

    function hideLoader() {
        loader.style.display = 'none';
        productList.style.display = 'flex';
    }

    // แสดง Loader ก่อนโหลด
    showLoader();

    // โหลดข้อมูลสินค้า
    fetch('/js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
            hideLoader();
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
            loader.textContent = 'เกิดข้อผิดพลาดในการโหลดข้อมูล';
        });

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ศิลปิน: ${product.artist}</p>
                <p>แรงบันดาลใจ: ${product.inspiration}</p>
                <p>ราคา: ${product.price.toLocaleString('en-US')} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // การค้นหาสินค้า
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase(); // trim() เพิ่มความแม่นยำ
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });
});
