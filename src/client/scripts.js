var sourceDirectoryForJsDependencies = './precompiled-dist/';
var sourceDirectoryForCssDependencies = './styles/css/';
var nodeModules = './../node_modules/';

// CSS third party libraries
//require(nodeModules + 'bootstrap/dist/css/bootstrap.min.css');

//require(nodeModules + 'jquery/dist/jquery.min.js');
//require(nodeModules + 'bootstrap/dist/css/bootstrap.min.css');
require('bootstrap-loader');
//require(sourceDirectoryForCssDependencies + 'styles.css');
require(sourceDirectoryForCssDependencies + 'theme.css');

// Example of how to bring css dependencies
// require(sourceDirectoryForCssDependencies + 'test.css');
// require(sourceDirectoryForCssDependencies + 'test.css');
// Example of how to bring js dependencies
require(sourceDirectoryForJsDependencies + 'mainAppLoader.js');
require(sourceDirectoryForJsDependencies + 'modules/connection.js');
require(sourceDirectoryForJsDependencies + 'modules/endpointBases.js');
require(sourceDirectoryForJsDependencies + 'modules/Invitation.js');
require(sourceDirectoryForJsDependencies + 'theme/theme.js');
// This allows us to inject dependencies on the go as if we were writting requests directly on the js file
//require('imports-loader?ScrollReveal=scrollreveal!./precompiled-dist/theme/theme.js');
