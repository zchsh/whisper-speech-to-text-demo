import fs from "fs";
import path from "path";
import srtToPlainText from "./srt-to-plain-text.mjs";

const OUTPUT_DIR = path.resolve(process.cwd(), "out");

const FILE_PATH = process.argv[2];
main(FILE_PATH);

function main(filePath) {
	// If the input file does not exist, throw an error
	console.log(process.cwd());
	console.log(filePath);
	if (!fs.existsSync(filePath)) {
		throw new Error(
			`Error: the input file "${filePath}" does not seem to exist.`
		);
	}
	// If the input file does not have an ".srt" extension, throw an error
	const extName = path.extname(filePath);
	if (extName !== ".srt") {
		throw new Error(
			`Error: the input file must have an ".srt" extension. The provided input file "${filePath}" does not seem to have an ".srt" extension.}`
		);
	}
	// Convert the provided input file to plain text
	const plainText = srtToPlainText(fs.readFileSync(filePath, "utf8"));
	// Ensure the output directory exists
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR);
	}
	// Write out to an output text file
	const baseName = path.basename(filePath, extName);
	fs.writeFileSync(
		path.join(OUTPUT_DIR, `${baseName}_converted.txt`),
		plainText
	);
}
