document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader'); // ✅ อ้างอิง Loader
    let allProducts = [];

    function showLoader() {
        loader.style.display = 'block';
        productList.style.display = 'none';
    }

    function hideLoader() {
        loader.style.display = 'none';
        productList.style.display = 'flex'; // ✅ เตรียมพร้อมสำหรับ responsive layout
    }

    // ✅ แสดง Loader ก่อนโหลด
    showLoader();

    // ✅ Fetch products
    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
            hideLoader(); // ✅ ซ่อน Loader เมื่อโหลดข้อมูลเสร็จ
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
            loader.textContent = 'เกิดข้อผิดพลาดในการโหลดข้อมูล';
        });

    function displayProducts(products) {
        productList.innerHTML = ''; // ล้างของเก่า
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price.toLocaleString()} บาท</p> <!-- ✅ มี comma -->
            `;
            productList.appendChild(card);
        });
    }

    // ✅ ค้นหาแบบง่าย
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase(); // trim() เพิ่มความแม่นยำ
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });
});
