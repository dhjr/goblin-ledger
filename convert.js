import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "./resources";

fs.readdirSync(dir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return;

  const input = path.join(dir, file);
  const output = path.join(dir, path.basename(file, ext) + ".webp");

  sharp(input)
    .webp({ quality: 80 })
    .toFile(output)
    .then(() => console.log(`Converted: ${file}`));
});
