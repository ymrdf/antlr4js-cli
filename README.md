# antlr4js-cli
Generates javascript code based on specified grammar for lexer, parser, and tokens.

## Installation
*This is a NPM wrapper of a ANTLR 4 code generation tool. So you will need to have a modern version of Java (>= JRE 1.6) to use it.*

```
    npm install --save-dev antlr4js-cli
```
or, installs it as a global package.

```
   npm install -g antlr4js-cli
```

## Useage

```
antlr4 [options] grammerfile 

options:
 -no-listener        don't generate parse tree listener
 -visitor            generate parse tree visitor
 -no-visitor         don't generate parse tree visitor (default)
 -package ___        specify a package/namespace for the generated code
 -depend             generate file dependencies
 -D<option>=value    set/override a grammar-level option
 -Werror             treat warnings as errors
 -XdbgST             launch StringTemplate visualizer on generated code
 -XdbgSTWait         wait for STViz to close before continuing
 -Xforce-atn         use the ATN simulator for all predictions
 -Xlog               dump lots of logging info to antlr-timestamp.log
 -Xexact-output-dir  all output goes into -o dir regardless of paths/package
 -o                  diretory for output files
```

## Example:
Let's suppose that your grammar is named  "MyGrammar".
If your run: 

```
  antlr4js -visitor  ./MyGrammar.g4 -o out
```
The tool will have generated the following files in out directory for you:
```
-   MyGrammarLexer.js
-   MyGrammarParser.js
-   MyGrammarListener.js (if you have not activated the -no-listener option)
-   MyGrammarVisitor.js (if you have activated the -visitor option)
```
Now, you could use the above files, like this:

```
import antlr4 from 'antlr4';
import MyGrammarLexer from './MyGrammarLexer.js';
import MyGrammarParser from './MyGrammarParser.js';
import MyGrammarListener from './MyGrammarListener.js';

const input = "your text to parse here"
const chars = new antlr4.InputStream(input);
const lexer = new MyGrammarLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new MyGrammarParser(tokens);
parser.buildParseTrees = true;
const tree = parser.MyStartRule();
```
