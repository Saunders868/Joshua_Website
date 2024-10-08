import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.resolve(
    "./private-files",
    "TheFlavorJournalRecipeBook.pdf"
  );
  const fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    res.status(404).send("File not found.");
    return;
  }

  const fileBuffer = fs.readFileSync(filePath);

  const headers = new Headers();
  headers.append(
    "Content-Disposition",
    "attachment; filename=TheFlavorJournalRecipeBook.pdf"
  );
  headers.append("Content-Type", "application/pdf");
  //   res.appendHeader("Content-Type", "application/pdf");
  //   res.appendHeader(
  //     "Content-Disposition",
  //     "attachment; filename=TheFlavorJournalRecipeBook.pdf"
  //   );

  return new Response(fileBuffer, {
    headers,
  });
  //   res.status(200).send(fileBuffer);
}
