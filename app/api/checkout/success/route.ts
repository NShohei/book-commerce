import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/app/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request, response: Response) {
  const { sessionId } = await request.json();
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId || "",
      },
    });
    if (!existingPurchase) {
      console.log("create purchase");
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId || "",
        },
      });
      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({
        purchase: existingPurchase,
        message: "すでに購入済みです",
      });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}
