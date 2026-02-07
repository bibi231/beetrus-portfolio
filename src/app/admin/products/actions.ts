"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProductSchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().min(10),
    price: z.number().positive(),
    category: z.string().min(2),
    stock: z.number().int().nonnegative(),
    status: z.enum(["AVAILABLE", "OUT_OF_STOCK", "HIDDEN"]),
    images: z.string(), // Comma separated URLs or JSON
    metadata: z.string().optional(),
});

export async function createProduct(data: z.infer<typeof ProductSchema>) {
    try {
        const product = await prisma.product.create({
            data: {
                ...data,
                images: data.images,
            },
        });
        revalidatePath("/admin/products");
        revalidatePath("/store");
        return { success: true, product };
    } catch (error) {
        console.error("Failed to create product:", error);
        return { success: false, error: "Failed to create product" };
    }
}

export async function updateProduct(id: string, data: z.infer<typeof ProductSchema>) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data,
        });
        revalidatePath("/admin/products");
        revalidatePath("/store");
        return { success: true, product };
    } catch (error) {
        console.error("Failed to update product:", error);
        return { success: false, error: "Failed to update product" };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        });
        revalidatePath("/admin/products");
        revalidatePath("/store");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, error: "Failed to delete product" };
    }
}

export async function getProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
}
