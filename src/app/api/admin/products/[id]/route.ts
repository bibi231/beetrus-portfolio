import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();

    if (!session || (session.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("[ADMIN_PRODUCT_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
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

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                slug,
                description,
                price: price ? parseFloat(price) : undefined,
                category,
                stock: stock !== undefined ? parseInt(stock) : undefined,
                images,
                status,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("[ADMIN_PRODUCT_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();

    if (!session || (session.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const product = await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("[ADMIN_PRODUCT_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
