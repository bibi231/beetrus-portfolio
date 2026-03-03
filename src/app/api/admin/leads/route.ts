import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();

    if (!session || (session.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const leads = await prisma.lead.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(leads);
    } catch (error) {
        console.error("[ADMIN_LEADS_GET]", error);
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

        const lead = await prisma.lead.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(lead);
    } catch (error) {
        console.error("[ADMIN_LEADS_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
