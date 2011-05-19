
# NGen

 NGen is a nodejs package generator, complete with best practices, package structure, package.json and more.

## Installation

    $ npm install ngen

## Usage


    Usage: ngen [options] [path]

    Options:

      -t, --template <name>   Use the template <name>
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

 After installing the template, you can use the -n or --npm flag to specify the npm package as a template. As a convention, the npm packages should be named with ngen- then the name for example, a connect based template would be named ngen-connect.

 Lets make a new template, starting by creating a directory containing index.js and a sub folder named content. The index.js defines the variables used to substitute when building the template. The content folder contains a skeleton copy of the files.

 ngen substitutes anything following the format of "{{token}}" where token is any one of the variables in the index.js file. Both file names and the file content will be updated. So if, you have a file name {{name}}.test.js and name = foo ngen will output a file named foo.test.js. Finally if, the file contains "var name = '{{name}}';" it will be updated to "var name = 'foo';"

 The index.js is a list of exported variables with related prompts. The cli uses this file to generate the prompts to get the values for the substation. For example, the name variable will use the prompt "Enter your name: "

     exports.variables = {
       project: 'Project name: '
       , name: 'Enter your name: '
       , email: 'Enter your email: '
       , description: 'Project description: '
     };

required template structure:

     ./index.js
     ./package.json
     ./content/

example file substitution:

     ./content/{{name}}.test.js

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
