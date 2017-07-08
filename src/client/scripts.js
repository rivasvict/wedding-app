var sourceDirectoryForJsDependencies = './precompiled-dist/';
var sourceDirectoryForCssDependencies = './styles/css/';
var nodeModules = './../node_modules/';

// CSS third party libraries
//require(nodeModules + 'bootstrap/dist/css/bootstrap.min.css');

//require(nodeModules + 'jquery/dist/jquery.min.js');
//require(nodeModules + 'bootstrap/dist/css/bootstrap.min.css');
require('bootstrap-loader');

// Example of how to bring css dependencies
// require(sourceDirectoryForCssDependencies + 'test.css');
// require(sourceDirectoryForCssDependencies + 'test.css');
// Example of how to bring js dependencies
require(sourceDirectoryForJsDependencies + 'mainAppLoader.js');
