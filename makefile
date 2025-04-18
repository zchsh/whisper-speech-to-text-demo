# A short clip of audio, should take at most a minute or two to run
.PHONY: example
example:
	whisper "./examples/example-01.mp3" --model small --language English --output_dir "./out" --output_format txt

# A longer example, takes a while to run
.PHONY: example-long
example-long:
	whisper "./examples/example-01-long.mp3" --model small --language English --output_dir "./out" --output_format txt

# Converts the example-01.m4a file to mp3 format, using ffmpeg
# Included as an example of how to use ffmpeg to get your audio files into
# whatever format you prefer. Whisper should be able to handle most formats.
.PHONY: mp3
mp3:
	ffmpeg -i "./examples/example-01.m4a" "./examples/example-01.mp3"

# Formats all .txt files in the out directory with automatic paragraphing
.PHONY: format
format:
	node ./scripts/herd-paragraphs/main.mjs ./out