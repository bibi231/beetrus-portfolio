import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();

    if (!session || (session.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("[ADMIN_ORDERS_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await auth();

    if (!session || (session.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const order = await prisma.order.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("[ADMIN_ORDERS_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
