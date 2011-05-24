
# NGen

 NGen is a nodejs package generator, complete with best practices, package structure, package.json and more.

## Installation

    $ npm install ngen

## Usage


    Usage: ngen [options] [path]

    Options:

      -t, --template <name>   Use the template <name>
      -d, --directory <path>  Use the template directory <path>
      -n, --npm <package>     Use the npm template <package>
      -V, --version           Output the current version
      -h, --help              Display help information


## Templates

### Default

 Currently the only available template, creating the following structure populated with content after the following questions are asked from the cli:

       Project name: foo
       Enter your name: TJ Holowaychuk
       Enter your email: tj@vision-media.ca
       Project description: awesome foo-ness

structure:
 
     ./History.md
     ./Readme.md
     ./index.js
     ./lib/<project>.js
     ./test/<project>.test.js
     ./support
     ./Makefile
     ./package.json

## NPM Templates

 It is possible to install additional templates by using npm. You can install community templates or create your own by adding them to your local npm registry.

 After installing the template, you can use the -n or --npm flag to specify the npm package as a template. As a convention, the npm packages should be named with ngen-npm_package for example, a connect based template would be named ngen-connect.

 If you would like to start making your own templates and sharing them with the community you can check out [ngen-basicexample](https://github.com/demetriusj/ngen-basicexample) for additional help on making a template.

## License 

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
