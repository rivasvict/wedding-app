var sourceDirectoryForJsDependencies = './precompiled-dist/';
var sourceDirectoryForCssDependencies = './styles/css/';
var nodeModules = './../node_modules/';

// CSS third party libraries
require('bootstrap-loader');
require('font-awesome/css/font-awesome.min.css');
require('magnific-popup/dist/magnific-popup.css');

// Local css
require(sourceDirectoryForCssDependencies + 'theme.css');

// Local js dependencies

require(sourceDirectoryForJsDependencies + 'modules/Invitation.js');
require(sourceDirectoryForJsDependencies + 'models/Invitation.js');
require(sourceDirectoryForJsDependencies + 'modules/connection.js');
require(sourceDirectoryForJsDependencies + 'modules/endpointBases.js');
require(sourceDirectoryForJsDependencies + 'modules/markupControllers/confirmation.js');
require(sourceDirectoryForJsDependencies + 'mainAppLoader.js');
require(sourceDirectoryForJsDependencies + 'theme/theme.js');
// This allows us to inject dependencies on the go as if we were writting requests directly on the js file
//require('imports-loader?ScrollReveal=scrollreveal!./precompiled-dist/theme/theme.js');
