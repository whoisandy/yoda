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

Copyright (c) 2015 [whoisandie](http://whoisandie.com)