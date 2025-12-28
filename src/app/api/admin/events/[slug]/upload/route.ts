import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request, context: { params: { slug: string } }) {
  try {
    // Basic gate: require sb_admin_token cookie to exist
    const cookieHeader = req.headers.get("cookie") || "";
    if (!cookieHeader.includes("sb_admin_token")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = context.params;
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
  } catch (err: any) {
    console.error("Upload error", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
