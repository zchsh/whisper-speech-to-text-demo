import fs from "fs";
import path from "path";
import { herdParagraphs } from "./herd-paragraphs.mjs";

const OUTPUT_SUFFIX = "_auto-paragraphs";
const FALLBACK_MAX_PARAGRAPH_LENGTH = 300;

// Read in arguments
const inputDir = process.argv[2];
const inputDirPath = path.resolve(process.cwd(), inputDir);
const maxParagraphLength =
	parseInt(process.argv[3]) || FALLBACK_MAX_PARAGRAPH_LENGTH;

main(inputDirPath, maxParagraphLength);

function main(inputDirPath, maxParagraphLength) {
	// Read in all `.txt` files in the input directory
	const txtFiles = fs
		.readdirSync(inputDirPath)
		.filter((file) => path.extname(file) === ".txt")
		.filter((file) => !file.endsWith(`${OUTPUT_SUFFIX}.txt`));
	// If there are no `.txt` files, throw an error
	if (txtFiles.length === 0) {
		throw new Error(
			`Error: the input directory "${inputDirPath}" does not contain any .txt files.`
		);
	}
	// For each `.txt` file, read it in, convert it to paragraphs
	//
	for (const file of txtFiles) {
		const filePath = path.join(inputDirPath, file);
		const plainText = fs.readFileSync(filePath, "utf8");
		const paragraphs = herdParagraphs(plainText, maxParagraphLength);
		// Write the paragraphs to a new file in the same directory
		const baseName = path.basename(file, ".txt");
		const outputFilePath = path.join(
			inputDirPath,
			`${baseName}${OUTPUT_SUFFIX}.txt`
		);
		fs.writeFileSync(outputFilePath, paragraphs);
		console.log(`Converted ${file} to paragraphs.`);
	}
}
