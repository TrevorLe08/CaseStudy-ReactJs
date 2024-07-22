export const handleAddProduct = (product, cart) => {
    const value = {
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        image: product.images[0]
    }
    const index = cart.products.findIndex(p => p.id === value.id)
    const listPro = [...cart.products]
    const element = { ...listPro[index] }

    // If product exists in cart, quantity will increase by 1
    // And product will add if it doesn't exist
    index >= 0 ? listPro[index] = { ...listPro[index], quantity: element.quantity += 1 } : listPro.push(value)

    // Calculate total and amount
    let newTotal = 0
    let newAmount = 0
    listPro.forEach(item => {
        newAmount += item.quantity
        newTotal += (item.price * item.quantity)
    })

    // Update your cart
    cart = {
        ...cart,
        total: newTotal,
        amount: newAmount,
        products: listPro
    }
    return cart;
}

export const handleDeleteProduct = (product, cart) => {
    const listPro = cart.products.filter(item => item.id !== product.id)

    // Calculate total and amount
    let newTotal = 0
    let newAmount = 0
    listPro.forEach(item => {
        newTotal += (item.price * item.quantity)
        newAmount += item.quantity
    })

    // Update your cart
    cart = {
        ...cart,
        total: newTotal,
        amount: newAmount,
        products: listPro,
    }
    return cart
}

export const handleChangeProduct = (product, listProduct, cart, action) => {
    const listPro = [...cart.products]
    const index = listPro.findIndex(item => item.id === product.id)
    const currentProduct = listProduct.find(item => item.id === product.id)
    const element = { ...listPro[index] }

    // Quantity must be greater than 0 and less than product's quantity
    if (listPro[index].quantity === 1 && action === "decrease") {
        return "Cannot decrease product";
    } else if ((listPro[index].quantity === currentProduct.quantity) && action === "increase") {
        return "Cannot increase product";
    }

    // Check action
    if (action === "increase") {
        listPro[index] = { ...element, quantity: element.quantity += 1 }
    } else if (action === "decrease") {
        listPro[index] = { ...element, quantity: element.quantity -= 1 }
    }

    // Calculate total and amount
    let newTotal = 0
    let newAmount = 0
    listPro.forEach(item => {
        newAmount += item.quantity
        newTotal += (item.price * item.quantity)
    })

    // Update your cart
    cart = {
        ...cart,
        total: newTotal,
        amount: newAmount,
        products: listPro
    }
    return cart
}