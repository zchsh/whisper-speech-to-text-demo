const BREAK_LIMIT = 80;

function isIndexLine(line) {
	return line.match(/^\d+$/);
}

function isTimestampLine(line) {
	return line.match(/^\d\d:\d\d:\d\d,\d\d\d --> \d\d:\d\d:\d\d,\d\d\d$/);
}

function isBlankLine(line) {
	return line.trim() === "";
}

function isDuplicateLine(line, lastMeaningfulLine) {
	return line.trim() === lastMeaningfulLine.trim();
}

function srtToPlainText(srtFileString) {
	const plainTextLines = [];
	const lines = srtFileString.split("\n");
	let lastMeaningfulLine = "";
	for (const line of lines) {
		// Skip lines that aren't meaningful
		if (isIndexLine(line)) continue;
		if (isTimestampLine(line)) continue;
		if (isBlankLine(line)) continue;
		if (isDuplicateLine(line, lastMeaningfulLine)) continue;
		plainTextLines.push(line);
		// Remember the last meaningful line, these are often duplicated
		// between timestamps so that they're shown longer on-screen
		lastMeaningfulLine = line;
		// If the input format has some long lines and some short lines, we
		// infer that the short lines represent the end of some section, and
		// we insert line breaks between each section.
		const hasLongLines = plainTextLines.some(
			(line) => line.length > BREAK_LIMIT
		);
		const isBreak = hasLongLines && lastMeaningfulLine.length < BREAK_LIMIT;
		if (isBreak) {
			plainTextLines.push("");
		}
	}
	// Using the line breaks we inserted, we can split the array of plain text
	// lines into an array of plain text paragraphs. We remove any newlines from
	// the resulting paragraphs, replacing them with spaces.
	const plainTextParagraphs = plainTextLines
		.join("\n")
		.split("\n\n")
		.map((p) => p.replace(/\n/g, " "));
	// We join the plain text paragraphs with double newlines for readability
	return plainTextParagraphs.join("\n\n");
}

export default srtToPlainText;
