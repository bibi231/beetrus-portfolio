import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            email,
            projectType,
            budget,
            description,
            referenceUrls,
            features,
            selectedStyle,
        } = body;

        if (!name || !email || !description) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                projectType,
                budget,
                description,
                referenceUrls,
                features: JSON.stringify(features),
                selectedStyle,
            },
        });

        return NextResponse.json(lead);
    } catch (error) {
        console.error("[LEADS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
