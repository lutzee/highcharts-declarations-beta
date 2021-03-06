/*
 * Copyright (c) Highsoft AS. All rights reserved.
 */

const fs = require('fs');
const path = require('path');

const definitionPath = process.cwd();
const definitionPattern = '.d.ts';
var targetPath = process.env.INIT_CWD;
if(!targetPath) {
    targetPath = process.cwd() + '../../../..';
}
const nodeModulesPath = path.join(targetPath, 'node_modules');
const bowerModulesPath = path.join(targetPath, 'bower_components');
let highchartsPath = path.join(nodeModulesPath, 'highcharts');
if(!highchartsPath) {
    highchartsPAth = path.join(bowerModulesPath, 'highcharts');
}

function endsWith(str, pattern) {
    return (str.lastIndexOf(pattern) === (str.length - pattern.length));
}

function getFiles(directoryPath, endPattern) {
    const files = [];
    let itemPath = [],
        itemStat = null;
    fs.readdirSync(directoryPath).forEach(item => {
        itemPath = path.join(directoryPath, item);
        itemStat = fs.statSync(itemPath);
        if (itemStat.isFile() &&
            endsWith(itemPath, endPattern)
        ) {
            files.push(itemPath);
        } else if (itemStat.isDirectory()) {
            files.push(...getFiles(itemPath, endPattern));
        }
    });
    return files;
}

function isNpmMode(definitionPath, highchartsPath) {
    return (
        definitionPath &&
        highchartsPath &&
        definitionPath !== highchartsPath
    );
}

function makeDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        makeDirectory(path.dirname(directoryPath));
        fs.mkdirSync(directoryPath);
    }
}

module.exports = {
    // constants
    definitionPath: definitionPath,
    definitionPattern: definitionPattern,
    highchartsPath: highchartsPath,
    nodeModulesPath: nodeModulesPath,
    bowerModulesPath: bowerModulesPath,
    targetPath: targetPath,
    // functions
    endsWith: endsWith,
    getFiles: getFiles,
    isNpmMode: isNpmMode,
    makeDirectory: makeDirectory
}
