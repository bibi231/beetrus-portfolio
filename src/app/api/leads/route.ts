import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

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

        // Save to Database via Prisma Core Architecture
        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                projectType,
                budget,
                description,
                referenceUrls: referenceUrls || null,
                features: JSON.stringify(features || []),
                selectedStyle: selectedStyle || null,
                status: "NEW",
            },
        });

        // Fire Email Notification
        await resend.emails.send({
            from: "Beetrus OS <onboarding@resend.dev>",
            to: ["bitrusgadzama02@gmail.com"], // Your receiving email
            subject: `New Project Request - ${name}`,
            html: `
        <h2>New Build Request Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget Range:</strong> ${budget}</p>
        <p><strong>Style Preference:</strong> ${selectedStyle || "Custom"}</p>
        <p><strong>Reference URLs:</strong> ${referenceUrls || "None"}</p>
        <p><strong>Features:</strong> ${(features || []).join(", ")}</p>
        <br/>
        <h3>Description:</h3>
        <p>${description.replace(/\n/g, "<br/>")}</p>
      `,
        });

        return NextResponse.json({ success: true, lead }, { status: 201 });
    } catch (error) {
        console.error("Lead submission error:", error);
        return NextResponse.json(
            { error: "Failed to submit request." },
            { status: 500 }
        );
    }
}
