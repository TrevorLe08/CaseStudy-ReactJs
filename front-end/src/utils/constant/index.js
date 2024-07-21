export const popularList = [
    {
        id: 1,
        name: 'Iphone 14 Promax',
        price: 30000,
        quantity: 10,
        category: { id: 2, name: 'Điện tử' },
        images: ["https://minhtuanmobile.com/uploads/products/230628110901-iphone-14-pro-max-128gb-gold-minh-tuan-mobile.jpeg","https://minhtuanmobile.com/uploads/products/220908114431-iphone-14-pro-max-128gb4.jpg","https://minhtuanmobile.com/uploads/products/220908114431-iphone-14-pro-max-128gb5.jpg"]
    },
    {
        id: 3,
        name: 'Vợt cầu lông',
        price: 500,
        quantity: 15,
        category: { id: 1, name: 'Thể thao' },
        images: ["https://product.hstatic.net/200000099191/product/660ccff64a7f24335b56d11219a29021_2a16a7c26bd54f78ae325834fc0a4004_1024x1024.jpg","https://product.hstatic.net/200000099191/product/7b290c2e46f59d0cf26fa51657ef6816_fc932626a9a546b685cd4dc6669e0859_1024x1024.jpg","https://product.hstatic.net/200000099191/product/830dd5ffe332dd81f9ec9876cd652f65_12f225d16c6b4208ba9dd4bf47640319_1024x1024.jpg"]
    },
    {
        id: 4,
        name: 'Giày thể thao',
        price: 5000,
        quantity: 15,
        category: { id: 1, name: 'Thể thao' },
        images: ["https://bizweb.dktcdn.net/100/405/002/products/130.png?v=1692952475837","https://bizweb.dktcdn.net/100/405/002/products/131.png?v=1692952476733"]
    },
    {
        id: 7,
        name: 'Samsung Z Fold 5',
        price: 30000,
        quantity: 10,
        category: { id: 2, name: 'Điện tử' },
        images: ["https://didongmoi.com.vn/upload/images/product/samsung/samsung-galaxy-z-fold5-gia-re-3.jpg","https://didongmoi.com.vn/upload/images/product/samsung/samsung-galaxy-z-fold5-gia-re-4.jpg","https://didongmoi.com.vn/upload/images/product/samsung/samsung-galaxy-z-fold5-gia-re-5.jpg"]
    },
]

export const serviceList = [
    {
        img: "truck",
        label: "Free shipping"
    },
    {
        img: "shield-check",
        label: "Secure payment"
    },
    {
        img: "chat-dots",
        label: "Support 24/7"
    },
]

export const saleOfferImg = "https://img.freepik.com/free-vector/special-sale-offer-marketing-template-shop-now-price-clearance-vector_1017-46270.jpg?t=st=1721561810~exp=1721565410~hmac=5a923e09c0c156cade7e0f35965a9be2604cb7aabbda2ef5bb824023441f8751&w=996"

export const socialMedia = [
    {
        img: "bi-facebook",
        label: "facebook"
    },
    {
        img: "bi-instagram",
        label: "instagram"
    },
    {
        img: "bi-youtube",
        label: "youtube"
    },
]

export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Samsung Z Fold 5", link: "/store/detail/1" },
            { name: "Iphone 14 Promax", link: "/store/detail/3" },
            { name: "Vợt cầu lông", link: "/store/detail/4" },
            { name: "Giày thể thao", link: "/store/detail/7" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Term and condition", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "admin@gmail.com", link: "/" },
            { name: "0011 123 325", link: "/" },
        ],
    },
]

export const sideBarList = [
    {
        icon: "bi-house-door",
        label: "Home",
        link: "/admin"
    }, {
        icon: "bi-box2-fill",
        label: "Product",
        link: "/admin/products"
    }, {
        icon: "bi-card-list",
        label: "Category",
        link: "/admin/categories"
    }, {
        icon: "bi-cart-fill",
        label: "Cart",
        link: "/admin/carts"
    }, {
        icon: "bi-shop",
        label: "Page user",
        link: "/"
    }
]