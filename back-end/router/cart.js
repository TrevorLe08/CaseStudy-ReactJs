const express = require('express');
const router = express.Router();

const carts = [
    {
        id: 1,
        user: { id: 1, username: 'trevor', name: 'Trevor Le', password: 'abc' },
        total: 30000,
        amount: 1,
        date: new Date().toISOString(),
        products: [
            { 
                id: 1, 
                name: 'Iphone 14 Promax', 
                quantity: 1, 
                price: 30000,
                image: "https://minhtuanmobile.com/uploads/products/230628110901-iphone-14-pro-max-128gb-gold-minh-tuan-mobile.jpeg" 
            }
        ]
    },
    {
        id: 2,
        user: { id: 2, username: 'ltmt', name: 'LeTranMinhTriet', password: '123' },
        total: 520,
        amount: 2,
        date: new Date().toISOString(),
        products: [
            { 
                id: 2, 
                name: 'Bút chì bảy màu', 
                quantity: 1, 
                price: 20,
                image: "https://bookbuy.vn/Res/Images/Product/but-chi-mau-ruot-cau-vong-made-in-japan_74419_1.jpg"
            },
            { 
                id: 3, 
                name: 'Vợt cầu lông', 
                quantity: 1, 
                price: 500,
                image: "https://product.hstatic.net/200000099191/product/660ccff64a7f24335b56d11219a29021_2a16a7c26bd54f78ae325834fc0a4004_1024x1024.jpg"
            }
        ]
    }
];

router.get("/", (req, res) => {
    res.json(carts);
});

router.get("/:cartId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const cart = carts.find(c => c.id === cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send({ message: 'Cart not found' });
    }
});


router.post("/", (req, res) => {
    const newCart = {
        id: Date.now(),
        user: req.body.user,
        total: req.body.total,
        amount: req.body.amount,
        date: new Date().toISOString(),
        products: req.body.products
    };
    carts.push(newCart);
    res.status(201).send(newCart);
});

router.put("/:cartId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const index = carts.findIndex(c => c.id === cartId);
    if (index !== -1) {
        carts[index].user = req.body.user;
        carts[index].total = req.body.total;
        carts[index].amount = req.body.amount;
        carts[index].date = new Date().toISOString();
        carts[index].products = req.body.products;
        res.send(carts[index]);
    } else {
        res.status(404).send({ message: 'Cart not found' });
    }
});


router.delete("/:cartId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const index = carts.findIndex(c => c.id === cartId);
    if (index !== -1) {
        carts.splice(index, 1);
        res.send({ message: 'Cart deleted', cartId: cartId });
    } else {
        res.status(404).send({ message: 'Cart not found' });
    }
});

module.exports = router;