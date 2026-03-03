import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();

    if (!session || (session.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const [
            totalOrders,
            totalLeads,
            totalProducts,
            recentActivity,
            revenueResult
        ] = await Promise.all([
            prisma.order.count(),
            prisma.lead.count({ where: { status: "NEW" } }),
            prisma.product.count(),
            prisma.lead.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: { id: true, name: true, projectType: true, createdAt: true }
            }),
            prisma.order.aggregate({
                _sum: { totalAmount: true }
            })
        ]);

        return NextResponse.json({
            stats: {
                totalOrders,
                activeLeads: totalLeads,
                totalProducts,
                totalRevenue: revenueResult._sum.totalAmount || 0,
            },
            recentLeads: recentActivity.map(lead => ({
                id: lead.id,
                title: `New Lead: ${lead.name}`,
                description: `Project Type: ${lead.projectType}`,
                time: lead.createdAt
            }))
        });
    } catch (error) {
        console.error("[ADMIN_STATS_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
