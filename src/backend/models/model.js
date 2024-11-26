import { promises as fs } from "fs";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const calculatePrice = (popularityScore, weight, goldPrice) => {
    return ((popularityScore + 1) * weight * goldPrice).toFixed(2);
};

export const getProducts = async () => {
    try {
        const filePath = path.join(process.cwd(), "products.json");
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Ürün dosyası okunurken hata oluştu:", error.message);
        throw new Error("Ürün dosyası yüklenemedi.");
    }
};

export const fetchGoldPrice = async () => {
    try {
        const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
            headers: {
                "x-access-token": "goldapi-c1rg6osm3yq8cnf-io",
                "Content-Type": "application/json",
            },
        });

        if (response.status !== 200) {
            console.error("GoldAPI Hata Yanıtı:", response.data);
            throw new Error("GoldAPI'den geçerli bir yanıt alınamadı.");
        }

        const goldPrice = response.data.price / 31.1035; // Ounce to grams
        return goldPrice;
    } catch (error) {
        console.error("Altın fiyatı alınırken hata oluştu:", error.response?.data || error.message);
        throw new Error("Altın fiyatı alınamadı.");
    }
};
