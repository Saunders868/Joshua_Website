import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest, res: NextResponse) {
  const filePath = path.resolve(
    "./private-files",
    "TheFlavorJournalRecipeBook.pdf"
  );
  const fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    return NextResponse.json({ message: "File not found." }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  const headers = new Headers();
  headers.append(
    "Content-Disposition",
    "attachment; filename=TheFlavorJournalRecipeBook.pdf"
  );
  headers.append("Content-Type", "application/pdf");

  return new Response(fileBuffer, {
    headers,
  });
}
