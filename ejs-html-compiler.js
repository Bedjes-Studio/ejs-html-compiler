/*
 * ejs-html-compiler
 * Copyright 2023 Bedjes Studio
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

/**
 * Handle errors, if any, print to console and exit the program.
 * @param {error} error that must be handled
 */
function errorHandler(error) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
}

/**
 * Iterates over the files in the specified source folder, compiles and writes the file to the rendered folder.
 * @param {error} srcPath source folder containing .ejs files
 * @param {error} renderedPath destination folder for .html files
 * @param {error} renderOptions ejs renderer options
 */
function compileRecursive(srcPath, renderedPath, renderOptions) {
    fs.readdir(srcPath, (error, list) => {
        errorHandler(error);

        if (list.length == 0) {
            return;
        }

        list.forEach((filename) => {
            filepath = path.resolve(srcPath, filename);
            const stat = fs.statSync(filepath);

            if (stat.isDirectory()) {
                newCompilledDirectory = renderedPath + "/" + path.parse(filepath).base;
                fs.mkdir(newCompilledDirectory, (error) => {
                    errorHandler(error);

                    compileRecursive(filepath, newCompilledDirectory, renderOptions);
                });
            } else {
                compileFile(filepath, renderedPath, renderOptions);
            }
        });
    });
}

/**
 * Compiles the specified file and writes it to the rendered folder.
 * @param {error} filepath path of the ejs file
 * @param {error} renderedPath destination folder for .html file
 * @param {error} renderOptions ejs renderer options
 */
function compileFile(filepath, renderedPath, renderOptions) {
    console.log("Compiling : " + renderedPath + "/" + path.parse(filepath).base);

    const newFilename = renderedPath + "/" + path.parse(filepath).name + ".html";

    ejs.renderFile(filepath, null, renderOptions, (error, str) => {
        errorHandler(error);

        fs.writeFile(newFilename, str, (error) => {
            errorHandler(error);
        });
    });
}

/**
 * Public function that will be used by users. Recreate the destination folder and compile the files.
 * @param {error} srcPath source folder containing .ejs files
 * @param {error} renderedPath destination folder for .html file
 * @param {error} renderOptions ejs renderer options
 */
function build(srcPath, renderedPath, renderOptions = {}) {
    fs.rmSync(renderedPath, { recursive: true, force: true });
    fs.mkdirSync(renderedPath);
    compileRecursive(srcPath, renderedPath, renderOptions);
}

module.exports.build = build;
