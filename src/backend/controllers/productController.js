import { getProducts, fetchGoldPrice, calculatePrice } from "../models/model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        const goldPrice = await fetchGoldPrice();

        const enrichedProducts = products.map((product) => ({
            ...product,
            price: calculatePrice(product.popularityScore, product.weight, goldPrice),
        }));

        res.status(200).json(enrichedProducts);
    } catch (error) {
        console.error("Ürünler alınırken hata oluştu:", error.message);
        res.status(500).json({ error: error.message });
    }
};
