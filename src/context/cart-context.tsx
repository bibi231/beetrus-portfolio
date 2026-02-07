"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
    productId: string;
    quantity: number;
    size?: string;
    price: number;
    name: string;
    image?: string;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string, size?: string) => void;
    updateQuantity: (productId: string, size: string | undefined, delta: number) => void;
    clearCart: () => void;
    itemCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("beetrus-cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem("beetrus-cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (newItem: CartItem) => {
        setCart((prev) => {
            const existing = prev.find(
                (item) => item.productId === newItem.productId && item.size === newItem.size
            );
            if (existing) {
                return prev.map((item) =>
                    item.productId === newItem.productId && item.size === newItem.size
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }
            return [...prev, newItem];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string, size?: string) => {
        setCart((prev) =>
            prev.filter(
                (item) => !(item.productId === productId && item.size === size)
            )
        );
    };

    const updateQuantity = (productId: string, size: string | undefined, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.productId === productId && item.size === size
                        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => setCart([]);

    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                itemCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
