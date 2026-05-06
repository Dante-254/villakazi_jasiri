import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdminRequest } from "@/lib/adminAuth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const authError = await requireAdminRequest(req);
    if (authError) {
      return authError;
    }

    const { slug } = await context.params;
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    const body = await req.json();
    const { filename, data } = body || {};
    if (!filename || !data) return NextResponse.json({ error: "Missing file data" }, { status: 400 });

    // data should be a data URL like data:<mime>;base64,<base64data>
    // Cloudinary accepts data URLs in upload
    const folder = `villakazi/events/${slug}`;

    const res = await cloudinary.uploader.upload(data, {
      resource_type: "auto",
      folder,
      tags: [slug],
      public_id: undefined,
      overwrite: false,
    });

    return NextResponse.json({ ok: true, result: res });
  } catch (err: unknown) {
    console.error("Upload error", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
