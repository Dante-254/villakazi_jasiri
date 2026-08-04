import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdminRequest } from "@/lib/adminAuth";
import cloudinary from "@/lib/cloudinary";

const MAX_IMAGE_MB = 8;
const ALLOWED_MIME = /^image\/(png|jpe?g|webp|gif|avif|bmp|svg\+xml)$/i;

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAdminRequest(req);
    if (authError) {
      return authError;
    }

    const body = await req.json();
    const { filename, data, folder } = body || {};
    if (!filename || !data || typeof data !== "string") {
      return NextResponse.json({ error: "Missing file data" }, { status: 400 });
    }

    // data should be a data URL like data:<mime>;base64,<base64data>
    const match = /^data:([^;,]+);base64,(.+)$/.exec(data);
    if (!match) {
      return NextResponse.json({ error: "Invalid file data format" }, { status: 400 });
    }

    const mime = match[1].toLowerCase();
    if (!ALLOWED_MIME.test(mime)) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    const base64Length = match[2].length;
    if (base64Length > MAX_IMAGE_MB * 1024 * 1024 * 1.4) {
      return NextResponse.json(
        { error: `Image must be smaller than ${MAX_IMAGE_MB}MB` },
        { status: 400 },
      );
    }

    const uploadFolder = folder ? `villakazi/${folder}` : "villakazi";

    const res = await cloudinary.uploader.upload(data, {
      resource_type: "image",
      folder: uploadFolder,
      tags: folder ? [folder.split("/")[0]] : [],
    });

    return NextResponse.json({ ok: true, url: res.secure_url, result: res });
  } catch (err: unknown) {
    console.error("Upload error", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
