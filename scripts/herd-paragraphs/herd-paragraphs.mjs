/**
 * Given a plain text file string, and a character limit for a paragraph,
 * Return a plain text file string with sentences grouped into paragraphs
 * that will not exceed specified length (unless a single sentence exceeds
 * that length, in which case it will be its own paragraph).

 * Context:
 * Plain text files output from whisper have annoying formatting. Sentences are
 * broken across lines.
 *
 * Aim:
 * Reformat a string of plain text, so that line breaks within sentences no
 * longer happen, and so that there are reasonable paragraph breaks consisting
 * of two consecutive newlines.
 *
 * Process:
 * First join all the lintes together, replacing newlines with spaces.
 * Then, split the string into sentences, using a regex that matches periods,
 * exclamation marks, and question marks, followed by a space or newline.
 * Then, group the sentences into paragraphs, adhering to a maximum paragraph
 * length, which can be provided as an argument, but defaults to 200.
 *
 */
export function herdParagraphs(plainTextFileString, maxParagraphLength = 300) {
	// Remove all newlines and replace them with spaces
	const noNewlines = plainTextFileString.replace(/\n/g, " ");
	// Split the string into sentences using a regex
	const sentences = noNewlines
		.replace(/Mr\.|Ms\.|Dr\./g, (match) => match.replace(/\./g, ""))
		.split(/(?<=[.!?])\s+/)
		.map((s) => s.trim())
		.filter((s) => s !== "");
	// Gather the sentences into paragraphs, adhering to a maximum paragraph length
	const paragraphs = [];
	let currentParagraph = [];
	for (const sentence of sentences) {
		/**
		 * If the current paragraph is blank, add the sentence. Even if this
		 * exceeds the maximum paragraph length, we need to add the sentence,
		 * otherwise we'd end up skipping the sentence and pushing an
		 * empty paragraph.
		 */
		if (currentParagraph === "") {
			currentParagraph.push(sentence);
			continue;
		}

		/**
		 * If the current paragraph would be  too long once we add this
		 * sentence, then push the current paragraph to the array of
		 * paragraphs, and start a new paragraph.
		 */
		const currentParagraphString = currentParagraph.join(" ");
		const currentLength = currentParagraphString.length;
		if (currentLength + sentence.length > maxParagraphLength) {
			paragraphs.push(currentParagraphString);
			currentParagraph = [];
		}

		// Add the sentence to the current paragraph
		currentParagraph.push(sentence);
	}

	// If there's a leftover paragraph, push it to the array of paragraphs
	if (currentParagraph !== "") {
		paragraphs.push(currentParagraph.join(" "));
	}

	// Return the paragraphs, joined with two newlines
	return paragraphs.join("\n\n");
}
