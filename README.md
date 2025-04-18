# Whisper Speech-to-text Demo

A demo of using [OpenAI Whisper](https://github.com/openai/whisper), which you can use to speed up the process of transcribing audio to text.

## Contents

- [Setup](#setup) - ensure you have dependencies installed
- [Example](#example) - run transcription on an example audio file

## Setup

### Ensure Python is installed with pip

Python is the programming language from which we can call the `whisper` program.

On macOS, to check if Python is installed, run `python3 --version`, which should yield something like `Python 3.x.x`. If not, you need to install python. One way to do this is through Homebrew, with `brew install python`.

You also need to ensure `pip` is installed. On macOS, once `python3` is installed, you can run `python3 -m ensurepip`. To confirm the installation worked, you can run `which pip3`.

### Ensure ffmpeg is installed

[ffmpeg](https://ffmpeg.org/) is a program that helps `whisper` handle various audio and video file formats.

To check if you already have it installed, or confirm your installation, run `which ffmpeg`. On macOS, the easiest way to install `ffmpeg` is probably [Homebrew](https://brew.sh/), with `brew install ffmpeg`.

### Install OpenAI Whisper

> **Note**: the steps below are summarized from the README file of [openai/whisper](https://github.com/openai/whisper?tab=readme-ov-file#setup)

Ensure Python, `pip3`, and `ffmpeg` are installed. Then, run the following commands:
  
```shell
# Setup a python virtual environment
python3 -m venv venv
# Activate the python virtual environment
source venv/bin/activate
# Install openai-whisper
pip3 install -U openai-whisper
```

Working the the terminal where you've run `source venv/bin/activate`, run `which whisper` to confirm the installation worked as expected. You should see some output like `<path-to-this-repo>/venv/bin/whisper`.

## Example

First, start by cloning this repository. Then, after following the [Setup](#setup) steps above, run:

```shell
make example-short
```

> **Note**: this project uses a makefile. If you're unfamiliar with makefiles, it probably doesn't matter and you can just run them anyways, but if you're curious [makefiletutorial.com](https://makefiletutorial.com/) is a great place to start.

This will read in `examples/example-01.mp3`, and output a file `example-01.txt` to the `out` directory. The full command being run is:

```shell
whisper "./examples/example-01.mp3" --model small --language English --output_dir "./out" --output_format txt
```

Note that longer audio files take _much_ longer to process. If you're processing an audio file longer than a minute or two, consider starting the conversion, running the built-in macOS utility [caffeinate](https://ss64.com/mac/caffeinate.html) in a separate terminal with a generous timeout, and get outside and [touch grass](https://en.wiktionary.org/wiki/touch_grass).

You can run `make example-long` to see how long it takes for a ~ 7 minute audio file.

### Formatting plain text output

The `.txt` files output by OpenAI Whisper are formatted a little strangely.

You can run the script below to generate `_auto-paragraphs.txt` files from all `.txt` files in the `out` directory. This script gathers the sentences in a document, groups the sentences into paragraphs, and outputs the paragraphs separated by two newlines.

Note that you need to have `node` installed to run the formatting script. It usually makes sense to install node using `nvm`, which you an install with Homebrew, `brew install nvm`.

```shell
node ./scripts/herd-paragraphs.mjs ./out
```
