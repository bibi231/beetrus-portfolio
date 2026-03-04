"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    price: z.number().min(0),
    category: z.string().min(1),
    stock: z.number().int().min(0),
    status: z.enum(["AVAILABLE", "OUT_OF_STOCK", "HIDDEN"]),
    images: z.string().optional(),
    metadata: z.string().optional(),
});

export async function createProduct(data: any) {
    try {
        const validated = productSchema.parse(data);

        const productData: Prisma.ProductCreateInput = {
            name: validated.name,
            slug: validated.slug,
            description: validated.description ?? "",
            price: validated.price,
            category: validated.category,
            stock: Math.floor(validated.stock),
            status: validated.status,
            images: validated.images ?? "",
            metadata: validated.metadata ?? "",
        };

        await prisma.product.create({
            data: productData,
        });

        revalidatePath("/admin/products");
        revalidatePath("/store");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to create product:", error);
        return { success: false, error: error.message || "Failed to create product" };
    }
}
