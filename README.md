![Yoda Title](https://s3-us-west-2.amazonaws.com/github.whoisandie.com/yoda-title.png)

Yoda is a nifty osx application which enables you to browse and download videos from youtube.
Built using [ReactJS](https://facebook.github.io/react) & [Electron](http://electron.atom.io)

![Yoda Screenshot](https://s3-us-west-2.amazonaws.com/github.whoisandie.com/yoda-screen.png)

## Downloads
The latest version of yoda can be downloaded from the [releases](https://github.com/whoisandie/yoda/releases) page.
Please note that currently only supports osx.

## Dev Instructions
Requires gulp to be installed on your machine.
Clone the repository, install dependencies and run `gulp`

``` bash
git clone https://github.com/whoisandie/yoda.git

# Cd into the directory and install dependencies
cd yoda && npm install

# Run gulp to start
gulp
```

To build a disk image, run `gulp release`, which will run the necessary tasks
and create the disk image in a `dist` directory.

## License

The MIT License (MIT)

Copyright (c) 2015 [whoisandie](http://whoisandie.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.