import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();

    if (!session || (session.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("[ADMIN_PRODUCTS_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();

    if (!session || (session.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const {
            name,
            slug,
            description,
            price,
            category,
            stock,
            images,
            status,
        } = body;

        if (!name || !slug || !price || !category) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price: parseFloat(price),
                category,
                stock: parseInt(stock) || 0,
                images,
                status: status || "AVAILABLE",
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("[ADMIN_PRODUCTS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
