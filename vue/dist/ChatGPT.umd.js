(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("CoreHome"), require("vue"), require("CorePluginsAdmin"));
	else if(typeof define === 'function' && define.amd)
		define(["CoreHome", , "CorePluginsAdmin"], factory);
	else if(typeof exports === 'object')
		exports["ChatGPT"] = factory(require("CoreHome"), require("vue"), require("CorePluginsAdmin"));
	else
		root["ChatGPT"] = factory(root["CoreHome"], root["Vue"], root["CorePluginsAdmin"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__19dc__, __WEBPACK_EXTERNAL_MODULE__8bbf__, __WEBPACK_EXTERNAL_MODULE_a5a2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "plugins/ChatGPT/vue/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0645":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1411":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "19dc":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__19dc__;

/***/ }),

/***/ "1fbd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ManageSiteSettings_vue_vue_type_style_index_0_id_13b4342b_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f4fa");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ManageSiteSettings_vue_vue_type_style_index_0_id_13b4342b_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ManageSiteSettings_vue_vue_type_style_index_0_id_13b4342b_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "210a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatIndexPage_vue_vue_type_style_index_0_id_12181830_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9606");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatIndexPage_vue_vue_type_style_index_0_id_12181830_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatIndexPage_vue_vue_type_style_index_0_id_12181830_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3a71":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3b23":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3ca5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatMessage_vue_vue_type_style_index_0_id_3e167524_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8c52");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatMessage_vue_vue_type_style_index_0_id_3e167524_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatMessage_vue_vue_type_style_index_0_id_3e167524_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "44d2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_InsightOverlay_vue_vue_type_style_index_0_id_6c09aabc_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5c98");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_InsightOverlay_vue_vue_type_style_index_0_id_6c09aabc_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_InsightOverlay_vue_vue_type_style_index_0_id_6c09aabc_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5adf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatLoading_vue_vue_type_style_index_0_id_26389ed4_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7d93");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatLoading_vue_vue_type_style_index_0_id_26389ed4_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatLoading_vue_vue_type_style_index_0_id_26389ed4_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5c98":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5f41":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;/*! showdown v 2.1.0 - 21-04-2022 */
(function(){
/**
 * Created by Tivie on 13-07-2015.
 */

function getDefaultOpts (simple) {
  'use strict';

  var defaultOptions = {
    omitExtraWLInCodeBlocks: {
      defaultValue: false,
      describe: 'Omit the default extra whiteline added to code blocks',
      type: 'boolean'
    },
    noHeaderId: {
      defaultValue: false,
      describe: 'Turn on/off generated header id',
      type: 'boolean'
    },
    prefixHeaderId: {
      defaultValue: false,
      describe: 'Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic \'section-\' prefix',
      type: 'string'
    },
    rawPrefixHeaderId: {
      defaultValue: false,
      describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
      type: 'boolean'
    },
    ghCompatibleHeaderId: {
      defaultValue: false,
      describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
      type: 'boolean'
    },
    rawHeaderId: {
      defaultValue: false,
      describe: 'Remove only spaces, \' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids',
      type: 'boolean'
    },
    headerLevelStart: {
      defaultValue: false,
      describe: 'The header blocks level start',
      type: 'integer'
    },
    parseImgDimensions: {
      defaultValue: false,
      describe: 'Turn on/off image dimension parsing',
      type: 'boolean'
    },
    simplifiedAutoLink: {
      defaultValue: false,
      describe: 'Turn on/off GFM autolink style',
      type: 'boolean'
    },
    excludeTrailingPunctuationFromURLs: {
      defaultValue: false,
      describe: 'Excludes trailing punctuation from links generated with autoLinking',
      type: 'boolean'
    },
    literalMidWordUnderscores: {
      defaultValue: false,
      describe: 'Parse midword underscores as literal underscores',
      type: 'boolean'
    },
    literalMidWordAsterisks: {
      defaultValue: false,
      describe: 'Parse midword asterisks as literal asterisks',
      type: 'boolean'
    },
    strikethrough: {
      defaultValue: false,
      describe: 'Turn on/off strikethrough support',
      type: 'boolean'
    },
    tables: {
      defaultValue: false,
      describe: 'Turn on/off tables support',
      type: 'boolean'
    },
    tablesHeaderId: {
      defaultValue: false,
      describe: 'Add an id to table headers',
      type: 'boolean'
    },
    ghCodeBlocks: {
      defaultValue: true,
      describe: 'Turn on/off GFM fenced code blocks support',
      type: 'boolean'
    },
    tasklists: {
      defaultValue: false,
      describe: 'Turn on/off GFM tasklist support',
      type: 'boolean'
    },
    smoothLivePreview: {
      defaultValue: false,
      describe: 'Prevents weird effects in live previews due to incomplete input',
      type: 'boolean'
    },
    smartIndentationFix: {
      defaultValue: false,
      describe: 'Tries to smartly fix indentation in es6 strings',
      type: 'boolean'
    },
    disableForced4SpacesIndentedSublists: {
      defaultValue: false,
      describe: 'Disables the requirement of indenting nested sublists by 4 spaces',
      type: 'boolean'
    },
    simpleLineBreaks: {
      defaultValue: false,
      describe: 'Parses simple line breaks as <br> (GFM Style)',
      type: 'boolean'
    },
    requireSpaceBeforeHeadingText: {
      defaultValue: false,
      describe: 'Makes adding a space between `#` and the header text mandatory (GFM Style)',
      type: 'boolean'
    },
    ghMentions: {
      defaultValue: false,
      describe: 'Enables github @mentions',
      type: 'boolean'
    },
    ghMentionsLink: {
      defaultValue: 'https://github.com/{u}',
      describe: 'Changes the link generated by @mentions. Only applies if ghMentions option is enabled.',
      type: 'string'
    },
    encodeEmails: {
      defaultValue: true,
      describe: 'Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities',
      type: 'boolean'
    },
    openLinksInNewWindow: {
      defaultValue: false,
      describe: 'Open all links in new windows',
      type: 'boolean'
    },
    backslashEscapesHTMLTags: {
      defaultValue: false,
      describe: 'Support for HTML Tag escaping. ex: \<div>foo\</div>',
      type: 'boolean'
    },
    emoji: {
      defaultValue: false,
      describe: 'Enable emoji support. Ex: `this is a :smile: emoji`',
      type: 'boolean'
    },
    underline: {
      defaultValue: false,
      describe: 'Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`',
      type: 'boolean'
    },
    ellipsis: {
      defaultValue: true,
      describe: 'Replaces three dots with the ellipsis unicode character',
      type: 'boolean'
    },
    completeHTMLDocument: {
      defaultValue: false,
      describe: 'Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags',
      type: 'boolean'
    },
    metadata: {
      defaultValue: false,
      describe: 'Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).',
      type: 'boolean'
    },
    splitAdjacentBlockquotes: {
      defaultValue: false,
      describe: 'Split adjacent blockquote blocks',
      type: 'boolean'
    }
  };
  if (simple === false) {
    return JSON.parse(JSON.stringify(defaultOptions));
  }
  var ret = {};
  for (var opt in defaultOptions) {
    if (defaultOptions.hasOwnProperty(opt)) {
      ret[opt] = defaultOptions[opt].defaultValue;
    }
  }
  return ret;
}

function allOptionsOn () {
  'use strict';
  var options = getDefaultOpts(true),
      ret = {};
  for (var opt in options) {
    if (options.hasOwnProperty(opt)) {
      ret[opt] = true;
    }
  }
  return ret;
}

/**
 * Created by Tivie on 06-01-2015.
 */

// Private properties
var showdown = {},
    parsers = {},
    extensions = {},
    globalOptions = getDefaultOpts(true),
    setFlavor = 'vanilla',
    flavor = {
      github: {
        omitExtraWLInCodeBlocks:              true,
        simplifiedAutoLink:                   true,
        excludeTrailingPunctuationFromURLs:   true,
        literalMidWordUnderscores:            true,
        strikethrough:                        true,
        tables:                               true,
        tablesHeaderId:                       true,
        ghCodeBlocks:                         true,
        tasklists:                            true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks:                     true,
        requireSpaceBeforeHeadingText:        true,
        ghCompatibleHeaderId:                 true,
        ghMentions:                           true,
        backslashEscapesHTMLTags:             true,
        emoji:                                true,
        splitAdjacentBlockquotes:             true
      },
      original: {
        noHeaderId:                           true,
        ghCodeBlocks:                         false
      },
      ghost: {
        omitExtraWLInCodeBlocks:              true,
        parseImgDimensions:                   true,
        simplifiedAutoLink:                   true,
        excludeTrailingPunctuationFromURLs:   true,
        literalMidWordUnderscores:            true,
        strikethrough:                        true,
        tables:                               true,
        tablesHeaderId:                       true,
        ghCodeBlocks:                         true,
        tasklists:                            true,
        smoothLivePreview:                    true,
        simpleLineBreaks:                     true,
        requireSpaceBeforeHeadingText:        true,
        ghMentions:                           false,
        encodeEmails:                         true
      },
      vanilla: getDefaultOpts(true),
      allOn: allOptionsOn()
    };

/**
 * helper namespace
 * @type {{}}
 */
showdown.helper = {};

/**
 * TODO LEGACY SUPPORT CODE
 * @type {{}}
 */
showdown.extensions = {};

/**
 * Set a global option
 * @static
 * @param {string} key
 * @param {*} value
 * @returns {showdown}
 */
showdown.setOption = function (key, value) {
  'use strict';
  globalOptions[key] = value;
  return this;
};

/**
 * Get a global option
 * @static
 * @param {string} key
 * @returns {*}
 */
showdown.getOption = function (key) {
  'use strict';
  return globalOptions[key];
};

/**
 * Get the global options
 * @static
 * @returns {{}}
 */
showdown.getOptions = function () {
  'use strict';
  return globalOptions;
};

/**
 * Reset global options to the default values
 * @static
 */
showdown.resetOptions = function () {
  'use strict';
  globalOptions = getDefaultOpts(true);
};

/**
 * Set the flavor showdown should use as default
 * @param {string} name
 */
showdown.setFlavor = function (name) {
  'use strict';
  if (!flavor.hasOwnProperty(name)) {
    throw Error(name + ' flavor was not found');
  }
  showdown.resetOptions();
  var preset = flavor[name];
  setFlavor = name;
  for (var option in preset) {
    if (preset.hasOwnProperty(option)) {
      globalOptions[option] = preset[option];
    }
  }
};

/**
 * Get the currently set flavor
 * @returns {string}
 */
showdown.getFlavor = function () {
  'use strict';
  return setFlavor;
};

/**
 * Get the options of a specified flavor. Returns undefined if the flavor was not found
 * @param {string} name Name of the flavor
 * @returns {{}|undefined}
 */
showdown.getFlavorOptions = function (name) {
  'use strict';
  if (flavor.hasOwnProperty(name)) {
    return flavor[name];
  }
};

/**
 * Get the default options
 * @static
 * @param {boolean} [simple=true]
 * @returns {{}}
 */
showdown.getDefaultOptions = function (simple) {
  'use strict';
  return getDefaultOpts(simple);
};

/**
 * Get or set a subParser
 *
 * subParser(name)       - Get a registered subParser
 * subParser(name, func) - Register a subParser
 * @static
 * @param {string} name
 * @param {function} [func]
 * @returns {*}
 */
showdown.subParser = function (name, func) {
  'use strict';
  if (showdown.helper.isString(name)) {
    if (typeof func !== 'undefined') {
      parsers[name] = func;
    } else {
      if (parsers.hasOwnProperty(name)) {
        return parsers[name];
      } else {
        throw Error('SubParser named ' + name + ' not registered!');
      }
    }
  }
};

/**
 * Gets or registers an extension
 * @static
 * @param {string} name
 * @param {object|object[]|function=} ext
 * @returns {*}
 */
showdown.extension = function (name, ext) {
  'use strict';

  if (!showdown.helper.isString(name)) {
    throw Error('Extension \'name\' must be a string');
  }

  name = showdown.helper.stdExtName(name);

  // Getter
  if (showdown.helper.isUndefined(ext)) {
    if (!extensions.hasOwnProperty(name)) {
      throw Error('Extension named ' + name + ' is not registered!');
    }
    return extensions[name];

    // Setter
  } else {
    // Expand extension if it's wrapped in a function
    if (typeof ext === 'function') {
      ext = ext();
    }

    // Ensure extension is an array
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExtension = validate(ext, name);

    if (validExtension.valid) {
      extensions[name] = ext;
    } else {
      throw Error(validExtension.error);
    }
  }
};

/**
 * Gets all extensions registered
 * @returns {{}}
 */
showdown.getAllExtensions = function () {
  'use strict';
  return extensions;
};

/**
 * Remove an extension
 * @param {string} name
 */
showdown.removeExtension = function (name) {
  'use strict';
  delete extensions[name];
};

/**
 * Removes all extensions
 */
showdown.resetExtensions = function () {
  'use strict';
  extensions = {};
};

/**
 * Validate extension
 * @param {array} extension
 * @param {string} name
 * @returns {{valid: boolean, error: string}}
 */
function validate (extension, name) {
  'use strict';

  var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
      ret = {
        valid: true,
        error: ''
      };

  if (!showdown.helper.isArray(extension)) {
    extension = [extension];
  }

  for (var i = 0; i < extension.length; ++i) {
    var baseMsg = errMsg + ' sub-extension ' + i + ': ',
        ext = extension[i];
    if (typeof ext !== 'object') {
      ret.valid = false;
      ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
      return ret;
    }

    if (!showdown.helper.isString(ext.type)) {
      ret.valid = false;
      ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
      return ret;
    }

    var type = ext.type = ext.type.toLowerCase();

    // normalize extension type
    if (type === 'language') {
      type = ext.type = 'lang';
    }

    if (type === 'html') {
      type = ext.type = 'output';
    }

    if (type !== 'lang' && type !== 'output' && type !== 'listener') {
      ret.valid = false;
      ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
      return ret;
    }

    if (type === 'listener') {
      if (showdown.helper.isUndefined(ext.listeners)) {
        ret.valid = false;
        ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
        return ret;
      }
    } else {
      if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
        ret.valid = false;
        ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
        return ret;
      }
    }

    if (ext.listeners) {
      if (typeof ext.listeners !== 'object') {
        ret.valid = false;
        ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
        return ret;
      }
      for (var ln in ext.listeners) {
        if (ext.listeners.hasOwnProperty(ln)) {
          if (typeof ext.listeners[ln] !== 'function') {
            ret.valid = false;
            ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln +
              ' must be a function but ' + typeof ext.listeners[ln] + ' given';
            return ret;
          }
        }
      }
    }

    if (ext.filter) {
      if (typeof ext.filter !== 'function') {
        ret.valid = false;
        ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
        return ret;
      }
    } else if (ext.regex) {
      if (showdown.helper.isString(ext.regex)) {
        ext.regex = new RegExp(ext.regex, 'g');
      }
      if (!(ext.regex instanceof RegExp)) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
        return ret;
      }
      if (showdown.helper.isUndefined(ext.replace)) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
        return ret;
      }
    }
  }
  return ret;
}

/**
 * Validate extension
 * @param {object} ext
 * @returns {boolean}
 */
showdown.validateExtension = function (ext) {
  'use strict';

  var validateExtension = validate(ext, null);
  if (!validateExtension.valid) {
    console.warn(validateExtension.error);
    return false;
  }
  return true;
};

/**
 * showdownjs helper functions
 */

if (!showdown.hasOwnProperty('helper')) {
  showdown.helper = {};
}

/**
 * Check if var is string
 * @static
 * @param {string} a
 * @returns {boolean}
 */
showdown.helper.isString = function (a) {
  'use strict';
  return (typeof a === 'string' || a instanceof String);
};

/**
 * Check if var is a function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isFunction = function (a) {
  'use strict';
  var getType = {};
  return a && getType.toString.call(a) === '[object Function]';
};

/**
 * isArray helper function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isArray = function (a) {
  'use strict';
  return Array.isArray(a);
};

/**
 * Check if value is undefined
 * @static
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 */
showdown.helper.isUndefined = function (value) {
  'use strict';
  return typeof value === 'undefined';
};

/**
 * ForEach helper function
 * Iterates over Arrays and Objects (own properties only)
 * @static
 * @param {*} obj
 * @param {function} callback Accepts 3 params: 1. value, 2. key, 3. the original array/object
 */
showdown.helper.forEach = function (obj, callback) {
  'use strict';
  // check if obj is defined
  if (showdown.helper.isUndefined(obj)) {
    throw new Error('obj param is required');
  }

  if (showdown.helper.isUndefined(callback)) {
    throw new Error('callback param is required');
  }

  if (!showdown.helper.isFunction(callback)) {
    throw new Error('callback param must be a function/closure');
  }

  if (typeof obj.forEach === 'function') {
    obj.forEach(callback);
  } else if (showdown.helper.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      callback(obj[i], i, obj);
    }
  } else if (typeof (obj) === 'object') {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        callback(obj[prop], prop, obj);
      }
    }
  } else {
    throw new Error('obj does not seem to be an array or an iterable object');
  }
};

/**
 * Standardidize extension name
 * @static
 * @param {string} s extension name
 * @returns {string}
 */
showdown.helper.stdExtName = function (s) {
  'use strict';
  return s.replace(/[_?*+\/\\.^-]/g, '').replace(/\s/g, '').toLowerCase();
};

function escapeCharactersCallback (wholeMatch, m1) {
  'use strict';
  var charCodeToEscape = m1.charCodeAt(0);
  return '¨E' + charCodeToEscape + 'E';
}

/**
 * Callback used to escape characters when passing through String.replace
 * @static
 * @param {string} wholeMatch
 * @param {string} m1
 * @returns {string}
 */
showdown.helper.escapeCharactersCallback = escapeCharactersCallback;

/**
 * Escape characters in a string
 * @static
 * @param {string} text
 * @param {string} charsToEscape
 * @param {boolean} afterBackslash
 * @returns {XML|string|void|*}
 */
showdown.helper.escapeCharacters = function (text, charsToEscape, afterBackslash) {
  'use strict';
  // First we have to escape the escape characters so that
  // we can build a character class out of them
  var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';

  if (afterBackslash) {
    regexString = '\\\\' + regexString;
  }

  var regex = new RegExp(regexString, 'g');
  text = text.replace(regex, escapeCharactersCallback);

  return text;
};

/**
 * Unescape HTML entities
 * @param txt
 * @returns {string}
 */
showdown.helper.unescapeHTMLEntities = function (txt) {
  'use strict';

  return txt
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
};

var rgxFindMatchPos = function (str, left, right, flags) {
  'use strict';
  var f = flags || '',
      g = f.indexOf('g') > -1,
      x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
      l = new RegExp(left, f.replace(/g/g, '')),
      pos = [],
      t, s, m, start, end;

  do {
    t = 0;
    while ((m = x.exec(str))) {
      if (l.test(m[0])) {
        if (!(t++)) {
          s = x.lastIndex;
          start = s - m[0].length;
        }
      } else if (t) {
        if (!--t) {
          end = m.index + m[0].length;
          var obj = {
            left: {start: start, end: s},
            match: {start: s, end: m.index},
            right: {start: m.index, end: end},
            wholeMatch: {start: start, end: end}
          };
          pos.push(obj);
          if (!g) {
            return pos;
          }
        }
      }
    }
  } while (t && (x.lastIndex = s));

  return pos;
};

/**
 * matchRecursiveRegExp
 *
 * (c) 2007 Steven Levithan <stevenlevithan.com>
 * MIT License
 *
 * Accepts a string to search, a left and right format delimiter
 * as regex patterns, and optional regex flags. Returns an array
 * of matches, allowing nested instances of left/right delimiters.
 * Use the "g" flag to return all matches, otherwise only the
 * first is returned. Be careful to ensure that the left and
 * right format delimiters produce mutually exclusive matches.
 * Backreferences are not supported within the right delimiter
 * due to how it is internally combined with the left delimiter.
 * When matching strings whose format delimiters are unbalanced
 * to the left or right, the output is intentionally as a
 * conventional regex library with recursion support would
 * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
 * "<" and ">" as the delimiters (both strings contain a single,
 * balanced instance of "<x>").
 *
 * examples:
 * matchRecursiveRegExp("test", "\\(", "\\)")
 * returns: []
 * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
 * returns: ["t<<e>><s>", ""]
 * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
 * returns: ["test"]
 */
showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
  'use strict';

  var matchPos = rgxFindMatchPos (str, left, right, flags),
      results = [];

  for (var i = 0; i < matchPos.length; ++i) {
    results.push([
      str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
      str.slice(matchPos[i].match.start, matchPos[i].match.end),
      str.slice(matchPos[i].left.start, matchPos[i].left.end),
      str.slice(matchPos[i].right.start, matchPos[i].right.end)
    ]);
  }
  return results;
};

/**
 *
 * @param {string} str
 * @param {string|function} replacement
 * @param {string} left
 * @param {string} right
 * @param {string} flags
 * @returns {string}
 */
showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
  'use strict';

  if (!showdown.helper.isFunction(replacement)) {
    var repStr = replacement;
    replacement = function () {
      return repStr;
    };
  }

  var matchPos = rgxFindMatchPos(str, left, right, flags),
      finalStr = str,
      lng = matchPos.length;

  if (lng > 0) {
    var bits = [];
    if (matchPos[0].wholeMatch.start !== 0) {
      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
    }
    for (var i = 0; i < lng; ++i) {
      bits.push(
        replacement(
          str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
          str.slice(matchPos[i].match.start, matchPos[i].match.end),
          str.slice(matchPos[i].left.start, matchPos[i].left.end),
          str.slice(matchPos[i].right.start, matchPos[i].right.end)
        )
      );
      if (i < lng - 1) {
        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
      }
    }
    if (matchPos[lng - 1].wholeMatch.end < str.length) {
      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
    }
    finalStr = bits.join('');
  }
  return finalStr;
};

/**
 * Returns the index within the passed String object of the first occurrence of the specified regex,
 * starting the search at fromIndex. Returns -1 if the value is not found.
 *
 * @param {string} str string to search
 * @param {RegExp} regex Regular expression to search
 * @param {int} [fromIndex = 0] Index to start the search
 * @returns {Number}
 * @throws InvalidArgumentError
 */
showdown.helper.regexIndexOf = function (str, regex, fromIndex) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  if (regex instanceof RegExp === false) {
    throw 'InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp';
  }
  var indexOf = str.substring(fromIndex || 0).search(regex);
  return (indexOf >= 0) ? (indexOf + (fromIndex || 0)) : indexOf;
};

/**
 * Splits the passed string object at the defined index, and returns an array composed of the two substrings
 * @param {string} str string to split
 * @param {int} index index to split string at
 * @returns {[string,string]}
 * @throws InvalidArgumentError
 */
showdown.helper.splitAtIndex = function (str, index) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  return [str.substring(0, index), str.substring(index)];
};

/**
 * Obfuscate an e-mail address through the use of Character Entities,
 * transforming ASCII characters into their equivalent decimal or hex entities.
 *
 * Since it has a random component, subsequent calls to this function produce different results
 *
 * @param {string} mail
 * @returns {string}
 */
showdown.helper.encodeEmailAddress = function (mail) {
  'use strict';
  var encode = [
    function (ch) {
      return '&#' + ch.charCodeAt(0) + ';';
    },
    function (ch) {
      return '&#x' + ch.charCodeAt(0).toString(16) + ';';
    },
    function (ch) {
      return ch;
    }
  ];

  mail = mail.replace(/./g, function (ch) {
    if (ch === '@') {
      // this *must* be encoded. I insist.
      ch = encode[Math.floor(Math.random() * 2)](ch);
    } else {
      var r = Math.random();
      // roughly 10% raw, 45% hex, 45% dec
      ch = (
        r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch)
      );
    }
    return ch;
  });

  return mail;
};

/**
 *
 * @param str
 * @param targetLength
 * @param padString
 * @returns {string}
 */
showdown.helper.padEnd = function padEnd (str, targetLength, padString) {
  'use strict';
  /*jshint bitwise: false*/
  // eslint-disable-next-line space-infix-ops
  targetLength = targetLength>>0; //floor if number or convert non-number to 0;
  /*jshint bitwise: true*/
  padString = String(padString || ' ');
  if (str.length > targetLength) {
    return String(str);
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return String(str) + padString.slice(0,targetLength);
  }
};

/**
 * POLYFILLS
 */
// use this instead of builtin is undefined for IE8 compatibility
if (typeof (console) === 'undefined') {
  console = {
    warn: function (msg) {
      'use strict';
      alert(msg);
    },
    log: function (msg) {
      'use strict';
      alert(msg);
    },
    error: function (msg) {
      'use strict';
      throw msg;
    }
  };
}

/**
 * Common regexes.
 * We declare some common regexes to improve performance
 */
showdown.helper.regexes = {
  asteriskDashAndColon: /([*_:~])/g
};

/**
 * EMOJIS LIST
 */
showdown.helper.emojis = {
  '+1':'\ud83d\udc4d',
  '-1':'\ud83d\udc4e',
  '100':'\ud83d\udcaf',
  '1234':'\ud83d\udd22',
  '1st_place_medal':'\ud83e\udd47',
  '2nd_place_medal':'\ud83e\udd48',
  '3rd_place_medal':'\ud83e\udd49',
  '8ball':'\ud83c\udfb1',
  'a':'\ud83c\udd70\ufe0f',
  'ab':'\ud83c\udd8e',
  'abc':'\ud83d\udd24',
  'abcd':'\ud83d\udd21',
  'accept':'\ud83c\ude51',
  'aerial_tramway':'\ud83d\udea1',
  'airplane':'\u2708\ufe0f',
  'alarm_clock':'\u23f0',
  'alembic':'\u2697\ufe0f',
  'alien':'\ud83d\udc7d',
  'ambulance':'\ud83d\ude91',
  'amphora':'\ud83c\udffa',
  'anchor':'\u2693\ufe0f',
  'angel':'\ud83d\udc7c',
  'anger':'\ud83d\udca2',
  'angry':'\ud83d\ude20',
  'anguished':'\ud83d\ude27',
  'ant':'\ud83d\udc1c',
  'apple':'\ud83c\udf4e',
  'aquarius':'\u2652\ufe0f',
  'aries':'\u2648\ufe0f',
  'arrow_backward':'\u25c0\ufe0f',
  'arrow_double_down':'\u23ec',
  'arrow_double_up':'\u23eb',
  'arrow_down':'\u2b07\ufe0f',
  'arrow_down_small':'\ud83d\udd3d',
  'arrow_forward':'\u25b6\ufe0f',
  'arrow_heading_down':'\u2935\ufe0f',
  'arrow_heading_up':'\u2934\ufe0f',
  'arrow_left':'\u2b05\ufe0f',
  'arrow_lower_left':'\u2199\ufe0f',
  'arrow_lower_right':'\u2198\ufe0f',
  'arrow_right':'\u27a1\ufe0f',
  'arrow_right_hook':'\u21aa\ufe0f',
  'arrow_up':'\u2b06\ufe0f',
  'arrow_up_down':'\u2195\ufe0f',
  'arrow_up_small':'\ud83d\udd3c',
  'arrow_upper_left':'\u2196\ufe0f',
  'arrow_upper_right':'\u2197\ufe0f',
  'arrows_clockwise':'\ud83d\udd03',
  'arrows_counterclockwise':'\ud83d\udd04',
  'art':'\ud83c\udfa8',
  'articulated_lorry':'\ud83d\ude9b',
  'artificial_satellite':'\ud83d\udef0',
  'astonished':'\ud83d\ude32',
  'athletic_shoe':'\ud83d\udc5f',
  'atm':'\ud83c\udfe7',
  'atom_symbol':'\u269b\ufe0f',
  'avocado':'\ud83e\udd51',
  'b':'\ud83c\udd71\ufe0f',
  'baby':'\ud83d\udc76',
  'baby_bottle':'\ud83c\udf7c',
  'baby_chick':'\ud83d\udc24',
  'baby_symbol':'\ud83d\udebc',
  'back':'\ud83d\udd19',
  'bacon':'\ud83e\udd53',
  'badminton':'\ud83c\udff8',
  'baggage_claim':'\ud83d\udec4',
  'baguette_bread':'\ud83e\udd56',
  'balance_scale':'\u2696\ufe0f',
  'balloon':'\ud83c\udf88',
  'ballot_box':'\ud83d\uddf3',
  'ballot_box_with_check':'\u2611\ufe0f',
  'bamboo':'\ud83c\udf8d',
  'banana':'\ud83c\udf4c',
  'bangbang':'\u203c\ufe0f',
  'bank':'\ud83c\udfe6',
  'bar_chart':'\ud83d\udcca',
  'barber':'\ud83d\udc88',
  'baseball':'\u26be\ufe0f',
  'basketball':'\ud83c\udfc0',
  'basketball_man':'\u26f9\ufe0f',
  'basketball_woman':'\u26f9\ufe0f&zwj;\u2640\ufe0f',
  'bat':'\ud83e\udd87',
  'bath':'\ud83d\udec0',
  'bathtub':'\ud83d\udec1',
  'battery':'\ud83d\udd0b',
  'beach_umbrella':'\ud83c\udfd6',
  'bear':'\ud83d\udc3b',
  'bed':'\ud83d\udecf',
  'bee':'\ud83d\udc1d',
  'beer':'\ud83c\udf7a',
  'beers':'\ud83c\udf7b',
  'beetle':'\ud83d\udc1e',
  'beginner':'\ud83d\udd30',
  'bell':'\ud83d\udd14',
  'bellhop_bell':'\ud83d\udece',
  'bento':'\ud83c\udf71',
  'biking_man':'\ud83d\udeb4',
  'bike':'\ud83d\udeb2',
  'biking_woman':'\ud83d\udeb4&zwj;\u2640\ufe0f',
  'bikini':'\ud83d\udc59',
  'biohazard':'\u2623\ufe0f',
  'bird':'\ud83d\udc26',
  'birthday':'\ud83c\udf82',
  'black_circle':'\u26ab\ufe0f',
  'black_flag':'\ud83c\udff4',
  'black_heart':'\ud83d\udda4',
  'black_joker':'\ud83c\udccf',
  'black_large_square':'\u2b1b\ufe0f',
  'black_medium_small_square':'\u25fe\ufe0f',
  'black_medium_square':'\u25fc\ufe0f',
  'black_nib':'\u2712\ufe0f',
  'black_small_square':'\u25aa\ufe0f',
  'black_square_button':'\ud83d\udd32',
  'blonde_man':'\ud83d\udc71',
  'blonde_woman':'\ud83d\udc71&zwj;\u2640\ufe0f',
  'blossom':'\ud83c\udf3c',
  'blowfish':'\ud83d\udc21',
  'blue_book':'\ud83d\udcd8',
  'blue_car':'\ud83d\ude99',
  'blue_heart':'\ud83d\udc99',
  'blush':'\ud83d\ude0a',
  'boar':'\ud83d\udc17',
  'boat':'\u26f5\ufe0f',
  'bomb':'\ud83d\udca3',
  'book':'\ud83d\udcd6',
  'bookmark':'\ud83d\udd16',
  'bookmark_tabs':'\ud83d\udcd1',
  'books':'\ud83d\udcda',
  'boom':'\ud83d\udca5',
  'boot':'\ud83d\udc62',
  'bouquet':'\ud83d\udc90',
  'bowing_man':'\ud83d\ude47',
  'bow_and_arrow':'\ud83c\udff9',
  'bowing_woman':'\ud83d\ude47&zwj;\u2640\ufe0f',
  'bowling':'\ud83c\udfb3',
  'boxing_glove':'\ud83e\udd4a',
  'boy':'\ud83d\udc66',
  'bread':'\ud83c\udf5e',
  'bride_with_veil':'\ud83d\udc70',
  'bridge_at_night':'\ud83c\udf09',
  'briefcase':'\ud83d\udcbc',
  'broken_heart':'\ud83d\udc94',
  'bug':'\ud83d\udc1b',
  'building_construction':'\ud83c\udfd7',
  'bulb':'\ud83d\udca1',
  'bullettrain_front':'\ud83d\ude85',
  'bullettrain_side':'\ud83d\ude84',
  'burrito':'\ud83c\udf2f',
  'bus':'\ud83d\ude8c',
  'business_suit_levitating':'\ud83d\udd74',
  'busstop':'\ud83d\ude8f',
  'bust_in_silhouette':'\ud83d\udc64',
  'busts_in_silhouette':'\ud83d\udc65',
  'butterfly':'\ud83e\udd8b',
  'cactus':'\ud83c\udf35',
  'cake':'\ud83c\udf70',
  'calendar':'\ud83d\udcc6',
  'call_me_hand':'\ud83e\udd19',
  'calling':'\ud83d\udcf2',
  'camel':'\ud83d\udc2b',
  'camera':'\ud83d\udcf7',
  'camera_flash':'\ud83d\udcf8',
  'camping':'\ud83c\udfd5',
  'cancer':'\u264b\ufe0f',
  'candle':'\ud83d\udd6f',
  'candy':'\ud83c\udf6c',
  'canoe':'\ud83d\udef6',
  'capital_abcd':'\ud83d\udd20',
  'capricorn':'\u2651\ufe0f',
  'car':'\ud83d\ude97',
  'card_file_box':'\ud83d\uddc3',
  'card_index':'\ud83d\udcc7',
  'card_index_dividers':'\ud83d\uddc2',
  'carousel_horse':'\ud83c\udfa0',
  'carrot':'\ud83e\udd55',
  'cat':'\ud83d\udc31',
  'cat2':'\ud83d\udc08',
  'cd':'\ud83d\udcbf',
  'chains':'\u26d3',
  'champagne':'\ud83c\udf7e',
  'chart':'\ud83d\udcb9',
  'chart_with_downwards_trend':'\ud83d\udcc9',
  'chart_with_upwards_trend':'\ud83d\udcc8',
  'checkered_flag':'\ud83c\udfc1',
  'cheese':'\ud83e\uddc0',
  'cherries':'\ud83c\udf52',
  'cherry_blossom':'\ud83c\udf38',
  'chestnut':'\ud83c\udf30',
  'chicken':'\ud83d\udc14',
  'children_crossing':'\ud83d\udeb8',
  'chipmunk':'\ud83d\udc3f',
  'chocolate_bar':'\ud83c\udf6b',
  'christmas_tree':'\ud83c\udf84',
  'church':'\u26ea\ufe0f',
  'cinema':'\ud83c\udfa6',
  'circus_tent':'\ud83c\udfaa',
  'city_sunrise':'\ud83c\udf07',
  'city_sunset':'\ud83c\udf06',
  'cityscape':'\ud83c\udfd9',
  'cl':'\ud83c\udd91',
  'clamp':'\ud83d\udddc',
  'clap':'\ud83d\udc4f',
  'clapper':'\ud83c\udfac',
  'classical_building':'\ud83c\udfdb',
  'clinking_glasses':'\ud83e\udd42',
  'clipboard':'\ud83d\udccb',
  'clock1':'\ud83d\udd50',
  'clock10':'\ud83d\udd59',
  'clock1030':'\ud83d\udd65',
  'clock11':'\ud83d\udd5a',
  'clock1130':'\ud83d\udd66',
  'clock12':'\ud83d\udd5b',
  'clock1230':'\ud83d\udd67',
  'clock130':'\ud83d\udd5c',
  'clock2':'\ud83d\udd51',
  'clock230':'\ud83d\udd5d',
  'clock3':'\ud83d\udd52',
  'clock330':'\ud83d\udd5e',
  'clock4':'\ud83d\udd53',
  'clock430':'\ud83d\udd5f',
  'clock5':'\ud83d\udd54',
  'clock530':'\ud83d\udd60',
  'clock6':'\ud83d\udd55',
  'clock630':'\ud83d\udd61',
  'clock7':'\ud83d\udd56',
  'clock730':'\ud83d\udd62',
  'clock8':'\ud83d\udd57',
  'clock830':'\ud83d\udd63',
  'clock9':'\ud83d\udd58',
  'clock930':'\ud83d\udd64',
  'closed_book':'\ud83d\udcd5',
  'closed_lock_with_key':'\ud83d\udd10',
  'closed_umbrella':'\ud83c\udf02',
  'cloud':'\u2601\ufe0f',
  'cloud_with_lightning':'\ud83c\udf29',
  'cloud_with_lightning_and_rain':'\u26c8',
  'cloud_with_rain':'\ud83c\udf27',
  'cloud_with_snow':'\ud83c\udf28',
  'clown_face':'\ud83e\udd21',
  'clubs':'\u2663\ufe0f',
  'cocktail':'\ud83c\udf78',
  'coffee':'\u2615\ufe0f',
  'coffin':'\u26b0\ufe0f',
  'cold_sweat':'\ud83d\ude30',
  'comet':'\u2604\ufe0f',
  'computer':'\ud83d\udcbb',
  'computer_mouse':'\ud83d\uddb1',
  'confetti_ball':'\ud83c\udf8a',
  'confounded':'\ud83d\ude16',
  'confused':'\ud83d\ude15',
  'congratulations':'\u3297\ufe0f',
  'construction':'\ud83d\udea7',
  'construction_worker_man':'\ud83d\udc77',
  'construction_worker_woman':'\ud83d\udc77&zwj;\u2640\ufe0f',
  'control_knobs':'\ud83c\udf9b',
  'convenience_store':'\ud83c\udfea',
  'cookie':'\ud83c\udf6a',
  'cool':'\ud83c\udd92',
  'policeman':'\ud83d\udc6e',
  'copyright':'\u00a9\ufe0f',
  'corn':'\ud83c\udf3d',
  'couch_and_lamp':'\ud83d\udecb',
  'couple':'\ud83d\udc6b',
  'couple_with_heart_woman_man':'\ud83d\udc91',
  'couple_with_heart_man_man':'\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc68',
  'couple_with_heart_woman_woman':'\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc69',
  'couplekiss_man_man':'\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc68',
  'couplekiss_man_woman':'\ud83d\udc8f',
  'couplekiss_woman_woman':'\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc69',
  'cow':'\ud83d\udc2e',
  'cow2':'\ud83d\udc04',
  'cowboy_hat_face':'\ud83e\udd20',
  'crab':'\ud83e\udd80',
  'crayon':'\ud83d\udd8d',
  'credit_card':'\ud83d\udcb3',
  'crescent_moon':'\ud83c\udf19',
  'cricket':'\ud83c\udfcf',
  'crocodile':'\ud83d\udc0a',
  'croissant':'\ud83e\udd50',
  'crossed_fingers':'\ud83e\udd1e',
  'crossed_flags':'\ud83c\udf8c',
  'crossed_swords':'\u2694\ufe0f',
  'crown':'\ud83d\udc51',
  'cry':'\ud83d\ude22',
  'crying_cat_face':'\ud83d\ude3f',
  'crystal_ball':'\ud83d\udd2e',
  'cucumber':'\ud83e\udd52',
  'cupid':'\ud83d\udc98',
  'curly_loop':'\u27b0',
  'currency_exchange':'\ud83d\udcb1',
  'curry':'\ud83c\udf5b',
  'custard':'\ud83c\udf6e',
  'customs':'\ud83d\udec3',
  'cyclone':'\ud83c\udf00',
  'dagger':'\ud83d\udde1',
  'dancer':'\ud83d\udc83',
  'dancing_women':'\ud83d\udc6f',
  'dancing_men':'\ud83d\udc6f&zwj;\u2642\ufe0f',
  'dango':'\ud83c\udf61',
  'dark_sunglasses':'\ud83d\udd76',
  'dart':'\ud83c\udfaf',
  'dash':'\ud83d\udca8',
  'date':'\ud83d\udcc5',
  'deciduous_tree':'\ud83c\udf33',
  'deer':'\ud83e\udd8c',
  'department_store':'\ud83c\udfec',
  'derelict_house':'\ud83c\udfda',
  'desert':'\ud83c\udfdc',
  'desert_island':'\ud83c\udfdd',
  'desktop_computer':'\ud83d\udda5',
  'male_detective':'\ud83d\udd75\ufe0f',
  'diamond_shape_with_a_dot_inside':'\ud83d\udca0',
  'diamonds':'\u2666\ufe0f',
  'disappointed':'\ud83d\ude1e',
  'disappointed_relieved':'\ud83d\ude25',
  'dizzy':'\ud83d\udcab',
  'dizzy_face':'\ud83d\ude35',
  'do_not_litter':'\ud83d\udeaf',
  'dog':'\ud83d\udc36',
  'dog2':'\ud83d\udc15',
  'dollar':'\ud83d\udcb5',
  'dolls':'\ud83c\udf8e',
  'dolphin':'\ud83d\udc2c',
  'door':'\ud83d\udeaa',
  'doughnut':'\ud83c\udf69',
  'dove':'\ud83d\udd4a',
  'dragon':'\ud83d\udc09',
  'dragon_face':'\ud83d\udc32',
  'dress':'\ud83d\udc57',
  'dromedary_camel':'\ud83d\udc2a',
  'drooling_face':'\ud83e\udd24',
  'droplet':'\ud83d\udca7',
  'drum':'\ud83e\udd41',
  'duck':'\ud83e\udd86',
  'dvd':'\ud83d\udcc0',
  'e-mail':'\ud83d\udce7',
  'eagle':'\ud83e\udd85',
  'ear':'\ud83d\udc42',
  'ear_of_rice':'\ud83c\udf3e',
  'earth_africa':'\ud83c\udf0d',
  'earth_americas':'\ud83c\udf0e',
  'earth_asia':'\ud83c\udf0f',
  'egg':'\ud83e\udd5a',
  'eggplant':'\ud83c\udf46',
  'eight_pointed_black_star':'\u2734\ufe0f',
  'eight_spoked_asterisk':'\u2733\ufe0f',
  'electric_plug':'\ud83d\udd0c',
  'elephant':'\ud83d\udc18',
  'email':'\u2709\ufe0f',
  'end':'\ud83d\udd1a',
  'envelope_with_arrow':'\ud83d\udce9',
  'euro':'\ud83d\udcb6',
  'european_castle':'\ud83c\udff0',
  'european_post_office':'\ud83c\udfe4',
  'evergreen_tree':'\ud83c\udf32',
  'exclamation':'\u2757\ufe0f',
  'expressionless':'\ud83d\ude11',
  'eye':'\ud83d\udc41',
  'eye_speech_bubble':'\ud83d\udc41&zwj;\ud83d\udde8',
  'eyeglasses':'\ud83d\udc53',
  'eyes':'\ud83d\udc40',
  'face_with_head_bandage':'\ud83e\udd15',
  'face_with_thermometer':'\ud83e\udd12',
  'fist_oncoming':'\ud83d\udc4a',
  'factory':'\ud83c\udfed',
  'fallen_leaf':'\ud83c\udf42',
  'family_man_woman_boy':'\ud83d\udc6a',
  'family_man_boy':'\ud83d\udc68&zwj;\ud83d\udc66',
  'family_man_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_girl':'\ud83d\udc68&zwj;\ud83d\udc67',
  'family_man_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_man_man_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66',
  'family_man_man_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_man_girl':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67',
  'family_man_man_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_man_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_man_woman_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_woman_girl':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
  'family_man_woman_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_woman_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_woman_boy':'\ud83d\udc69&zwj;\ud83d\udc66',
  'family_woman_boy_boy':'\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_woman_girl':'\ud83d\udc69&zwj;\ud83d\udc67',
  'family_woman_girl_boy':'\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_woman_girl_girl':'\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_woman_woman_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66',
  'family_woman_woman_boy_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_woman_woman_girl':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
  'family_woman_woman_girl_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_woman_woman_girl_girl':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'fast_forward':'\u23e9',
  'fax':'\ud83d\udce0',
  'fearful':'\ud83d\ude28',
  'feet':'\ud83d\udc3e',
  'female_detective':'\ud83d\udd75\ufe0f&zwj;\u2640\ufe0f',
  'ferris_wheel':'\ud83c\udfa1',
  'ferry':'\u26f4',
  'field_hockey':'\ud83c\udfd1',
  'file_cabinet':'\ud83d\uddc4',
  'file_folder':'\ud83d\udcc1',
  'film_projector':'\ud83d\udcfd',
  'film_strip':'\ud83c\udf9e',
  'fire':'\ud83d\udd25',
  'fire_engine':'\ud83d\ude92',
  'fireworks':'\ud83c\udf86',
  'first_quarter_moon':'\ud83c\udf13',
  'first_quarter_moon_with_face':'\ud83c\udf1b',
  'fish':'\ud83d\udc1f',
  'fish_cake':'\ud83c\udf65',
  'fishing_pole_and_fish':'\ud83c\udfa3',
  'fist_raised':'\u270a',
  'fist_left':'\ud83e\udd1b',
  'fist_right':'\ud83e\udd1c',
  'flags':'\ud83c\udf8f',
  'flashlight':'\ud83d\udd26',
  'fleur_de_lis':'\u269c\ufe0f',
  'flight_arrival':'\ud83d\udeec',
  'flight_departure':'\ud83d\udeeb',
  'floppy_disk':'\ud83d\udcbe',
  'flower_playing_cards':'\ud83c\udfb4',
  'flushed':'\ud83d\ude33',
  'fog':'\ud83c\udf2b',
  'foggy':'\ud83c\udf01',
  'football':'\ud83c\udfc8',
  'footprints':'\ud83d\udc63',
  'fork_and_knife':'\ud83c\udf74',
  'fountain':'\u26f2\ufe0f',
  'fountain_pen':'\ud83d\udd8b',
  'four_leaf_clover':'\ud83c\udf40',
  'fox_face':'\ud83e\udd8a',
  'framed_picture':'\ud83d\uddbc',
  'free':'\ud83c\udd93',
  'fried_egg':'\ud83c\udf73',
  'fried_shrimp':'\ud83c\udf64',
  'fries':'\ud83c\udf5f',
  'frog':'\ud83d\udc38',
  'frowning':'\ud83d\ude26',
  'frowning_face':'\u2639\ufe0f',
  'frowning_man':'\ud83d\ude4d&zwj;\u2642\ufe0f',
  'frowning_woman':'\ud83d\ude4d',
  'middle_finger':'\ud83d\udd95',
  'fuelpump':'\u26fd\ufe0f',
  'full_moon':'\ud83c\udf15',
  'full_moon_with_face':'\ud83c\udf1d',
  'funeral_urn':'\u26b1\ufe0f',
  'game_die':'\ud83c\udfb2',
  'gear':'\u2699\ufe0f',
  'gem':'\ud83d\udc8e',
  'gemini':'\u264a\ufe0f',
  'ghost':'\ud83d\udc7b',
  'gift':'\ud83c\udf81',
  'gift_heart':'\ud83d\udc9d',
  'girl':'\ud83d\udc67',
  'globe_with_meridians':'\ud83c\udf10',
  'goal_net':'\ud83e\udd45',
  'goat':'\ud83d\udc10',
  'golf':'\u26f3\ufe0f',
  'golfing_man':'\ud83c\udfcc\ufe0f',
  'golfing_woman':'\ud83c\udfcc\ufe0f&zwj;\u2640\ufe0f',
  'gorilla':'\ud83e\udd8d',
  'grapes':'\ud83c\udf47',
  'green_apple':'\ud83c\udf4f',
  'green_book':'\ud83d\udcd7',
  'green_heart':'\ud83d\udc9a',
  'green_salad':'\ud83e\udd57',
  'grey_exclamation':'\u2755',
  'grey_question':'\u2754',
  'grimacing':'\ud83d\ude2c',
  'grin':'\ud83d\ude01',
  'grinning':'\ud83d\ude00',
  'guardsman':'\ud83d\udc82',
  'guardswoman':'\ud83d\udc82&zwj;\u2640\ufe0f',
  'guitar':'\ud83c\udfb8',
  'gun':'\ud83d\udd2b',
  'haircut_woman':'\ud83d\udc87',
  'haircut_man':'\ud83d\udc87&zwj;\u2642\ufe0f',
  'hamburger':'\ud83c\udf54',
  'hammer':'\ud83d\udd28',
  'hammer_and_pick':'\u2692',
  'hammer_and_wrench':'\ud83d\udee0',
  'hamster':'\ud83d\udc39',
  'hand':'\u270b',
  'handbag':'\ud83d\udc5c',
  'handshake':'\ud83e\udd1d',
  'hankey':'\ud83d\udca9',
  'hatched_chick':'\ud83d\udc25',
  'hatching_chick':'\ud83d\udc23',
  'headphones':'\ud83c\udfa7',
  'hear_no_evil':'\ud83d\ude49',
  'heart':'\u2764\ufe0f',
  'heart_decoration':'\ud83d\udc9f',
  'heart_eyes':'\ud83d\ude0d',
  'heart_eyes_cat':'\ud83d\ude3b',
  'heartbeat':'\ud83d\udc93',
  'heartpulse':'\ud83d\udc97',
  'hearts':'\u2665\ufe0f',
  'heavy_check_mark':'\u2714\ufe0f',
  'heavy_division_sign':'\u2797',
  'heavy_dollar_sign':'\ud83d\udcb2',
  'heavy_heart_exclamation':'\u2763\ufe0f',
  'heavy_minus_sign':'\u2796',
  'heavy_multiplication_x':'\u2716\ufe0f',
  'heavy_plus_sign':'\u2795',
  'helicopter':'\ud83d\ude81',
  'herb':'\ud83c\udf3f',
  'hibiscus':'\ud83c\udf3a',
  'high_brightness':'\ud83d\udd06',
  'high_heel':'\ud83d\udc60',
  'hocho':'\ud83d\udd2a',
  'hole':'\ud83d\udd73',
  'honey_pot':'\ud83c\udf6f',
  'horse':'\ud83d\udc34',
  'horse_racing':'\ud83c\udfc7',
  'hospital':'\ud83c\udfe5',
  'hot_pepper':'\ud83c\udf36',
  'hotdog':'\ud83c\udf2d',
  'hotel':'\ud83c\udfe8',
  'hotsprings':'\u2668\ufe0f',
  'hourglass':'\u231b\ufe0f',
  'hourglass_flowing_sand':'\u23f3',
  'house':'\ud83c\udfe0',
  'house_with_garden':'\ud83c\udfe1',
  'houses':'\ud83c\udfd8',
  'hugs':'\ud83e\udd17',
  'hushed':'\ud83d\ude2f',
  'ice_cream':'\ud83c\udf68',
  'ice_hockey':'\ud83c\udfd2',
  'ice_skate':'\u26f8',
  'icecream':'\ud83c\udf66',
  'id':'\ud83c\udd94',
  'ideograph_advantage':'\ud83c\ude50',
  'imp':'\ud83d\udc7f',
  'inbox_tray':'\ud83d\udce5',
  'incoming_envelope':'\ud83d\udce8',
  'tipping_hand_woman':'\ud83d\udc81',
  'information_source':'\u2139\ufe0f',
  'innocent':'\ud83d\ude07',
  'interrobang':'\u2049\ufe0f',
  'iphone':'\ud83d\udcf1',
  'izakaya_lantern':'\ud83c\udfee',
  'jack_o_lantern':'\ud83c\udf83',
  'japan':'\ud83d\uddfe',
  'japanese_castle':'\ud83c\udfef',
  'japanese_goblin':'\ud83d\udc7a',
  'japanese_ogre':'\ud83d\udc79',
  'jeans':'\ud83d\udc56',
  'joy':'\ud83d\ude02',
  'joy_cat':'\ud83d\ude39',
  'joystick':'\ud83d\udd79',
  'kaaba':'\ud83d\udd4b',
  'key':'\ud83d\udd11',
  'keyboard':'\u2328\ufe0f',
  'keycap_ten':'\ud83d\udd1f',
  'kick_scooter':'\ud83d\udef4',
  'kimono':'\ud83d\udc58',
  'kiss':'\ud83d\udc8b',
  'kissing':'\ud83d\ude17',
  'kissing_cat':'\ud83d\ude3d',
  'kissing_closed_eyes':'\ud83d\ude1a',
  'kissing_heart':'\ud83d\ude18',
  'kissing_smiling_eyes':'\ud83d\ude19',
  'kiwi_fruit':'\ud83e\udd5d',
  'koala':'\ud83d\udc28',
  'koko':'\ud83c\ude01',
  'label':'\ud83c\udff7',
  'large_blue_circle':'\ud83d\udd35',
  'large_blue_diamond':'\ud83d\udd37',
  'large_orange_diamond':'\ud83d\udd36',
  'last_quarter_moon':'\ud83c\udf17',
  'last_quarter_moon_with_face':'\ud83c\udf1c',
  'latin_cross':'\u271d\ufe0f',
  'laughing':'\ud83d\ude06',
  'leaves':'\ud83c\udf43',
  'ledger':'\ud83d\udcd2',
  'left_luggage':'\ud83d\udec5',
  'left_right_arrow':'\u2194\ufe0f',
  'leftwards_arrow_with_hook':'\u21a9\ufe0f',
  'lemon':'\ud83c\udf4b',
  'leo':'\u264c\ufe0f',
  'leopard':'\ud83d\udc06',
  'level_slider':'\ud83c\udf9a',
  'libra':'\u264e\ufe0f',
  'light_rail':'\ud83d\ude88',
  'link':'\ud83d\udd17',
  'lion':'\ud83e\udd81',
  'lips':'\ud83d\udc44',
  'lipstick':'\ud83d\udc84',
  'lizard':'\ud83e\udd8e',
  'lock':'\ud83d\udd12',
  'lock_with_ink_pen':'\ud83d\udd0f',
  'lollipop':'\ud83c\udf6d',
  'loop':'\u27bf',
  'loud_sound':'\ud83d\udd0a',
  'loudspeaker':'\ud83d\udce2',
  'love_hotel':'\ud83c\udfe9',
  'love_letter':'\ud83d\udc8c',
  'low_brightness':'\ud83d\udd05',
  'lying_face':'\ud83e\udd25',
  'm':'\u24c2\ufe0f',
  'mag':'\ud83d\udd0d',
  'mag_right':'\ud83d\udd0e',
  'mahjong':'\ud83c\udc04\ufe0f',
  'mailbox':'\ud83d\udceb',
  'mailbox_closed':'\ud83d\udcea',
  'mailbox_with_mail':'\ud83d\udcec',
  'mailbox_with_no_mail':'\ud83d\udced',
  'man':'\ud83d\udc68',
  'man_artist':'\ud83d\udc68&zwj;\ud83c\udfa8',
  'man_astronaut':'\ud83d\udc68&zwj;\ud83d\ude80',
  'man_cartwheeling':'\ud83e\udd38&zwj;\u2642\ufe0f',
  'man_cook':'\ud83d\udc68&zwj;\ud83c\udf73',
  'man_dancing':'\ud83d\udd7a',
  'man_facepalming':'\ud83e\udd26&zwj;\u2642\ufe0f',
  'man_factory_worker':'\ud83d\udc68&zwj;\ud83c\udfed',
  'man_farmer':'\ud83d\udc68&zwj;\ud83c\udf3e',
  'man_firefighter':'\ud83d\udc68&zwj;\ud83d\ude92',
  'man_health_worker':'\ud83d\udc68&zwj;\u2695\ufe0f',
  'man_in_tuxedo':'\ud83e\udd35',
  'man_judge':'\ud83d\udc68&zwj;\u2696\ufe0f',
  'man_juggling':'\ud83e\udd39&zwj;\u2642\ufe0f',
  'man_mechanic':'\ud83d\udc68&zwj;\ud83d\udd27',
  'man_office_worker':'\ud83d\udc68&zwj;\ud83d\udcbc',
  'man_pilot':'\ud83d\udc68&zwj;\u2708\ufe0f',
  'man_playing_handball':'\ud83e\udd3e&zwj;\u2642\ufe0f',
  'man_playing_water_polo':'\ud83e\udd3d&zwj;\u2642\ufe0f',
  'man_scientist':'\ud83d\udc68&zwj;\ud83d\udd2c',
  'man_shrugging':'\ud83e\udd37&zwj;\u2642\ufe0f',
  'man_singer':'\ud83d\udc68&zwj;\ud83c\udfa4',
  'man_student':'\ud83d\udc68&zwj;\ud83c\udf93',
  'man_teacher':'\ud83d\udc68&zwj;\ud83c\udfeb',
  'man_technologist':'\ud83d\udc68&zwj;\ud83d\udcbb',
  'man_with_gua_pi_mao':'\ud83d\udc72',
  'man_with_turban':'\ud83d\udc73',
  'tangerine':'\ud83c\udf4a',
  'mans_shoe':'\ud83d\udc5e',
  'mantelpiece_clock':'\ud83d\udd70',
  'maple_leaf':'\ud83c\udf41',
  'martial_arts_uniform':'\ud83e\udd4b',
  'mask':'\ud83d\ude37',
  'massage_woman':'\ud83d\udc86',
  'massage_man':'\ud83d\udc86&zwj;\u2642\ufe0f',
  'meat_on_bone':'\ud83c\udf56',
  'medal_military':'\ud83c\udf96',
  'medal_sports':'\ud83c\udfc5',
  'mega':'\ud83d\udce3',
  'melon':'\ud83c\udf48',
  'memo':'\ud83d\udcdd',
  'men_wrestling':'\ud83e\udd3c&zwj;\u2642\ufe0f',
  'menorah':'\ud83d\udd4e',
  'mens':'\ud83d\udeb9',
  'metal':'\ud83e\udd18',
  'metro':'\ud83d\ude87',
  'microphone':'\ud83c\udfa4',
  'microscope':'\ud83d\udd2c',
  'milk_glass':'\ud83e\udd5b',
  'milky_way':'\ud83c\udf0c',
  'minibus':'\ud83d\ude90',
  'minidisc':'\ud83d\udcbd',
  'mobile_phone_off':'\ud83d\udcf4',
  'money_mouth_face':'\ud83e\udd11',
  'money_with_wings':'\ud83d\udcb8',
  'moneybag':'\ud83d\udcb0',
  'monkey':'\ud83d\udc12',
  'monkey_face':'\ud83d\udc35',
  'monorail':'\ud83d\ude9d',
  'moon':'\ud83c\udf14',
  'mortar_board':'\ud83c\udf93',
  'mosque':'\ud83d\udd4c',
  'motor_boat':'\ud83d\udee5',
  'motor_scooter':'\ud83d\udef5',
  'motorcycle':'\ud83c\udfcd',
  'motorway':'\ud83d\udee3',
  'mount_fuji':'\ud83d\uddfb',
  'mountain':'\u26f0',
  'mountain_biking_man':'\ud83d\udeb5',
  'mountain_biking_woman':'\ud83d\udeb5&zwj;\u2640\ufe0f',
  'mountain_cableway':'\ud83d\udea0',
  'mountain_railway':'\ud83d\ude9e',
  'mountain_snow':'\ud83c\udfd4',
  'mouse':'\ud83d\udc2d',
  'mouse2':'\ud83d\udc01',
  'movie_camera':'\ud83c\udfa5',
  'moyai':'\ud83d\uddff',
  'mrs_claus':'\ud83e\udd36',
  'muscle':'\ud83d\udcaa',
  'mushroom':'\ud83c\udf44',
  'musical_keyboard':'\ud83c\udfb9',
  'musical_note':'\ud83c\udfb5',
  'musical_score':'\ud83c\udfbc',
  'mute':'\ud83d\udd07',
  'nail_care':'\ud83d\udc85',
  'name_badge':'\ud83d\udcdb',
  'national_park':'\ud83c\udfde',
  'nauseated_face':'\ud83e\udd22',
  'necktie':'\ud83d\udc54',
  'negative_squared_cross_mark':'\u274e',
  'nerd_face':'\ud83e\udd13',
  'neutral_face':'\ud83d\ude10',
  'new':'\ud83c\udd95',
  'new_moon':'\ud83c\udf11',
  'new_moon_with_face':'\ud83c\udf1a',
  'newspaper':'\ud83d\udcf0',
  'newspaper_roll':'\ud83d\uddde',
  'next_track_button':'\u23ed',
  'ng':'\ud83c\udd96',
  'no_good_man':'\ud83d\ude45&zwj;\u2642\ufe0f',
  'no_good_woman':'\ud83d\ude45',
  'night_with_stars':'\ud83c\udf03',
  'no_bell':'\ud83d\udd15',
  'no_bicycles':'\ud83d\udeb3',
  'no_entry':'\u26d4\ufe0f',
  'no_entry_sign':'\ud83d\udeab',
  'no_mobile_phones':'\ud83d\udcf5',
  'no_mouth':'\ud83d\ude36',
  'no_pedestrians':'\ud83d\udeb7',
  'no_smoking':'\ud83d\udead',
  'non-potable_water':'\ud83d\udeb1',
  'nose':'\ud83d\udc43',
  'notebook':'\ud83d\udcd3',
  'notebook_with_decorative_cover':'\ud83d\udcd4',
  'notes':'\ud83c\udfb6',
  'nut_and_bolt':'\ud83d\udd29',
  'o':'\u2b55\ufe0f',
  'o2':'\ud83c\udd7e\ufe0f',
  'ocean':'\ud83c\udf0a',
  'octopus':'\ud83d\udc19',
  'oden':'\ud83c\udf62',
  'office':'\ud83c\udfe2',
  'oil_drum':'\ud83d\udee2',
  'ok':'\ud83c\udd97',
  'ok_hand':'\ud83d\udc4c',
  'ok_man':'\ud83d\ude46&zwj;\u2642\ufe0f',
  'ok_woman':'\ud83d\ude46',
  'old_key':'\ud83d\udddd',
  'older_man':'\ud83d\udc74',
  'older_woman':'\ud83d\udc75',
  'om':'\ud83d\udd49',
  'on':'\ud83d\udd1b',
  'oncoming_automobile':'\ud83d\ude98',
  'oncoming_bus':'\ud83d\ude8d',
  'oncoming_police_car':'\ud83d\ude94',
  'oncoming_taxi':'\ud83d\ude96',
  'open_file_folder':'\ud83d\udcc2',
  'open_hands':'\ud83d\udc50',
  'open_mouth':'\ud83d\ude2e',
  'open_umbrella':'\u2602\ufe0f',
  'ophiuchus':'\u26ce',
  'orange_book':'\ud83d\udcd9',
  'orthodox_cross':'\u2626\ufe0f',
  'outbox_tray':'\ud83d\udce4',
  'owl':'\ud83e\udd89',
  'ox':'\ud83d\udc02',
  'package':'\ud83d\udce6',
  'page_facing_up':'\ud83d\udcc4',
  'page_with_curl':'\ud83d\udcc3',
  'pager':'\ud83d\udcdf',
  'paintbrush':'\ud83d\udd8c',
  'palm_tree':'\ud83c\udf34',
  'pancakes':'\ud83e\udd5e',
  'panda_face':'\ud83d\udc3c',
  'paperclip':'\ud83d\udcce',
  'paperclips':'\ud83d\udd87',
  'parasol_on_ground':'\u26f1',
  'parking':'\ud83c\udd7f\ufe0f',
  'part_alternation_mark':'\u303d\ufe0f',
  'partly_sunny':'\u26c5\ufe0f',
  'passenger_ship':'\ud83d\udef3',
  'passport_control':'\ud83d\udec2',
  'pause_button':'\u23f8',
  'peace_symbol':'\u262e\ufe0f',
  'peach':'\ud83c\udf51',
  'peanuts':'\ud83e\udd5c',
  'pear':'\ud83c\udf50',
  'pen':'\ud83d\udd8a',
  'pencil2':'\u270f\ufe0f',
  'penguin':'\ud83d\udc27',
  'pensive':'\ud83d\ude14',
  'performing_arts':'\ud83c\udfad',
  'persevere':'\ud83d\ude23',
  'person_fencing':'\ud83e\udd3a',
  'pouting_woman':'\ud83d\ude4e',
  'phone':'\u260e\ufe0f',
  'pick':'\u26cf',
  'pig':'\ud83d\udc37',
  'pig2':'\ud83d\udc16',
  'pig_nose':'\ud83d\udc3d',
  'pill':'\ud83d\udc8a',
  'pineapple':'\ud83c\udf4d',
  'ping_pong':'\ud83c\udfd3',
  'pisces':'\u2653\ufe0f',
  'pizza':'\ud83c\udf55',
  'place_of_worship':'\ud83d\uded0',
  'plate_with_cutlery':'\ud83c\udf7d',
  'play_or_pause_button':'\u23ef',
  'point_down':'\ud83d\udc47',
  'point_left':'\ud83d\udc48',
  'point_right':'\ud83d\udc49',
  'point_up':'\u261d\ufe0f',
  'point_up_2':'\ud83d\udc46',
  'police_car':'\ud83d\ude93',
  'policewoman':'\ud83d\udc6e&zwj;\u2640\ufe0f',
  'poodle':'\ud83d\udc29',
  'popcorn':'\ud83c\udf7f',
  'post_office':'\ud83c\udfe3',
  'postal_horn':'\ud83d\udcef',
  'postbox':'\ud83d\udcee',
  'potable_water':'\ud83d\udeb0',
  'potato':'\ud83e\udd54',
  'pouch':'\ud83d\udc5d',
  'poultry_leg':'\ud83c\udf57',
  'pound':'\ud83d\udcb7',
  'rage':'\ud83d\ude21',
  'pouting_cat':'\ud83d\ude3e',
  'pouting_man':'\ud83d\ude4e&zwj;\u2642\ufe0f',
  'pray':'\ud83d\ude4f',
  'prayer_beads':'\ud83d\udcff',
  'pregnant_woman':'\ud83e\udd30',
  'previous_track_button':'\u23ee',
  'prince':'\ud83e\udd34',
  'princess':'\ud83d\udc78',
  'printer':'\ud83d\udda8',
  'purple_heart':'\ud83d\udc9c',
  'purse':'\ud83d\udc5b',
  'pushpin':'\ud83d\udccc',
  'put_litter_in_its_place':'\ud83d\udeae',
  'question':'\u2753',
  'rabbit':'\ud83d\udc30',
  'rabbit2':'\ud83d\udc07',
  'racehorse':'\ud83d\udc0e',
  'racing_car':'\ud83c\udfce',
  'radio':'\ud83d\udcfb',
  'radio_button':'\ud83d\udd18',
  'radioactive':'\u2622\ufe0f',
  'railway_car':'\ud83d\ude83',
  'railway_track':'\ud83d\udee4',
  'rainbow':'\ud83c\udf08',
  'rainbow_flag':'\ud83c\udff3\ufe0f&zwj;\ud83c\udf08',
  'raised_back_of_hand':'\ud83e\udd1a',
  'raised_hand_with_fingers_splayed':'\ud83d\udd90',
  'raised_hands':'\ud83d\ude4c',
  'raising_hand_woman':'\ud83d\ude4b',
  'raising_hand_man':'\ud83d\ude4b&zwj;\u2642\ufe0f',
  'ram':'\ud83d\udc0f',
  'ramen':'\ud83c\udf5c',
  'rat':'\ud83d\udc00',
  'record_button':'\u23fa',
  'recycle':'\u267b\ufe0f',
  'red_circle':'\ud83d\udd34',
  'registered':'\u00ae\ufe0f',
  'relaxed':'\u263a\ufe0f',
  'relieved':'\ud83d\ude0c',
  'reminder_ribbon':'\ud83c\udf97',
  'repeat':'\ud83d\udd01',
  'repeat_one':'\ud83d\udd02',
  'rescue_worker_helmet':'\u26d1',
  'restroom':'\ud83d\udebb',
  'revolving_hearts':'\ud83d\udc9e',
  'rewind':'\u23ea',
  'rhinoceros':'\ud83e\udd8f',
  'ribbon':'\ud83c\udf80',
  'rice':'\ud83c\udf5a',
  'rice_ball':'\ud83c\udf59',
  'rice_cracker':'\ud83c\udf58',
  'rice_scene':'\ud83c\udf91',
  'right_anger_bubble':'\ud83d\uddef',
  'ring':'\ud83d\udc8d',
  'robot':'\ud83e\udd16',
  'rocket':'\ud83d\ude80',
  'rofl':'\ud83e\udd23',
  'roll_eyes':'\ud83d\ude44',
  'roller_coaster':'\ud83c\udfa2',
  'rooster':'\ud83d\udc13',
  'rose':'\ud83c\udf39',
  'rosette':'\ud83c\udff5',
  'rotating_light':'\ud83d\udea8',
  'round_pushpin':'\ud83d\udccd',
  'rowing_man':'\ud83d\udea3',
  'rowing_woman':'\ud83d\udea3&zwj;\u2640\ufe0f',
  'rugby_football':'\ud83c\udfc9',
  'running_man':'\ud83c\udfc3',
  'running_shirt_with_sash':'\ud83c\udfbd',
  'running_woman':'\ud83c\udfc3&zwj;\u2640\ufe0f',
  'sa':'\ud83c\ude02\ufe0f',
  'sagittarius':'\u2650\ufe0f',
  'sake':'\ud83c\udf76',
  'sandal':'\ud83d\udc61',
  'santa':'\ud83c\udf85',
  'satellite':'\ud83d\udce1',
  'saxophone':'\ud83c\udfb7',
  'school':'\ud83c\udfeb',
  'school_satchel':'\ud83c\udf92',
  'scissors':'\u2702\ufe0f',
  'scorpion':'\ud83e\udd82',
  'scorpius':'\u264f\ufe0f',
  'scream':'\ud83d\ude31',
  'scream_cat':'\ud83d\ude40',
  'scroll':'\ud83d\udcdc',
  'seat':'\ud83d\udcba',
  'secret':'\u3299\ufe0f',
  'see_no_evil':'\ud83d\ude48',
  'seedling':'\ud83c\udf31',
  'selfie':'\ud83e\udd33',
  'shallow_pan_of_food':'\ud83e\udd58',
  'shamrock':'\u2618\ufe0f',
  'shark':'\ud83e\udd88',
  'shaved_ice':'\ud83c\udf67',
  'sheep':'\ud83d\udc11',
  'shell':'\ud83d\udc1a',
  'shield':'\ud83d\udee1',
  'shinto_shrine':'\u26e9',
  'ship':'\ud83d\udea2',
  'shirt':'\ud83d\udc55',
  'shopping':'\ud83d\udecd',
  'shopping_cart':'\ud83d\uded2',
  'shower':'\ud83d\udebf',
  'shrimp':'\ud83e\udd90',
  'signal_strength':'\ud83d\udcf6',
  'six_pointed_star':'\ud83d\udd2f',
  'ski':'\ud83c\udfbf',
  'skier':'\u26f7',
  'skull':'\ud83d\udc80',
  'skull_and_crossbones':'\u2620\ufe0f',
  'sleeping':'\ud83d\ude34',
  'sleeping_bed':'\ud83d\udecc',
  'sleepy':'\ud83d\ude2a',
  'slightly_frowning_face':'\ud83d\ude41',
  'slightly_smiling_face':'\ud83d\ude42',
  'slot_machine':'\ud83c\udfb0',
  'small_airplane':'\ud83d\udee9',
  'small_blue_diamond':'\ud83d\udd39',
  'small_orange_diamond':'\ud83d\udd38',
  'small_red_triangle':'\ud83d\udd3a',
  'small_red_triangle_down':'\ud83d\udd3b',
  'smile':'\ud83d\ude04',
  'smile_cat':'\ud83d\ude38',
  'smiley':'\ud83d\ude03',
  'smiley_cat':'\ud83d\ude3a',
  'smiling_imp':'\ud83d\ude08',
  'smirk':'\ud83d\ude0f',
  'smirk_cat':'\ud83d\ude3c',
  'smoking':'\ud83d\udeac',
  'snail':'\ud83d\udc0c',
  'snake':'\ud83d\udc0d',
  'sneezing_face':'\ud83e\udd27',
  'snowboarder':'\ud83c\udfc2',
  'snowflake':'\u2744\ufe0f',
  'snowman':'\u26c4\ufe0f',
  'snowman_with_snow':'\u2603\ufe0f',
  'sob':'\ud83d\ude2d',
  'soccer':'\u26bd\ufe0f',
  'soon':'\ud83d\udd1c',
  'sos':'\ud83c\udd98',
  'sound':'\ud83d\udd09',
  'space_invader':'\ud83d\udc7e',
  'spades':'\u2660\ufe0f',
  'spaghetti':'\ud83c\udf5d',
  'sparkle':'\u2747\ufe0f',
  'sparkler':'\ud83c\udf87',
  'sparkles':'\u2728',
  'sparkling_heart':'\ud83d\udc96',
  'speak_no_evil':'\ud83d\ude4a',
  'speaker':'\ud83d\udd08',
  'speaking_head':'\ud83d\udde3',
  'speech_balloon':'\ud83d\udcac',
  'speedboat':'\ud83d\udea4',
  'spider':'\ud83d\udd77',
  'spider_web':'\ud83d\udd78',
  'spiral_calendar':'\ud83d\uddd3',
  'spiral_notepad':'\ud83d\uddd2',
  'spoon':'\ud83e\udd44',
  'squid':'\ud83e\udd91',
  'stadium':'\ud83c\udfdf',
  'star':'\u2b50\ufe0f',
  'star2':'\ud83c\udf1f',
  'star_and_crescent':'\u262a\ufe0f',
  'star_of_david':'\u2721\ufe0f',
  'stars':'\ud83c\udf20',
  'station':'\ud83d\ude89',
  'statue_of_liberty':'\ud83d\uddfd',
  'steam_locomotive':'\ud83d\ude82',
  'stew':'\ud83c\udf72',
  'stop_button':'\u23f9',
  'stop_sign':'\ud83d\uded1',
  'stopwatch':'\u23f1',
  'straight_ruler':'\ud83d\udccf',
  'strawberry':'\ud83c\udf53',
  'stuck_out_tongue':'\ud83d\ude1b',
  'stuck_out_tongue_closed_eyes':'\ud83d\ude1d',
  'stuck_out_tongue_winking_eye':'\ud83d\ude1c',
  'studio_microphone':'\ud83c\udf99',
  'stuffed_flatbread':'\ud83e\udd59',
  'sun_behind_large_cloud':'\ud83c\udf25',
  'sun_behind_rain_cloud':'\ud83c\udf26',
  'sun_behind_small_cloud':'\ud83c\udf24',
  'sun_with_face':'\ud83c\udf1e',
  'sunflower':'\ud83c\udf3b',
  'sunglasses':'\ud83d\ude0e',
  'sunny':'\u2600\ufe0f',
  'sunrise':'\ud83c\udf05',
  'sunrise_over_mountains':'\ud83c\udf04',
  'surfing_man':'\ud83c\udfc4',
  'surfing_woman':'\ud83c\udfc4&zwj;\u2640\ufe0f',
  'sushi':'\ud83c\udf63',
  'suspension_railway':'\ud83d\ude9f',
  'sweat':'\ud83d\ude13',
  'sweat_drops':'\ud83d\udca6',
  'sweat_smile':'\ud83d\ude05',
  'sweet_potato':'\ud83c\udf60',
  'swimming_man':'\ud83c\udfca',
  'swimming_woman':'\ud83c\udfca&zwj;\u2640\ufe0f',
  'symbols':'\ud83d\udd23',
  'synagogue':'\ud83d\udd4d',
  'syringe':'\ud83d\udc89',
  'taco':'\ud83c\udf2e',
  'tada':'\ud83c\udf89',
  'tanabata_tree':'\ud83c\udf8b',
  'taurus':'\u2649\ufe0f',
  'taxi':'\ud83d\ude95',
  'tea':'\ud83c\udf75',
  'telephone_receiver':'\ud83d\udcde',
  'telescope':'\ud83d\udd2d',
  'tennis':'\ud83c\udfbe',
  'tent':'\u26fa\ufe0f',
  'thermometer':'\ud83c\udf21',
  'thinking':'\ud83e\udd14',
  'thought_balloon':'\ud83d\udcad',
  'ticket':'\ud83c\udfab',
  'tickets':'\ud83c\udf9f',
  'tiger':'\ud83d\udc2f',
  'tiger2':'\ud83d\udc05',
  'timer_clock':'\u23f2',
  'tipping_hand_man':'\ud83d\udc81&zwj;\u2642\ufe0f',
  'tired_face':'\ud83d\ude2b',
  'tm':'\u2122\ufe0f',
  'toilet':'\ud83d\udebd',
  'tokyo_tower':'\ud83d\uddfc',
  'tomato':'\ud83c\udf45',
  'tongue':'\ud83d\udc45',
  'top':'\ud83d\udd1d',
  'tophat':'\ud83c\udfa9',
  'tornado':'\ud83c\udf2a',
  'trackball':'\ud83d\uddb2',
  'tractor':'\ud83d\ude9c',
  'traffic_light':'\ud83d\udea5',
  'train':'\ud83d\ude8b',
  'train2':'\ud83d\ude86',
  'tram':'\ud83d\ude8a',
  'triangular_flag_on_post':'\ud83d\udea9',
  'triangular_ruler':'\ud83d\udcd0',
  'trident':'\ud83d\udd31',
  'triumph':'\ud83d\ude24',
  'trolleybus':'\ud83d\ude8e',
  'trophy':'\ud83c\udfc6',
  'tropical_drink':'\ud83c\udf79',
  'tropical_fish':'\ud83d\udc20',
  'truck':'\ud83d\ude9a',
  'trumpet':'\ud83c\udfba',
  'tulip':'\ud83c\udf37',
  'tumbler_glass':'\ud83e\udd43',
  'turkey':'\ud83e\udd83',
  'turtle':'\ud83d\udc22',
  'tv':'\ud83d\udcfa',
  'twisted_rightwards_arrows':'\ud83d\udd00',
  'two_hearts':'\ud83d\udc95',
  'two_men_holding_hands':'\ud83d\udc6c',
  'two_women_holding_hands':'\ud83d\udc6d',
  'u5272':'\ud83c\ude39',
  'u5408':'\ud83c\ude34',
  'u55b6':'\ud83c\ude3a',
  'u6307':'\ud83c\ude2f\ufe0f',
  'u6708':'\ud83c\ude37\ufe0f',
  'u6709':'\ud83c\ude36',
  'u6e80':'\ud83c\ude35',
  'u7121':'\ud83c\ude1a\ufe0f',
  'u7533':'\ud83c\ude38',
  'u7981':'\ud83c\ude32',
  'u7a7a':'\ud83c\ude33',
  'umbrella':'\u2614\ufe0f',
  'unamused':'\ud83d\ude12',
  'underage':'\ud83d\udd1e',
  'unicorn':'\ud83e\udd84',
  'unlock':'\ud83d\udd13',
  'up':'\ud83c\udd99',
  'upside_down_face':'\ud83d\ude43',
  'v':'\u270c\ufe0f',
  'vertical_traffic_light':'\ud83d\udea6',
  'vhs':'\ud83d\udcfc',
  'vibration_mode':'\ud83d\udcf3',
  'video_camera':'\ud83d\udcf9',
  'video_game':'\ud83c\udfae',
  'violin':'\ud83c\udfbb',
  'virgo':'\u264d\ufe0f',
  'volcano':'\ud83c\udf0b',
  'volleyball':'\ud83c\udfd0',
  'vs':'\ud83c\udd9a',
  'vulcan_salute':'\ud83d\udd96',
  'walking_man':'\ud83d\udeb6',
  'walking_woman':'\ud83d\udeb6&zwj;\u2640\ufe0f',
  'waning_crescent_moon':'\ud83c\udf18',
  'waning_gibbous_moon':'\ud83c\udf16',
  'warning':'\u26a0\ufe0f',
  'wastebasket':'\ud83d\uddd1',
  'watch':'\u231a\ufe0f',
  'water_buffalo':'\ud83d\udc03',
  'watermelon':'\ud83c\udf49',
  'wave':'\ud83d\udc4b',
  'wavy_dash':'\u3030\ufe0f',
  'waxing_crescent_moon':'\ud83c\udf12',
  'wc':'\ud83d\udebe',
  'weary':'\ud83d\ude29',
  'wedding':'\ud83d\udc92',
  'weight_lifting_man':'\ud83c\udfcb\ufe0f',
  'weight_lifting_woman':'\ud83c\udfcb\ufe0f&zwj;\u2640\ufe0f',
  'whale':'\ud83d\udc33',
  'whale2':'\ud83d\udc0b',
  'wheel_of_dharma':'\u2638\ufe0f',
  'wheelchair':'\u267f\ufe0f',
  'white_check_mark':'\u2705',
  'white_circle':'\u26aa\ufe0f',
  'white_flag':'\ud83c\udff3\ufe0f',
  'white_flower':'\ud83d\udcae',
  'white_large_square':'\u2b1c\ufe0f',
  'white_medium_small_square':'\u25fd\ufe0f',
  'white_medium_square':'\u25fb\ufe0f',
  'white_small_square':'\u25ab\ufe0f',
  'white_square_button':'\ud83d\udd33',
  'wilted_flower':'\ud83e\udd40',
  'wind_chime':'\ud83c\udf90',
  'wind_face':'\ud83c\udf2c',
  'wine_glass':'\ud83c\udf77',
  'wink':'\ud83d\ude09',
  'wolf':'\ud83d\udc3a',
  'woman':'\ud83d\udc69',
  'woman_artist':'\ud83d\udc69&zwj;\ud83c\udfa8',
  'woman_astronaut':'\ud83d\udc69&zwj;\ud83d\ude80',
  'woman_cartwheeling':'\ud83e\udd38&zwj;\u2640\ufe0f',
  'woman_cook':'\ud83d\udc69&zwj;\ud83c\udf73',
  'woman_facepalming':'\ud83e\udd26&zwj;\u2640\ufe0f',
  'woman_factory_worker':'\ud83d\udc69&zwj;\ud83c\udfed',
  'woman_farmer':'\ud83d\udc69&zwj;\ud83c\udf3e',
  'woman_firefighter':'\ud83d\udc69&zwj;\ud83d\ude92',
  'woman_health_worker':'\ud83d\udc69&zwj;\u2695\ufe0f',
  'woman_judge':'\ud83d\udc69&zwj;\u2696\ufe0f',
  'woman_juggling':'\ud83e\udd39&zwj;\u2640\ufe0f',
  'woman_mechanic':'\ud83d\udc69&zwj;\ud83d\udd27',
  'woman_office_worker':'\ud83d\udc69&zwj;\ud83d\udcbc',
  'woman_pilot':'\ud83d\udc69&zwj;\u2708\ufe0f',
  'woman_playing_handball':'\ud83e\udd3e&zwj;\u2640\ufe0f',
  'woman_playing_water_polo':'\ud83e\udd3d&zwj;\u2640\ufe0f',
  'woman_scientist':'\ud83d\udc69&zwj;\ud83d\udd2c',
  'woman_shrugging':'\ud83e\udd37&zwj;\u2640\ufe0f',
  'woman_singer':'\ud83d\udc69&zwj;\ud83c\udfa4',
  'woman_student':'\ud83d\udc69&zwj;\ud83c\udf93',
  'woman_teacher':'\ud83d\udc69&zwj;\ud83c\udfeb',
  'woman_technologist':'\ud83d\udc69&zwj;\ud83d\udcbb',
  'woman_with_turban':'\ud83d\udc73&zwj;\u2640\ufe0f',
  'womans_clothes':'\ud83d\udc5a',
  'womans_hat':'\ud83d\udc52',
  'women_wrestling':'\ud83e\udd3c&zwj;\u2640\ufe0f',
  'womens':'\ud83d\udeba',
  'world_map':'\ud83d\uddfa',
  'worried':'\ud83d\ude1f',
  'wrench':'\ud83d\udd27',
  'writing_hand':'\u270d\ufe0f',
  'x':'\u274c',
  'yellow_heart':'\ud83d\udc9b',
  'yen':'\ud83d\udcb4',
  'yin_yang':'\u262f\ufe0f',
  'yum':'\ud83d\ude0b',
  'zap':'\u26a1\ufe0f',
  'zipper_mouth_face':'\ud83e\udd10',
  'zzz':'\ud83d\udca4',

  /* special emojis :P */
  'octocat':  '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
  'showdown': '<span style="font-family: \'Anonymous Pro\', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>'
};

/**
 * Created by Estevao on 31-05-2015.
 */

/**
 * Showdown Converter class
 * @class
 * @param {object} [converterOptions]
 * @returns {Converter}
 */
showdown.Converter = function (converterOptions) {
  'use strict';

  var
      /**
       * Options used by this converter
       * @private
       * @type {{}}
       */
      options = {},

      /**
       * Language extensions used by this converter
       * @private
       * @type {Array}
       */
      langExtensions = [],

      /**
       * Output modifiers extensions used by this converter
       * @private
       * @type {Array}
       */
      outputModifiers = [],

      /**
       * Event listeners
       * @private
       * @type {{}}
       */
      listeners = {},

      /**
       * The flavor set in this converter
       */
      setConvFlavor = setFlavor,

      /**
       * Metadata of the document
       * @type {{parsed: {}, raw: string, format: string}}
       */
      metadata = {
        parsed: {},
        raw: '',
        format: ''
      };

  _constructor();

  /**
   * Converter constructor
   * @private
   */
  function _constructor () {
    converterOptions = converterOptions || {};

    for (var gOpt in globalOptions) {
      if (globalOptions.hasOwnProperty(gOpt)) {
        options[gOpt] = globalOptions[gOpt];
      }
    }

    // Merge options
    if (typeof converterOptions === 'object') {
      for (var opt in converterOptions) {
        if (converterOptions.hasOwnProperty(opt)) {
          options[opt] = converterOptions[opt];
        }
      }
    } else {
      throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions +
      ' was passed instead.');
    }

    if (options.extensions) {
      showdown.helper.forEach(options.extensions, _parseExtension);
    }
  }

  /**
   * Parse extension
   * @param {*} ext
   * @param {string} [name='']
   * @private
   */
  function _parseExtension (ext, name) {

    name = name || null;
    // If it's a string, the extension was previously loaded
    if (showdown.helper.isString(ext)) {
      ext = showdown.helper.stdExtName(ext);
      name = ext;

      // LEGACY_SUPPORT CODE
      if (showdown.extensions[ext]) {
        console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' +
          'Please inform the developer that the extension should be updated!');
        legacyExtensionLoading(showdown.extensions[ext], ext);
        return;
        // END LEGACY SUPPORT CODE

      } else if (!showdown.helper.isUndefined(extensions[ext])) {
        ext = extensions[ext];

      } else {
        throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
      }
    }

    if (typeof ext === 'function') {
      ext = ext();
    }

    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExt = validate(ext, name);
    if (!validExt.valid) {
      throw Error(validExt.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {

        case 'lang':
          langExtensions.push(ext[i]);
          break;

        case 'output':
          outputModifiers.push(ext[i]);
          break;
      }
      if (ext[i].hasOwnProperty('listeners')) {
        for (var ln in ext[i].listeners) {
          if (ext[i].listeners.hasOwnProperty(ln)) {
            listen(ln, ext[i].listeners[ln]);
          }
        }
      }
    }

  }

  /**
   * LEGACY_SUPPORT
   * @param {*} ext
   * @param {string} name
   */
  function legacyExtensionLoading (ext, name) {
    if (typeof ext === 'function') {
      ext = ext(new showdown.Converter());
    }
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }
    var valid = validate(ext, name);

    if (!valid.valid) {
      throw Error(valid.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {
        case 'lang':
          langExtensions.push(ext[i]);
          break;
        case 'output':
          outputModifiers.push(ext[i]);
          break;
        default:// should never reach here
          throw Error('Extension loader error: Type unrecognized!!!');
      }
    }
  }

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   */
  function listen (name, callback) {
    if (!showdown.helper.isString(name)) {
      throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
    }

    if (typeof callback !== 'function') {
      throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
    }

    if (!listeners.hasOwnProperty(name)) {
      listeners[name] = [];
    }
    listeners[name].push(callback);
  }

  function rTrimInputText (text) {
    var rsp = text.match(/^\s*/)[0].length,
        rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
    return text.replace(rgx, '');
  }

  /**
   * Dispatch an event
   * @private
   * @param {string} evtName Event name
   * @param {string} text Text
   * @param {{}} options Converter Options
   * @param {{}} globals
   * @returns {string}
   */
  this._dispatch = function dispatch (evtName, text, options, globals) {
    if (listeners.hasOwnProperty(evtName)) {
      for (var ei = 0; ei < listeners[evtName].length; ++ei) {
        var nText = listeners[evtName][ei](evtName, text, this, options, globals);
        if (nText && typeof nText !== 'undefined') {
          text = nText;
        }
      }
    }
    return text;
  };

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   * @returns {showdown.Converter}
   */
  this.listen = function (name, callback) {
    listen(name, callback);
    return this;
  };

  /**
   * Converts a markdown string into HTML
   * @param {string} text
   * @returns {*}
   */
  this.makeHtml = function (text) {
    //check if text is not falsy
    if (!text) {
      return text;
    }

    var globals = {
      gHtmlBlocks:     [],
      gHtmlMdBlocks:   [],
      gHtmlSpans:      [],
      gUrls:           {},
      gTitles:         {},
      gDimensions:     {},
      gListLevel:      0,
      hashLinkCounts:  {},
      langExtensions:  langExtensions,
      outputModifiers: outputModifiers,
      converter:       this,
      ghCodeBlocks:    [],
      metadata: {
        parsed: {},
        raw: '',
        format: ''
      }
    };

    // This lets us use ¨ trema as an escape char to avoid md5 hashes
    // The choice of character is arbitrary; anything that isn't
    // magic in Markdown will work.
    text = text.replace(/¨/g, '¨T');

    // Replace $ with ¨D
    // RegExp interprets $ as a special character
    // when it's in a replacement string
    text = text.replace(/\$/g, '¨D');

    // Standardize line endings
    text = text.replace(/\r\n/g, '\n'); // DOS to Unix
    text = text.replace(/\r/g, '\n'); // Mac to Unix

    // Stardardize line spaces
    text = text.replace(/\u00A0/g, '&nbsp;');

    if (options.smartIndentationFix) {
      text = rTrimInputText(text);
    }

    // Make sure text begins and ends with a couple of newlines:
    text = '\n\n' + text + '\n\n';

    // detab
    text = showdown.subParser('detab')(text, options, globals);

    /**
     * Strip any lines consisting only of spaces and tabs.
     * This makes subsequent regexs easier to write, because we can
     * match consecutive blank lines with /\n+/ instead of something
     * contorted like /[ \t]*\n+/
     */
    text = text.replace(/^[ \t]+$/mg, '');

    //run languageExtensions
    showdown.helper.forEach(langExtensions, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // run the sub parsers
    text = showdown.subParser('metadata')(text, options, globals);
    text = showdown.subParser('hashPreCodeTags')(text, options, globals);
    text = showdown.subParser('githubCodeBlocks')(text, options, globals);
    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
    text = showdown.subParser('hashCodeTags')(text, options, globals);
    text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
    text = showdown.subParser('blockGamut')(text, options, globals);
    text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
    text = showdown.subParser('unescapeSpecialChars')(text, options, globals);

    // attacklab: Restore dollar signs
    text = text.replace(/¨D/g, '$$');

    // attacklab: Restore tremas
    text = text.replace(/¨T/g, '¨');

    // render a complete html document instead of a partial if the option is enabled
    text = showdown.subParser('completeHTMLDocument')(text, options, globals);

    // Run output modifiers
    showdown.helper.forEach(outputModifiers, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // update metadata
    metadata = globals.metadata;
    return text;
  };

  /**
   * Converts an HTML string into a markdown string
   * @param src
   * @param [HTMLParser] A WHATWG DOM and HTML parser, such as JSDOM. If none is supplied, window.document will be used.
   * @returns {string}
   */
  this.makeMarkdown = this.makeMd = function (src, HTMLParser) {

    // replace \r\n with \n
    src = src.replace(/\r\n/g, '\n');
    src = src.replace(/\r/g, '\n'); // old macs

    // due to an edge case, we need to find this: > <
    // to prevent removing of non silent white spaces
    // ex: <em>this is</em> <strong>sparta</strong>
    src = src.replace(/>[ \t]+</, '>¨NBSP;<');

    if (!HTMLParser) {
      if (window && window.document) {
        HTMLParser = window.document;
      } else {
        throw new Error('HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM');
      }
    }

    var doc = HTMLParser.createElement('div');
    doc.innerHTML = src;

    var globals = {
      preList: substitutePreCodeTags(doc)
    };

    // remove all newlines and collapse spaces
    clean(doc);

    // some stuff, like accidental reference links must now be escaped
    // TODO
    // doc.innerHTML = doc.innerHTML.replace(/\[[\S\t ]]/);

    var nodes = doc.childNodes,
        mdDoc = '';

    for (var i = 0; i < nodes.length; i++) {
      mdDoc += showdown.subParser('makeMarkdown.node')(nodes[i], globals);
    }

    function clean (node) {
      for (var n = 0; n < node.childNodes.length; ++n) {
        var child = node.childNodes[n];
        if (child.nodeType === 3) {
          if (!/\S/.test(child.nodeValue) && !/^[ ]+$/.test(child.nodeValue)) {
            node.removeChild(child);
            --n;
          } else {
            child.nodeValue = child.nodeValue.split('\n').join(' ');
            child.nodeValue = child.nodeValue.replace(/(\s)+/g, '$1');
          }
        } else if (child.nodeType === 1) {
          clean(child);
        }
      }
    }

    // find all pre tags and replace contents with placeholder
    // we need this so that we can remove all indentation from html
    // to ease up parsing
    function substitutePreCodeTags (doc) {

      var pres = doc.querySelectorAll('pre'),
          presPH = [];

      for (var i = 0; i < pres.length; ++i) {

        if (pres[i].childElementCount === 1 && pres[i].firstChild.tagName.toLowerCase() === 'code') {
          var content = pres[i].firstChild.innerHTML.trim(),
              language = pres[i].firstChild.getAttribute('data-language') || '';

          // if data-language attribute is not defined, then we look for class language-*
          if (language === '') {
            var classes = pres[i].firstChild.className.split(' ');
            for (var c = 0; c < classes.length; ++c) {
              var matches = classes[c].match(/^language-(.+)$/);
              if (matches !== null) {
                language = matches[1];
                break;
              }
            }
          }

          // unescape html entities in content
          content = showdown.helper.unescapeHTMLEntities(content);

          presPH.push(content);
          pres[i].outerHTML = '<precode language="' + language + '" precodenum="' + i.toString() + '"></precode>';
        } else {
          presPH.push(pres[i].innerHTML);
          pres[i].innerHTML = '';
          pres[i].setAttribute('prenum', i.toString());
        }
      }
      return presPH;
    }

    return mdDoc;
  };

  /**
   * Set an option of this Converter instance
   * @param {string} key
   * @param {*} value
   */
  this.setOption = function (key, value) {
    options[key] = value;
  };

  /**
   * Get the option of this Converter instance
   * @param {string} key
   * @returns {*}
   */
  this.getOption = function (key) {
    return options[key];
  };

  /**
   * Get the options of this Converter instance
   * @returns {{}}
   */
  this.getOptions = function () {
    return options;
  };

  /**
   * Add extension to THIS converter
   * @param {{}} extension
   * @param {string} [name=null]
   */
  this.addExtension = function (extension, name) {
    name = name || null;
    _parseExtension(extension, name);
  };

  /**
   * Use a global registered extension with THIS converter
   * @param {string} extensionName Name of the previously registered extension
   */
  this.useExtension = function (extensionName) {
    _parseExtension(extensionName);
  };

  /**
   * Set the flavor THIS converter should use
   * @param {string} name
   */
  this.setFlavor = function (name) {
    if (!flavor.hasOwnProperty(name)) {
      throw Error(name + ' flavor was not found');
    }
    var preset = flavor[name];
    setConvFlavor = name;
    for (var option in preset) {
      if (preset.hasOwnProperty(option)) {
        options[option] = preset[option];
      }
    }
  };

  /**
   * Get the currently set flavor of this converter
   * @returns {string}
   */
  this.getFlavor = function () {
    return setConvFlavor;
  };

  /**
   * Remove an extension from THIS converter.
   * Note: This is a costly operation. It's better to initialize a new converter
   * and specify the extensions you wish to use
   * @param {Array} extension
   */
  this.removeExtension = function (extension) {
    if (!showdown.helper.isArray(extension)) {
      extension = [extension];
    }
    for (var a = 0; a < extension.length; ++a) {
      var ext = extension[a];
      for (var i = 0; i < langExtensions.length; ++i) {
        if (langExtensions[i] === ext) {
          langExtensions.splice(i, 1);
        }
      }
      for (var ii = 0; ii < outputModifiers.length; ++ii) {
        if (outputModifiers[ii] === ext) {
          outputModifiers.splice(ii, 1);
        }
      }
    }
  };

  /**
   * Get all extension of THIS converter
   * @returns {{language: Array, output: Array}}
   */
  this.getAllExtensions = function () {
    return {
      language: langExtensions,
      output: outputModifiers
    };
  };

  /**
   * Get the metadata of the previously parsed document
   * @param raw
   * @returns {string|{}}
   */
  this.getMetadata = function (raw) {
    if (raw) {
      return metadata.raw;
    } else {
      return metadata.parsed;
    }
  };

  /**
   * Get the metadata format of the previously parsed document
   * @returns {string}
   */
  this.getMetadataFormat = function () {
    return metadata.format;
  };

  /**
   * Private: set a single key, value metadata pair
   * @param {string} key
   * @param {string} value
   */
  this._setMetadataPair = function (key, value) {
    metadata.parsed[key] = value;
  };

  /**
   * Private: set metadata format
   * @param {string} format
   */
  this._setMetadataFormat = function (format) {
    metadata.format = format;
  };

  /**
   * Private: set metadata raw text
   * @param {string} raw
   */
  this._setMetadataRaw = function (raw) {
    metadata.raw = raw;
  };
};

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('anchors', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('anchors.before', text, options, globals);

  var writeAnchorTag = function (wholeMatch, linkText, linkId, url, m5, m6, title) {
    if (showdown.helper.isUndefined(title)) {
      title = '';
    }
    linkId = linkId.toLowerCase();

    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';
    } else if (!url) {
      if (!linkId) {
        // lower-case and turn embedded newlines into spaces
        linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
        url = globals.gUrls[linkId];
        if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
          title = globals.gTitles[linkId];
        }
      } else {
        return wholeMatch;
      }
    }

    //url = showdown.helper.escapeCharacters(url, '*_', false); // replaced line to improve performance
    url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);

    var result = '<a href="' + url + '"';

    if (title !== '' && title !== null) {
      title = title.replace(/"/g, '&quot;');
      //title = showdown.helper.escapeCharacters(title, '*_', false); // replaced line to improve performance
      title = title.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      result += ' title="' + title + '"';
    }

    // optionLinksInNewWindow only applies
    // to external links. Hash links (#) open in same page
    if (options.openLinksInNewWindow && !/^#/.test(url)) {
      // escaped _
      result += ' rel="noopener noreferrer" target="¨E95Eblank"';
    }

    result += '>' + linkText + '</a>';

    return result;
  };

  // First, handle reference-style links: [link text] [id]
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);

  // Next, inline-style links: [link text](url "optional title")
  // cases with crazy urls like ./image/cat1).png
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
    writeAnchorTag);

  // normal cases
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
    writeAnchorTag);

  // handle reference-style shortcuts: [link text]
  // These must come last in case you've also got [link test][1]
  // or [link test](/foo)
  text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);

  // Lastly handle GithubMentions if option is enabled
  if (options.ghMentions) {
    text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function (wm, st, escape, mentions, username) {
      if (escape === '\\') {
        return st + mentions;
      }

      //check if options.ghMentionsLink is a string
      if (!showdown.helper.isString(options.ghMentionsLink)) {
        throw new Error('ghMentionsLink option must be a string');
      }
      var lnk = options.ghMentionsLink.replace(/\{u}/g, username),
          target = '';
      if (options.openLinksInNewWindow) {
        target = ' rel="noopener noreferrer" target="¨E95Eblank"';
      }
      return st + '<a href="' + lnk + '"' + target + '>' + mentions + '</a>';
    });
  }

  text = globals.converter._dispatch('anchors.after', text, options, globals);
  return text;
});

// url allowed chars [a-z\d_.~:/?#[]@!$&'()*+,;=-]

var simpleURLRegex  = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,
    simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,
    delimUrlRegex   = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,
    simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi,
    delimMailRegex  = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,

    replaceLink = function (options) {
      'use strict';
      return function (wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
        link = link.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
        var lnkTxt = link,
            append = '',
            target = '',
            lmc    = leadingMagicChars || '',
            tmc    = trailingMagicChars || '';
        if (/^www\./i.test(link)) {
          link = link.replace(/^www\./i, 'http://www.');
        }
        if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
          append = trailingPunctuation;
        }
        if (options.openLinksInNewWindow) {
          target = ' rel="noopener noreferrer" target="¨E95Eblank"';
        }
        return lmc + '<a href="' + link + '"' + target + '>' + lnkTxt + '</a>' + append + tmc;
      };
    },

    replaceMail = function (options, globals) {
      'use strict';
      return function (wholeMatch, b, mail) {
        var href = 'mailto:';
        b = b || '';
        mail = showdown.subParser('unescapeSpecialChars')(mail, options, globals);
        if (options.encodeEmails) {
          href = showdown.helper.encodeEmailAddress(href + mail);
          mail = showdown.helper.encodeEmailAddress(mail);
        } else {
          href = href + mail;
        }
        return b + '<a href="' + href + '">' + mail + '</a>';
      };
    };

showdown.subParser('autoLinks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('autoLinks.before', text, options, globals);

  text = text.replace(delimUrlRegex, replaceLink(options));
  text = text.replace(delimMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('autoLinks.after', text, options, globals);

  return text;
});

showdown.subParser('simplifiedAutoLinks', function (text, options, globals) {
  'use strict';

  if (!options.simplifiedAutoLink) {
    return text;
  }

  text = globals.converter._dispatch('simplifiedAutoLinks.before', text, options, globals);

  if (options.excludeTrailingPunctuationFromURLs) {
    text = text.replace(simpleURLRegex2, replaceLink(options));
  } else {
    text = text.replace(simpleURLRegex, replaceLink(options));
  }
  text = text.replace(simpleMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('simplifiedAutoLinks.after', text, options, globals);

  return text;
});

/**
 * These are all the transformations that form block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('blockGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockGamut.before', text, options, globals);

  // we parse blockquotes first so that we can have headings and hrs
  // inside blockquotes
  text = showdown.subParser('blockQuotes')(text, options, globals);
  text = showdown.subParser('headers')(text, options, globals);

  // Do Horizontal Rules:
  text = showdown.subParser('horizontalRule')(text, options, globals);

  text = showdown.subParser('lists')(text, options, globals);
  text = showdown.subParser('codeBlocks')(text, options, globals);
  text = showdown.subParser('tables')(text, options, globals);

  // We already ran _HashHTMLBlocks() before, in Markdown(), but that
  // was to escape raw HTML in the original Markdown source. This time,
  // we're escaping the markup we've just created, so that we don't wrap
  // <p> tags around block-level tags.
  text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
  text = showdown.subParser('paragraphs')(text, options, globals);

  text = globals.converter._dispatch('blockGamut.after', text, options, globals);

  return text;
});

showdown.subParser('blockQuotes', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockQuotes.before', text, options, globals);

  // add a couple extra lines after the text and endtext mark
  text = text + '\n\n';

  var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;

  if (options.splitAdjacentBlockquotes) {
    rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
  }

  text = text.replace(rgx, function (bq) {
    // attacklab: hack around Konqueror 3.5.4 bug:
    // "----------bug".replace(/^-/g,"") == "bug"
    bq = bq.replace(/^[ \t]*>[ \t]?/gm, ''); // trim one level of quoting

    // attacklab: clean up hack
    bq = bq.replace(/¨0/g, '');

    bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
    bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
    bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse

    bq = bq.replace(/(^|\n)/g, '$1  ');
    // These leading spaces screw with <pre> content, so we need to fix that:
    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
      var pre = m1;
      // attacklab: hack around Konqueror 3.5.4 bug:
      pre = pre.replace(/^  /mg, '¨0');
      pre = pre.replace(/¨0/g, '');
      return pre;
    });

    return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
  });

  text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
  return text;
});

/**
 * Process Markdown `<pre><code>` blocks.
 */
showdown.subParser('codeBlocks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeBlocks.before', text, options, globals);

  // sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
  text = text.replace(pattern, function (wholeMatch, m1, m2) {
    var codeblock = m1,
        nextChar = m2,
        end = '\n';

    codeblock = showdown.subParser('outdent')(codeblock, options, globals);
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

    if (options.omitExtraWLInCodeBlocks) {
      end = '';
    }

    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

    return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
  });

  // strip sentinel
  text = text.replace(/¨0/, '');

  text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
  return text;
});

/**
 *
 *   *  Backtick quotes are used for <code></code> spans.
 *
 *   *  You can use multiple backticks as the delimiters if you want to
 *     include literal backticks in the code span. So, this input:
 *
 *         Just type ``foo `bar` baz`` at the prompt.
 *
 *       Will translate to:
 *
 *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
 *
 *    There's no arbitrary limit to the number of backticks you
 *    can use as delimters. If you need three consecutive backticks
 *    in your code, use four for delimiters, etc.
 *
 *  *  You can use spaces to get literal backticks at the edges:
 *
 *         ... type `` `bar` `` ...
 *
 *       Turns to:
 *
 *         ... type <code>`bar`</code> ...
 */
showdown.subParser('codeSpans', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeSpans.before', text, options, globals);

  if (typeof (text) === 'undefined') {
    text = '';
  }
  text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
    function (wholeMatch, m1, m2, m3) {
      var c = m3;
      c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
      c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
      c = showdown.subParser('encodeCode')(c, options, globals);
      c = m1 + '<code>' + c + '</code>';
      c = showdown.subParser('hashHTMLSpans')(c, options, globals);
      return c;
    }
  );

  text = globals.converter._dispatch('codeSpans.after', text, options, globals);
  return text;
});

/**
 * Create a full HTML document from the processed markdown
 */
showdown.subParser('completeHTMLDocument', function (text, options, globals) {
  'use strict';

  if (!options.completeHTMLDocument) {
    return text;
  }

  text = globals.converter._dispatch('completeHTMLDocument.before', text, options, globals);

  var doctype = 'html',
      doctypeParsed = '<!DOCTYPE HTML>\n',
      title = '',
      charset = '<meta charset="utf-8">\n',
      lang = '',
      metadata = '';

  if (typeof globals.metadata.parsed.doctype !== 'undefined') {
    doctypeParsed = '<!DOCTYPE ' +  globals.metadata.parsed.doctype + '>\n';
    doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
    if (doctype === 'html' || doctype === 'html5') {
      charset = '<meta charset="utf-8">';
    }
  }

  for (var meta in globals.metadata.parsed) {
    if (globals.metadata.parsed.hasOwnProperty(meta)) {
      switch (meta.toLowerCase()) {
        case 'doctype':
          break;

        case 'title':
          title = '<title>' +  globals.metadata.parsed.title + '</title>\n';
          break;

        case 'charset':
          if (doctype === 'html' || doctype === 'html5') {
            charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
          } else {
            charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
          }
          break;

        case 'language':
        case 'lang':
          lang = ' lang="' + globals.metadata.parsed[meta] + '"';
          metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
          break;

        default:
          metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
      }
    }
  }

  text = doctypeParsed + '<html' + lang + '>\n<head>\n' + title + charset + metadata + '</head>\n<body>\n' + text.trim() + '\n</body>\n</html>';

  text = globals.converter._dispatch('completeHTMLDocument.after', text, options, globals);
  return text;
});

/**
 * Convert all tabs to spaces
 */
showdown.subParser('detab', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('detab.before', text, options, globals);

  // expand first n-1 tabs
  text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

  // replace the nth with two sentinels
  text = text.replace(/\t/g, '¨A¨B');

  // use the sentinel to anchor our regex so it doesn't explode
  text = text.replace(/¨B(.+?)¨A/g, function (wholeMatch, m1) {
    var leadingText = m1,
        numSpaces = 4 - leadingText.length % 4;  // g_tab_width

    // there *must* be a better way to do this:
    for (var i = 0; i < numSpaces; i++) {
      leadingText += ' ';
    }

    return leadingText;
  });

  // clean up sentinels
  text = text.replace(/¨A/g, '    ');  // g_tab_width
  text = text.replace(/¨B/g, '');

  text = globals.converter._dispatch('detab.after', text, options, globals);
  return text;
});

showdown.subParser('ellipsis', function (text, options, globals) {
  'use strict';

  if (!options.ellipsis) {
    return text;
  }

  text = globals.converter._dispatch('ellipsis.before', text, options, globals);

  text = text.replace(/\.\.\./g, '…');

  text = globals.converter._dispatch('ellipsis.after', text, options, globals);

  return text;
});

/**
 * Turn emoji codes into emojis
 *
 * List of supported emojis: https://github.com/showdownjs/showdown/wiki/Emojis
 */
showdown.subParser('emoji', function (text, options, globals) {
  'use strict';

  if (!options.emoji) {
    return text;
  }

  text = globals.converter._dispatch('emoji.before', text, options, globals);

  var emojiRgx = /:([\S]+?):/g;

  text = text.replace(emojiRgx, function (wm, emojiCode) {
    if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
      return showdown.helper.emojis[emojiCode];
    }
    return wm;
  });

  text = globals.converter._dispatch('emoji.after', text, options, globals);

  return text;
});

/**
 * Smart processing for ampersands and angle brackets that need to be encoded.
 */
showdown.subParser('encodeAmpsAndAngles', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeAmpsAndAngles.before', text, options, globals);

  // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
  // http://bumppo.net/projects/amputator/
  text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');

  // Encode naked <'s
  text = text.replace(/<(?![a-z\/?$!])/gi, '&lt;');

  // Encode <
  text = text.replace(/</g, '&lt;');

  // Encode >
  text = text.replace(/>/g, '&gt;');

  text = globals.converter._dispatch('encodeAmpsAndAngles.after', text, options, globals);
  return text;
});

/**
 * Returns the string, with after processing the following backslash escape sequences.
 *
 * attacklab: The polite way to do this is with the new escapeCharacters() function:
 *
 *    text = escapeCharacters(text,"\\",true);
 *    text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
 *
 * ...but we're sidestepping its use of the (slow) RegExp constructor
 * as an optimization for Firefox.  This function gets called a LOT.
 */
showdown.subParser('encodeBackslashEscapes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeBackslashEscapes.before', text, options, globals);

  text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
  text = text.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeBackslashEscapes.after', text, options, globals);
  return text;
});

/**
 * Encode/escape certain characters inside Markdown code runs.
 * The point is that in code, these characters are literals,
 * and lose their special Markdown meanings.
 */
showdown.subParser('encodeCode', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('encodeCode.before', text, options, globals);

  // Encode all ampersands; HTML entities are not
  // entities within a Markdown code span.
  text = text
    .replace(/&/g, '&amp;')
  // Do the angle bracket song and dance:
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  // Now, escape characters that are magic in Markdown:
    .replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeCode.after', text, options, globals);
  return text;
});

/**
 * Within tags -- meaning between < and > -- encode [\ ` * _ ~ =] so they
 * don't conflict with their use in Markdown for code, italics and strong.
 */
showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.before', text, options, globals);

  // Build a regex to find HTML tags.
  var tags     = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,
      comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;

  text = text.replace(tags, function (wholeMatch) {
    return wholeMatch
      .replace(/(.)<\/?code>(?=.)/g, '$1`')
      .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
  });

  text = text.replace(comments, function (wholeMatch) {
    return wholeMatch
      .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
  });

  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.after', text, options, globals);
  return text;
});

/**
 * Handle github codeblocks prior to running HashHTML so that
 * HTML contained within the codeblock gets escaped properly
 * Example:
 * ```ruby
 *     def hello_world(x)
 *       puts "Hello, #{x}"
 *     end
 * ```
 */
showdown.subParser('githubCodeBlocks', function (text, options, globals) {
  'use strict';

  // early exit if option is not enabled
  if (!options.ghCodeBlocks) {
    return text;
  }

  text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

  text += '¨0';

  text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function (wholeMatch, delim, language, codeblock) {
    var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

    // First parse the github code block
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

    codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';

    codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

    // Since GHCodeblocks can be false positives, we need to
    // store the primitive text and the parsed text in a global var,
    // and then return a token
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  });

  // attacklab: strip sentinel
  text = text.replace(/¨0/, '');

  return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
});

showdown.subParser('hashBlock', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashBlock.before', text, options, globals);
  text = text.replace(/(^\n+|\n+$)/g, '');
  text = '\n\n¨K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
  text = globals.converter._dispatch('hashBlock.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <code> elements that should not be parsed as markdown
 */
showdown.subParser('hashCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '¨C' + (globals.gHtmlSpans.push(codeblock) - 1) + 'C';
  };

  // Hash naked <code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '<code\\b[^>]*>', '</code>', 'gim');

  text = globals.converter._dispatch('hashCodeTags.after', text, options, globals);
  return text;
});

showdown.subParser('hashElement', function (text, options, globals) {
  'use strict';

  return function (wholeMatch, m1) {
    var blockText = m1;

    // Undo double lines
    blockText = blockText.replace(/\n\n/g, '\n');
    blockText = blockText.replace(/^\n/, '');

    // strip trailing blank lines
    blockText = blockText.replace(/\n+$/g, '');

    // Replace the element text with a marker ("¨KxK" where x is its key)
    blockText = '\n\n¨K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';

    return blockText;
  };
});

showdown.subParser('hashHTMLBlocks', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLBlocks.before', text, options, globals);

  var blockTags = [
        'pre',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'table',
        'dl',
        'ol',
        'ul',
        'script',
        'noscript',
        'form',
        'fieldset',
        'iframe',
        'math',
        'style',
        'section',
        'header',
        'footer',
        'nav',
        'article',
        'aside',
        'address',
        'audio',
        'canvas',
        'figure',
        'hgroup',
        'output',
        'video',
        'p'
      ],
      repFunc = function (wholeMatch, match, left, right) {
        var txt = wholeMatch;
        // check if this html element is marked as markdown
        // if so, it's contents should be parsed as markdown
        if (left.search(/\bmarkdown\b/) !== -1) {
          txt = left + globals.converter.makeHtml(match) + right;
        }
        return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
      };

  if (options.backslashEscapesHTMLTags) {
    // encode backslash escaped HTML tags
    text = text.replace(/\\<(\/?[^>]+?)>/g, function (wm, inside) {
      return '&lt;' + inside + '&gt;';
    });
  }

  // hash HTML Blocks
  for (var i = 0; i < blockTags.length; ++i) {

    var opTagPos,
        rgx1     = new RegExp('^ {0,3}(<' + blockTags[i] + '\\b[^>]*>)', 'im'),
        patLeft  = '<' + blockTags[i] + '\\b[^>]*>',
        patRight = '</' + blockTags[i] + '>';
    // 1. Look for the first position of the first opening HTML tag in the text
    while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {

      // if the HTML tag is \ escaped, we need to escape it and break


      //2. Split the text in that position
      var subTexts = showdown.helper.splitAtIndex(text, opTagPos),
          //3. Match recursively
          newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, 'im');

      // prevent an infinite loop
      if (newSubText1 === subTexts[1]) {
        break;
      }
      text = subTexts[0].concat(newSubText1);
    }
  }
  // HR SPECIAL CASE
  text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  // Special case for standalone HTML comments
  text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
    return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
  }, '^ {0,3}<!--', '-->', 'gm');

  // PHP and ASP-style processor instructions (<?...?> and <%...%>)
  text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  text = globals.converter._dispatch('hashHTMLBlocks.after', text, options, globals);
  return text;
});

/**
 * Hash span elements that should not be parsed as markdown
 */
showdown.subParser('hashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLSpans.before', text, options, globals);

  function hashHTMLSpan (html) {
    return '¨C' + (globals.gHtmlSpans.push(html) - 1) + 'C';
  }

  // Hash Self Closing tags
  text = text.replace(/<[^>]+?\/>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags without properties
  text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags with properties
  text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash self closing tags without />
  text = text.replace(/<[^>]+?>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  /*showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');*/

  text = globals.converter._dispatch('hashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Unhash HTML spans
 */
showdown.subParser('unhashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unhashHTMLSpans.before', text, options, globals);

  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
    var repText = globals.gHtmlSpans[i],
        // limiter to prevent infinite loop (assume 10 as limit for recurse)
        limit = 0;

    while (/¨C(\d+)C/.test(repText)) {
      var num = RegExp.$1;
      repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);
      if (limit === 10) {
        console.error('maximum nesting of 10 spans reached!!!');
        break;
      }
      ++limit;
    }
    text = text.replace('¨C' + i + 'C', repText);
  }

  text = globals.converter._dispatch('unhashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <pre><code> elements that should not be parsed as markdown
 */
showdown.subParser('hashPreCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashPreCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    // encode html entities
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  };

  // Hash <pre><code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');

  text = globals.converter._dispatch('hashPreCodeTags.after', text, options, globals);
  return text;
});

showdown.subParser('headers', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('headers.before', text, options, globals);

  var headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),

      // Set text-style headers:
      //	Header 1
      //	========
      //
      //	Header 2
      //	--------
      //
      setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
      setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;

  text = text.replace(setextRegexH1, function (wholeMatch, m1) {

    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  text = text.replace(setextRegexH2, function (matchFound, m1) {
    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart + 1,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  // atx-style headers:
  //  # Header 1
  //  ## Header 2
  //  ## Header 2 with closing hashes ##
  //  ...
  //  ###### Header 6
  //
  var atxStyle = (options.requireSpaceBeforeHeadingText) ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;

  text = text.replace(atxStyle, function (wholeMatch, m1, m2) {
    var hText = m2;
    if (options.customizedHeaderId) {
      hText = m2.replace(/\s?\{([^{]+?)}\s*$/, '');
    }

    var span = showdown.subParser('spanGamut')(hText, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
        hLevel = headerLevelStart - 1 + m1.length,
        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

    return showdown.subParser('hashBlock')(header, options, globals);
  });

  function headerId (m) {
    var title,
        prefix;

    // It is separate from other options to allow combining prefix and customized
    if (options.customizedHeaderId) {
      var match = m.match(/\{([^{]+?)}\s*$/);
      if (match && match[1]) {
        m = match[1];
      }
    }

    title = m;

    // Prefix id to prevent causing inadvertent pre-existing style matches.
    if (showdown.helper.isString(options.prefixHeaderId)) {
      prefix = options.prefixHeaderId;
    } else if (options.prefixHeaderId === true) {
      prefix = 'section-';
    } else {
      prefix = '';
    }

    if (!options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (options.ghCompatibleHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '')
        .replace(/¨T/g, '')
        .replace(/¨D/g, '')
        // replace rest of the chars (&~$ are repeated as they might have been escaped)
        // borrowed from github's redcarpet (some they should produce similar results)
        .replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '')
        .toLowerCase();
    } else if (options.rawHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '&')
        .replace(/¨T/g, '¨')
        .replace(/¨D/g, '$')
        // replace " and '
        .replace(/["']/g, '-')
        .toLowerCase();
    } else {
      title = title
        .replace(/[^\w]/g, '')
        .toLowerCase();
    }

    if (options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (globals.hashLinkCounts[title]) {
      title = title + '-' + (globals.hashLinkCounts[title]++);
    } else {
      globals.hashLinkCounts[title] = 1;
    }
    return title;
  }

  text = globals.converter._dispatch('headers.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('horizontalRule', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('horizontalRule.before', text, options, globals);

  var key = showdown.subParser('hashBlock')('<hr />', options, globals);
  text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);

  text = globals.converter._dispatch('horizontalRule.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown image shortcuts into <img> tags.
 */
showdown.subParser('images', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('images.before', text, options, globals);

  var inlineRegExp      = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      crazyRegExp       = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,
      base64RegExp      = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      referenceRegExp   = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,
      refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;

  function writeImageTagBase64 (wholeMatch, altText, linkId, url, width, height, m5, title) {
    url = url.replace(/\s/g, '');
    return writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title);
  }

  function writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title) {

    var gUrls   = globals.gUrls,
        gTitles = globals.gTitles,
        gDims   = globals.gDimensions;

    linkId = linkId.toLowerCase();

    if (!title) {
      title = '';
    }
    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';

    } else if (url === '' || url === null) {
      if (linkId === '' || linkId === null) {
        // lower-case and turn embedded newlines into spaces
        linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(gUrls[linkId])) {
        url = gUrls[linkId];
        if (!showdown.helper.isUndefined(gTitles[linkId])) {
          title = gTitles[linkId];
        }
        if (!showdown.helper.isUndefined(gDims[linkId])) {
          width = gDims[linkId].width;
          height = gDims[linkId].height;
        }
      } else {
        return wholeMatch;
      }
    }

    altText = altText
      .replace(/"/g, '&quot;')
    //altText = showdown.helper.escapeCharacters(altText, '*_', false);
      .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
    //url = showdown.helper.escapeCharacters(url, '*_', false);
    url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
    var result = '<img src="' + url + '" alt="' + altText + '"';

    if (title && showdown.helper.isString(title)) {
      title = title
        .replace(/"/g, '&quot;')
      //title = showdown.helper.escapeCharacters(title, '*_', false);
        .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      result += ' title="' + title + '"';
    }

    if (width && height) {
      width  = (width === '*') ? 'auto' : width;
      height = (height === '*') ? 'auto' : height;

      result += ' width="' + width + '"';
      result += ' height="' + height + '"';
    }

    result += ' />';

    return result;
  }

  // First, handle reference-style labeled images: ![alt text][id]
  text = text.replace(referenceRegExp, writeImageTag);

  // Next, handle inline images:  ![alt text](url =<width>x<height> "optional title")

  // base64 encoded images
  text = text.replace(base64RegExp, writeImageTagBase64);

  // cases with crazy urls like ./image/cat1).png
  text = text.replace(crazyRegExp, writeImageTag);

  // normal cases
  text = text.replace(inlineRegExp, writeImageTag);

  // handle reference-style shortcuts: ![img text]
  text = text.replace(refShortcutRegExp, writeImageTag);

  text = globals.converter._dispatch('images.after', text, options, globals);
  return text;
});

showdown.subParser('italicsAndBold', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);

  // it's faster to have 3 separate regexes for each case than have just one
  // because of backtracing, in some cases, it could lead to an exponential effect
  // called "catastrophic backtrace". Ominous!

  function parseInside (txt, left, right) {
    /*
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    */
    return left + txt + right;
  }

  // Parse underscores
  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
      return parseInside (txt, '<strong><em>', '</em></strong>');
    });
    text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
      return parseInside (txt, '<strong>', '</strong>');
    });
    text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function (wm, txt) {
      return parseInside (txt, '<em>', '</em>');
    });
  } else {
    text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/_([^\s_][\s\S]*?)_/g, function (wm, m) {
      // !/^_[^_]/.test(m) - test if it doesn't start with __ (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
  }

  // Now parse asterisks
  if (options.literalMidWordAsterisks) {
    text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<strong><em>', '</em></strong>');
    });
    text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<strong>', '</strong>');
    });
    text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<em>', '</em>');
    });
  } else {
    text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function (wm, m) {
      // !/^\*[^*]/.test(m) - test if it doesn't start with ** (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
  }


  text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
  return text;
});

/**
 * Form HTML ordered (numbered) and unordered (bulleted) lists.
 */
showdown.subParser('lists', function (text, options, globals) {
  'use strict';

  /**
   * Process the contents of a single ordered or unordered list, splitting it
   * into individual list items.
   * @param {string} listStr
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function processListItems (listStr, trimTrailing) {
    // The $g_list_level global keeps track of when we're inside a list.
    // Each time we enter a list, we increment it; when we leave a list,
    // we decrement. If it's zero, we're not in a list anymore.
    //
    // We do this because when we're not inside a list, we want to treat
    // something like this:
    //
    //    I recommend upgrading to version
    //    8. Oops, now this line is treated
    //    as a sub-list.
    //
    // As a single paragraph, despite the fact that the second line starts
    // with a digit-period-space sequence.
    //
    // Whereas when we're inside a list (or sub-list), that line will be
    // treated as the start of a sub-list. What a kludge, huh? This is
    // an aspect of Markdown's syntax that's hard to parse perfectly
    // without resorting to mind-reading. Perhaps the solution is to
    // change the syntax rules such that sub-lists must start with a
    // starting cardinal number; e.g. "1." or "a.".
    globals.gListLevel++;

    // trim trailing blank lines:
    listStr = listStr.replace(/\n{2,}$/, '\n');

    // attacklab: add sentinel to emulate \z
    listStr += '¨0';

    var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
        isParagraphed = (/\n[ \t]*\n(?!¨0)/.test(listStr));

    // Since version 1.5, nesting sublists requires 4 spaces (or 1 tab) indentation,
    // which is a syntax breaking change
    // activating this option reverts to old behavior
    if (options.disableForced4SpacesIndentedSublists) {
      rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
    }

    listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
      checked = (checked && checked.trim() !== '');

      var item = showdown.subParser('outdent')(m4, options, globals),
          bulletStyle = '';

      // Support for github tasklists
      if (taskbtn && options.tasklists) {
        bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
        item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
          var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
          if (checked) {
            otp += ' checked';
          }
          otp += '>';
          return otp;
        });
      }

      // ISSUE #312
      // This input: - - - a
      // causes trouble to the parser, since it interprets it as:
      // <ul><li><li><li>a</li></li></li></ul>
      // instead of:
      // <ul><li>- - a</li></ul>
      // So, to prevent it, we will put a marker (¨A)in the beginning of the line
      // Kind of hackish/monkey patching, but seems more effective than overcomplicating the list parser
      item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (wm2) {
        return '¨A' + wm2;
      });

      // m1 - Leading line or
      // Has a double return (multi paragraph) or
      // Has sublist
      if (m1 || (item.search(/\n{2,}/) > -1)) {
        item = showdown.subParser('githubCodeBlocks')(item, options, globals);
        item = showdown.subParser('blockGamut')(item, options, globals);
      } else {
        // Recursion for sub-lists:
        item = showdown.subParser('lists')(item, options, globals);
        item = item.replace(/\n$/, ''); // chomp(item)
        item = showdown.subParser('hashHTMLBlocks')(item, options, globals);

        // Colapse double linebreaks
        item = item.replace(/\n\n+/g, '\n\n');
        if (isParagraphed) {
          item = showdown.subParser('paragraphs')(item, options, globals);
        } else {
          item = showdown.subParser('spanGamut')(item, options, globals);
        }
      }

      // now we need to remove the marker (¨A)
      item = item.replace('¨A', '');
      // we can finally wrap the line in list item tags
      item =  '<li' + bulletStyle + '>' + item + '</li>\n';

      return item;
    });

    // attacklab: strip sentinel
    listStr = listStr.replace(/¨0/g, '');

    globals.gListLevel--;

    if (trimTrailing) {
      listStr = listStr.replace(/\s+$/, '');
    }

    return listStr;
  }

  function styleStartNumber (list, listType) {
    // check if ol and starts by a number different than 1
    if (listType === 'ol') {
      var res = list.match(/^ *(\d+)\./);
      if (res && res[1] !== '1') {
        return ' start="' + res[1] + '"';
      }
    }
    return '';
  }

  /**
   * Check and parse consecutive lists (better fix for issue #142)
   * @param {string} list
   * @param {string} listType
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function parseConsecutiveLists (list, listType, trimTrailing) {
    // check if we caught 2 or more consecutive lists by mistake
    // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
    var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
        ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
        counterRxg = (listType === 'ul') ? olRgx : ulRgx,
        result = '';

    if (list.search(counterRxg) !== -1) {
      (function parseCL (txt) {
        var pos = txt.search(counterRxg),
            style = styleStartNumber(list, listType);
        if (pos !== -1) {
          // slice
          result += '\n\n<' + listType + style + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';

          // invert counterType and listType
          listType = (listType === 'ul') ? 'ol' : 'ul';
          counterRxg = (listType === 'ul') ? olRgx : ulRgx;

          //recurse
          parseCL(txt.slice(pos));
        } else {
          result += '\n\n<' + listType + style + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
        }
      })(list);
    } else {
      var style = styleStartNumber(list, listType);
      result = '\n\n<' + listType + style + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
    }

    return result;
  }

  /** Start of list parsing **/
  text = globals.converter._dispatch('lists.before', text, options, globals);
  // add sentinel to hack around khtml/safari bug:
  // http://bugs.webkit.org/show_bug.cgi?id=11231
  text += '¨0';

  if (globals.gListLevel) {
    text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, list, m2) {
        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, true);
      }
    );
  } else {
    text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, m1, list, m3) {
        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, false);
      }
    );
  }

  // strip sentinel
  text = text.replace(/¨0/, '');
  text = globals.converter._dispatch('lists.after', text, options, globals);
  return text;
});

/**
 * Parse metadata at the top of the document
 */
showdown.subParser('metadata', function (text, options, globals) {
  'use strict';

  if (!options.metadata) {
    return text;
  }

  text = globals.converter._dispatch('metadata.before', text, options, globals);

  function parseMetadataContents (content) {
    // raw is raw so it's not changed in any way
    globals.metadata.raw = content;

    // escape chars forbidden in html attributes
    // double quotes
    content = content
      // ampersand first
      .replace(/&/g, '&amp;')
      // double quotes
      .replace(/"/g, '&quot;');

    content = content.replace(/\n {4}/g, ' ');
    content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function (wm, key, value) {
      globals.metadata.parsed[key] = value;
      return '';
    });
  }

  text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function (wholematch, format, content) {
    parseMetadataContents(content);
    return '¨M';
  });

  text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function (wholematch, format, content) {
    if (format) {
      globals.metadata.format = format;
    }
    parseMetadataContents(content);
    return '¨M';
  });

  text = text.replace(/¨M/g, '');

  text = globals.converter._dispatch('metadata.after', text, options, globals);
  return text;
});

/**
 * Remove one level of line-leading tabs or spaces
 */
showdown.subParser('outdent', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('outdent.before', text, options, globals);

  // attacklab: hack around Konqueror 3.5.4 bug:
  // "----------bug".replace(/^-/g,"") == "bug"
  text = text.replace(/^(\t|[ ]{1,4})/gm, '¨0'); // attacklab: g_tab_width

  // attacklab: clean up hack
  text = text.replace(/¨0/g, '');

  text = globals.converter._dispatch('outdent.after', text, options, globals);
  return text;
});

/**
 *
 */
showdown.subParser('paragraphs', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('paragraphs.before', text, options, globals);
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');

  var grafs = text.split(/\n{2,}/g),
      grafsOut = [],
      end = grafs.length; // Wrap <p> tags

  for (var i = 0; i < end; i++) {
    var str = grafs[i];
    // if this is an HTML marker, copy it
    if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
      grafsOut.push(str);

    // test for presence of characters to prevent empty lines being parsed
    // as paragraphs (resulting in undesired extra empty paragraphs)
    } else if (str.search(/\S/) >= 0) {
      str = showdown.subParser('spanGamut')(str, options, globals);
      str = str.replace(/^([ \t]*)/g, '<p>');
      str += '</p>';
      grafsOut.push(str);
    }
  }

  /** Unhashify HTML blocks */
  end = grafsOut.length;
  for (i = 0; i < end; i++) {
    var blockText = '',
        grafsOutIt = grafsOut[i],
        codeFlag = false;
    // if this is a marker for an html block...
    // use RegExp.test instead of string.search because of QML bug
    while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
      var delim = RegExp.$1,
          num   = RegExp.$2;

      if (delim === 'K') {
        blockText = globals.gHtmlBlocks[num];
      } else {
        // we need to check if ghBlock is a false positive
        if (codeFlag) {
          // use encoded version of all text
          blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text, options, globals);
        } else {
          blockText = globals.ghCodeBlocks[num].codeblock;
        }
      }
      blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

      grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
      // Check if grafsOutIt is a pre->code
      if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
        codeFlag = true;
      }
    }
    grafsOut[i] = grafsOutIt;
  }
  text = grafsOut.join('\n');
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');
  return globals.converter._dispatch('paragraphs.after', text, options, globals);
});

/**
 * Run extension
 */
showdown.subParser('runExtension', function (ext, text, options, globals) {
  'use strict';

  if (ext.filter) {
    text = ext.filter(text, globals.converter, options);

  } else if (ext.regex) {
    // TODO remove this when old extension loading mechanism is deprecated
    var re = ext.regex;
    if (!(re instanceof RegExp)) {
      re = new RegExp(re, 'g');
    }
    text = text.replace(re, ext.replace);
  }

  return text;
});

/**
 * These are all the transformations that occur *within* block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('spanGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('spanGamut.before', text, options, globals);
  text = showdown.subParser('codeSpans')(text, options, globals);
  text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
  text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);

  // Process anchor and image tags. Images must come first,
  // because ![foo][f] looks like an anchor.
  text = showdown.subParser('images')(text, options, globals);
  text = showdown.subParser('anchors')(text, options, globals);

  // Make links out of things like `<http://example.com/>`
  // Must come after anchors, because you can use < and >
  // delimiters in inline links like [this](<url>).
  text = showdown.subParser('autoLinks')(text, options, globals);
  text = showdown.subParser('simplifiedAutoLinks')(text, options, globals);
  text = showdown.subParser('emoji')(text, options, globals);
  text = showdown.subParser('underline')(text, options, globals);
  text = showdown.subParser('italicsAndBold')(text, options, globals);
  text = showdown.subParser('strikethrough')(text, options, globals);
  text = showdown.subParser('ellipsis')(text, options, globals);

  // we need to hash HTML tags inside spans
  text = showdown.subParser('hashHTMLSpans')(text, options, globals);

  // now we encode amps and angles
  text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);

  // Do hard breaks
  if (options.simpleLineBreaks) {
    // GFM style hard breaks
    // only add line breaks if the text does not contain a block (special case for lists)
    if (!/\n\n¨K/.test(text)) {
      text = text.replace(/\n+/g, '<br />\n');
    }
  } else {
    // Vanilla hard breaks
    text = text.replace(/  +\n/g, '<br />\n');
  }

  text = globals.converter._dispatch('spanGamut.after', text, options, globals);
  return text;
});

showdown.subParser('strikethrough', function (text, options, globals) {
  'use strict';

  function parseInside (txt) {
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    return '<del>' + txt + '</del>';
  }

  if (options.strikethrough) {
    text = globals.converter._dispatch('strikethrough.before', text, options, globals);
    text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (wm, txt) { return parseInside(txt); });
    text = globals.converter._dispatch('strikethrough.after', text, options, globals);
  }

  return text;
});

/**
 * Strips link definitions from text, stores the URLs and titles in
 * hash references.
 * Link defs are in the form: ^[id]: url "optional title"
 */
showdown.subParser('stripLinkDefinitions', function (text, options, globals) {
  'use strict';

  var regex       = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,
      base64Regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;

  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  var replaceFunc = function (wholeMatch, linkId, url, width, height, blankLines, title) {

    // if there aren't two instances of linkId it must not be a reference link so back out
    linkId = linkId.toLowerCase();
    if (text.toLowerCase().split(linkId).length - 1 < 2) {
      return wholeMatch;
    }
    if (url.match(/^data:.+?\/.+?;base64,/)) {
      // remove newlines
      globals.gUrls[linkId] = url.replace(/\s/g, '');
    } else {
      globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url, options, globals);  // Link IDs are case-insensitive
    }

    if (blankLines) {
      // Oops, found blank lines, so it's not a title.
      // Put back the parenthetical statement we stole.
      return blankLines + title;

    } else {
      if (title) {
        globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
      }
      if (options.parseImgDimensions && width && height) {
        globals.gDimensions[linkId] = {
          width:  width,
          height: height
        };
      }
    }
    // Completely remove the definition from the text
    return '';
  };

  // first we try to find base64 link references
  text = text.replace(base64Regex, replaceFunc);

  text = text.replace(regex, replaceFunc);

  // attacklab: strip sentinel
  text = text.replace(/¨0/, '');

  return text;
});

showdown.subParser('tables', function (text, options, globals) {
  'use strict';

  if (!options.tables) {
    return text;
  }

  var tableRgx       = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,
      //singeColTblRgx = /^ {0,3}\|.+\|\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n(?: {0,3}\|.+\|\n)+(?:\n\n|¨0)/gm;
      singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;

  function parseStyles (sLine) {
    if (/^:[ \t]*--*$/.test(sLine)) {
      return ' style="text-align:left;"';
    } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
      return ' style="text-align:right;"';
    } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
      return ' style="text-align:center;"';
    } else {
      return '';
    }
  }

  function parseHeaders (header, style) {
    var id = '';
    header = header.trim();
    // support both tablesHeaderId and tableHeaderId due to error in documentation so we don't break backwards compatibility
    if (options.tablesHeaderId || options.tableHeaderId) {
      id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
    }
    header = showdown.subParser('spanGamut')(header, options, globals);

    return '<th' + id + style + '>' + header + '</th>\n';
  }

  function parseCells (cell, style) {
    var subText = showdown.subParser('spanGamut')(cell, options, globals);
    return '<td' + style + '>' + subText + '</td>\n';
  }

  function buildTable (headers, cells) {
    var tb = '<table>\n<thead>\n<tr>\n',
        tblLgn = headers.length;

    for (var i = 0; i < tblLgn; ++i) {
      tb += headers[i];
    }
    tb += '</tr>\n</thead>\n<tbody>\n';

    for (i = 0; i < cells.length; ++i) {
      tb += '<tr>\n';
      for (var ii = 0; ii < tblLgn; ++ii) {
        tb += cells[i][ii];
      }
      tb += '</tr>\n';
    }
    tb += '</tbody>\n</table>\n';
    return tb;
  }

  function parseTable (rawTable) {
    var i, tableLines = rawTable.split('\n');

    for (i = 0; i < tableLines.length; ++i) {
      // strip wrong first and last column if wrapped tables are used
      if (/^ {0,3}\|/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
      }
      if (/\|[ \t]*$/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
      }
      // parse code spans first, but we only support one line code spans
      tableLines[i] = showdown.subParser('codeSpans')(tableLines[i], options, globals);
    }

    var rawHeaders = tableLines[0].split('|').map(function (s) { return s.trim();}),
        rawStyles = tableLines[1].split('|').map(function (s) { return s.trim();}),
        rawCells = [],
        headers = [],
        styles = [],
        cells = [];

    tableLines.shift();
    tableLines.shift();

    for (i = 0; i < tableLines.length; ++i) {
      if (tableLines[i].trim() === '') {
        continue;
      }
      rawCells.push(
        tableLines[i]
          .split('|')
          .map(function (s) {
            return s.trim();
          })
      );
    }

    if (rawHeaders.length < rawStyles.length) {
      return rawTable;
    }

    for (i = 0; i < rawStyles.length; ++i) {
      styles.push(parseStyles(rawStyles[i]));
    }

    for (i = 0; i < rawHeaders.length; ++i) {
      if (showdown.helper.isUndefined(styles[i])) {
        styles[i] = '';
      }
      headers.push(parseHeaders(rawHeaders[i], styles[i]));
    }

    for (i = 0; i < rawCells.length; ++i) {
      var row = [];
      for (var ii = 0; ii < headers.length; ++ii) {
        if (showdown.helper.isUndefined(rawCells[i][ii])) {

        }
        row.push(parseCells(rawCells[i][ii], styles[ii]));
      }
      cells.push(row);
    }

    return buildTable(headers, cells);
  }

  text = globals.converter._dispatch('tables.before', text, options, globals);

  // find escaped pipe characters
  text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);

  // parse multi column tables
  text = text.replace(tableRgx, parseTable);

  // parse one column tables
  text = text.replace(singeColTblRgx, parseTable);

  text = globals.converter._dispatch('tables.after', text, options, globals);

  return text;
});

showdown.subParser('underline', function (text, options, globals) {
  'use strict';

  if (!options.underline) {
    return text;
  }

  text = globals.converter._dispatch('underline.before', text, options, globals);

  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
      return '<u>' + txt + '</u>';
    });
    text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
      return '<u>' + txt + '</u>';
    });
  } else {
    text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
      return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
    });
    text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
      return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
    });
  }

  // escape remaining underscores to prevent them being parsed by italic and bold
  text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('underline.after', text, options, globals);

  return text;
});

/**
 * Swap back in all the special characters we've hidden.
 */
showdown.subParser('unescapeSpecialChars', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unescapeSpecialChars.before', text, options, globals);

  text = text.replace(/¨E(\d+)E/g, function (wholeMatch, m1) {
    var charCodeToReplace = parseInt(m1);
    return String.fromCharCode(charCodeToReplace);
  });

  text = globals.converter._dispatch('unescapeSpecialChars.after', text, options, globals);
  return text;
});

showdown.subParser('makeMarkdown.blockquote', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    var children = node.childNodes,
        childrenLength = children.length;

    for (var i = 0; i < childrenLength; ++i) {
      var innerTxt = showdown.subParser('makeMarkdown.node')(children[i], globals);

      if (innerTxt === '') {
        continue;
      }
      txt += innerTxt;
    }
  }
  // cleanup
  txt = txt.trim();
  txt = '> ' + txt.split('\n').join('\n> ');
  return txt;
});

showdown.subParser('makeMarkdown.codeBlock', function (node, globals) {
  'use strict';

  var lang = node.getAttribute('language'),
      num  = node.getAttribute('precodenum');
  return '```' + lang + '\n' + globals.preList[num] + '\n```';
});

showdown.subParser('makeMarkdown.codeSpan', function (node) {
  'use strict';

  return '`' + node.innerHTML + '`';
});

showdown.subParser('makeMarkdown.emphasis', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '*';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '*';
  }
  return txt;
});

showdown.subParser('makeMarkdown.header', function (node, globals, headerLevel) {
  'use strict';

  var headerMark = new Array(headerLevel + 1).join('#'),
      txt = '';

  if (node.hasChildNodes()) {
    txt = headerMark + ' ';
    var children = node.childNodes,
        childrenLength = children.length;

    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
  }
  return txt;
});

showdown.subParser('makeMarkdown.hr', function () {
  'use strict';

  return '---';
});

showdown.subParser('makeMarkdown.image', function (node) {
  'use strict';

  var txt = '';
  if (node.hasAttribute('src')) {
    txt += '![' + node.getAttribute('alt') + '](';
    txt += '<' + node.getAttribute('src') + '>';
    if (node.hasAttribute('width') && node.hasAttribute('height')) {
      txt += ' =' + node.getAttribute('width') + 'x' + node.getAttribute('height');
    }

    if (node.hasAttribute('title')) {
      txt += ' "' + node.getAttribute('title') + '"';
    }
    txt += ')';
  }
  return txt;
});

showdown.subParser('makeMarkdown.links', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes() && node.hasAttribute('href')) {
    var children = node.childNodes,
        childrenLength = children.length;
    txt = '[';
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '](';
    txt += '<' + node.getAttribute('href') + '>';
    if (node.hasAttribute('title')) {
      txt += ' "' + node.getAttribute('title') + '"';
    }
    txt += ')';
  }
  return txt;
});

showdown.subParser('makeMarkdown.list', function (node, globals, type) {
  'use strict';

  var txt = '';
  if (!node.hasChildNodes()) {
    return '';
  }
  var listItems       = node.childNodes,
      listItemsLenght = listItems.length,
      listNum = node.getAttribute('start') || 1;

  for (var i = 0; i < listItemsLenght; ++i) {
    if (typeof listItems[i].tagName === 'undefined' || listItems[i].tagName.toLowerCase() !== 'li') {
      continue;
    }

    // define the bullet to use in list
    var bullet = '';
    if (type === 'ol') {
      bullet = listNum.toString() + '. ';
    } else {
      bullet = '- ';
    }

    // parse list item
    txt += bullet + showdown.subParser('makeMarkdown.listItem')(listItems[i], globals);
    ++listNum;
  }

  // add comment at the end to prevent consecutive lists to be parsed as one
  txt += '\n<!-- -->\n';
  return txt.trim();
});

showdown.subParser('makeMarkdown.listItem', function (node, globals) {
  'use strict';

  var listItemTxt = '';

  var children = node.childNodes,
      childrenLenght = children.length;

  for (var i = 0; i < childrenLenght; ++i) {
    listItemTxt += showdown.subParser('makeMarkdown.node')(children[i], globals);
  }
  // if it's only one liner, we need to add a newline at the end
  if (!/\n$/.test(listItemTxt)) {
    listItemTxt += '\n';
  } else {
    // it's multiparagraph, so we need to indent
    listItemTxt = listItemTxt
      .split('\n')
      .join('\n    ')
      .replace(/^ {4}$/gm, '')
      .replace(/\n\n+/g, '\n\n');
  }

  return listItemTxt;
});



showdown.subParser('makeMarkdown.node', function (node, globals, spansOnly) {
  'use strict';

  spansOnly = spansOnly || false;

  var txt = '';

  // edge case of text without wrapper paragraph
  if (node.nodeType === 3) {
    return showdown.subParser('makeMarkdown.txt')(node, globals);
  }

  // HTML comment
  if (node.nodeType === 8) {
    return '<!--' + node.data + '-->\n\n';
  }

  // process only node elements
  if (node.nodeType !== 1) {
    return '';
  }

  var tagName = node.tagName.toLowerCase();

  switch (tagName) {

    //
    // BLOCKS
    //
    case 'h1':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 1) + '\n\n'; }
      break;
    case 'h2':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 2) + '\n\n'; }
      break;
    case 'h3':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 3) + '\n\n'; }
      break;
    case 'h4':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 4) + '\n\n'; }
      break;
    case 'h5':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 5) + '\n\n'; }
      break;
    case 'h6':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 6) + '\n\n'; }
      break;

    case 'p':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.paragraph')(node, globals) + '\n\n'; }
      break;

    case 'blockquote':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.blockquote')(node, globals) + '\n\n'; }
      break;

    case 'hr':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.hr')(node, globals) + '\n\n'; }
      break;

    case 'ol':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ol') + '\n\n'; }
      break;

    case 'ul':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ul') + '\n\n'; }
      break;

    case 'precode':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.codeBlock')(node, globals) + '\n\n'; }
      break;

    case 'pre':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.pre')(node, globals) + '\n\n'; }
      break;

    case 'table':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.table')(node, globals) + '\n\n'; }
      break;

    //
    // SPANS
    //
    case 'code':
      txt = showdown.subParser('makeMarkdown.codeSpan')(node, globals);
      break;

    case 'em':
    case 'i':
      txt = showdown.subParser('makeMarkdown.emphasis')(node, globals);
      break;

    case 'strong':
    case 'b':
      txt = showdown.subParser('makeMarkdown.strong')(node, globals);
      break;

    case 'del':
      txt = showdown.subParser('makeMarkdown.strikethrough')(node, globals);
      break;

    case 'a':
      txt = showdown.subParser('makeMarkdown.links')(node, globals);
      break;

    case 'img':
      txt = showdown.subParser('makeMarkdown.image')(node, globals);
      break;

    default:
      txt = node.outerHTML + '\n\n';
  }

  // common normalization
  // TODO eventually

  return txt;
});

showdown.subParser('makeMarkdown.paragraph', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
  }

  // some text normalization
  txt = txt.trim();

  return txt;
});

showdown.subParser('makeMarkdown.pre', function (node, globals) {
  'use strict';

  var num  = node.getAttribute('prenum');
  return '<pre>' + globals.preList[num] + '</pre>';
});

showdown.subParser('makeMarkdown.strikethrough', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '~~';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '~~';
  }
  return txt;
});

showdown.subParser('makeMarkdown.strong', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '**';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '**';
  }
  return txt;
});

showdown.subParser('makeMarkdown.table', function (node, globals) {
  'use strict';

  var txt = '',
      tableArray = [[], []],
      headings   = node.querySelectorAll('thead>tr>th'),
      rows       = node.querySelectorAll('tbody>tr'),
      i, ii;
  for (i = 0; i < headings.length; ++i) {
    var headContent = showdown.subParser('makeMarkdown.tableCell')(headings[i], globals),
        allign = '---';

    if (headings[i].hasAttribute('style')) {
      var style = headings[i].getAttribute('style').toLowerCase().replace(/\s/g, '');
      switch (style) {
        case 'text-align:left;':
          allign = ':---';
          break;
        case 'text-align:right;':
          allign = '---:';
          break;
        case 'text-align:center;':
          allign = ':---:';
          break;
      }
    }
    tableArray[0][i] = headContent.trim();
    tableArray[1][i] = allign;
  }

  for (i = 0; i < rows.length; ++i) {
    var r = tableArray.push([]) - 1,
        cols = rows[i].getElementsByTagName('td');

    for (ii = 0; ii < headings.length; ++ii) {
      var cellContent = ' ';
      if (typeof cols[ii] !== 'undefined') {
        cellContent = showdown.subParser('makeMarkdown.tableCell')(cols[ii], globals);
      }
      tableArray[r].push(cellContent);
    }
  }

  var cellSpacesCount = 3;
  for (i = 0; i < tableArray.length; ++i) {
    for (ii = 0; ii < tableArray[i].length; ++ii) {
      var strLen = tableArray[i][ii].length;
      if (strLen > cellSpacesCount) {
        cellSpacesCount = strLen;
      }
    }
  }

  for (i = 0; i < tableArray.length; ++i) {
    for (ii = 0; ii < tableArray[i].length; ++ii) {
      if (i === 1) {
        if (tableArray[i][ii].slice(-1) === ':') {
          tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, '-') + ':';
        } else {
          tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount, '-');
        }
      } else {
        tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount);
      }
    }
    txt += '| ' + tableArray[i].join(' | ') + ' |\n';
  }

  return txt.trim();
});

showdown.subParser('makeMarkdown.tableCell', function (node, globals) {
  'use strict';

  var txt = '';
  if (!node.hasChildNodes()) {
    return '';
  }
  var children = node.childNodes,
      childrenLength = children.length;

  for (var i = 0; i < childrenLength; ++i) {
    txt += showdown.subParser('makeMarkdown.node')(children[i], globals, true);
  }
  return txt.trim();
});

showdown.subParser('makeMarkdown.txt', function (node) {
  'use strict';

  var txt = node.nodeValue;

  // multiple spaces are collapsed
  txt = txt.replace(/ +/g, ' ');

  // replace the custom ¨NBSP; with a space
  txt = txt.replace(/¨NBSP;/g, ' ');

  // ", <, > and & should replace escaped html entities
  txt = showdown.helper.unescapeHTMLEntities(txt);

  // escape markdown magic characters
  // emphasis, strong and strikethrough - can appear everywhere
  // we also escape pipe (|) because of tables
  // and escape ` because of code blocks and spans
  txt = txt.replace(/([*_~|`])/g, '\\$1');

  // escape > because of blockquotes
  txt = txt.replace(/^(\s*)>/g, '\\$1>');

  // hash character, only troublesome at the beginning of a line because of headers
  txt = txt.replace(/^#/gm, '\\#');

  // horizontal rules
  txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, '$1\\$2$3');

  // dot, because of ordered lists, only troublesome at the beginning of a line when preceded by an integer
  txt = txt.replace(/^( {0,3}\d+)\./gm, '$1\\.');

  // +, * and -, at the beginning of a line becomes a list, so we need to escape them also (asterisk was already escaped)
  txt = txt.replace(/^( {0,3})([+-])/gm, '$1\\$2');

  // images and links, ] followed by ( is problematic, so we escape it
  txt = txt.replace(/]([\s]*)\(/g, '\\]$1\\(');

  // reference URIs must also be escaped
  txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, '\\[$1]:');

  return txt;
});

var root = this;

// AMD Loader
if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    'use strict';
    return showdown;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

// CommonJS/nodeJS Loader
} else {}
}).call(this);

//# sourceMappingURL=showdown.js.map


/***/ }),

/***/ "6716":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatIndexPage_vue_vue_type_style_index_1_id_12181830_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1411");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatIndexPage_vue_vue_type_style_index_1_id_12181830_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatIndexPage_vue_vue_type_style_index_1_id_12181830_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "7238":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7d93":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "81b7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Chat_vue_vue_type_style_index_1_id_26cc976e_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c545");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Chat_vue_vue_type_style_index_1_id_26cc976e_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Chat_vue_vue_type_style_index_1_id_26cc976e_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "8c52":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8cd6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Markdown_vue_vue_type_style_index_0_id_e5d9875e_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b653");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Markdown_vue_vue_type_style_index_0_id_e5d9875e_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Markdown_vue_vue_type_style_index_0_id_e5d9875e_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "9606":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9dbd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatForm_vue_vue_type_style_index_0_id_4c8eb5ba_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e717");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatForm_vue_vue_type_style_index_0_id_4c8eb5ba_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatForm_vue_vue_type_style_index_0_id_4c8eb5ba_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "9fdb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatEmptyState_vue_vue_type_style_index_0_id_12ea8cf4_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("be4e");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatEmptyState_vue_vue_type_style_index_0_id_12ea8cf4_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatEmptyState_vue_vue_type_style_index_0_id_12ea8cf4_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "a38f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ManageSystemSettings_vue_vue_type_style_index_0_id_1027163c_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3a71");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ManageSystemSettings_vue_vue_type_style_index_0_id_1027163c_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ManageSystemSettings_vue_vue_type_style_index_0_id_1027163c_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "a5a2":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_a5a2__;

/***/ }),

/***/ "a735":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b653":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "be4e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c4d2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Chat_vue_vue_type_style_index_0_id_26cc976e_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a735");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Chat_vue_vue_type_style_index_0_id_26cc976e_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Chat_vue_vue_type_style_index_0_id_26cc976e_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "c545":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c784":
/***/ (function(module, exports, __webpack_require__) {

/*! @license DOMPurify 3.4.16 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.16/LICENSE */
(function(global, factory) {
	 true ? module.exports = factory() : undefined;
})(this, function() {
	"use strict";
	function _OverloadYield(e, d) {
		this.v = e, this.k = d;
	}
	function _arrayLikeToArray(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	function _arrayWithHoles(r) {
		if (Array.isArray(r)) return r;
	}
	function _iterableToArrayLimit(r, l) {
		var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
		if (null != t) {
			var e, n, i, u, a = [], f = !0, o = !1;
			try {
				if (i = (t = t.call(r)).next, 0 === l) {
					if (Object(t) !== t) return;
					f = !1;
				} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
			} catch (r) {
				o = !0, n = r;
			} finally {
				try {
					if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
				} finally {
					if (o) throw n;
				}
			}
			return a;
		}
	}
	function _nonIterableRest() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
	function _slicedToArray(r, e) {
		return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
	}
	function _unsupportedIterableToArray(r, a) {
		if (r) {
			if ("string" == typeof r) return _arrayLikeToArray(r, a);
			var t = {}.toString.call(r).slice(8, -1);
			return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
		}
	}
	function AsyncGenerator(e) {
		var t, n;
		function resume(t, n) {
			try {
				var r = e[t](n), o = r.value, u = o instanceof _OverloadYield;
				Promise.resolve(u ? o.v : o).then(function(n) {
					if (u) {
						var i = "return" === t && o.k ? t : "next";
						if (!o.k || n.done) return resume(i, n);
						n = e[i](n).value;
					}
					settle(!!r.done, n);
				}, function(e) {
					resume("throw", e);
				});
			} catch (e) {
				settle(2, e);
			}
		}
		function settle(e, r) {
			2 === e ? t.reject(r) : t.resolve({
				value: r,
				done: e
			}), (t = t.next) ? resume(t.key, t.arg) : n = null;
		}
		this._invoke = function(e, r) {
			return new Promise(function(o, u) {
				var i = {
					key: e,
					arg: r,
					resolve: o,
					reject: u,
					next: null
				};
				n ? n = n.next = i : (t = n = i, resume(e, r));
			});
		}, "function" != typeof e.return && (this.return = void 0);
	}
	AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
		return this;
	}, AsyncGenerator.prototype.next = function(e) {
		return this._invoke("next", e);
	}, AsyncGenerator.prototype.throw = function(e) {
		return this._invoke("throw", e);
	}, AsyncGenerator.prototype.return = function(e) {
		return this._invoke("return", e);
	};
	const entries = Object.entries;
	const setPrototypeOf = Object.setPrototypeOf;
	const isFrozen = Object.isFrozen;
	const getPrototypeOf = Object.getPrototypeOf;
	const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	let freeze = Object.freeze;
	let seal = Object.seal;
	let create = Object.create;
	let _ref = typeof Reflect !== "undefined" && Reflect;
	let apply = _ref.apply;
	let construct = _ref.construct;
	if (!freeze) freeze = function freeze(x) {
		return x;
	};
	if (!seal) seal = function seal(x) {
		return x;
	};
	if (!apply) apply = function apply(func, thisArg) {
		for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
		return func.apply(thisArg, args);
	};
	if (!construct) construct = function construct(Func) {
		for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
		return new Func(...args);
	};
	const arrayForEach = unapply(Array.prototype.forEach);
	Array.prototype.indexOf;
	const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
	const arrayPop = unapply(Array.prototype.pop);
	const arrayPush = unapply(Array.prototype.push);
	Array.prototype.slice;
	const arraySplice = unapply(Array.prototype.splice);
	const arrayIsArray = Array.isArray;
	const stringToLowerCase = unapply(String.prototype.toLowerCase);
	const stringToString = unapply(String.prototype.toString);
	const stringMatch = unapply(String.prototype.match);
	const stringReplace = unapply(String.prototype.replace);
	const stringIndexOf = unapply(String.prototype.indexOf);
	const stringTrim = unapply(String.prototype.trim);
	const numberToString = unapply(Number.prototype.toString);
	const booleanToString = unapply(Boolean.prototype.toString);
	const bigintToString = typeof BigInt === "undefined" ? null : unapply(BigInt.prototype.toString);
	const symbolToString = typeof Symbol === "undefined" ? null : unapply(Symbol.prototype.toString);
	const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
	const objectToString = unapply(Object.prototype.toString);
	const regExpTest = unapply(RegExp.prototype.test);
	const typeErrorCreate = unconstruct(TypeError);
	/**
	* Creates a new function that calls the given function with a specified thisArg and arguments.
	*
	* @param func - The function to be wrapped and called.
	* @returns A new function that calls the given function with a specified thisArg and arguments.
	*/
	function unapply(func) {
		return function(thisArg) {
			if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
			for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
			return apply(func, thisArg, args);
		};
	}
	/**
	* Creates a new function that constructs an instance of the given constructor function with the provided arguments.
	*
	* @param func - The constructor function to be wrapped and called.
	* @returns A new function that constructs an instance of the given constructor function with the provided arguments.
	*/
	function unconstruct(Func) {
		return function() {
			for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
			return construct(Func, args);
		};
	}
	/**
	* Add properties to a lookup table
	*
	* @param set - The set to which elements will be added.
	* @param array - The array containing elements to be added to the set.
	* @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
	* @returns The modified set with added elements.
	*/
	function addToSet(set, array) {
		let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
		if (setPrototypeOf) setPrototypeOf(set, null);
		if (!arrayIsArray(array)) return set;
		let l = array.length;
		while (l--) {
			let element = array[l];
			if (typeof element === "string") {
				const lcElement = transformCaseFunc(element);
				if (lcElement !== element) {
					if (!isFrozen(array)) array[l] = lcElement;
					element = lcElement;
				}
			}
			set[element] = true;
		}
		return set;
	}
	/**
	* Clean up an array to harden against CSPP
	*
	* @param array - The array to be cleaned.
	* @returns The cleaned version of the array
	*/
	function cleanArray(array) {
		for (let index = 0; index < array.length; index++) if (!objectHasOwnProperty(array, index)) array[index] = null;
		return array;
	}
	/**
	* Shallow clone an object
	*
	* @param object - The object to be cloned.
	* @returns A new object that copies the original.
	*/
	function clone(object) {
		const newObject = create(null);
		for (const _ref2 of entries(object)) {
			var _ref3 = _slicedToArray(_ref2, 2);
			const property = _ref3[0];
			const value = _ref3[1];
			if (objectHasOwnProperty(object, property)) {
				if (arrayIsArray(value)) newObject[property] = cleanArray(value);
				else if (value && typeof value === "object" && value.constructor === Object) newObject[property] = clone(value);
				else newObject[property] = value;
			}
		}
		return newObject;
	}
	/**
	* Convert non-node values into strings without depending on direct property access.
	*
	* @param value - The value to stringify.
	* @returns A string representation of the provided value.
	*/
	function stringifyValue(value) {
		switch (typeof value) {
			case "string": return value;
			case "number": return numberToString(value);
			case "boolean": return booleanToString(value);
			case "bigint": return bigintToString ? bigintToString(value) : "0";
			case "symbol": return symbolToString ? symbolToString(value) : "Symbol()";
			case "undefined": return objectToString(value);
			case "function":
			case "object": {
				if (value === null) return objectToString(value);
				const valueAsRecord = value;
				const valueToString = lookupGetter(valueAsRecord, "toString");
				if (typeof valueToString === "function") {
					const stringified = valueToString(valueAsRecord);
					return typeof stringified === "string" ? stringified : objectToString(stringified);
				}
				return objectToString(value);
			}
			default: return objectToString(value);
		}
	}
	/**
	* This method automatically checks if the prop is function or getter and behaves accordingly.
	*
	* @param object - The object to look up the getter function in its prototype chain.
	* @param prop - The property name for which to find the getter function.
	* @returns The getter function found in the prototype chain or a fallback function.
	*/
	function lookupGetter(object, prop) {
		while (object !== null) {
			const desc = getOwnPropertyDescriptor(object, prop);
			if (desc) {
				if (desc.get) return unapply(desc.get);
				if (typeof desc.value === "function") return unapply(desc.value);
			}
			object = getPrototypeOf(object);
		}
		function fallbackValue() {
			return null;
		}
		return fallbackValue;
	}
	function isRegex(value) {
		try {
			regExpTest(value, "");
			return true;
		} catch (_unused) {
			return false;
		}
	}
	const html$1 = freeze([
		"a",
		"abbr",
		"acronym",
		"address",
		"area",
		"article",
		"aside",
		"audio",
		"b",
		"bdi",
		"bdo",
		"big",
		"blink",
		"blockquote",
		"body",
		"br",
		"button",
		"canvas",
		"caption",
		"center",
		"cite",
		"code",
		"col",
		"colgroup",
		"content",
		"data",
		"datalist",
		"dd",
		"decorator",
		"del",
		"details",
		"dfn",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"element",
		"em",
		"fieldset",
		"figcaption",
		"figure",
		"font",
		"footer",
		"form",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hgroup",
		"hr",
		"html",
		"i",
		"img",
		"input",
		"ins",
		"kbd",
		"label",
		"legend",
		"li",
		"main",
		"map",
		"mark",
		"marquee",
		"menu",
		"menuitem",
		"meter",
		"nav",
		"nobr",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"picture",
		"pre",
		"progress",
		"q",
		"rp",
		"rt",
		"ruby",
		"s",
		"samp",
		"search",
		"section",
		"select",
		"shadow",
		"slot",
		"small",
		"source",
		"spacer",
		"span",
		"strike",
		"strong",
		"style",
		"sub",
		"summary",
		"sup",
		"table",
		"tbody",
		"td",
		"template",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"tr",
		"track",
		"tt",
		"u",
		"ul",
		"var",
		"video",
		"wbr"
	]);
	const svg$1 = freeze([
		"svg",
		"a",
		"altglyph",
		"altglyphdef",
		"altglyphitem",
		"animatecolor",
		"animatemotion",
		"animatetransform",
		"circle",
		"clippath",
		"defs",
		"desc",
		"ellipse",
		"enterkeyhint",
		"exportparts",
		"filter",
		"font",
		"g",
		"glyph",
		"glyphref",
		"hkern",
		"image",
		"inputmode",
		"line",
		"lineargradient",
		"marker",
		"mask",
		"metadata",
		"mpath",
		"part",
		"path",
		"pattern",
		"polygon",
		"polyline",
		"radialgradient",
		"rect",
		"stop",
		"style",
		"switch",
		"symbol",
		"text",
		"textpath",
		"title",
		"tref",
		"tspan",
		"view",
		"vkern"
	]);
	const svgFilters = freeze([
		"feBlend",
		"feColorMatrix",
		"feComponentTransfer",
		"feComposite",
		"feConvolveMatrix",
		"feDiffuseLighting",
		"feDisplacementMap",
		"feDistantLight",
		"feDropShadow",
		"feFlood",
		"feFuncA",
		"feFuncB",
		"feFuncG",
		"feFuncR",
		"feGaussianBlur",
		"feImage",
		"feMerge",
		"feMergeNode",
		"feMorphology",
		"feOffset",
		"fePointLight",
		"feSpecularLighting",
		"feSpotLight",
		"feTile",
		"feTurbulence"
	]);
	const svgDisallowed = freeze([
		"animate",
		"color-profile",
		"cursor",
		"discard",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"foreignobject",
		"hatch",
		"hatchpath",
		"mesh",
		"meshgradient",
		"meshpatch",
		"meshrow",
		"missing-glyph",
		"script",
		"set",
		"solidcolor",
		"unknown",
		"use"
	]);
	const mathMl$1 = freeze([
		"math",
		"menclose",
		"merror",
		"mfenced",
		"mfrac",
		"mglyph",
		"mi",
		"mlabeledtr",
		"mmultiscripts",
		"mn",
		"mo",
		"mover",
		"mpadded",
		"mphantom",
		"mroot",
		"mrow",
		"ms",
		"mspace",
		"msqrt",
		"mstyle",
		"msub",
		"msup",
		"msubsup",
		"mtable",
		"mtd",
		"mtext",
		"mtr",
		"munder",
		"munderover",
		"mprescripts"
	]);
	const mathMlDisallowed = freeze([
		"maction",
		"maligngroup",
		"malignmark",
		"mlongdiv",
		"mscarries",
		"mscarry",
		"msgroup",
		"mstack",
		"msline",
		"msrow",
		"semantics",
		"annotation",
		"annotation-xml",
		"mprescripts",
		"none"
	]);
	const text = freeze(["#text"]);
	const html = freeze([
		"accept",
		"action",
		"align",
		"alt",
		"autocapitalize",
		"autocomplete",
		"autopictureinpicture",
		"autoplay",
		"background",
		"bgcolor",
		"border",
		"capture",
		"cellpadding",
		"cellspacing",
		"checked",
		"cite",
		"class",
		"clear",
		"color",
		"cols",
		"colspan",
		"command",
		"commandfor",
		"controls",
		"controlslist",
		"coords",
		"crossorigin",
		"datetime",
		"decoding",
		"default",
		"dir",
		"disabled",
		"disablepictureinpicture",
		"disableremoteplayback",
		"download",
		"draggable",
		"enctype",
		"enterkeyhint",
		"exportparts",
		"face",
		"for",
		"headers",
		"height",
		"hidden",
		"high",
		"href",
		"hreflang",
		"id",
		"inert",
		"inputmode",
		"integrity",
		"ismap",
		"kind",
		"label",
		"lang",
		"list",
		"loading",
		"loop",
		"low",
		"max",
		"maxlength",
		"media",
		"method",
		"min",
		"minlength",
		"multiple",
		"muted",
		"name",
		"nonce",
		"noshade",
		"novalidate",
		"nowrap",
		"open",
		"optimum",
		"part",
		"pattern",
		"placeholder",
		"playsinline",
		"popover",
		"popovertarget",
		"popovertargetaction",
		"poster",
		"preload",
		"pubdate",
		"radiogroup",
		"readonly",
		"rel",
		"required",
		"rev",
		"reversed",
		"role",
		"rows",
		"rowspan",
		"spellcheck",
		"scope",
		"selected",
		"shape",
		"size",
		"sizes",
		"slot",
		"span",
		"srclang",
		"start",
		"src",
		"srcset",
		"step",
		"style",
		"summary",
		"tabindex",
		"title",
		"translate",
		"type",
		"usemap",
		"valign",
		"value",
		"width",
		"wrap",
		"xmlns"
	]);
	const svg = freeze([
		"accent-height",
		"accumulate",
		"additive",
		"alignment-baseline",
		"amplitude",
		"ascent",
		"attributename",
		"attributetype",
		"azimuth",
		"basefrequency",
		"baseline-shift",
		"begin",
		"bias",
		"by",
		"class",
		"clip",
		"clippathunits",
		"clip-path",
		"clip-rule",
		"color",
		"color-interpolation",
		"color-interpolation-filters",
		"color-profile",
		"color-rendering",
		"cx",
		"cy",
		"d",
		"dx",
		"dy",
		"diffuseconstant",
		"direction",
		"display",
		"divisor",
		"dominant-baseline",
		"dur",
		"edgemode",
		"elevation",
		"end",
		"exponent",
		"fill",
		"fill-opacity",
		"fill-rule",
		"filter",
		"filterunits",
		"flood-color",
		"flood-opacity",
		"font-family",
		"font-size",
		"font-size-adjust",
		"font-stretch",
		"font-style",
		"font-variant",
		"font-weight",
		"fx",
		"fy",
		"g1",
		"g2",
		"glyph-name",
		"glyphref",
		"gradientunits",
		"gradienttransform",
		"height",
		"href",
		"id",
		"image-rendering",
		"in",
		"in2",
		"intercept",
		"k",
		"k1",
		"k2",
		"k3",
		"k4",
		"kerning",
		"keypoints",
		"keysplines",
		"keytimes",
		"lang",
		"lengthadjust",
		"letter-spacing",
		"kernelmatrix",
		"kernelunitlength",
		"lighting-color",
		"local",
		"marker-end",
		"marker-mid",
		"marker-start",
		"markerheight",
		"markerunits",
		"markerwidth",
		"maskcontentunits",
		"maskunits",
		"max",
		"mask",
		"mask-type",
		"media",
		"method",
		"mode",
		"min",
		"name",
		"numoctaves",
		"offset",
		"operator",
		"opacity",
		"order",
		"orient",
		"orientation",
		"origin",
		"overflow",
		"paint-order",
		"path",
		"pathlength",
		"patterncontentunits",
		"patterntransform",
		"patternunits",
		"pointer-events",
		"points",
		"preservealpha",
		"preserveaspectratio",
		"primitiveunits",
		"r",
		"rx",
		"ry",
		"radius",
		"refx",
		"refy",
		"repeatcount",
		"repeatdur",
		"restart",
		"result",
		"rotate",
		"scale",
		"seed",
		"shape-rendering",
		"slope",
		"specularconstant",
		"specularexponent",
		"spreadmethod",
		"startoffset",
		"stddeviation",
		"stitchtiles",
		"stop-color",
		"stop-opacity",
		"stroke-dasharray",
		"stroke-dashoffset",
		"stroke-linecap",
		"stroke-linejoin",
		"stroke-miterlimit",
		"stroke-opacity",
		"stroke",
		"stroke-width",
		"style",
		"surfacescale",
		"systemlanguage",
		"tabindex",
		"tablevalues",
		"targetx",
		"targety",
		"transform",
		"transform-origin",
		"text-anchor",
		"text-decoration",
		"text-orientation",
		"text-rendering",
		"textlength",
		"type",
		"u1",
		"u2",
		"unicode",
		"values",
		"vector-effect",
		"viewbox",
		"visibility",
		"version",
		"vert-adv-y",
		"vert-origin-x",
		"vert-origin-y",
		"width",
		"word-spacing",
		"wrap",
		"writing-mode",
		"xchannelselector",
		"ychannelselector",
		"x",
		"x1",
		"x2",
		"xmlns",
		"y",
		"y1",
		"y2",
		"z",
		"zoomandpan"
	]);
	const mathMl = freeze([
		"accent",
		"accentunder",
		"align",
		"bevelled",
		"close",
		"columnalign",
		"columnlines",
		"columnspacing",
		"columnspan",
		"denomalign",
		"depth",
		"dir",
		"display",
		"displaystyle",
		"encoding",
		"fence",
		"frame",
		"height",
		"href",
		"id",
		"largeop",
		"length",
		"linethickness",
		"lquote",
		"lspace",
		"mathbackground",
		"mathcolor",
		"mathsize",
		"mathvariant",
		"maxsize",
		"minsize",
		"movablelimits",
		"notation",
		"numalign",
		"open",
		"rowalign",
		"rowlines",
		"rowspacing",
		"rowspan",
		"rspace",
		"rquote",
		"scriptlevel",
		"scriptminsize",
		"scriptsizemultiplier",
		"selection",
		"separator",
		"separators",
		"stretchy",
		"subscriptshift",
		"supscriptshift",
		"symmetric",
		"voffset",
		"width",
		"xmlns"
	]);
	const xml = freeze([
		"xlink:href",
		"xml:id",
		"xlink:title",
		"xml:space",
		"xmlns:xlink"
	]);
	const MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
	const ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
	const TMPLIT_EXPR = seal(/\${[\w\W]*/g);
	const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
	const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
	const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
	const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
	const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
	const DOCTYPE_NAME = seal(/^html$/i);
	const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
	const ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
	const COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
	const FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
	const SELF_CLOSING_TAG = seal(/\/>/i);
	const NODE_TYPE = {
		element: 1,
		attribute: 2,
		text: 3,
		cdataSection: 4,
		entityReference: 5,
		entityNode: 6,
		processingInstruction: 7,
		comment: 8,
		document: 9,
		documentType: 10,
		documentFragment: 11,
		notation: 12
	};
	const LITERAL_TEXT_ELEMENT_NAMES = [
		"style",
		"script",
		"xmp",
		"iframe",
		"noembed",
		"noframes",
		"plaintext",
		"noscript"
	];
	const LITERAL_TEXT_ELEMENTS = freeze(addToSet({}, LITERAL_TEXT_ELEMENT_NAMES));
	const LITERAL_TEXT_CLOSE = function() {
		const map = {};
		arrayForEach(LITERAL_TEXT_ELEMENT_NAMES, (name) => {
			map[name] = seal(new RegExp("</" + name + "(?=[\\t\\n\\f\\r />])", "i"));
		});
		return freeze(map);
	}();
	const getGlobal = function getGlobal() {
		return typeof window === "undefined" ? null : window;
	};
	/**
	* Creates a no-op policy for internal use only.
	* Don't export this function outside this module!
	* @param trustedTypes The policy factory.
	* @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
	* @return The policy created (or null, if Trusted Types
	* are not supported or creating the policy failed).
	*/
	const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
		if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") return null;
		let suffix = null;
		const ATTR_NAME = "data-tt-policy-suffix";
		if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
		const policyName = "dompurify" + (suffix ? "#" + suffix : "");
		try {
			return trustedTypes.createPolicy(policyName, {
				createHTML(html) {
					return html;
				},
				createScriptURL(scriptUrl) {
					return scriptUrl;
				}
			});
		} catch (_) {
			console.warn("TrustedTypes policy " + policyName + " could not be created.");
			return null;
		}
	};
	const _createHooksMap = function _createHooksMap() {
		return {
			afterSanitizeAttributes: [],
			afterSanitizeElements: [],
			afterSanitizeShadowDOM: [],
			beforeSanitizeAttributes: [],
			beforeSanitizeElements: [],
			beforeSanitizeShadowDOM: [],
			uponSanitizeAttribute: [],
			uponSanitizeElement: [],
			uponSanitizeShadowNode: []
		};
	};
	/**
	* Resolve a set-valued configuration option: a fresh set built from
	* cfg[key] when it is an own array property (seeded with a clone of
	* options.base when given, case-normalized via options.transform),
	* the fallback set otherwise.
	*
	* @param cfg the cloned, prototype-free configuration object
	* @param key the configuration property to read
	* @param fallback the set to use when the option is absent or not an array
	* @param options transform and optional base set to merge into
	* @returns the resolved set
	*/
	const _resolveSetOption = function _resolveSetOption(cfg, key, fallback, options) {
		return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
	};
	/**
	* Resolve an object-valued configuration option: a prototype-free clone
	* of cfg[key] when it is an own, truthy object property, else a fresh
	* fallback built by makeFallback (fresh on every parse, so a previous
	* parse can never leak state into the next one).
	*
	* @param cfg the cloned, prototype-free configuration object
	* @param key the configuration property to read
	* @param makeFallback builds the fallback value when the option is absent
	* @returns the resolved object
	*/
	const _resolveObjectOption = function _resolveObjectOption(cfg, key, makeFallback) {
		const value = objectHasOwnProperty(cfg, key) ? cfg[key] : void 0;
		return value && typeof value === "object" ? clone(value) : makeFallback();
	};
	function createDOMPurify() {
		let window = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
		const DOMPurify = (root) => createDOMPurify(root);
		DOMPurify.version = "3.4.16";
		DOMPurify.removed = [];
		if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
			DOMPurify.isSupported = false;
			return DOMPurify;
		}
		let document = window.document;
		const originalDocument = document;
		const currentScript = originalDocument.currentScript;
		window.DocumentFragment;
		const HTMLTemplateElement = window.HTMLTemplateElement, Node = window.Node, Element = window.Element, NodeFilter = window.NodeFilter;
		window.NamedNodeMap === void 0 && (window.NamedNodeMap || window.MozNamedAttrMap);
		window.HTMLFormElement;
		const DOMParser = window.DOMParser, trustedTypes = window.trustedTypes;
		const ElementPrototype = Element.prototype;
		const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
		const remove = lookupGetter(ElementPrototype, "remove");
		const removeAttributeNode = lookupGetter(ElementPrototype, "removeAttributeNode");
		const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
		const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
		const getParentNode = lookupGetter(ElementPrototype, "parentNode");
		const getShadowRoot = lookupGetter(ElementPrototype, "shadowRoot");
		const getAttributes = lookupGetter(ElementPrototype, "attributes");
		const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeType") : null;
		const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeName") : null;
		const getOwnerDocument = Node && Node.prototype ? lookupGetter(Node.prototype, "ownerDocument") : null;
		const _readNodeType = function _readNodeType(node) {
			return getNodeType ? getNodeType(node) : node.nodeType;
		};
		const _readNodeName = function _readNodeName(node) {
			return getNodeName ? getNodeName(node) : node.nodeName;
		};
		if (typeof HTMLTemplateElement === "function") {
			const template = document.createElement("template");
			if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
		}
		let trustedTypesPolicy;
		let emptyHTML = "";
		let defaultTrustedTypesPolicy;
		let defaultTrustedTypesPolicyResolved = false;
		let IN_TRUSTED_TYPES_POLICY = 0;
		const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy() {
			if (IN_TRUSTED_TYPES_POLICY > 0) throw typeErrorCreate("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
		};
		const _createTrustedHTML = function _createTrustedHTML(html) {
			_assertNotInTrustedTypesPolicy();
			IN_TRUSTED_TYPES_POLICY++;
			try {
				return trustedTypesPolicy.createHTML(html);
			} finally {
				IN_TRUSTED_TYPES_POLICY--;
			}
		};
		const _createTrustedScriptURL = function _createTrustedScriptURL(scriptUrl) {
			_assertNotInTrustedTypesPolicy();
			IN_TRUSTED_TYPES_POLICY++;
			try {
				return trustedTypesPolicy.createScriptURL(scriptUrl);
			} finally {
				IN_TRUSTED_TYPES_POLICY--;
			}
		};
		const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy() {
			if (!defaultTrustedTypesPolicyResolved) {
				defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
				defaultTrustedTypesPolicyResolved = true;
			}
			return defaultTrustedTypesPolicy;
		};
		const _document = document, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
		const importNode = originalDocument.importNode;
		let hooks = _createHooksMap();
		/**
		* Expose whether this browser supports running the full DOMPurify.
		*/
		DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
		const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
		let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
		/**
		* We consider the elements and attributes below to be safe. Ideally
		* don't add any new ones but feel free to remove unwanted ones.
		*/
		let ALLOWED_TAGS = null;
		const DEFAULT_ALLOWED_TAGS = addToSet({}, [
			...html$1,
			...svg$1,
			...svgFilters,
			...mathMl$1,
			...text
		]);
		let ALLOWED_ATTR = null;
		const DEFAULT_ALLOWED_ATTR = addToSet({}, [
			...html,
			...svg,
			...mathMl,
			...xml
		]);
		let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
			tagNameCheck: {
				writable: true,
				configurable: false,
				enumerable: true,
				value: null
			},
			attributeNameCheck: {
				writable: true,
				configurable: false,
				enumerable: true,
				value: null
			},
			allowCustomizedBuiltInElements: {
				writable: true,
				configurable: false,
				enumerable: true,
				value: false
			}
		}));
		let FORBID_TAGS = null;
		let FORBID_ATTR = null;
		const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
			tagCheck: {
				writable: true,
				configurable: false,
				enumerable: true,
				value: null
			},
			attributeCheck: {
				writable: true,
				configurable: false,
				enumerable: true,
				value: null
			}
		}));
		let ALLOW_ARIA_ATTR = true;
		let ALLOW_DATA_ATTR = true;
		let ALLOW_UNKNOWN_PROTOCOLS = false;
		let ALLOW_SELF_CLOSE_IN_ATTR = true;
		let SAFE_FOR_TEMPLATES = false;
		let SAFE_FOR_XML = true;
		let WHOLE_DOCUMENT = false;
		let SET_CONFIG = false;
		let SET_CONFIG_ALLOWED_TAGS = null;
		let SET_CONFIG_ALLOWED_ATTR = null;
		let FORCE_BODY = false;
		let RETURN_DOM = false;
		let RETURN_DOM_FRAGMENT = false;
		let RETURN_TRUSTED_TYPE = false;
		let SANITIZE_DOM = true;
		let SANITIZE_NAMED_PROPS = false;
		const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
		let KEEP_CONTENT = true;
		let IN_PLACE = false;
		let USE_PROFILES = {};
		let FORBID_CONTENTS = null;
		const DEFAULT_FORBID_CONTENTS = addToSet({}, [
			"annotation-xml",
			"audio",
			"colgroup",
			"desc",
			"foreignobject",
			"head",
			"iframe",
			"math",
			"mi",
			"mn",
			"mo",
			"ms",
			"mtext",
			"noembed",
			"noframes",
			"noscript",
			"plaintext",
			"script",
			"selectedcontent",
			"style",
			"svg",
			"template",
			"thead",
			"title",
			"video",
			"xmp"
		]);
		let DATA_URI_TAGS = null;
		const DEFAULT_DATA_URI_TAGS = addToSet({}, [
			"audio",
			"video",
			"img",
			"source",
			"image",
			"track"
		]);
		let URI_SAFE_ATTRIBUTES = null;
		const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
			"alt",
			"class",
			"for",
			"id",
			"label",
			"name",
			"pattern",
			"placeholder",
			"role",
			"summary",
			"title",
			"value",
			"style",
			"xmlns"
		]);
		const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
		const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
		const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
		let NAMESPACE = HTML_NAMESPACE;
		let IS_EMPTY_INPUT = false;
		let ALLOWED_NAMESPACES = null;
		const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
			MATHML_NAMESPACE,
			SVG_NAMESPACE,
			HTML_NAMESPACE
		], stringToString);
		const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze([
			"mi",
			"mo",
			"mn",
			"ms",
			"mtext"
		]);
		let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
		const DEFAULT_HTML_INTEGRATION_POINTS = freeze(["annotation-xml"]);
		let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
		const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
			"title",
			"style",
			"font",
			"a",
			"script"
		]);
		let PARSER_MEDIA_TYPE = null;
		const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
		const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
		let transformCaseFunc = null;
		let CONFIG = null;
		const formElement = document.createElement("form");
		const isRegexOrFunction = function isRegexOrFunction(testValue) {
			return testValue instanceof RegExp || testValue instanceof Function;
		};
		/**
		* _parseConfig
		*
		* @param cfg optional config literal
		*/
		const _parseConfig = function _parseConfig() {
			let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
			if (CONFIG && CONFIG === cfg) return;
			if (!cfg || typeof cfg !== "object") cfg = {};
			cfg = clone(cfg);
			PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
			transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
			ALLOWED_TAGS = _resolveSetOption(cfg, "ALLOWED_TAGS", DEFAULT_ALLOWED_TAGS, { transform: transformCaseFunc });
			ALLOWED_ATTR = _resolveSetOption(cfg, "ALLOWED_ATTR", DEFAULT_ALLOWED_ATTR, { transform: transformCaseFunc });
			ALLOWED_NAMESPACES = _resolveSetOption(cfg, "ALLOWED_NAMESPACES", DEFAULT_ALLOWED_NAMESPACES, { transform: stringToString });
			URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, "ADD_URI_SAFE_ATTR", DEFAULT_URI_SAFE_ATTRIBUTES, {
				transform: transformCaseFunc,
				base: DEFAULT_URI_SAFE_ATTRIBUTES
			});
			DATA_URI_TAGS = _resolveSetOption(cfg, "ADD_DATA_URI_TAGS", DEFAULT_DATA_URI_TAGS, {
				transform: transformCaseFunc,
				base: DEFAULT_DATA_URI_TAGS
			});
			FORBID_CONTENTS = _resolveSetOption(cfg, "FORBID_CONTENTS", DEFAULT_FORBID_CONTENTS, { transform: transformCaseFunc });
			FORBID_TAGS = _resolveSetOption(cfg, "FORBID_TAGS", clone({}), { transform: transformCaseFunc });
			FORBID_ATTR = _resolveSetOption(cfg, "FORBID_ATTR", clone({}), { transform: transformCaseFunc });
			USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === "object" ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
			ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
			ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
			ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
			ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
			SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
			SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
			WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
			RETURN_DOM = cfg.RETURN_DOM || false;
			RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
			RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
			FORCE_BODY = cfg.FORCE_BODY || false;
			SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
			SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
			KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
			IN_PLACE = cfg.IN_PLACE || false;
			IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI;
			NAMESPACE = typeof cfg.NAMESPACE === "string" ? cfg.NAMESPACE : HTML_NAMESPACE;
			MATHML_TEXT_INTEGRATION_POINTS = _resolveObjectOption(cfg, "MATHML_TEXT_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS));
			HTML_INTEGRATION_POINTS = _resolveObjectOption(cfg, "HTML_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS));
			const customElementHandling = _resolveObjectOption(cfg, "CUSTOM_ELEMENT_HANDLING", () => create(null));
			CUSTOM_ELEMENT_HANDLING = create(null);
			if (objectHasOwnProperty(customElementHandling, "tagNameCheck") && isRegexOrFunction(customElementHandling.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck;
			if (objectHasOwnProperty(customElementHandling, "attributeNameCheck") && isRegexOrFunction(customElementHandling.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck;
			if (objectHasOwnProperty(customElementHandling, "allowCustomizedBuiltInElements") && typeof customElementHandling.allowCustomizedBuiltInElements === "boolean") CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements;
			seal(CUSTOM_ELEMENT_HANDLING);
			if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
			if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
			if (USE_PROFILES) {
				ALLOWED_TAGS = addToSet({}, text);
				ALLOWED_ATTR = create(null);
				if (USE_PROFILES.html === true) {
					addToSet(ALLOWED_TAGS, html$1);
					addToSet(ALLOWED_ATTR, html);
				}
				if (USE_PROFILES.svg === true) {
					addToSet(ALLOWED_TAGS, svg$1);
					addToSet(ALLOWED_ATTR, svg);
					addToSet(ALLOWED_ATTR, xml);
				}
				if (USE_PROFILES.svgFilters === true) {
					addToSet(ALLOWED_TAGS, svgFilters);
					addToSet(ALLOWED_ATTR, svg);
					addToSet(ALLOWED_ATTR, xml);
				}
				if (USE_PROFILES.mathMl === true) {
					addToSet(ALLOWED_TAGS, mathMl$1);
					addToSet(ALLOWED_ATTR, mathMl);
					addToSet(ALLOWED_ATTR, xml);
				}
			}
			EXTRA_ELEMENT_HANDLING.tagCheck = null;
			EXTRA_ELEMENT_HANDLING.attributeCheck = null;
			if (objectHasOwnProperty(cfg, "ADD_TAGS")) {
				if (typeof cfg.ADD_TAGS === "function") EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
				else if (arrayIsArray(cfg.ADD_TAGS)) {
					if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
					addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
				}
			}
			if (objectHasOwnProperty(cfg, "ADD_ATTR")) {
				if (typeof cfg.ADD_ATTR === "function") EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
				else if (arrayIsArray(cfg.ADD_ATTR)) {
					if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
					addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
				}
			}
			if (objectHasOwnProperty(cfg, "ADD_FORBID_CONTENTS") && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
				if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
				addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
			}
			if (KEEP_CONTENT) ALLOWED_TAGS["#text"] = true;
			if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
				"html",
				"head",
				"body"
			]);
			if (ALLOWED_TAGS.table) {
				addToSet(ALLOWED_TAGS, ["tbody"]);
				delete FORBID_TAGS.tbody;
			}
			if (cfg.TRUSTED_TYPES_POLICY) {
				if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
				if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
				const previousTrustedTypesPolicy = trustedTypesPolicy;
				trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
				try {
					emptyHTML = _createTrustedHTML("");
				} catch (error) {
					trustedTypesPolicy = previousTrustedTypesPolicy;
					throw error;
				}
			} else if (cfg.TRUSTED_TYPES_POLICY === null) {
				trustedTypesPolicy = void 0;
				emptyHTML = "";
			} else {
				if (trustedTypesPolicy === void 0) trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
				if (trustedTypesPolicy && typeof emptyHTML === "string") emptyHTML = _createTrustedHTML("");
			}
			if (freeze) freeze(cfg);
			CONFIG = cfg;
		};
		const ALL_SVG_TAGS = addToSet({}, [
			...svg$1,
			...svgFilters,
			...svgDisallowed
		]);
		const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
		/**
		* Namespace rules for an element in the SVG namespace.
		*
		* @param tagName the element's lowercase tag name
		* @param parent the (possibly simulated) parent node
		* @param parentTagName the parent's lowercase tag name
		* @returns true if a spec-compliant parser could produce this element
		*/
		const _checkSvgNamespace = function _checkSvgNamespace(tagName, parent, parentTagName) {
			if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "svg";
			if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
			return Boolean(ALL_SVG_TAGS[tagName]);
		};
		/**
		* Namespace rules for an element in the MathML namespace.
		*
		* @param tagName the element's lowercase tag name
		* @param parent the (possibly simulated) parent node
		* @param parentTagName the parent's lowercase tag name
		* @returns true if a spec-compliant parser could produce this element
		*/
		const _checkMathMlNamespace = function _checkMathMlNamespace(tagName, parent, parentTagName) {
			if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "math";
			if (parent.namespaceURI === SVG_NAMESPACE) return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
			return Boolean(ALL_MATHML_TAGS[tagName]);
		};
		/**
		* Namespace rules for an element in the HTML namespace.
		*
		* @param tagName the element's lowercase tag name
		* @param parent the (possibly simulated) parent node
		* @param parentTagName the parent's lowercase tag name
		* @returns true if a spec-compliant parser could produce this element
		*/
		const _checkHtmlNamespace = function _checkHtmlNamespace(tagName, parent, parentTagName) {
			if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
			if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
			return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
		};
		/**
		* @param element a DOM element whose namespace is being checked
		* @returns Return false if the element has a
		*  namespace that a spec-compliant parser would never
		*  return. Return true otherwise.
		*/
		const _checkValidNamespace = function _checkValidNamespace(element) {
			let parent = getParentNode(element);
			if (!parent || !parent.tagName) parent = {
				namespaceURI: NAMESPACE,
				tagName: "template"
			};
			const tagName = stringToLowerCase(element.tagName);
			const parentTagName = stringToLowerCase(parent.tagName);
			if (!ALLOWED_NAMESPACES[element.namespaceURI]) return false;
			if (element.namespaceURI === SVG_NAMESPACE) return _checkSvgNamespace(tagName, parent, parentTagName);
			if (element.namespaceURI === MATHML_NAMESPACE) return _checkMathMlNamespace(tagName, parent, parentTagName);
			if (element.namespaceURI === HTML_NAMESPACE) return _checkHtmlNamespace(tagName, parent, parentTagName);
			if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) return true;
			return false;
		};
		/**
		* _forceRemove
		*
		* @param node a DOM node
		*/
		const _forceRemove = function _forceRemove(node) {
			arrayPush(DOMPurify.removed, { element: node });
			try {
				getParentNode(node).removeChild(node);
			} catch (_) {
				remove(node);
				if (!getParentNode(node)) throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
			}
		};
		/**
		* _stripAttributeNode
		*
		* Remove a single Attr node case/namespace-exactly on an attribute-teardown
		* path. Name-based removeAttribute() ASCII-lowercases its lookup key for an
		* HTML element in an HTML document and so silently misses a case-preserved
		* handler (e.g. `ONERROR` off an XML/XHTML import) - the same defect
		* _removeAttribute() was fixed for, which a name-based call would reintroduce
		* on these IN_PLACE teardown paths. Unlike _removeAttribute this does not
		* record into DOMPurify.removed: the neutralize passes intentionally do not
		* book-keep. A clobbered/detached node falls back to best-effort name-based
		* removal.
		*
		* @param element the element to strip the attribute from
		* @param attribute the Attr node to remove
		* @param name the attribute's name, for the fallback path
		*/
		const _stripAttributeNode = function _stripAttributeNode(element, attribute, name) {
			try {
				removeAttributeNode(element, attribute);
			} catch (_) {
				try {
					element.removeAttribute(name);
				} catch (_) {}
			}
		};
		/**
		* _neutralizeRoot
		*
		* Fail-closed teardown of an in-place root after the sanitize walk aborts
		* (campaign-3 F2). An internal throw mid-walk — e.g. a page-registered
		* custom element's reaction detaches a node so `_forceRemove`'s deliberate
		* parentless guard throws, or any other re-entrant engine mutation — would
		* otherwise leave the caller's *live* tree half-sanitized, with everything
		* after the abort point still carrying its handlers. There is no safe way
		* to resume the walk (the tree mutated under us), so we strip the root bare:
		* remove every child and every attribute, then let the caller's catch see
		* the original error. Clobber-safe (cached `remove`/`childNodes`/`attributes`
		* getters; the root was already clobber-pre-flighted at the IN_PLACE entry).
		*
		* @param root the in-place root to empty
		*/
		const _neutralizeRoot = function _neutralizeRoot(root) {
			_neutralizeSubtree(root);
			const childNodes = getChildNodes(root);
			if (childNodes) {
				const snapshot = [];
				arrayForEach(childNodes, (child) => {
					arrayPush(snapshot, child);
				});
				arrayForEach(snapshot, (child) => {
					try {
						remove(child);
					} catch (_) {}
				});
			}
			const attributes = getAttributes(root);
			if (attributes) for (let i = attributes.length - 1; i >= 0; --i) {
				const attribute = attributes[i];
				const name = attribute && attribute.name;
				if (typeof name === "string") _stripAttributeNode(root, attribute, name);
			}
		};
		/**
		* _removeAttribute
		*
		* Name-based getAttributeNode()/removeAttribute() ASCII-lowercase their
		* lookup key for HTML elements in an HTML document, so they silently miss an
		* attribute whose stored qualified name still contains uppercase ASCII
		* letters. That happens when the node came from a case-preserving source
		* (an XML/XHTML document imported via importNode(), or createAttributeNS()),
		* where e.g. `ONERROR` survives the walk: the policy check lowercases to
		* `onerror` and rejects it, but `removeAttribute('ONERROR')` looks up
		* `onerror` and finds nothing. Remove the exact Attr node instead, which is
		* case- and namespace-exact, and fall back to name-based removal only when
		* the caller could not supply the node.
		*
		* @param name an Attribute name
		* @param element a DOM node
		* @param attr the exact Attr node to remove, when the caller has it
		*/
		const _removeAttribute = function _removeAttribute(name, element, attr) {
			if (!attr) try {
				attr = element.getAttributeNode(name);
			} catch (_) {
				attr = null;
			}
			arrayPush(DOMPurify.removed, {
				attribute: attr || null,
				from: element
			});
			try {
				if (attr) removeAttributeNode(element, attr);
				else element.removeAttribute(name);
			} catch (_) {
				try {
					element.removeAttribute(name);
				} catch (_) {}
			}
			if (name === "is") {
				if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
					_forceRemove(element);
				} catch (_) {}
				else try {
					element.setAttribute(name, "");
				} catch (_) {}
			}
		};
		/**
		* _stripDisallowedAttributes
		*
		* Removes every attribute the active configuration does not allow from a
		* single element, using the same allowlist as the main attribute pass (so
		* `on*` handlers go, but no `/^on/` blocklist is introduced). Used only to
		* neutralise nodes that are being discarded from an in-place tree.
		*
		* @param element the element to strip
		*/
		const _stripDisallowedAttributes = function _stripDisallowedAttributes(element) {
			const attributes = getAttributes(element);
			if (!attributes) return;
			for (let i = attributes.length - 1; i >= 0; --i) {
				const attribute = attributes[i];
				const name = attribute && attribute.name;
				if (typeof name !== "string" || ALLOWED_ATTR[transformCaseFunc(name)]) continue;
				_stripAttributeNode(element, attribute, name);
			}
		};
		/**
		* _neutralizeSubtree
		*
		* Completes the audit-5 F1 fix across every removal path. The KEEP_CONTENT
		* move-hoist neutralises only disallowed-tag removals; clobber, mXSS-canary,
		* namespace, comment, processing-instruction and KEEP_CONTENT:false removals
		* all drop their subtree wholesale via `_forceRemove`. On the IN_PLACE path
		* those dropped nodes are detached from the caller's LIVE tree but a
		* handler-bearing original among them (an `<img onerror>`/`<video>` that was
		* loading) keeps its queued resource event, which fires in page scope after
		* sanitize returns. This walks a removed subtree and strips every attribute
		* the active configuration does not allow — so `on*` handlers are cancelled
		* through the SAME allowlist that governs kept nodes, not a separate `/^on/`
		* blocklist. Run synchronously before sanitize returns, i.e. before any
		* queued event can fire. Hook-free by design: these nodes leave the output,
		* so firing attribute hooks for them would be surprising. Clobber-safe reads;
		* a doomed clobbered node may shadow `removeAttribute` (its own attributes are
		* irrelevant — it is discarded — while its non-clobbered descendants, e.g.
		* the `<img>`, are reached and scrubbed).
		*
		* @param root the root of a removed subtree to neutralise
		*/
		const _neutralizeSubtree = function _neutralizeSubtree(root) {
			const stack = [root];
			while (stack.length > 0) {
				const node = stack.pop();
				if (_readNodeType(node) === NODE_TYPE.element) _stripDisallowedAttributes(node);
				const childNodes = getChildNodes(node);
				if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push(childNodes[i]);
			}
		};
		/**
		* _neutralizePatchLinkage
		*
		* IN_PLACE entry pre-pass (declarative-partial-updates / streaming
		* hardening, https://github.com/WICG/declarative-partial-updates).
		*
		* The main walk strips patch linkage (`for`/`patchsrc`) and removes range
		* markers (PIs / markup comments) node-by-node, in document order, AS it
		* reaches each node. On a live in-place root that leaves a window: from the
		* moment the root is connected until the walk arrives at a given node, that
		* node's linkage is live. A patch applied on connection/stream can fire as
		* a microtask during the walk and inject or teleport an unsanitized DOM
		* range into a region the iterator has already passed and will not revisit,
		* so the post-return "tree is sanitized" contract is violated. Sweep the
		* whole tree once up front and sever every linkage before the walk begins,
		* closing that window.
		*
		* This CANNOT undo a patch that already fired before sanitize ran — that is
		* the irreducible "do not IN_PLACE a live-connected attacker tree" caveat —
		* but it closes everything from sanitize-start onward. Gated on SAFE_FOR_XML
		* to group with the rest of the declarative-partial-updates handling and
		* stay overridable, consistent with the codebase.
		*
		* Clobber-safe traversal (cached childNodes getter); per-node try/catch so a
		* clobbered root cannot defeat the sweep of its non-clobbered descendants.
		*
		* NOTE (pending real-Chrome confirmation, see test/declarative-patch-probe
		* .html Q1): this mirrors the existing policy of keeping `for` on
		* <label>/<output>. If the shipping feature can drive a patch through a
		* surviving `for`-on-label/output + `id` pair, this pre-pass and the
		* attribute check at _isBasicCustomElement's caller must additionally drop
		* that pair on the IN_PLACE path. Left as-is until the taxonomy is verified.
		*
		* @param root the in-place root to sweep
		*/
		/**
		* Central policy for declarative-partial-updates patch-linkage attributes,
		* shared by the _neutralizePatchLinkage pre-pass and _isValidAttribute so
		* the two sites cannot drift: `patchsrc` always links, `for` links
		* everywhere except on <label>/<output>, and the whole policy is gated on
		* SAFE_FOR_XML (see the rationale block in _isValidAttribute).
		*
		* @param lcName the transformCaseFunc'd attribute name
		* @param lcTag the transformCaseFunc'd tag name of the carrying element
		* @return true if the attribute is patch linkage and must be dropped
		*/
		const _isPatchLinkageAttribute = function _isPatchLinkageAttribute(lcName, lcTag) {
			if (!SAFE_FOR_XML) return false;
			if (lcName === "patchsrc") return true;
			return lcName === "for" && lcTag !== "label" && lcTag !== "output";
		};
		const _neutralizePatchLinkage = function _neutralizePatchLinkage(root) {
			if (!SAFE_FOR_XML) return;
			const stack = [root];
			while (stack.length > 0) {
				const node = stack.pop();
				const nodeType = _readNodeType(node);
				if (nodeType === NODE_TYPE.processingInstruction || nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, node.data)) {
					try {
						remove(node);
					} catch (_) {}
					continue;
				}
				if (nodeType === NODE_TYPE.element) {
					const element = node;
					const lcTag = transformCaseFunc(_readNodeName(node));
					try {
						if (element.hasAttribute && element.hasAttribute("patchsrc")) element.removeAttribute("patchsrc");
						if (element.hasAttribute && element.hasAttribute("for") && _isPatchLinkageAttribute("for", lcTag)) element.removeAttribute("for");
					} catch (_) {}
				}
				const childNodes = getChildNodes(node);
				if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push(childNodes[i]);
			}
		};
		/**
		* _initDocument
		*
		* @param dirty - a string of dirty markup
		* @return a DOM, filled with the dirty markup
		*/
		const _initDocument = function _initDocument(dirty) {
			let doc = null;
			let leadingWhitespace = null;
			if (FORCE_BODY) dirty = "<remove></remove>" + dirty;
			else {
				const matches = stringMatch(dirty, /^[\r\n\t ]+/);
				leadingWhitespace = matches && matches[0];
			}
			if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) dirty = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + dirty + "</body></html>";
			const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
			if (NAMESPACE === HTML_NAMESPACE) try {
				doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
			} catch (_) {}
			if (!doc || !doc.documentElement) {
				doc = implementation.createDocument(NAMESPACE, "template", null);
				try {
					doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
				} catch (_) {}
			}
			const body = doc.body || doc.documentElement;
			if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
			if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
			return WHOLE_DOCUMENT ? doc.documentElement : body;
		};
		/**
		* Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
		*
		* @param root The root element or node to start traversing on.
		* @return The created NodeIterator
		*/
		const _createNodeIterator = function _createNodeIterator(root) {
			const doc = getOwnerDocument ? getOwnerDocument(root) : root.ownerDocument;
			return createNodeIterator.call(doc || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
		};
		/**
		* Replace template expression syntax (mustache, ERB, template
		* literal) with a space; shared by all SAFE_FOR_TEMPLATES scrub
		* sites. Order matters: mustache, then ERB, then template literal.
		*
		* @param value the string to scrub
		* @returns the scrubbed string
		*/
		const _stripTemplateExpressions = function _stripTemplateExpressions(value) {
			value = stringReplace(value, MUSTACHE_EXPR$1, " ");
			value = stringReplace(value, ERB_EXPR$1, " ");
			value = stringReplace(value, TMPLIT_EXPR$1, " ");
			return value;
		};
		/**
		* Strip template-engine expressions ({{...}}, ${...}, <%...%>) from the
		* character data of an element subtree. Used as the final safety net for
		* SAFE_FOR_TEMPLATES on every DOM-returning code path so that expressions
		* which only form after text-node normalization (e.g. fragments split across
		* stripped elements) cannot survive into a template-evaluating framework.
		*
		* Walks text/comment/CDATA/processing-instruction nodes and mutates `.data`
		* in place rather than round-tripping through innerHTML. This preserves
		* descendant node references (important for IN_PLACE callers), avoids a
		* serialize/reparse cycle, and reads literal character data — which means
		* `<%...%>` in text content matches the ERB regex against its real bytes
		* instead of the HTML-entity-escaped form innerHTML would produce.
		*
		* Attribute values are not visited here; SAFE_FOR_TEMPLATES handling for
		* attributes is performed during the per-node `_sanitizeAttributes` pass.
		*
		* @param node The root element whose character data should be scrubbed.
		*/
		const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
			var _node$querySelectorAl;
			node.normalize();
			const doc = getOwnerDocument ? getOwnerDocument(node) : node.ownerDocument;
			const walker = createNodeIterator.call(doc || node, node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION, null);
			let currentNode = walker.nextNode();
			while (currentNode) {
				currentNode.data = _stripTemplateExpressions(currentNode.data);
				currentNode = walker.nextNode();
			}
			const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, "template");
			if (templates) arrayForEach(templates, (tmpl) => {
				if (_isDocumentFragment(tmpl.content)) _scrubTemplateExpressions2(tmpl.content);
			});
		};
		/**
		* _isClobbered
		*
		* Detect DOM-clobbering on HTMLFormElement nodes. Form is the only HTML
		* interface with [LegacyOverrideBuiltIns]; a descendant element with a
		* `name` attribute matching a prototype property shadows that property
		* on direct reads. We use this check at the IN_PLACE entry-point and
		* during attribute sanitization to refuse clobbered forms.
		*
		* @param element element to check for clobbering attacks
		* @return true if clobbered, false if safe
		*/
		const _isClobbered = function _isClobbered(element) {
			const realTagName = getNodeName ? getNodeName(element) : null;
			if (typeof realTagName !== "string") return false;
			if (transformCaseFunc(realTagName) !== "form") return false;
			return typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || element.attributes !== getAttributes(element) || typeof element.removeAttribute !== "function" || typeof element.removeAttributeNode !== "function" || typeof element.getAttributeNode !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function" || element.nodeType !== getNodeType(element) || element.childNodes !== getChildNodes(element);
		};
		/**
		* Checks whether the given value is a DocumentFragment from any realm.
		*
		* The realm-independent replacement reads `nodeType` through the cached
		* Node.prototype getter and compares to the DOCUMENT_FRAGMENT_NODE
		* constant (11). nodeType is a numeric value resolved from the node's
		* internal slot, identical across realms for the same kind of node.
		*
		* @param value object to check
		* @return true if value is a DocumentFragment-shaped node from any realm
		*/
		const _isDocumentFragment = function _isDocumentFragment(value) {
			if (!getNodeType || typeof value !== "object" || value === null) return false;
			try {
				return getNodeType(value) === NODE_TYPE.documentFragment;
			} catch (_) {
				return false;
			}
		};
		/**
		* Checks whether the given object is a DOM node, including nodes that
		* originate from a different window/realm (e.g. an iframe's
		* contentDocument). The previous `value instanceof Node` check was
		* realm-bound: nodes from a different window failed it, causing
		* sanitize() to silently stringify them and reset IN_PLACE to false,
		* returning the original node unsanitized. See GHSA-4w3q-35jp-p934.
		*
		* @param value object to check whether it's a DOM node
		* @return true if value is a DOM node from any realm
		*/
		const _isNode = function _isNode(value) {
			if (!getNodeType || typeof value !== "object" || value === null) return false;
			try {
				return typeof getNodeType(value) === "number";
			} catch (_) {
				return false;
			}
		};
		function _executeHooks(hooks, currentNode, data) {
			if (hooks.length === 0) return;
			arrayForEach(hooks, (hook) => {
				hook.call(DOMPurify, currentNode, data, CONFIG);
			});
		}
		/**
		* Structural-threat checks that condemn a node regardless of the
		* allowlists: mXSS via namespace confusion, risky CSS construction,
		* processing instructions, markup-bearing comments. Pure predicate;
		* the caller removes. Check order is load-bearing.
		*
		* @param currentNode the node to inspect
		* @param tagName the node's transformCaseFunc'd tag name
		* @return true if the node must be removed
		*/
		const _isUnsafeNode = function _isUnsafeNode(currentNode, tagName) {
			if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) return true;
			if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && LITERAL_TEXT_ELEMENTS[tagName] && (_isNode(currentNode.firstElementChild) || typeof currentNode.textContent === "string" && regExpTest(LITERAL_TEXT_CLOSE[tagName], currentNode.textContent))) return true;
			if (currentNode.nodeType === NODE_TYPE.processingInstruction) return true;
			if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) return true;
			return false;
		};
		/**
		* Evaluate a CUSTOM_ELEMENT_HANDLING check (a RegExp or a predicate
		* function, per the validation in _parseConfig) against a name.
		* Additional arguments are forwarded to predicate functions - the
		* attributeNameCheck predicate receives the tag name as its second
		* argument. A null/absent check never matches.
		*
		* @param check the configured tagNameCheck / attributeNameCheck value
		* @param name the name to test
		* @param args extra arguments forwarded to a predicate function
		* @return true if the check matches the name
		*/
		const _matchesNameCheck = function _matchesNameCheck(check, name) {
			if (check instanceof RegExp) return regExpTest(check, name);
			if (check instanceof Function) {
				for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
				return Boolean(check(name, ...args));
			}
			return false;
		};
		/**
		* Handle a node whose tag is forbidden or not allowlisted: keep
		* allowed custom elements (false return exits _sanitizeElements
		* early - the namespace and fallback-tag removal checks are
		* intentionally skipped for kept custom elements), else hoist
		* content per KEEP_CONTENT and remove.
		*
		* A kept custom element is the ONLY case in which this function
		* returns false, so the caller uses that return value to run the
		* afterSanitizeElements hook on the kept element and keep the
		* element-hook lifecycle consistent with normal allowlisted
		* elements (GHSA-c2j3-45gr-mqc4).
		*
		* @param currentNode the disallowed node
		* @param tagName the node's transformCaseFunc'd tag name
		* @return true if the node was removed, false if kept
		*/
		const _sanitizeDisallowedNode = function _sanitizeDisallowedNode(currentNode, tagName, root) {
			if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
			if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
				const parentNode = getParentNode(currentNode);
				const childNodes = getChildNodes(currentNode);
				if (childNodes && parentNode) {
					const childCount = childNodes.length;
					for (let i = childCount - 1; i >= 0; --i) {
						const hoisted = currentNode === root ? cloneNode(childNodes[i], true) : childNodes[i];
						parentNode.insertBefore(hoisted, getNextSibling(currentNode));
					}
				}
			}
			_forceRemove(currentNode);
			return true;
		};
		/**
		* Fork a hook-mutable allowlist off its shared binding the first time a
		* (possibly lazily-installed) uponSanitize* hook is about to see it, so the
		* hook cannot widen the per-instance default or the setConfig binding by
		* reference and leak past the call. Returns the set unchanged once it is
		* already call-local, so repeated calls across elements are idempotent.
		*
		* @param hookList the uponSanitize* hook array for this event
		* @param set the current ALLOWED_TAGS / ALLOWED_ATTR binding
		* @param defaultSet the per-instance DEFAULT_ALLOWED_* constant
		* @param setConfigSet the captured setConfig() binding, or null
		* @return a call-local clone if a hook is present and set is still shared,
		*   else set unchanged
		*/
		const _forkSharedAllowlist = function _forkSharedAllowlist(hookList, set, defaultSet, setConfigSet) {
			if (hookList.length === 0) return set;
			return set === defaultSet || set === setConfigSet ? clone(set) : set;
		};
		/**
		* Shared guard for a node that a hook has detached from the walk tree,
		* used after each element-hook site in _sanitizeElements. Detaching is a
		* long-standing user pattern (issue #469; draw.io-style foreignObject
		* filtering). Per the cached, unclobberable parentNode getter the node is
		* genuinely out of the tree, so it can reach neither the serialized
		* output nor an IN_PLACE live tree; treat it as removed and stop
		* processing it. Without this guard, the unsafe-node / namespace checks
		* would call _forceRemove on a parentless node and hit the REPORT-3
		* fail-closed throw — which exists for nodes DOMPurify wants gone but
		* *cannot* detach (clobbered / parentless roots), the opposite of a node
		* that is already safely gone. The walk root is exempt: a detached
		* IN_PLACE root is legitimate input and must still be fully sanitized,
		* and a kill-decision on it must keep hitting the REPORT-3 throw.
		*
		* Nodes detached by hooks stay the hook's responsibility for placement:
		* they are not recorded in DOMPurify.removed, so the post-walk IN_PLACE
		* pass (which iterates DOMPurify.removed) does not reach them. But a
		* hook-detached subtree can still hold a queued resource-event handler -
		* e.g. an <img onload> that began loading when the caller built the live
		* tree - which fires in page scope after sanitize returns even though the
		* handler never reached the returned tree. That is the audit-5 F1 hazard,
		* and the documented node.remove() hook pattern walks straight into it.
		* So on the IN_PLACE path we neutralize the detached subtree inline,
		* stripping its non-allow-listed attributes before returning, exactly as
		* the post-walk pass does for _forceRemove'd subtrees.
		*
		* @param currentNode the node a hook may have detached
		* @param root the current walk root
		* @return true if the node is detached and now handled, false otherwise
		*/
		const _handleHookDetachedNode = function _handleHookDetachedNode(currentNode, root) {
			if (currentNode === root || getParentNode(currentNode) !== null) return false;
			if (IN_PLACE) _neutralizeSubtree(currentNode);
			return true;
		};
		/**
		* _sanitizeElements
		*
		* @protect nodeName
		* @protect textContent
		* @protect removeChild
		* @param currentNode to check for permission to exist
		* @return true if node was killed, false if left alive
		*/
		const _sanitizeElements = function _sanitizeElements(currentNode, root) {
			_executeHooks(hooks.beforeSanitizeElements, currentNode, null);
			if (_handleHookDetachedNode(currentNode, root)) return true;
			if (_isClobbered(currentNode)) {
				_forceRemove(currentNode);
				return true;
			}
			const tagName = transformCaseFunc(_readNodeName(currentNode));
			ALLOWED_TAGS = _forkSharedAllowlist(hooks.uponSanitizeElement, ALLOWED_TAGS, DEFAULT_ALLOWED_TAGS, SET_CONFIG_ALLOWED_TAGS);
			_executeHooks(hooks.uponSanitizeElement, currentNode, {
				tagName,
				allowedTags: ALLOWED_TAGS
			});
			if (_handleHookDetachedNode(currentNode, root)) return true;
			if (_isUnsafeNode(currentNode, tagName)) {
				_forceRemove(currentNode);
				return true;
			}
			if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
				const removed = _sanitizeDisallowedNode(currentNode, tagName, root);
				if (removed === false) {
					_executeHooks(hooks.afterSanitizeElements, currentNode, null);
					if (_handleHookDetachedNode(currentNode, root)) return true;
				}
				return removed;
			}
			if (_readNodeType(currentNode) === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
				_forceRemove(currentNode);
				return true;
			}
			if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
				_forceRemove(currentNode);
				return true;
			}
			if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
				const content = _stripTemplateExpressions(currentNode.textContent);
				if (currentNode.textContent !== content) {
					arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
					currentNode.textContent = content;
				}
			}
			_executeHooks(hooks.afterSanitizeElements, currentNode, null);
			return _handleHookDetachedNode(currentNode, root);
		};
		/**
		* _isValidAttribute
		*
		* @param lcTag Lowercase tag name of containing element.
		* @param lcName Lowercase attribute name.
		* @param value Attribute value.
		* @return Returns true if `value` is valid, otherwise false.
		*/
		const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
			if (FORBID_ATTR[lcName]) return false;
			if (_isPatchLinkageAttribute(lcName, lcTag)) return false;
			if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document || value in formElement)) return false;
			const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
			if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) return true;
			if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) return true;
			if (!nameIsPermitted) return _isBasicCustomElement(lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName, lcTag) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value);
			if (URI_SAFE_ATTRIBUTES[lcName]) return true;
			if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
			if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) return true;
			if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
			return !value;
		};
		const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, [
			"annotation-xml",
			"color-profile",
			"font-face",
			"font-face-format",
			"font-face-name",
			"font-face-src",
			"font-face-uri",
			"missing-glyph"
		]);
		/**
		* _isBasicCustomElement
		* checks if at least one dash is included in tagName, and it's not the first char
		* for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
		*
		* @param tagName name of the tag of the node to sanitize
		* @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
		*/
		const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
			return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
		};
		/**
		* Wrap an attribute value in the matching Trusted Types object when
		* the active policy requires it. Namespaced attributes pass through
		* unchanged (no TT support yet, see
		* https://bugs.chromium.org/p/chromium/issues/detail?id=1305293).
		*
		* @param lcTag lowercase tag name of the containing element
		* @param lcName lowercase attribute name
		* @param namespaceURI the attribute's namespace, if any
		* @param value the attribute value to wrap
		* @return the value, wrapped when Trusted Types demand it
		*/
		const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value) {
			if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function" && !namespaceURI) switch (trustedTypes.getAttributeType(lcTag, lcName)) {
				case "TrustedHTML": return _createTrustedHTML(value);
				case "TrustedScriptURL": return _createTrustedScriptURL(value);
			}
			return value;
		};
		/**
		* Write a modified attribute value back onto the element. On
		* success, re-probe for clobbering introduced by the new value and
		* remove the element when found; otherwise, when this writeback is the
		* recreate half of the SANITIZE_NAMED_PROPS remove-and-recreate, pop the
		* removal entry that path recorded so it does not show as removed. On
		* failure, remove the attribute instead.
		*
		* Returns true only on a clean write (the value was set and the new value
		* introduced no clobbering). The caller uses that, together with its own
		* knowledge of whether this attribute pushed a DOMPurify.removed record, to
		* decide whether to pop that record. The pop must happen ONLY for the
		* named-prop remove-and-recreate; popping on any other value change (trim,
		* template scrubbing, Trusted Types) would consume an unrelated _forceRemove
		* subtree-cleanup record and let that detached subtree keep a live event
		* handler through the IN_PLACE neutralization pass (SO-001).
		*
		* @param currentNode the element carrying the attribute
		* @param name the attribute name as present on the element
		* @param namespaceURI the attribute's namespace, if any
		* @param value the new attribute value
		* @return true if the value was written without introducing clobbering
		*/
		const _setAttributeValue = function _setAttributeValue(currentNode, name, namespaceURI, value) {
			try {
				if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
				else currentNode.setAttribute(name, value);
				if (_isClobbered(currentNode)) {
					_forceRemove(currentNode);
					return false;
				}
				return true;
			} catch (_) {
				_removeAttribute(name, currentNode);
				return false;
			}
		};
		/**
		* _sanitizeAttributes
		*
		* @protect attributes
		* @protect nodeName
		* @protect removeAttribute
		* @protect setAttribute
		*
		* @param currentNode to sanitize
		* @param root the current walk root
		*/
		const _sanitizeAttributes = function _sanitizeAttributes(currentNode, root) {
			_executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
			if (_handleHookDetachedNode(currentNode, root)) return;
			const attributes = currentNode.attributes;
			if (!attributes || _isClobbered(currentNode)) return;
			ALLOWED_ATTR = _forkSharedAllowlist(hooks.uponSanitizeAttribute, ALLOWED_ATTR, DEFAULT_ALLOWED_ATTR, SET_CONFIG_ALLOWED_ATTR);
			const hookEvent = {
				attrName: "",
				attrValue: "",
				keepAttr: true,
				allowedAttributes: ALLOWED_ATTR,
				forceKeepAttr: void 0
			};
			let l = attributes.length;
			const lcTag = transformCaseFunc(currentNode.nodeName);
			while (l--) {
				const attr = attributes[l];
				const name = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
				const lcName = transformCaseFunc(name);
				const initValue = attrValue;
				let value = name === "value" ? initValue : stringTrim(initValue);
				let recreatedNamedProp = false;
				hookEvent.attrName = lcName;
				hookEvent.attrValue = value;
				hookEvent.keepAttr = true;
				hookEvent.forceKeepAttr = void 0;
				_executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
				value = hookEvent.attrValue;
				if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name") && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
					_removeAttribute(name, currentNode, attr);
					value = SANITIZE_NAMED_PROPS_PREFIX + value;
					recreatedNamedProp = true;
				}
				if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
					_removeAttribute(name, currentNode, attr);
					continue;
				}
				if (lcName === "attributename" && stringMatch(value, "href")) {
					_removeAttribute(name, currentNode, attr);
					continue;
				}
				if (hookEvent.forceKeepAttr) continue;
				if (!hookEvent.keepAttr) {
					_removeAttribute(name, currentNode, attr);
					continue;
				}
				if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
					_removeAttribute(name, currentNode, attr);
					continue;
				}
				if (SAFE_FOR_TEMPLATES) value = _stripTemplateExpressions(value);
				if (!_isValidAttribute(lcTag, lcName, value)) {
					_removeAttribute(name, currentNode, attr);
					continue;
				}
				value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
				if (value !== initValue) {
					if (_setAttributeValue(currentNode, name, namespaceURI, value) && recreatedNamedProp) arrayPop(DOMPurify.removed);
				}
			}
			_executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
			_handleHookDetachedNode(currentNode, root);
		};
		/**
		* _sanitizeShadowDOM
		*
		* @param fragment to iterate over recursively
		*/
		const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
			let shadowNode = null;
			const shadowIterator = _createNodeIterator(fragment);
			_executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
			while (shadowNode = shadowIterator.nextNode()) {
				_executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
				_sanitizeElements(shadowNode, fragment);
				_sanitizeAttributes(shadowNode, fragment);
				if (_isDocumentFragment(shadowNode.content)) _sanitizeShadowDOM2(shadowNode.content);
				if (_readNodeType(shadowNode) === NODE_TYPE.element) {
					const innerSr = getShadowRoot(shadowNode);
					if (_isDocumentFragment(innerSr)) {
						_sanitizeAttachedShadowRoots(innerSr);
						_sanitizeShadowDOM2(innerSr);
					}
				}
			}
			_executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
		};
		/**
		* _sanitizeAttachedShadowRoots
		*
		* Walks `root` and feeds every attached shadow root we encounter into
		* the existing _sanitizeShadowDOM pipeline. The default node iterator
		* does not descend into shadow trees, so nodes inside an attached
		* shadow root would otherwise be skipped entirely.
		*
		* Two real input paths put attached shadow roots in front of us:
		*   1. IN_PLACE on a DOM node that already has shadow roots attached.
		*   2. DOM-node input where importNode(dirty, true) deep-clones the
		*      shadow root because it was created with `clonable: true`.
		*
		* This pass runs once, up front, so the main iteration loop (and the
		* existing _sanitizeShadowDOM template-content recursion) stay
		* untouched — string-input paths are not affected.
		*
		* @param root the subtree root to walk for attached shadow roots
		*/
		const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots(root) {
			const stack = [{
				node: root,
				shadow: null
			}];
			while (stack.length > 0) {
				const item = stack.pop();
				if (item.shadow) {
					_sanitizeShadowDOM2(item.shadow);
					continue;
				}
				const node = item.node;
				const isElement = _readNodeType(node) === NODE_TYPE.element;
				const childNodes = getChildNodes(node);
				if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push({
					node: childNodes[i],
					shadow: null
				});
				if (isElement) {
					const rootName = getNodeName ? getNodeName(node) : null;
					if (typeof rootName === "string" && transformCaseFunc(rootName) === "template") {
						const content = node.content;
						if (_isDocumentFragment(content)) stack.push({
							node: content,
							shadow: null
						});
					}
				}
				if (isElement) {
					const sr = getShadowRoot(node);
					if (_isDocumentFragment(sr)) stack.push({
						node: null,
						shadow: sr
					}, {
						node: sr,
						shadow: null
					});
				}
			}
		};
		DOMPurify.sanitize = function(dirty) {
			let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
			let body = null;
			let importedNode = null;
			let currentNode = null;
			let returnNode = null;
			IS_EMPTY_INPUT = !dirty;
			if (IS_EMPTY_INPUT) dirty = "<!-->";
			if (typeof dirty !== "string" && !_isNode(dirty)) {
				dirty = stringifyValue(dirty);
				if (typeof dirty !== "string") throw typeErrorCreate("dirty is not a string, aborting");
			}
			if (!DOMPurify.isSupported) return dirty;
			if (SET_CONFIG) {
				ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
				ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
			} else _parseConfig(cfg);
			if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) ALLOWED_TAGS = clone(ALLOWED_TAGS);
			if (hooks.uponSanitizeAttribute.length > 0) ALLOWED_ATTR = clone(ALLOWED_ATTR);
			DOMPurify.removed = [];
			const inPlace = IN_PLACE && typeof dirty !== "string" && _isNode(dirty);
			if (inPlace) {
				_neutralizePatchLinkage(dirty);
				const nn = _readNodeName(dirty);
				if (typeof nn === "string") {
					const tagName = transformCaseFunc(nn);
					if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
						_neutralizeRoot(dirty);
						throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
					}
				}
				if (_isClobbered(dirty)) {
					_neutralizeRoot(dirty);
					throw typeErrorCreate("root node is clobbered and cannot be sanitized in-place");
				}
				try {
					_sanitizeAttachedShadowRoots(dirty);
				} catch (error) {
					_neutralizeRoot(dirty);
					throw error;
				}
			} else if (_isNode(dirty)) {
				body = _initDocument("<!---->");
				importedNode = body.ownerDocument.importNode(dirty, true);
				if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") body = importedNode;
				else if (importedNode.nodeName === "HTML") body = importedNode;
				else body.appendChild(importedNode);
				_sanitizeAttachedShadowRoots(body);
			} else {
				if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
				body = _initDocument(dirty);
				if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
			}
			if (body && FORCE_BODY) _forceRemove(body.firstChild);
			const walkRoot = inPlace ? dirty : body;
			try {
				const nodeIterator = _createNodeIterator(walkRoot);
				while (currentNode = nodeIterator.nextNode()) {
					_sanitizeElements(currentNode, walkRoot);
					_sanitizeAttributes(currentNode, walkRoot);
					if (_isDocumentFragment(currentNode.content)) _sanitizeShadowDOM2(currentNode.content);
				}
			} catch (error) {
				if (inPlace) {
					_neutralizeRoot(dirty);
					arrayForEach(DOMPurify.removed, (entry) => {
						if (entry.element) _neutralizeSubtree(entry.element);
					});
				}
				throw error;
			}
			if (inPlace) {
				let rootWasRemoved = false;
				arrayForEach(DOMPurify.removed, (entry) => {
					if (entry.element) {
						if (entry.element === dirty) rootWasRemoved = true;
						_neutralizeSubtree(entry.element);
					}
				});
				if (rootWasRemoved) throw typeErrorCreate("a node selected for removal could not be safely returned; refusing to sanitize in place");
				if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(dirty);
				return dirty;
			}
			if (RETURN_DOM) {
				if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(body);
				if (RETURN_DOM_FRAGMENT) {
					returnNode = createDocumentFragment.call(body.ownerDocument);
					while (body.firstChild) returnNode.appendChild(body.firstChild);
				} else returnNode = body;
				if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) returnNode = importNode.call(originalDocument, returnNode, true);
				return returnNode;
			}
			let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
			if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
			if (SAFE_FOR_TEMPLATES) serializedHTML = _stripTemplateExpressions(serializedHTML);
			return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
		};
		DOMPurify.setConfig = function() {
			let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
			_parseConfig(cfg);
			SET_CONFIG = true;
			SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
			SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
		};
		DOMPurify.clearConfig = function() {
			CONFIG = null;
			SET_CONFIG = false;
			SET_CONFIG_ALLOWED_TAGS = null;
			SET_CONFIG_ALLOWED_ATTR = null;
			trustedTypesPolicy = defaultTrustedTypesPolicy;
			emptyHTML = "";
		};
		DOMPurify.isValidAttribute = function(tag, attr, value) {
			if (!CONFIG) _parseConfig({});
			const lcTag = transformCaseFunc(tag);
			const lcName = transformCaseFunc(attr);
			return _isValidAttribute(lcTag, lcName, value);
		};
		DOMPurify.addHook = function(entryPoint, hookFunction) {
			if (typeof hookFunction !== "function") return;
			if (!objectHasOwnProperty(hooks, entryPoint)) return;
			arrayPush(hooks[entryPoint], hookFunction);
		};
		DOMPurify.removeHook = function(entryPoint, hookFunction) {
			if (!objectHasOwnProperty(hooks, entryPoint)) return;
			if (hookFunction !== void 0) {
				const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
				return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
			}
			return arrayPop(hooks[entryPoint]);
		};
		DOMPurify.removeHooks = function(entryPoint) {
			if (!objectHasOwnProperty(hooks, entryPoint)) return;
			hooks[entryPoint] = [];
		};
		DOMPurify.removeAllHooks = function() {
			hooks = _createHooksMap();
		};
		return DOMPurify;
	}
	return createDOMPurify();
});

//# sourceMappingURL=purify.js.map

/***/ }),

/***/ "ca48":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatMessagesList_vue_vue_type_style_index_0_id_ea3eff4a_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7238");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatMessagesList_vue_vue_type_style_index_0_id_ea3eff4a_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatMessagesList_vue_vue_type_style_index_0_id_ea3eff4a_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "d701":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatAgentSteps_vue_vue_type_style_index_0_id_1310a232_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3b23");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatAgentSteps_vue_vue_type_style_index_0_id_1310a232_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatAgentSteps_vue_vue_type_style_index_0_id_1310a232_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e717":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f4fa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ChatIndexPage", function() { return /* reexport */ ChatIndexPage; });
__webpack_require__.d(__webpack_exports__, "ManageSiteSettings", function() { return /* reexport */ ManageSiteSettings; });
__webpack_require__.d(__webpack_exports__, "ManageSystemSettings", function() { return /* reexport */ ManageSystemSettings; });
__webpack_require__.d(__webpack_exports__, "Markdown", function() { return /* reexport */ Markdown; });
__webpack_require__.d(__webpack_exports__, "IconAi", function() { return /* reexport */ IconAi; });
__webpack_require__.d(__webpack_exports__, "ChatIcon", function() { return /* reexport */ ChatIcon; });
__webpack_require__.d(__webpack_exports__, "Chat", function() { return /* reexport */ Chat; });
__webpack_require__.d(__webpack_exports__, "ChatForm", function() { return /* reexport */ ChatForm; });
__webpack_require__.d(__webpack_exports__, "ChatLoading", function() { return /* reexport */ ChatLoading; });
__webpack_require__.d(__webpack_exports__, "ChatMessage", function() { return /* reexport */ ChatMessage; });
__webpack_require__.d(__webpack_exports__, "ChatMessagesList", function() { return /* reexport */ ChatMessagesList; });
__webpack_require__.d(__webpack_exports__, "InsightTrigger", function() { return /* reexport */ InsightTrigger; });
__webpack_require__.d(__webpack_exports__, "InsightOverlay", function() { return /* reexport */ InsightOverlay; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Pages/ChatIndexPage.vue?vue&type=template&id=12181830&scoped=true

const _withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-12181830"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const _hoisted_1 = {
  class: "ai-chat-page ai-chat-theme"
};
const _hoisted_2 = {
  class: "ai-chat-page__bar"
};
const _hoisted_3 = {
  class: "ai-chat-page__mark",
  "aria-hidden": "true"
};
const _hoisted_4 = {
  class: "ai-chat-page__title"
};
const _hoisted_5 = ["aria-label", "title"];
const _hoisted_6 = {
  key: 0,
  class: "ai-chat-page__notice",
  role: "note"
};
const _hoisted_7 = ["href"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconAi = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("IconAi");
  const _component_ChatIcon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatIcon");
  const _component_Chat = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Chat");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("header", _hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_IconAi, {
    "ai-name": _ctx.aiName
  }, null, 8, ["ai-name"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", _hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.aiLabel), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "ai-chat-page__new",
    "aria-label": _ctx.newConversationText,
    title: _ctx.newConversationText,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.newConversation && _ctx.newConversation(...args))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatIcon, {
    name: "plus",
    size: 16
  }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.newConversationText), 1)], 8, _hoisted_5)]), _ctx.modelNotice && _ctx.modelNotice.message ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.modelNotice.message) + " ", 1), _ctx.modelNotice.settingsUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    href: _ctx.modelNotice.settingsUrl
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.modelNotice.settingsLabel), 9, _hoisted_7)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Chat, {
    key: _ctx.conversationKey,
    ref: "chat",
    class: "ai-chat-page__chat",
    variant: "page",
    "show-empty-state": "",
    "ai-name": _ctx.aiName,
    "ai-label": _ctx.aiLabel,
    "ai-color": _ctx.aiColor,
    "api-method": _ctx.apiMethod
  }, null, 8, ["ai-name", "ai-label", "ai-color", "api-method"]))]);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Pages/ChatIndexPage.vue?vue&type=template&id=12181830&scoped=true

// EXTERNAL MODULE: external "CoreHome"
var external_CoreHome_ = __webpack_require__("19dc");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/Chat.vue?vue&type=template&id=26cc976e&scoped=true

const Chatvue_type_template_id_26cc976e_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-26cc976e"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const Chatvue_type_template_id_26cc976e_scoped_true_hoisted_1 = {
  class: "ai-chat-composer"
};
const Chatvue_type_template_id_26cc976e_scoped_true_hoisted_2 = {
  class: "ai-chat-sr-only",
  "aria-live": "polite",
  "aria-atomic": "true"
};
function Chatvue_type_template_id_26cc976e_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChatEmptyState = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatEmptyState");
  const _component_ChatMessagesList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatMessagesList");
  const _component_ChatForm = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatForm");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(['ai-chat', 'ai-chat-theme', `ai-chat--${_ctx.variant}`])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatMessagesList, {
    loading: _ctx.loading,
    errored: _ctx.errored,
    "error-message": _ctx.errorMessage,
    "error-settings-url": _ctx.errorSettingsUrl,
    "error-settings-label": _ctx.errorSettingsLabel,
    recommendation: _ctx.recommendation,
    messages: _ctx.displayMessages,
    "ai-name": _ctx.aiName,
    "ai-label": _ctx.aiLabel,
    streaming: _ctx.streaming
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    _: 2
  }, [_ctx.showEmptyState ? {
    name: "empty",
    fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatEmptyState, {
      "ai-name": _ctx.aiName,
      "ai-label": _ctx.aiLabel,
      onSuggest: _ctx.onSuggestion
    }, null, 8, ["ai-name", "ai-label", "onSuggest"])]),
    key: "0"
  } : undefined]), 1032, ["loading", "errored", "error-message", "error-settings-url", "error-settings-label", "recommendation", "messages", "ai-name", "ai-label", "streaming"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Chatvue_type_template_id_26cc976e_scoped_true_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatForm, {
    ref: "form",
    loading: _ctx.loading || _ctx.streaming,
    "ai-label": _ctx.aiLabel,
    onPrompt: _ctx.onSubmit
  }, null, 8, ["loading", "ai-label", "onPrompt"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", Chatvue_type_template_id_26cc976e_scoped_true_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.announcement), 1)], 2);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/Chat.vue?vue&type=template&id=26cc976e&scoped=true

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatForm.vue?vue&type=template&id=4c8eb5ba&scoped=true

const ChatFormvue_type_template_id_4c8eb5ba_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-4c8eb5ba"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_1 = {
  class: "ai-chat-form__box"
};
const ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_2 = ["for"];
const ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_3 = ["id", "rows", "placeholder", "aria-describedby"];
const ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_4 = ["aria-label", "title", "disabled"];
const ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_5 = ["id"];
function ChatFormvue_type_template_id_4c8eb5ba_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChatIcon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatIcon");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("form", {
    class: "ai-chat-form",
    onSubmit: _cache[2] || (_cache[2] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])((...args) => _ctx.onSubmit && _ctx.onSubmit(...args), ["prevent"]))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    for: _ctx.inputId,
    class: "ai-chat-sr-only"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.placeholderText), 9, ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("textarea", {
    id: _ctx.inputId,
    ref: "input",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.prompt = $event),
    name: "chat-prompt",
    class: "ai-chat-form__input",
    rows: _ctx.rows,
    placeholder: _ctx.placeholderText,
    "aria-describedby": _ctx.hintId,
    onKeydown: _cache[1] || (_cache[1] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withKeys"])((...args) => _ctx.onEnter && _ctx.onEnter(...args), ["enter"]))
  }, null, 40, ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_3), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.prompt]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "submit",
    class: "ai-chat-form__send",
    "aria-label": _ctx.submitText,
    title: _ctx.submitText,
    disabled: _ctx.loading || !_ctx.prompt.trim()
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatIcon, {
    name: "send",
    size: 18
  })], 8, ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_4)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", {
    id: _ctx.hintId,
    class: "ai-chat-form__hint"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.hintText), 9, ChatFormvue_type_template_id_4c8eb5ba_scoped_true_hoisted_5)], 32);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatForm.vue?vue&type=template&id=4c8eb5ba&scoped=true

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Icon/ChatIcon.vue?vue&type=template&id=6b51a7c0

const ChatIconvue_type_template_id_6b51a7c0_hoisted_1 = ["width", "height"];
const ChatIconvue_type_template_id_6b51a7c0_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M12 19V5"
}, null, -1);
const ChatIconvue_type_template_id_6b51a7c0_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "m5 12 7-7 7 7"
}, null, -1);
const ChatIconvue_type_template_id_6b51a7c0_hoisted_4 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M12 5v14"
}, null, -1);
const ChatIconvue_type_template_id_6b51a7c0_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "m19 12-7 7-7-7"
}, null, -1);
const ChatIconvue_type_template_id_6b51a7c0_hoisted_6 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("rect", {
  x: "9",
  y: "9",
  width: "12",
  height: "12",
  rx: "2"
}, null, -1);
const ChatIconvue_type_template_id_6b51a7c0_hoisted_7 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
}, null, -1);
const _hoisted_8 = {
  key: 3,
  d: "M20 6 9 17l-5-5"
};
const _hoisted_9 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M18 6 6 18"
}, null, -1);
const _hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "m6 6 12 12"
}, null, -1);
const _hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M12 8v5"
}, null, -1);
const _hoisted_12 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M12 16.5v.01"
}, null, -1);
const _hoisted_13 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}, null, -1);
const _hoisted_14 = {
  key: 6,
  d: "m9 6 6 6-6 6"
};
const _hoisted_15 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M12 5v14"
}, null, -1);
const _hoisted_16 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M5 12h14"
}, null, -1);
const _hoisted_17 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createStaticVNode"])("<path d=\"M4 6h10\"></path><path d=\"M4 12h16\"></path><path d=\"M4 18h7\"></path><circle cx=\"17\" cy=\"6\" r=\"2\"></circle><circle cx=\"14\" cy=\"18\" r=\"2\"></circle>", 5);
function ChatIconvue_type_template_id_6b51a7c0_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", {
    width: _ctx.size,
    height: _ctx.size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
    focusable: "false"
  }, [_ctx.name === 'send' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [ChatIconvue_type_template_id_6b51a7c0_hoisted_2, ChatIconvue_type_template_id_6b51a7c0_hoisted_3], 64)) : _ctx.name === 'arrow-down' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [ChatIconvue_type_template_id_6b51a7c0_hoisted_4, ChatIconvue_type_template_id_6b51a7c0_hoisted_5], 64)) : _ctx.name === 'copy' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 2
  }, [ChatIconvue_type_template_id_6b51a7c0_hoisted_6, ChatIconvue_type_template_id_6b51a7c0_hoisted_7], 64)) : _ctx.name === 'check' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("path", _hoisted_8)) : _ctx.name === 'close' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 4
  }, [_hoisted_9, _hoisted_10], 64)) : _ctx.name === 'error' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 5
  }, [_hoisted_11, _hoisted_12, _hoisted_13], 64)) : _ctx.name === 'chevron' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("path", _hoisted_14)) : _ctx.name === 'plus' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 7
  }, [_hoisted_15, _hoisted_16], 64)) : _ctx.name === 'tool' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 8
  }, [_hoisted_17], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 8, ChatIconvue_type_template_id_6b51a7c0_hoisted_1);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Icon/ChatIcon.vue?vue&type=template&id=6b51a7c0

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Icon/ChatIcon.vue?vue&type=script&lang=ts

/* harmony default export */ var ChatIconvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 16
    }
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Icon/ChatIcon.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Icon/ChatIcon.vue



ChatIconvue_type_script_lang_ts.render = ChatIconvue_type_template_id_6b51a7c0_render

/* harmony default export */ var ChatIcon = (ChatIconvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatForm.vue?vue&type=script&lang=ts



const MAX_ROWS = 6;
let formCount = 0;
/* harmony default export */ var ChatFormvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    ChatIcon: ChatIcon
  },
  props: {
    aiLabel: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['prompt'],
  data() {
    formCount += 1;
    return {
      prompt: '',
      inputId: `ai-chat-input-${formCount}`,
      hintId: `ai-chat-input-hint-${formCount}`
    };
  },
  computed: {
    submitText() {
      return Object(external_CoreHome_["translate"])('ChatGPT_Submit');
    },
    placeholderText() {
      return Object(external_CoreHome_["translate"])('ChatGPT_MessagePlaceholder', this.aiLabel);
    },
    hintText() {
      return Object(external_CoreHome_["translate"])('ChatGPT_ComposerHint');
    },
    // grows with the typed lines, browsers supporting field-sizing grow with wrapped lines too
    rows() {
      return Math.min(MAX_ROWS, Math.max(1, this.prompt.split('\n').length));
    }
  },
  methods: {
    onEnter(event) {
      // Shift+Enter adds a line, and Enter validating an IME composition must not send
      if (event.shiftKey || event.isComposing) {
        return;
      }
      event.preventDefault();
      this.onSubmit();
    },
    onSubmit() {
      if (this.loading || !this.prompt.trim()) {
        return;
      }
      this.$emit('prompt', {
        role: 'user',
        content: this.prompt
      });
      this.prompt = '';
    },
    submitPrompt(text) {
      this.prompt = text;
      this.onSubmit();
    },
    focus() {
      const input = this.$refs.input;
      if (input) {
        input.focus();
      }
    }
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatForm.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatForm.vue?vue&type=style&index=0&id=4c8eb5ba&lang=less&scoped=true
var ChatFormvue_type_style_index_0_id_4c8eb5ba_lang_less_scoped_true = __webpack_require__("9dbd");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatForm.vue





ChatFormvue_type_script_lang_ts.render = ChatFormvue_type_template_id_4c8eb5ba_scoped_true_render
ChatFormvue_type_script_lang_ts.__scopeId = "data-v-4c8eb5ba"

/* harmony default export */ var ChatForm = (ChatFormvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatMessagesList.vue?vue&type=template&id=ea3eff4a&scoped=true

const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-ea3eff4a"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_1 = {
  class: "ai-chat-messages"
};
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_2 = {
  ref: "content",
  class: "ai-chat-column"
};
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_3 = {
  key: 0,
  class: "ai-chat-notice",
  role: "note"
};
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_4 = ["href"];
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_5 = {
  key: 2,
  class: "ai-chat-thread"
};
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_6 = {
  key: 3,
  class: "ai-chat-error",
  role: "alert"
};
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_7 = {
  class: "ai-chat-error__text"
};
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_8 = {
  class: "ai-chat-error__message"
};
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_9 = ["href"];
const ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_10 = ["aria-label", "title"];
function ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChatMessage = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatMessage");
  const _component_ChatLoading = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatLoading");
  const _component_ChatIcon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatIcon");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    ref: "root",
    class: "ai-chat-scroll",
    onScroll: _cache[0] || (_cache[0] = (...args) => _ctx.onScroll && _ctx.onScroll(...args)),
    onWheelPassive: _cache[1] || (_cache[1] = (...args) => _ctx.onManualScroll && _ctx.onManualScroll(...args)),
    onTouchmovePassive: _cache[2] || (_cache[2] = (...args) => _ctx.onManualScroll && _ctx.onManualScroll(...args)),
    onKeydown: _cache[3] || (_cache[3] = (...args) => _ctx.onScrollKey && _ctx.onScrollKey(...args)),
    onPointerdown: _cache[4] || (_cache[4] = (...args) => _ctx.onPointerDown && _ctx.onPointerDown(...args))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_2, [_ctx.recommendation ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate(_ctx.recommendation.message)) + " ", 1), _ctx.recommendation.url ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    href: _ctx.recommendation.url,
    class: "ai-chat-notice-action"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate(_ctx.recommendation.action)), 9, ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_4)) : _ctx.recommendation.askAdministrator ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_AskAdministrator')), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.messages.length && !_ctx.loading && !_ctx.errored ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "empty", {
    key: 1
  }, undefined, true) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.messages.length || _ctx.loading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ol", ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_5, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.messages, (message, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ChatMessage, {
      key: index,
      index: index,
      message: message,
      "ai-name": _ctx.aiName,
      "ai-label": _ctx.aiLabel,
      "is-streaming": _ctx.streaming && index === _ctx.messages.length - 1 && message.role === 'assistant'
    }, null, 8, ["index", "message", "ai-name", "ai-label", "is-streaming"]);
  }), 128)), _ctx.loading && !_ctx.streaming && !_ctx.errored ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ChatLoading, {
    key: 0,
    index: _ctx.messages.length,
    "ai-name": _ctx.aiName
  }, null, 8, ["index", "ai-name"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.errored ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatIcon, {
    name: "error",
    size: 18,
    class: "ai-chat-error__icon"
  }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.errorMessage), 1), _ctx.errorSettingsUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    href: _ctx.errorSettingsUrl,
    class: "ai-chat-settings-link"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.errorSettingsLabel), 9, ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_9)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 512)], 544), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "ai-chat-scroll-latest",
    "aria-label": _ctx.scrollToLatestText,
    title: _ctx.scrollToLatestText,
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.scrollToLatest && _ctx.scrollToLatest(...args))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatIcon, {
    name: "arrow-down",
    size: 18
  })], 8, ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_hoisted_10), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showScrollButton]])]);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatMessagesList.vue?vue&type=template&id=ea3eff4a&scoped=true

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatMessage.vue?vue&type=template&id=3e167524&scoped=true

const ChatMessagevue_type_template_id_3e167524_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-3e167524"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_1 = ["data-message-index"];
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_2 = {
  key: 0,
  class: "ai-chat-message__question"
};
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_3 = {
  class: "ai-chat-sr-only"
};
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_4 = {
  class: "ai-chat-message__avatar",
  "aria-hidden": "true"
};
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_5 = {
  class: "ai-chat-message__answer"
};
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_6 = {
  class: "ai-chat-sr-only"
};
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_7 = {
  key: 2,
  class: "ai-chat-message__caret",
  "aria-hidden": "true"
};
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_8 = {
  key: 3,
  class: "ai-chat-message__actions"
};
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_9 = ["aria-label", "title"];
const ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_10 = {
  "aria-hidden": "true"
};
function ChatMessagevue_type_template_id_3e167524_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconAi = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("IconAi");
  const _component_ChatAgentSteps = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatAgentSteps");
  const _component_Markdown = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Markdown");
  const _component_ChatIcon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatIcon");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(['ai-chat-message', `ai-chat-message--${_ctx.isUser ? 'user' : 'assistant'}`, {
      'ai-chat-message--with-steps': !_ctx.isUser && _ctx.message.steps && _ctx.message.steps.length
    }]),
    "data-message-index": _ctx.index
  }, [_ctx.isUser ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_You')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.message.content), 1)])) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_IconAi, {
    "ai-name": _ctx.aiName
  }, null, 8, ["ai-name"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.aiLabel), 1), _ctx.message.steps && _ctx.message.steps.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ChatAgentSteps, {
    key: 0,
    steps: _ctx.message.steps
  }, null, 8, ["steps"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.message.content ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Markdown, {
    key: 1,
    markdown: _ctx.message.content,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'ai-chat-markdown--streaming': _ctx.isStreaming
    })
  }, null, 8, ["markdown", "class"])) : _ctx.isStreaming ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_7)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.isStreaming && _ctx.message.content ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "ai-chat-icon-button",
    "aria-label": _ctx.copied ? _ctx.copiedText : _ctx.copyText,
    title: _ctx.copied ? _ctx.copiedText : _ctx.copyText,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.copyAnswer && _ctx.copyAnswer(...args))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatIcon, {
    name: _ctx.copied ? 'check' : 'copy',
    size: 14
  }, null, 8, ["name"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.copied ? _ctx.copiedText : _ctx.copyText), 1)], 8, ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_9)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 64))], 10, ChatMessagevue_type_template_id_3e167524_scoped_true_hoisted_1);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatMessage.vue?vue&type=template&id=3e167524&scoped=true

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Markdown.vue?vue&type=template&id=e5d9875e

const Markdownvue_type_template_id_e5d9875e_hoisted_1 = ["innerHTML"];
function Markdownvue_type_template_id_e5d9875e_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: "ai-chat-markdown",
    innerHTML: _ctx.sanitizedHtml
  }, null, 8, Markdownvue_type_template_id_e5d9875e_hoisted_1);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Markdown.vue?vue&type=template&id=e5d9875e

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/clipboard.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
async function writeToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // plain http Matomo installs have no Clipboard API
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.className = 'ai-chat-sr-only';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}
// EXTERNAL MODULE: ./plugins/ChatGPT/node_modules/dompurify/dist/purify.js
var purify = __webpack_require__("c784");
var purify_default = /*#__PURE__*/__webpack_require__.n(purify);

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/sanitizeHtml.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// The markdown rendered in the chat comes from the AI model, whose answers are built from report
// data (page titles, referrers...) that third parties can control: treat it as untrusted HTML.
const ALLOWED_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins', 'a', 'code', 'pre', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'input' // tasklists
];
const ALLOWED_ATTR = ['href', 'title', 'align', 'type', 'checked', 'disabled'];
// dedicated instance, so the hooks below do not apply to other DOMPurify users of the page
const purifier = purify_default()(window);
purifier.addHook('afterSanitizeAttributes', node => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
  // tasklist checkboxes only
  if (node.tagName === 'INPUT') {
    node.setAttribute('type', 'checkbox');
    node.setAttribute('disabled', 'disabled');
  }
});
function sanitizeHtml(html) {
  if (!html) {
    return '';
  }
  return purifier.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false
  });
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/highlightCode.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
const KEYWORDS = ['async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'of', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'yield', 'echo', 'public', 'private', 'protected', 'static', 'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'GROUP', 'BY', 'ORDER', 'LIMIT', 'JOIN', 'LEFT', 'ON', 'AS', 'INSERT', 'INTO', 'UPDATE', 'SET', 'VALUES'];
const LITERALS = ['true', 'false', 'null', 'undefined', 'NaN', 'window', 'document'];
const TOKEN_PATTERN = new RegExp([
// 1 comments: line, block, HTML
'(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|<!--[\\s\\S]*?-->|#(?![\\w{])[^\\n]*)',
// 2 a quoted key followed by a colon (JSON, object literals)
'("(?:[^"\\\\\\n]|\\\\.)*"(?=\\s*:))',
// 3 strings
'("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`)',
// 4 HTML tags names
'(<\\/?[A-Za-z][\\w:-]*|\\/>)',
// 5 numbers
'(\\b\\d+(?:\\.\\d+)?\\b)',
// 6 words, classified below
'([A-Za-z_$][\\w$]*)'].join('|'), 'g');
function tokenizeCode(code) {
  const tokens = [];
  let last = 0;
  const push = (type, text) => {
    const previous = tokens[tokens.length - 1];
    if (!type && previous && !previous.type) {
      previous.text += text;
    } else {
      tokens.push({
        type,
        text
      });
    }
  };
  code.replace(TOKEN_PATTERN, (match, comment, key, string, tag, number, word, offset) => {
    if (offset > last) {
      push(null, code.slice(last, offset));
    }
    last = offset + match.length;
    if (comment) {
      push('comment', match);
    } else if (key) {
      push('property', match);
    } else if (string) {
      push('string', match);
    } else if (tag) {
      push('tag', match);
    } else if (number) {
      push('number', match);
    } else if (word && KEYWORDS.includes(word)) {
      push('keyword', match);
    } else if (word && LITERALS.includes(word)) {
      push('literal', match);
    } else if (word && /^\s*\(/.test(code.slice(last))) {
      push('function', match);
    } else {
      push(null, match);
    }
    return match;
  });
  if (last < code.length) {
    push(null, code.slice(last));
  }
  return tokens;
}
/**
 * Replaces the text of a code element with highlighted spans, built with text nodes only.
 */
function highlightCode(element) {
  const doc = element.ownerDocument;
  const tokens = tokenizeCode(element.textContent || '');
  element.textContent = '';
  tokens.forEach(token => {
    if (!token.type) {
      element.appendChild(doc.createTextNode(token.text));
      return;
    }
    const span = doc.createElement('span');
    span.className = `ai-chat-code-${token.type}`;
    span.textContent = token.text;
    element.appendChild(span);
  });
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/wrapWideBlocks.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


function wrapScrollable(element, className, label) {
  const wrapper = element.ownerDocument.createElement('div');
  wrapper.className = className;
  // keyboard users scroll a wide table or code block with the arrow keys once it has the focus
  wrapper.setAttribute('tabindex', '0');
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', label);
  element.replaceWith(wrapper);
  wrapper.appendChild(element);
}
/**
 * Wraps the tables and code blocks of already sanitized HTML in their own scrolling box, so a wide
 * answer never widens the conversation, and highlights the code. Only static attributes and text
 * nodes are added, nothing from the answer is parsed as HTML again.
 */
function wrapWideBlocks(safeHtml) {
  if (!safeHtml || typeof document === 'undefined') {
    return safeHtml;
  }
  const template = document.createElement('template');
  template.innerHTML = safeHtml;
  template.content.querySelectorAll('table').forEach(table => {
    wrapScrollable(table, 'ai-chat-table-scroll', Object(external_CoreHome_["translate"])('ChatGPT_ScrollableTable'));
  });
  template.content.querySelectorAll('pre code').forEach(code => highlightCode(code));
  template.content.querySelectorAll('pre').forEach(pre => {
    wrapScrollable(pre, 'ai-chat-code-scroll', Object(external_CoreHome_["translate"])('ChatGPT_ScrollableCode'));
    // the copy button sits outside the scrolling box, so it stays visible on long lines
    const block = template.ownerDocument.createElement('div');
    block.className = 'ai-chat-code-block';
    const scroll = pre.parentElement;
    scroll.replaceWith(block);
    block.appendChild(scroll);
    const copy = template.ownerDocument.createElement('button');
    copy.type = 'button';
    copy.className = 'ai-chat-icon-button ai-chat-code-copy';
    copy.textContent = Object(external_CoreHome_["translate"])('ChatGPT_CopyCode');
    block.appendChild(copy);
  });
  return template.innerHTML;
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Markdown.vue?vue&type=script&lang=ts





// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
  Converter
} = __webpack_require__("5f41");
const COPIED_FEEDBACK_MS = 2000;
const converter = new Converter({
  headerLevelStart: 3,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
  disableForced4SpacesIndentedSublists: true
});
/* harmony default export */ var Markdownvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  computed: {
    sanitizedHtml() {
      const rawHtml = converter.makeHtml(this.markdown);
      return wrapWideBlocks(sanitizeHtml(rawHtml));
    }
  },
  // the copy buttons of the code blocks are rendered HTML, one listener serves them all; being
  // real buttons, the keyboard activates them with a click event too
  mounted() {
    this.$el.addEventListener('click', this.onClick);
  },
  beforeUnmount() {
    this.$el.removeEventListener('click', this.onClick);
  },
  methods: {
    async onClick(event) {
      var _button$parentElement;
      const button = event.target.closest('.ai-chat-code-copy');
      const code = button === null || button === void 0 || (_button$parentElement = button.parentElement) === null || _button$parentElement === void 0 ? void 0 : _button$parentElement.querySelector('pre');
      if (!button || !code) {
        return;
      }
      try {
        await writeToClipboard(code.textContent || '');
      } catch (_unused) {
        return;
      }
      button.textContent = Object(external_CoreHome_["translate"])('ChatGPT_CodeCopied');
      window.setTimeout(() => {
        button.textContent = Object(external_CoreHome_["translate"])('ChatGPT_CopyCode');
      }, COPIED_FEEDBACK_MS);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Markdown.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Markdown.vue?vue&type=style&index=0&id=e5d9875e&lang=less
var Markdownvue_type_style_index_0_id_e5d9875e_lang_less = __webpack_require__("8cd6");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Markdown.vue





Markdownvue_type_script_lang_ts.render = Markdownvue_type_template_id_e5d9875e_render

/* harmony default export */ var Markdown = (Markdownvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatAgentSteps.vue?vue&type=template&id=1310a232&scoped=true

const ChatAgentStepsvue_type_template_id_1310a232_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-1310a232"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_1 = ["aria-expanded", "aria-controls", "title"];
const ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_2 = {
  class: "ai-chat-steps__summary"
};
const ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_3 = {
  key: 0,
  class: "ai-chat-steps__failed"
};
const ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_4 = ["id"];
const ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_5 = {
  class: "ai-chat-step__text"
};
const ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_6 = {
  class: "ai-chat-step__title"
};
const ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_7 = {
  key: 0,
  class: "ai-chat-step__name"
};
const ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_8 = {
  class: "ai-chat-sr-only"
};
function ChatAgentStepsvue_type_template_id_1310a232_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChatIcon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatIcon");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(['ai-chat-steps', `ai-chat-steps--${_ctx.overallStatus}`])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "ai-chat-steps__toggle",
    "aria-expanded": _ctx.expanded ? 'true' : 'false',
    "aria-controls": _ctx.listId,
    title: _ctx.summary,
    onClick: _cache[0] || (_cache[0] = $event => _ctx.expanded = !_ctx.expanded)
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(['ai-chat-steps__status', `ai-chat-steps__status--${_ctx.overallStatus}`])
  }, null, 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.summary), 1), _ctx.failedCount > 0 && _ctx.overallStatus !== 'running' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_AgentStepsFailed', _ctx.failedCount)), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatIcon, {
    name: "chevron",
    size: 14,
    class: "ai-chat-steps__chevron"
  })], 8, ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ol", {
    id: _ctx.listId,
    class: "ai-chat-steps__list"
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.steps, step => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: step.id,
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(['ai-chat-step', `ai-chat-step--${step.status}`])
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(['ai-chat-steps__status', `ai-chat-steps__status--${step.status}`])
    }, null, 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(step.title || step.name), 1), step.name && step.name !== step.title ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("code", ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(step.name), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.statusLabel(step)), 1)])], 2);
  }), 128))], 8, ChatAgentStepsvue_type_template_id_1310a232_scoped_true_hoisted_4), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.expanded]])], 2);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatAgentSteps.vue?vue&type=template&id=1310a232&scoped=true

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatAgentSteps.vue?vue&type=script&lang=ts



let stepsCount = 0;
/* harmony default export */ var ChatAgentStepsvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    ChatIcon: ChatIcon
  },
  props: {
    steps: {
      type: Array,
      required: true
    }
  },
  data() {
    stepsCount += 1;
    return {
      expanded: false,
      listId: `ai-chat-steps-${stepsCount}`
    };
  },
  computed: {
    runningStep() {
      return [...this.steps].reverse().find(step => step.status === 'running');
    },
    failedCount() {
      return this.steps.filter(step => step.status === 'error').length;
    },
    overallStatus() {
      if (this.runningStep) {
        return 'running';
      }
      return this.failedCount === this.steps.length ? 'error' : 'done';
    },
    summary() {
      if (this.runningStep) {
        return Object(external_CoreHome_["translate"])('ChatGPT_AgentToolStep', this.runningStep.title || this.runningStep.name);
      }
      return Object(external_CoreHome_["translate"])('ChatGPT_AgentStepsSummary', this.steps.length);
    }
  },
  methods: {
    translate: external_CoreHome_["translate"],
    statusLabel(step) {
      if (step.status === 'running') {
        return Object(external_CoreHome_["translate"])('ChatGPT_AgentStepRunning');
      }
      return step.status === 'error' ? Object(external_CoreHome_["translate"])('ChatGPT_AgentStepError') : Object(external_CoreHome_["translate"])('ChatGPT_AgentStepDone');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatAgentSteps.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatAgentSteps.vue?vue&type=style&index=0&id=1310a232&lang=less&scoped=true
var ChatAgentStepsvue_type_style_index_0_id_1310a232_lang_less_scoped_true = __webpack_require__("d701");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatAgentSteps.vue





ChatAgentStepsvue_type_script_lang_ts.render = ChatAgentStepsvue_type_template_id_1310a232_scoped_true_render
ChatAgentStepsvue_type_script_lang_ts.__scopeId = "data-v-1310a232"

/* harmony default export */ var ChatAgentSteps = (ChatAgentStepsvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Icon/IconAi.vue?vue&type=template&id=3a114048

const IconAivue_type_template_id_3a114048_hoisted_1 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 47 47",
  fill: "none"
};
const IconAivue_type_template_id_3a114048_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M18.5904 3.88928C15.0129 4.9812 12.47 7.67654 12.47 10.3096V22.3736L15.88 24.3425V12.54C15.88 12.0041 16.1659 11.5089 16.6301 11.2409L26.5833 5.49495C24.5916 3.37408 21.5426 2.98821 18.5904 3.88928ZM29.3485 4.11218C26.4179 0.320005 21.636 -0.176926 17.7146 1.01995C14.0506 2.13827 10.4863 4.94602 9.65251 8.66319C4.90629 9.30887 2.08522 13.1972 1.16114 17.1902C0.297891 20.9203 0.94797 25.4055 3.74726 27.9897C1.93824 32.4223 3.89863 36.8081 6.89395 39.6041C9.6916 42.2155 13.8988 43.8974 17.5319 42.7677C20.4626 46.5594 25.2442 47.0563 29.1654 45.8594C32.8298 44.741 36.3944 41.9328 37.2277 38.2151C41.9683 37.5648 44.7856 33.6764 45.7101 29.6861C46.5739 25.9574 45.9277 21.472 43.1329 18.89C44.9417 14.4576 42.9813 10.0719 39.9861 7.27599C37.1885 4.66464 32.9815 2.98279 29.3485 4.11218ZM40.5513 17.1859C41.3838 14.4023 40.1925 11.5725 37.939 9.46903C35.2046 6.91661 31.6 6.06255 29.3201 7.37901L18.88 13.4061V17.3419L29.1 11.4411C29.5641 11.1731 30.1359 11.1731 30.6 11.441L40.5513 17.1859ZM18.88 20.8061V26.0747L23.4392 28.707L28 26.0737V20.8047L23.4412 18.1725L18.88 20.8061ZM26.441 16.4405L36.66 22.3408C37.1241 22.6087 37.41 23.1039 37.41 23.6398V35.1277C40.2367 34.4574 42.0919 32.0116 42.7875 29.009C43.6318 25.3646 42.5697 21.8154 40.29 20.4991L29.8501 14.4721L26.441 16.4405ZM31 22.5369V34.34C31 34.876 30.7141 35.3712 30.2499 35.6391L20.2971 41.3849C22.2888 43.5054 25.3376 43.8911 28.2896 42.9901C31.8672 41.8982 34.41 39.2029 34.41 36.5698V24.5058L31 22.5369ZM28 29.5378L17.7801 35.4387C17.316 35.7066 16.7442 35.7067 16.2801 35.4387L6.32883 29.6939C5.49618 32.4775 6.68748 35.3074 8.94104 37.411C11.6755 39.9634 15.28 40.8175 17.5599 39.501L28 33.474V29.5378ZM17.03 32.4076L20.4393 30.4391L10.22 24.5386C9.7559 24.2707 9.47001 23.7755 9.47001 23.2396V11.7495C6.63736 12.4159 4.77915 14.8624 4.08389 17.8666C3.24131 21.5075 4.30448 25.0587 6.59075 26.381",
  fill: "currentColor"
}, null, -1);
const IconAivue_type_template_id_3a114048_hoisted_3 = [IconAivue_type_template_id_3a114048_hoisted_2];
function IconAivue_type_template_id_3a114048_render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.aiName === 'chat-gpt' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", IconAivue_type_template_id_3a114048_hoisted_1, IconAivue_type_template_id_3a114048_hoisted_3)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Icon/IconAi.vue?vue&type=template&id=3a114048

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Icon/IconAi.vue?vue&type=script&lang=ts

/* harmony default export */ var IconAivue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    aiName: {
      type: String,
      required: true
    }
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Icon/IconAi.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Icon/IconAi.vue



IconAivue_type_script_lang_ts.render = IconAivue_type_template_id_3a114048_render

/* harmony default export */ var IconAi = (IconAivue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatMessage.vue?vue&type=script&lang=ts







const ChatMessagevue_type_script_lang_ts_COPIED_FEEDBACK_MS = 2000;
/* harmony default export */ var ChatMessagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    ChatAgentSteps: ChatAgentSteps,
    ChatIcon: ChatIcon,
    IconAi: IconAi,
    Markdown: Markdown
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    aiName: {
      type: String,
      required: true
    },
    aiLabel: {
      type: String,
      default: ''
    },
    isStreaming: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      copied: false,
      copiedTimer: 0
    };
  },
  computed: {
    isUser() {
      return this.message.role === 'user';
    },
    copyText() {
      return Object(external_CoreHome_["translate"])('ChatGPT_CopyAnswer');
    },
    copiedText() {
      return Object(external_CoreHome_["translate"])('ChatGPT_AnswerCopied');
    }
  },
  beforeUnmount() {
    window.clearTimeout(this.copiedTimer);
  },
  methods: {
    translate: external_CoreHome_["translate"],
    async copyAnswer() {
      try {
        await writeToClipboard(this.message.content);
      } catch (_unused) {
        return;
      }
      this.copied = true;
      window.clearTimeout(this.copiedTimer);
      this.copiedTimer = window.setTimeout(() => {
        this.copied = false;
      }, ChatMessagevue_type_script_lang_ts_COPIED_FEEDBACK_MS);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatMessage.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatMessage.vue?vue&type=style&index=0&id=3e167524&lang=less&scoped=true
var ChatMessagevue_type_style_index_0_id_3e167524_lang_less_scoped_true = __webpack_require__("3ca5");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatMessage.vue





ChatMessagevue_type_script_lang_ts.render = ChatMessagevue_type_template_id_3e167524_scoped_true_render
ChatMessagevue_type_script_lang_ts.__scopeId = "data-v-3e167524"

/* harmony default export */ var ChatMessage = (ChatMessagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatLoading.vue?vue&type=template&id=26389ed4&scoped=true

const ChatLoadingvue_type_template_id_26389ed4_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-26389ed4"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const ChatLoadingvue_type_template_id_26389ed4_scoped_true_hoisted_1 = ["data-message-index"];
const ChatLoadingvue_type_template_id_26389ed4_scoped_true_hoisted_2 = {
  class: "ai-chat-loading__avatar",
  "aria-hidden": "true"
};
const ChatLoadingvue_type_template_id_26389ed4_scoped_true_hoisted_3 = /*#__PURE__*/ChatLoadingvue_type_template_id_26389ed4_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "ai-chat-loading__dots",
  "aria-hidden": "true"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span")], -1));
const ChatLoadingvue_type_template_id_26389ed4_scoped_true_hoisted_4 = {
  class: "ai-chat-sr-only"
};
function ChatLoadingvue_type_template_id_26389ed4_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconAi = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("IconAi");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
    class: "ai-chat-loading",
    "data-message-index": _ctx.index
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatLoadingvue_type_template_id_26389ed4_scoped_true_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_IconAi, {
    "ai-name": _ctx.aiName
  }, null, 8, ["ai-name"])]), ChatLoadingvue_type_template_id_26389ed4_scoped_true_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatLoadingvue_type_template_id_26389ed4_scoped_true_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.waitingText), 1)], 8, ChatLoadingvue_type_template_id_26389ed4_scoped_true_hoisted_1);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatLoading.vue?vue&type=template&id=26389ed4&scoped=true

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatLoading.vue?vue&type=script&lang=ts



/* harmony default export */ var ChatLoadingvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    IconAi: IconAi
  },
  props: {
    aiName: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    waitingText() {
      return Object(external_CoreHome_["translate"])('ChatGPT_WaitingForResponse');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatLoading.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatLoading.vue?vue&type=style&index=0&id=26389ed4&lang=less&scoped=true
var ChatLoadingvue_type_style_index_0_id_26389ed4_lang_less_scoped_true = __webpack_require__("5adf");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatLoading.vue





ChatLoadingvue_type_script_lang_ts.render = ChatLoadingvue_type_template_id_26389ed4_scoped_true_render
ChatLoadingvue_type_script_lang_ts.__scopeId = "data-v-26389ed4"

/* harmony default export */ var ChatLoading = (ChatLoadingvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatMessagesList.vue?vue&type=script&lang=ts





// distance from the bottom, in pixels, above which the "scroll to latest" button shows
const AT_BOTTOM_THRESHOLD = 48;
// space kept above the start of the answer when it is anchored at the top of the conversation
const ANCHOR_GAP = 16;
const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
/* harmony default export */ var ChatMessagesListvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    ChatIcon: ChatIcon,
    ChatMessage: ChatMessage,
    ChatLoading: ChatLoading
  },
  props: {
    errored: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    errorSettingsUrl: {
      type: String,
      default: ''
    },
    errorSettingsLabel: {
      type: String,
      default: ''
    },
    // step displayed above the conversation to unlock the agent mode
    recommendation: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    streaming: {
      type: Boolean,
      default: false
    },
    messages: {
      type: Array,
      default: () => []
    },
    aiName: {
      type: String,
      required: true
    },
    aiLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // off as soon as the user scrolls by hand, back on with the next question
      autoScroll: true,
      // index of the message the current turn starts with, null follows the bottom
      anchorIndex: null,
      showScrollButton: false,
      resizeObserver: null
    };
  },
  computed: {
    // changes whenever the conversation grows, for browsers without ResizeObserver and the tests
    scrollSignature() {
      var _lastMessage$content$, _lastMessage$steps$ma, _lastMessage$steps, _this$recommendation$, _this$recommendation;
      const lastMessage = this.messages[this.messages.length - 1];
      return [this.messages.length, (_lastMessage$content$ = lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.content.length) !== null && _lastMessage$content$ !== void 0 ? _lastMessage$content$ : 0, (_lastMessage$steps$ma = lastMessage === null || lastMessage === void 0 || (_lastMessage$steps = lastMessage.steps) === null || _lastMessage$steps === void 0 ? void 0 : _lastMessage$steps.map(step => step.status).join(',')) !== null && _lastMessage$steps$ma !== void 0 ? _lastMessage$steps$ma : '', this.loading, this.errored, (_this$recommendation$ = (_this$recommendation = this.recommendation) === null || _this$recommendation === void 0 ? void 0 : _this$recommendation.id) !== null && _this$recommendation$ !== void 0 ? _this$recommendation$ : ''].join('|');
    },
    scrollToLatestText() {
      return Object(external_CoreHome_["translate"])('ChatGPT_ScrollToLatest');
    }
  },
  watch: {
    loading(isLoading) {
      if (isLoading) {
        this.startTurn();
      }
    },
    scrollSignature() {
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(() => this.updateScroll());
    }
  },
  mounted() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.updateScroll());
      this.resizeObserver.observe(this.$refs.content);
      this.resizeObserver.observe(this.$refs.root);
    }
    if (this.loading) {
      this.startTurn();
    } else {
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(() => this.updateScroll());
    }
  },
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    translate: external_CoreHome_["translate"],
    startTurn() {
      const lastMessage = this.messages[this.messages.length - 1];
      // the question the user just sent, or the answer to come for an insight without question
      this.anchorIndex = (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.role) === 'user' ? this.messages.length - 1 : this.messages.length;
      this.autoScroll = true;
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(() => this.updateScroll());
    },
    /**
     * Follows the answer while the turn fits in the view, then keeps the start of the turn at the
     * top so the answer is read from its beginning. Only this container scrolls, never the page.
     */
    updateScroll() {
      const root = this.$refs.root;
      if (!root) {
        return;
      }
      if (this.autoScroll) {
        const maxTop = Math.max(0, root.scrollHeight - root.clientHeight);
        let target = maxTop;
        if (this.anchorIndex !== null) {
          const anchor = root.querySelector(`[data-message-index="${this.anchorIndex}"]`);
          if (anchor) {
            target = Math.min(maxTop, Math.max(0, anchor.offsetTop - ANCHOR_GAP));
          }
        }
        if (Math.abs(root.scrollTop - target) > 1) {
          root.scrollTop = target;
        }
      }
      this.updateScrollButton();
    },
    updateScrollButton() {
      const root = this.$refs.root;
      if (!root) {
        return;
      }
      const distanceToBottom = root.scrollHeight - root.scrollTop - root.clientHeight;
      this.showScrollButton = distanceToBottom > AT_BOTTOM_THRESHOLD;
    },
    onScroll() {
      this.updateScrollButton();
    },
    onManualScroll() {
      const root = this.$refs.root;
      // a wheel over a conversation too short to scroll changes nothing, keep following
      if (root.scrollHeight > root.clientHeight) {
        this.autoScroll = false;
      }
    },
    onScrollKey(event) {
      if (SCROLL_KEYS.includes(event.key)) {
        this.onManualScroll();
      }
    },
    // a press on the scrollbar itself, not on the messages
    onPointerDown(event) {
      if (event.target === this.$refs.root) {
        this.onManualScroll();
      }
    },
    scrollToLatest() {
      const root = this.$refs.root;
      this.anchorIndex = null;
      this.autoScroll = true;
      const top = Math.max(0, root.scrollHeight - root.clientHeight);
      if (typeof root.scrollTo === 'function') {
        root.scrollTo({
          top,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
      } else {
        root.scrollTop = top;
      }
      this.updateScrollButton();
    }
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatMessagesList.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatMessagesList.vue?vue&type=style&index=0&id=ea3eff4a&lang=less&scoped=true
var ChatMessagesListvue_type_style_index_0_id_ea3eff4a_lang_less_scoped_true = __webpack_require__("ca48");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatMessagesList.vue





ChatMessagesListvue_type_script_lang_ts.render = ChatMessagesListvue_type_template_id_ea3eff4a_scoped_true_render
ChatMessagesListvue_type_script_lang_ts.__scopeId = "data-v-ea3eff4a"

/* harmony default export */ var ChatMessagesList = (ChatMessagesListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatEmptyState.vue?vue&type=template&id=12ea8cf4&scoped=true

const ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-12ea8cf4"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_1 = {
  class: "ai-chat-empty"
};
const ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_2 = {
  class: "ai-chat-empty__mark",
  "aria-hidden": "true"
};
const ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_3 = {
  class: "ai-chat-empty__title"
};
const ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_4 = {
  class: "ai-chat-empty__text"
};
const ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_5 = ["aria-label"];
const ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_6 = ["onClick"];
function ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconAi = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("IconAi");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_IconAi, {
    "ai-name": _ctx.aiName
  }, null, 8, ["ai-name"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_EmptyStateTitle')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_EmptyStateText', _ctx.aiLabel)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", {
    class: "ai-chat-empty__suggestions",
    "aria-label": _ctx.translate('ChatGPT_SuggestionsLabel')
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.suggestions, suggestion => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: suggestion
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "ai-chat-empty__suggestion",
      onClick: $event => _ctx.$emit('suggest', suggestion)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(suggestion), 9, ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_6)]);
  }), 128))], 8, ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_hoisted_5)]);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatEmptyState.vue?vue&type=template&id=12ea8cf4&scoped=true

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/ChatEmptyState.vue?vue&type=script&lang=ts



/* harmony default export */ var ChatEmptyStatevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    IconAi: IconAi
  },
  props: {
    aiName: {
      type: String,
      required: true
    },
    aiLabel: {
      type: String,
      required: true
    }
  },
  emits: ['suggest'],
  computed: {
    suggestions() {
      return [Object(external_CoreHome_["translate"])('ChatGPT_SuggestionWeeklyKpis'), Object(external_CoreHome_["translate"])('ChatGPT_SuggestionTopPages'), Object(external_CoreHome_["translate"])('ChatGPT_SuggestionTrafficSources'), Object(external_CoreHome_["translate"])('ChatGPT_SuggestionGoals')];
    }
  },
  methods: {
    translate: external_CoreHome_["translate"]
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatEmptyState.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatEmptyState.vue?vue&type=style&index=0&id=12ea8cf4&lang=less&scoped=true
var ChatEmptyStatevue_type_style_index_0_id_12ea8cf4_lang_less_scoped_true = __webpack_require__("9fdb");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/ChatEmptyState.vue





ChatEmptyStatevue_type_script_lang_ts.render = ChatEmptyStatevue_type_template_id_12ea8cf4_scoped_true_render
ChatEmptyStatevue_type_script_lang_ts.__scopeId = "data-v-12ea8cf4"

/* harmony default export */ var ChatEmptyState = (ChatEmptyStatevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/markdownToPlainText.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
/**
 * Text announced to screen readers once an answer is complete. The live region renders text, never
 * HTML, so the markdown syntax is only stripped, not rendered.
 */
function markdownToPlainText(markdown) {
  return markdown.replace(/```[^\n]*\n?/g, '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '').replace(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/gm, '').replace(/\|/g, ' ').replace(/(\*\*|__|\*|~~|`)/g, '').replace(/\s+/g, ' ').trim();
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/darkSurface.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
// A dark theme plugin such as DarkTheme sets dark values in the Matomo theme variables while
// [data-theme-mode] stays "light": CSS cannot tell, so the page gets this class when the surface
// the chat sits on is dark, and theme.less applies its dark tokens.
const DARK_SURFACE_CLASS = 'ai-chat-dark-surface';
let watching = false;
function isSurfaceDark() {
  const probe = document.createElement('span');
  probe.style.color = 'var(--theme-color-background-contrast, #fff)';
  probe.style.display = 'none';
  document.body.appendChild(probe);
  const channels = (window.getComputedStyle(probe).color.match(/[\d.]+/g) || []).map(Number);
  probe.remove();
  if (channels.length < 3) {
    return false;
  }
  const [red, green, blue] = channels;
  return (0.299 * red + 0.587 * green + 0.114 * blue) / 255 < 0.5;
}
function updateDarkSurface() {
  document.documentElement.classList.toggle(DARK_SURFACE_CLASS, isSurfaceDark());
}
/**
 * Checks the surface once per page, and again when the automatic theme mode follows the system.
 */
function watchDarkSurface() {
  if (watching || typeof window === 'undefined' || !document.body) {
    return;
  }
  watching = true;
  updateDarkSurface();
  if (typeof window.matchMedia === 'function') {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', updateDarkSurface);
    }
  }
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Chat/Chat.vue?vue&type=script&lang=ts







// the segment and the comparison of the report being viewed, in the GET query of every request
function getContextParams() {
  const params = {
    idSite: String(external_CoreHome_["MatomoUrl"].parsed.value.idSite || ''),
    period: String(external_CoreHome_["MatomoUrl"].parsed.value.period || 'day'),
    date: String(external_CoreHome_["MatomoUrl"].parsed.value.date || 'today')
  };
  const {
    segment
  } = external_CoreHome_["MatomoUrl"].parsed.value;
  if (segment) {
    params.segment = String(segment);
  }
  return params;
}
function appendComparisonParams(params) {
  ['comparePeriods', 'compareDates', 'compareSegments'].forEach(key => {
    const values = external_CoreHome_["MatomoUrl"].parsed.value[key];
    (Array.isArray(values) ? values : []).forEach(value => {
      params.append(`${key}[]`, String(value));
    });
  });
}
const __default__ = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    ChatEmptyState: ChatEmptyState,
    ChatMessagesList: ChatMessagesList,
    ChatForm: ChatForm
  },
  props: {
    aiName: {
      type: String,
      required: true
    },
    aiLabel: {
      type: String,
      required: true
    },
    aiColor: {
      type: String,
      default: '#00A67E'
    },
    apiMethod: {
      type: String,
      required: true
    },
    streamingApiMethod: {
      type: String,
      default: 'ChatGPT.getStreamingResponse'
    },
    widgetParams: {
      type: Object,
      default: () => ({})
    },
    useStreaming: {
      type: Boolean,
      default: true
    },
    // 'panel' in the report insights overlay, 'page' on the chat page
    variant: {
      type: String,
      default: 'panel'
    },
    // suggested questions while the conversation is empty
    showEmptyState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      streaming: false,
      errored: false,
      errorMessage: '',
      errorSettingsUrl: '',
      errorSettingsLabel: '',
      messages: [],
      streamingContent: '',
      agentSteps: [],
      agentStatus: null,
      agentStatusPromise: null,
      conversationId: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`,
      receivedAgentEvent: false,
      abortController: null,
      streamingSupported: true,
      announcement: ''
    };
  },
  created() {
    this.agentStatusPromise = this.loadAgentStatus();
  },
  mounted() {
    watchDarkSurface();
  },
  computed: {
    displayMessages() {
      if (this.streaming && (this.streamingContent || this.agentSteps.length)) {
        return [...this.messages, {
          role: 'assistant',
          content: this.streamingContent,
          steps: this.agentSteps
        }];
      }
      return this.messages;
    },
    // AI Providers answers through the agent endpoint, with the Matomo tools if McpServer is ready
    usesAiProviders() {
      var _this$agentStatus;
      return ((_this$agentStatus = this.agentStatus) === null || _this$agentStatus === void 0 ? void 0 : _this$agentStatus.engine) === 'aiProviders';
    },
    // the next step to unlock the agent mode, one at a time
    recommendation() {
      var _this$agentStatus2;
      const recommendations = (_this$agentStatus2 = this.agentStatus) === null || _this$agentStatus2 === void 0 ? void 0 : _this$agentStatus2.recommendations;
      return recommendations && recommendations.length ? recommendations[0] : null;
    }
  },
  watch: {
    // complete answers only: the streamed text lives outside messages until it is done
    'messages.length': function onMessagesAdded() {
      const lastMessage = this.messages[this.messages.length - 1];
      if (!lastMessage || lastMessage.role === 'user' || !lastMessage.content) {
        return;
      }
      this.announcement = '';
      this.$nextTick(() => {
        this.announcement = `${Object(external_CoreHome_["translate"])('ChatGPT_AnswerAnnouncement', this.aiLabel)} ${markdownToPlainText(lastMessage.content)}`;
      });
    }
  },
  methods: {
    focusInput() {
      const form = this.$refs.form;
      if (form) {
        form.focus();
      }
    },
    onSuggestion(text) {
      this.onSubmit({
        role: 'user',
        content: text
      });
    },
    async onSubmit(userPrompt) {
      if (userPrompt) {
        this.messages.push(userPrompt);
      }
      this.loading = true;
      this.errored = false;
      this.errorMessage = '';
      this.errorSettingsUrl = '';
      this.errorSettingsLabel = '';
      // the first message may be sent before the agent status is known (insights panel)
      if (this.agentStatusPromise) {
        await this.agentStatusPromise;
      }
      if (this.usesAiProviders) {
        this.fetchAgent();
      } else if (this.useStreaming && this.streamingSupported) {
        this.fetchStreaming();
      } else {
        this.fetchNonStreaming();
      }
    },
    async loadAgentStatus() {
      try {
        const params = new URLSearchParams(Object.assign({
          module: 'ChatGPT',
          action: 'agentStatus'
        }, getContextParams()));
        appendComparisonParams(params);
        const response = await fetch(`index.php?${params.toString()}`, {
          credentials: 'include'
        });
        this.agentStatus = response.ok ? await response.json() : null;
      } catch (_unused) {
        // keep the classic chat
        this.agentStatus = null;
      } finally {
        this.agentStatusPromise = null;
      }
    },
    getConversationPayload() {
      return JSON.stringify(this.messages.map(({
        role,
        content
      }) => ({
        role,
        content
      })));
    },
    async fetchAgent() {
      this.streaming = false;
      this.streamingContent = '';
      this.agentSteps = [];
      this.receivedAgentEvent = false;
      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();
      try {
        var _response$body;
        const params = new URLSearchParams(Object.assign({
          module: 'ChatGPT',
          action: 'agent'
        }, getContextParams()));
        appendComparisonParams(params);
        const postBody = new URLSearchParams({
          messages: this.getConversationPayload(),
          widgetParams: JSON.stringify(this.widgetParams),
          conversationId: this.conversationId,
          token_auth: this.getTokenAuth(),
          force_api_session: '1'
        });
        const response = await fetch(`index.php?${params.toString()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: postBody,
          credentials: 'include',
          signal: this.abortController.signal
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const reader = (_response$body = response.body) === null || _response$body === void 0 ? void 0 : _response$body.getReader();
        if (!reader) {
          throw new Error('No response body');
        }
        await this.processStream(reader, data => this.parseAgentData(data));
        if (!this.receivedAgentEvent) {
          this.handleError(Object(external_CoreHome_["translate"])('ChatGPT_AnErrorOccurred'));
        } else if (this.streamingContent || this.agentSteps.length) {
          this.messages.push({
            role: 'assistant',
            content: this.streamingContent,
            steps: this.agentSteps
          });
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        this.handleError(error instanceof Error ? error.message : String(error));
      } finally {
        this.loading = false;
        this.streaming = false;
        this.streamingContent = '';
        this.agentSteps = [];
        this.abortController = null;
      }
    },
    parseAgentData(data) {
      let event;
      try {
        event = JSON.parse(data);
      } catch (_unused2) {
        return;
      }
      this.receivedAgentEvent = true;
      if (event.type === 'error') {
        this.handleError(event.message || Object(external_CoreHome_["translate"])('ChatGPT_AnErrorOccurred'));
        return;
      }
      if (!this.streaming) {
        this.streaming = true;
        this.loading = false;
      }
      if (event.type === 'text' && event.content) {
        this.streamingContent = this.streamingContent ? `${this.streamingContent}\n\n${event.content}` : event.content;
      } else if (event.type === 'tool_call' && event.id) {
        this.agentSteps.push({
          id: event.id,
          name: event.name || '',
          title: event.title || event.name || '',
          status: 'running'
        });
      } else if (event.type === 'tool_result' && event.id) {
        const step = this.agentSteps.find(agentStep => agentStep.id === event.id);
        if (step) {
          step.status = event.isError ? 'error' : 'done';
        }
      }
    },
    async fetchStreaming() {
      this.streaming = false;
      this.streamingContent = '';
      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();
      try {
        var _response$body2;
        const params = new URLSearchParams(Object.assign({
          module: 'API',
          method: this.streamingApiMethod,
          format: 'original',
          force_api_session: '1'
        }, getContextParams()));
        appendComparisonParams(params);
        const tokenAuth = this.getTokenAuth();
        if (tokenAuth) {
          params.append('token_auth', tokenAuth);
        }
        const postBody = new URLSearchParams({
          messages: this.getConversationPayload(),
          widgetParams: JSON.stringify(this.widgetParams)
        });
        const response = await fetch(`index.php?${params.toString()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: postBody,
          credentials: 'include',
          signal: this.abortController.signal
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const reader = (_response$body2 = response.body) === null || _response$body2 === void 0 ? void 0 : _response$body2.getReader();
        if (!reader) {
          throw new Error('No response body');
        }
        await this.processStream(reader, data => this.parseStreamData(data));
        if (this.streamingContent) {
          this.messages.push({
            role: 'assistant',
            content: this.streamingContent
          });
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        if (!this.streamingContent && this.streamingSupported) {
          this.streamingSupported = false;
          this.streaming = false;
          this.fetchNonStreaming();
          return;
        }
        this.handleError(error instanceof Error ? error.message : String(error));
      } finally {
        this.loading = false;
        this.streaming = false;
        this.streamingContent = '';
        this.abortController = null;
      }
    },
    getTokenAuth() {
      var _win$piwik, _win$broadcast;
      const win = window;
      return ((_win$piwik = win.piwik) === null || _win$piwik === void 0 ? void 0 : _win$piwik.token_auth) || ((_win$broadcast = win.broadcast) === null || _win$broadcast === void 0 ? void 0 : _win$broadcast.getValueFromUrl('token_auth')) || String(external_CoreHome_["MatomoUrl"].parsed.value.token_auth || '');
    },
    async processStream(reader, onData) {
      const decoder = new TextDecoder();
      let buffer = '';
      const processChunk = async () => {
        const {
          done,
          value
        } = await reader.read();
        if (done) return;
        buffer += decoder.decode(value, {
          stream: true
        });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        lines.forEach(line => {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data !== '[DONE]') {
              onData(data);
            }
          }
        });
        await processChunk();
      };
      await processChunk();
    },
    parseStreamData(data) {
      try {
        var _parsed$choices;
        const parsed = JSON.parse(data);
        if (parsed.error) {
          this.handleError(parsed.error.message, parsed.error);
          return;
        }
        const content = (_parsed$choices = parsed.choices) === null || _parsed$choices === void 0 || (_parsed$choices = _parsed$choices[0]) === null || _parsed$choices === void 0 || (_parsed$choices = _parsed$choices.delta) === null || _parsed$choices === void 0 ? void 0 : _parsed$choices.content;
        if (content) {
          if (!this.streaming) {
            this.streaming = true;
            this.loading = false;
          }
          this.streamingContent += content;
        }
      } catch (_unused3) {
        // Skip non-JSON lines
      }
    },
    fetchNonStreaming() {
      external_CoreHome_["AjaxHelper"].fetch({
        method: this.apiMethod
      }, {
        postParams: {
          messages: this.messages.map(({
            role,
            content
          }) => ({
            role,
            content
          })),
          widgetParams: this.widgetParams
        }
      }).then(response => {
        var _response$choices;
        if (!response || typeof response !== 'object') {
          this.handleError('Invalid response from server');
          return;
        }
        if (response.error) {
          this.handleError(response.error.message || 'An error occurred', response.error);
          return;
        }
        const message = (_response$choices = response.choices) === null || _response$choices === void 0 || (_response$choices = _response$choices[0]) === null || _response$choices === void 0 ? void 0 : _response$choices.message;
        if (message) {
          this.messages.push({
            role: String(message.role || 'assistant'),
            content: String(message.content || '')
          });
        }
      }).catch(error => {
        this.handleError(error instanceof Error ? error.message : String(error));
      }).finally(() => {
        this.loading = false;
      });
    },
    handleError(error, details) {
      this.errored = true;
      this.errorMessage = error;
      this.errorSettingsUrl = (details === null || details === void 0 ? void 0 : details.settingsUrl) || '';
      this.errorSettingsLabel = (details === null || details === void 0 ? void 0 : details.settingsLabel) || '';
      this.loading = false;
      this.streaming = false;
    },
    cancelRequest() {
      if (this.abortController) {
        this.abortController.abort();
        this.abortController = null;
        this.loading = false;
        this.streaming = false;
        this.streamingContent = '';
      }
    }
  },
  beforeUnmount() {
    this.cancelRequest();
  }
});

const __injectCSSVars__ = () => {
  Object(external_commonjs_vue_commonjs2_vue_root_Vue_["useCssVars"])(_ctx => ({
    "6ef463d8": _ctx.aiColor
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
/* harmony default export */ var Chatvue_type_script_lang_ts = (__default__);
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/Chat.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/Chat.vue?vue&type=style&index=0&id=26cc976e&lang=less
var Chatvue_type_style_index_0_id_26cc976e_lang_less = __webpack_require__("c4d2");

// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/Chat.vue?vue&type=style&index=1&id=26cc976e&lang=less&scoped=true
var Chatvue_type_style_index_1_id_26cc976e_lang_less_scoped_true = __webpack_require__("81b7");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Chat/Chat.vue






Chatvue_type_script_lang_ts.render = Chatvue_type_template_id_26cc976e_scoped_true_render
Chatvue_type_script_lang_ts.__scopeId = "data-v-26cc976e"

/* harmony default export */ var Chat = (Chatvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Pages/ChatIndexPage.vue?vue&type=script&lang=ts





const ChatIndexPagevue_type_script_lang_ts_default_ = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    Chat: Chat,
    ChatIcon: ChatIcon,
    IconAi: IconAi
  },
  props: {
    aiName: {
      type: String,
      required: true
    },
    aiLabel: {
      type: String,
      required: true
    },
    aiColor: {
      type: String,
      default: '#00A67E'
    },
    apiMethod: {
      type: String,
      required: true
    },
    // the configured model is outdated, with the settings link for super users
    modelNotice: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      conversationKey: 0
    };
  },
  computed: {
    newConversationText() {
      return Object(external_CoreHome_["translate"])('ChatGPT_NewConversation');
    }
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    newConversation() {
      // a new Chat instance: new conversation id, and the pending request is aborted
      this.conversationKey += 1;
      this.$nextTick(() => this.focusInput());
    },
    focusInput() {
      const chat = this.$refs.chat;
      if (chat) {
        chat.focusInput();
      }
    }
  }
});

const ChatIndexPagevue_type_script_lang_ts_injectCSSVars_ = () => {
  Object(external_commonjs_vue_commonjs2_vue_root_Vue_["useCssVars"])(_ctx => ({
    "157d7519": _ctx.aiColor
  }));
};
const ChatIndexPagevue_type_script_lang_ts_setup_ = ChatIndexPagevue_type_script_lang_ts_default_.setup;
ChatIndexPagevue_type_script_lang_ts_default_.setup = ChatIndexPagevue_type_script_lang_ts_setup_ ? (props, ctx) => {
  ChatIndexPagevue_type_script_lang_ts_injectCSSVars_();
  return ChatIndexPagevue_type_script_lang_ts_setup_(props, ctx);
} : ChatIndexPagevue_type_script_lang_ts_injectCSSVars_;
/* harmony default export */ var ChatIndexPagevue_type_script_lang_ts = (ChatIndexPagevue_type_script_lang_ts_default_);
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Pages/ChatIndexPage.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Pages/ChatIndexPage.vue?vue&type=style&index=0&id=12181830&lang=less
var ChatIndexPagevue_type_style_index_0_id_12181830_lang_less = __webpack_require__("210a");

// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Pages/ChatIndexPage.vue?vue&type=style&index=1&id=12181830&lang=less&scoped=true
var ChatIndexPagevue_type_style_index_1_id_12181830_lang_less_scoped_true = __webpack_require__("6716");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Pages/ChatIndexPage.vue






ChatIndexPagevue_type_script_lang_ts.render = render
ChatIndexPagevue_type_script_lang_ts.__scopeId = "data-v-12181830"

/* harmony default export */ var ChatIndexPage = (ChatIndexPagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/ManageSiteSettings/ManageSiteSettings.vue?vue&type=template&id=13b4342b&scoped=true

const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-13b4342b"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_1 = ["innerHTML"];
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_2 = /*#__PURE__*/ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  id: "chatGptSiteNotice_connection"
}, null, -1));
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_3 = {
  class: "chatGptActions"
};
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_4 = ["disabled"];
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_5 = /*#__PURE__*/ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  id: "chatGptSiteNotice_prompts"
}, null, -1));
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_6 = {
  class: "chatGptActions"
};
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_7 = ["title"];
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_8 = {
  key: 0,
  class: "chatGptGeneralSettingsLink"
};
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_9 = ["href"];
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_10 = {
  class: "ui-confirm",
  ref: "confirmDeleteApiKeyModal"
};
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_11 = ["value"];
const ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_12 = ["value"];
function ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    "content-title": _ctx.translate('ChatGPT_SettingsConnectionTitle')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_SiteSettingsIntro')), 1), _ctx.aiProvidersConnected ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
      key: 0,
      severity: "info"
    }, {
      default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_SiteSettingsAiProvidersNotice')) + " ", 1), _ctx.aiProvidersLink ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: 0,
        innerHTML: _ctx.$sanitize(_ctx.aiProvidersLink)
      }, null, 8, ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]),
      _: 1
    })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.connectionFields, field => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: field.name
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: field.uicontrol,
        name: `chatGpt_${field.name}`,
        title: field.title,
        "inline-help": field.description,
        options: field.options,
        modelValue: _ctx.values[field.name],
        "onUpdate:modelValue": $event => _ctx.values[field.name] = $event
      }, null, 8, ["uicontrol", "name", "title", "inline-help", "options", "modelValue", "onUpdate:modelValue"])]);
    }), 128)), ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
      class: "chatGptSaveConnection",
      saving: _ctx.isSaving.connection,
      onConfirm: _cache[0] || (_cache[0] = $event => _ctx.save('connection'))
    }, null, 8, ["saving"]), _ctx.hasApiKey ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "btn btn-outline chatGptDeleteApiKey",
      disabled: _ctx.isDeletingApiKey,
      onClick: _cache[1] || (_cache[1] = $event => _ctx.confirmDeleteApiKey())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_DeleteApiKey')), 9, ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]),
    _: 1
  }, 8, ["content-title"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    "content-title": _ctx.translate('ChatGPT_SettingsPromptsTitle')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_SiteSettingsPromptsIntro')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.promptFields, field => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: field.name,
        class: "chatGptPromptField"
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: field.uicontrol,
        name: `chatGpt_${field.name}`,
        title: field.title,
        "inline-help": field.description,
        modelValue: _ctx.values[field.name],
        "onUpdate:modelValue": $event => _ctx.values[field.name] = $event
      }, null, 8, ["uicontrol", "name", "title", "inline-help", "modelValue", "onUpdate:modelValue"])]);
    }), 128)), ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
      class: "chatGptSavePrompts",
      saving: _ctx.isSaving.prompts,
      onConfirm: _cache[2] || (_cache[2] = $event => _ctx.save('prompts'))
    }, null, 8, ["saving"]), _ctx.hasCustomPrompt ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "btn btn-outline chatGptResetPrompts",
      title: _ctx.translate('ChatGPT_UseGeneralPromptHelp'),
      onClick: _cache[3] || (_cache[3] = $event => _ctx.resetPrompts())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_UseGeneralPrompt')), 9, ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_7)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.generalSettingsUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_SiteSettingsGeneralSettings')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      href: _ctx.generalSettingsUrl
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_SystemSettingsLink')), 9, ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_9)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]),
    _: 1
  }, 8, ["content-title"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_DeleteApiKeyConfirmTitle')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_DeleteSiteApiKeyConfirmText')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_11), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_hoisted_12)], 512)]);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/ManageSiteSettings/ManageSiteSettings.vue?vue&type=template&id=13b4342b&scoped=true

// EXTERNAL MODULE: external "CorePluginsAdmin"
var external_CorePluginsAdmin_ = __webpack_require__("a5a2");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/ManageSiteSettings/ManageSiteSettings.vue?vue&type=script&lang=ts



const PROMPT_FIELDS = ['chatBasePrompt', 'insightBasePrompt'];
const API_KEY_PLACEHOLDER = '******';
/**
 * ChatGPT settings of a site, rendered on the ChatGPT page of the Websites administration.
 * Empty values use the general settings, the site is chosen with the site selector of the page.
 * Each card saves only its own fields, the unsaved edits of the other card are kept.
 */
/* harmony default export */ var ManageSiteSettingsvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'ManageSiteSettings',
  components: {
    Alert: external_CoreHome_["Alert"],
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"],
    SaveButton: external_CorePluginsAdmin_["SaveButton"]
  },
  props: {
    idSite: {
      type: [Number, String],
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    generalSettingsUrl: {
      type: String,
      default: ''
    },
    // a key set for the website then overrides AI Providers
    aiProvidersConnected: {
      type: Boolean,
      default: false
    },
    // HTML sentence with the link to AI Providers, empty for the users who cannot open it
    aiProvidersLink: {
      type: String,
      default: ''
    },
    // prompts of the general settings, used by the website when its own prompt is empty
    generalPrompts: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const values = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])(Object.assign({}, props.settings));
    const isSaving = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      connection: false,
      prompts: false
    });
    const hasApiKey = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(!!props.settings.apiKey);
    const isDeletingApiKey = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(false);
    const confirmDeleteApiKeyModal = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    const connectionFields = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => props.fields.filter(field => !PROMPT_FIELDS.includes(field.name)));
    const promptFields = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => props.fields.filter(field => PROMPT_FIELDS.includes(field.name)));
    const hasCustomPrompt = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => PROMPT_FIELDS.some(name => !!(values[name] || '').trim()));
    // the website goes back to the general prompts, the fields are left empty rather than copied
    const resetPrompts = () => {
      PROMPT_FIELDS.forEach(name => {
        values[name] = '';
      });
    };
    const notify = (card, context, message) => {
      external_CoreHome_["NotificationsStore"].show({
        message,
        context,
        type: 'transient',
        id: `chatGptSiteSettingsNotice_${card}`,
        placeat: `#chatGptSiteNotice_${card}`
      });
    };
    const save = card => {
      isSaving[card] = true;
      // the fields of the other card are left out, they keep their saved values
      const cardFields = card === 'prompts' ? promptFields.value : connectionFields.value;
      const postParams = {
        idSite: props.idSite
      };
      cardFields.forEach(field => {
        postParams[field.name] = values[field.name] || '';
      });
      external_CoreHome_["AjaxHelper"].post({
        method: 'ChatGPT.setSiteSettings'
      }, postParams, {
        createErrorNotification: false
      }).then(() => {
        if (card === 'connection') {
          // an empty key keeps the saved key
          hasApiKey.value = hasApiKey.value || !!values.apiKey;
          values.apiKey = hasApiKey.value ? API_KEY_PLACEHOLDER : '';
        }
        if (card === 'prompts') {
          // a prompt equal to the general prompt is saved empty
          PROMPT_FIELDS.forEach(name => {
            const general = (props.generalPrompts[name] || '').trim();
            if (general && (values[name] || '').trim() === general) {
              values[name] = '';
            }
          });
        }
        notify(card, 'success', Object(external_CoreHome_["translate"])('General_YourChangesHaveBeenSaved'));
      }).catch(error => {
        notify(card, 'error', error && error.message || Object(external_CoreHome_["translate"])('ChatGPT_AnErrorOccurred'));
      }).finally(() => {
        isSaving[card] = false;
      });
    };
    // an empty key keeps the saved key: only this explicit request removes it
    const deleteApiKey = () => {
      isDeletingApiKey.value = true;
      external_CoreHome_["AjaxHelper"].post({
        method: 'ChatGPT.setSiteSettings'
      }, {
        idSite: props.idSite,
        deleteApiKey: 1
      }, {
        createErrorNotification: false
      }).then(() => {
        hasApiKey.value = false;
        values.apiKey = '';
        notify('connection', 'success', Object(external_CoreHome_["translate"])('ChatGPT_DeleteApiKeyDone'));
      }).catch(error => {
        const message = error && error.message || Object(external_CoreHome_["translate"])('ChatGPT_AnErrorOccurred');
        notify('connection', 'error', message);
      }).finally(() => {
        isDeletingApiKey.value = false;
      });
    };
    const confirmDeleteApiKey = () => {
      external_CoreHome_["Matomo"].helper.modalConfirm(confirmDeleteApiKeyModal.value, {
        yes: deleteApiKey
      });
    };
    return {
      translate: external_CoreHome_["translate"],
      values,
      isSaving,
      connectionFields,
      promptFields,
      hasCustomPrompt,
      resetPrompts,
      hasApiKey,
      isDeletingApiKey,
      confirmDeleteApiKeyModal,
      confirmDeleteApiKey,
      save
    };
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/ManageSiteSettings/ManageSiteSettings.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/ManageSiteSettings/ManageSiteSettings.vue?vue&type=style&index=0&id=13b4342b&lang=less&scoped=true
var ManageSiteSettingsvue_type_style_index_0_id_13b4342b_lang_less_scoped_true = __webpack_require__("1fbd");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/ManageSiteSettings/ManageSiteSettings.vue





ManageSiteSettingsvue_type_script_lang_ts.render = ManageSiteSettingsvue_type_template_id_13b4342b_scoped_true_render
ManageSiteSettingsvue_type_script_lang_ts.__scopeId = "data-v-13b4342b"

/* harmony default export */ var ManageSiteSettings = (ManageSiteSettingsvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/ManageSystemSettings/ManageSystemSettings.vue?vue&type=template&id=1027163c&scoped=true

const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-1027163c"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_1 = ["innerHTML"];
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_2 = /*#__PURE__*/ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  id: "chatGptSystemNotice_connection"
}, null, -1));
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_3 = {
  class: "chatGptActions"
};
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_4 = ["disabled"];
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_5 = /*#__PURE__*/ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  id: "chatGptSystemNotice_prompts"
}, null, -1));
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_6 = {
  class: "chatGptActions"
};
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_7 = ["title"];
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_8 = {
  class: "ui-confirm",
  ref: "confirmDeleteApiKeyModal"
};
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_9 = ["value"];
const ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_10 = ["value"];
function ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    "content-title": _ctx.translate('ChatGPT_SettingsConnectionTitle')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_SystemSettingsIntro')), 1), _ctx.aiProvidersNotice ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
      key: 0,
      severity: "info"
    }, {
      default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.aiProvidersNotice.message) + " ", 1), _ctx.aiProvidersNotice.link ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: 0,
        innerHTML: _ctx.$sanitize(_ctx.aiProvidersNotice.link)
      }, null, 8, ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]),
      _: 1
    })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.connectionFields, field => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: field.name
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: field.uicontrol,
        name: `chatGptSystem_${field.name}`,
        title: field.title,
        description: field.description,
        options: field.options || undefined,
        disabled: field.disabled,
        modelValue: _ctx.values[field.name],
        "onUpdate:modelValue": $event => _ctx.values[field.name] = $event
      }, null, 8, ["uicontrol", "name", "title", "description", "options", "disabled", "modelValue", "onUpdate:modelValue"])]);
    }), 128)), ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
      class: "chatGptSaveConnection",
      saving: _ctx.isSaving.connection,
      onConfirm: _cache[0] || (_cache[0] = $event => _ctx.save('connection'))
    }, null, 8, ["saving"]), _ctx.hasApiKey ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "btn btn-outline chatGptDeleteApiKey",
      disabled: _ctx.isDeletingApiKey,
      onClick: _cache[1] || (_cache[1] = $event => _ctx.confirmDeleteApiKey())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_DeleteApiKey')), 9, ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]),
    _: 1
  }, 8, ["content-title"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    "content-title": _ctx.translate('ChatGPT_SettingsPromptsTitle')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.promptFields, field => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: field.name,
        class: "chatGptPromptField"
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: field.uicontrol,
        name: `chatGptSystem_${field.name}`,
        title: field.title,
        description: field.description,
        disabled: field.disabled,
        modelValue: _ctx.values[field.name],
        "onUpdate:modelValue": $event => _ctx.values[field.name] = $event
      }, null, 8, ["uicontrol", "name", "title", "description", "disabled", "modelValue", "onUpdate:modelValue"])]);
    }), 128)), ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
      class: "chatGptSavePrompts",
      saving: _ctx.isSaving.prompts,
      onConfirm: _cache[2] || (_cache[2] = $event => _ctx.save('prompts'))
    }, null, 8, ["saving"]), _ctx.hasCustomPrompt ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "btn btn-outline chatGptResetPrompts",
      title: _ctx.translate('ChatGPT_ResetPromptToDefaultHelp'),
      onClick: _cache[3] || (_cache[3] = $event => _ctx.resetPrompts())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_ResetPromptToDefault')), 9, ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_7)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]),
    _: 1
  }, 8, ["content-title"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_DeleteApiKeyConfirmTitle')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('ChatGPT_DeleteApiKeyConfirmText')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_9), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_hoisted_10)], 512)]);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/ManageSystemSettings/ManageSystemSettings.vue?vue&type=template&id=1027163c&scoped=true

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/ManageSystemSettings/ManageSystemSettings.vue?vue&type=script&lang=ts



const ManageSystemSettingsvue_type_script_lang_ts_API_KEY_PLACEHOLDER = '******';
const ManageSystemSettingsvue_type_script_lang_ts_PROMPT_FIELDS = ['chatBasePrompt', 'insightBasePrompt'];
/**
 * General settings of the plugin, rendered on the ChatGPT page of the System administration.
 * Each card saves only its own fields, the unsaved edits of the other card are kept.
 */
/* harmony default export */ var ManageSystemSettingsvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'ManageSystemSettings',
  components: {
    Alert: external_CoreHome_["Alert"],
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"],
    SaveButton: external_CorePluginsAdmin_["SaveButton"]
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    aiProvidersNotice: {
      type: Object,
      default: null
    },
    // default prompts in the language of the user, a prompt equal to its default is not stored
    defaultPrompts: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const values = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])(Object.assign({}, props.settings));
    const isSaving = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      connection: false,
      prompts: false
    });
    const hasApiKey = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(!!props.settings.apiKey);
    const isDeletingApiKey = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(false);
    const confirmDeleteApiKeyModal = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    const connectionFields = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => props.fields.filter(field => !ManageSystemSettingsvue_type_script_lang_ts_PROMPT_FIELDS.includes(field.name)));
    const promptFields = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => props.fields.filter(field => ManageSystemSettingsvue_type_script_lang_ts_PROMPT_FIELDS.includes(field.name)));
    const isDefaultPrompt = name => (values[name] || '').trim() === (props.defaultPrompts[name] || '').trim();
    // a prompt set in the config file cannot be edited, it is left as is
    const hasCustomPrompt = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => promptFields.value.some(field => !field.disabled && !isDefaultPrompt(field.name)));
    const resetPrompts = () => {
      promptFields.value.forEach(field => {
        if (!field.disabled) {
          values[field.name] = props.defaultPrompts[field.name] || '';
        }
      });
    };
    const notify = (card, context, message) => {
      external_CoreHome_["NotificationsStore"].show({
        message,
        context,
        type: 'transient',
        id: `chatGptSystemSettingsNotice_${card}`,
        placeat: `#chatGptSystemNotice_${card}`
      });
    };
    const save = card => {
      isSaving[card] = true;
      // the fields that cannot be edited and the fields of the other card are left out, they keep
      // their saved values
      const cardFields = card === 'prompts' ? promptFields.value : connectionFields.value;
      const postParams = {};
      cardFields.forEach(field => {
        if (!field.disabled) {
          postParams[field.name] = values[field.name] || '';
        }
      });
      external_CoreHome_["AjaxHelper"].post({
        method: 'ChatGPT.setSystemSettings'
      }, postParams, {
        createErrorNotification: false
      }).then(() => {
        if (card === 'connection' && 'apiKey' in postParams) {
          // an empty key keeps the saved key
          hasApiKey.value = hasApiKey.value || !!values.apiKey;
          values.apiKey = hasApiKey.value ? ManageSystemSettingsvue_type_script_lang_ts_API_KEY_PLACEHOLDER : '';
        }
        if (card === 'prompts') {
          // an empty prompt is saved as the default
          ManageSystemSettingsvue_type_script_lang_ts_PROMPT_FIELDS.forEach(name => {
            if (name in postParams && !(values[name] || '').trim()) {
              values[name] = props.defaultPrompts[name] || '';
            }
          });
        }
        notify(card, 'success', Object(external_CoreHome_["translate"])('General_YourChangesHaveBeenSaved'));
      }).catch(error => {
        notify(card, 'error', error && error.message || Object(external_CoreHome_["translate"])('ChatGPT_AnErrorOccurred'));
      }).finally(() => {
        isSaving[card] = false;
      });
    };
    // an empty key keeps the saved key: only this explicit request removes it
    const deleteApiKey = () => {
      isDeletingApiKey.value = true;
      external_CoreHome_["AjaxHelper"].post({
        method: 'ChatGPT.setSystemSettings'
      }, {
        deleteApiKey: 1
      }, {
        createErrorNotification: false
      }).then(() => {
        hasApiKey.value = false;
        values.apiKey = '';
        notify('connection', 'success', Object(external_CoreHome_["translate"])('ChatGPT_DeleteApiKeyDone'));
      }).catch(error => {
        const message = error && error.message || Object(external_CoreHome_["translate"])('ChatGPT_AnErrorOccurred');
        notify('connection', 'error', message);
      }).finally(() => {
        isDeletingApiKey.value = false;
      });
    };
    const confirmDeleteApiKey = () => {
      external_CoreHome_["Matomo"].helper.modalConfirm(confirmDeleteApiKeyModal.value, {
        yes: deleteApiKey
      });
    };
    return {
      translate: external_CoreHome_["translate"],
      values,
      isSaving,
      hasApiKey,
      isDeletingApiKey,
      confirmDeleteApiKeyModal,
      confirmDeleteApiKey,
      connectionFields,
      promptFields,
      hasCustomPrompt,
      resetPrompts,
      save
    };
  }
}));
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/ManageSystemSettings/ManageSystemSettings.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/ManageSystemSettings/ManageSystemSettings.vue?vue&type=style&index=0&id=1027163c&lang=less&scoped=true
var ManageSystemSettingsvue_type_style_index_0_id_1027163c_lang_less_scoped_true = __webpack_require__("a38f");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/ManageSystemSettings/ManageSystemSettings.vue





ManageSystemSettingsvue_type_script_lang_ts.render = ManageSystemSettingsvue_type_template_id_1027163c_scoped_true_render
ManageSystemSettingsvue_type_script_lang_ts.__scopeId = "data-v-1027163c"

/* harmony default export */ var ManageSystemSettings = (ManageSystemSettingsvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Insight/InsightTrigger.vue?vue&type=template&id=660adc52&scoped=true

const InsightTriggervue_type_template_id_660adc52_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-660adc52"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const InsightTriggervue_type_template_id_660adc52_scoped_true_hoisted_1 = {
  class: "ai-chat-insight-trigger"
};
const InsightTriggervue_type_template_id_660adc52_scoped_true_hoisted_2 = ["title", "aria-label", "aria-expanded", "aria-controls"];
function InsightTriggervue_type_template_id_660adc52_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconAi = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("IconAi");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", InsightTriggervue_type_template_id_660adc52_scoped_true_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "button",
    type: "button",
    class: "ai-chat-insight-trigger-button",
    title: _ctx.buttonTitle,
    "aria-label": _ctx.buttonTitle,
    "aria-haspopup": "dialog",
    "aria-expanded": _ctx.isActive ? 'true' : 'false',
    "aria-controls": _ctx.isActive ? _ctx.overlayId : undefined,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_IconAi, {
    "ai-name": _ctx.aiName
  }, null, 8, ["ai-name"])], 8, InsightTriggervue_type_template_id_660adc52_scoped_true_hoisted_2)]);
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Insight/InsightTrigger.vue?vue&type=template&id=660adc52&scoped=true

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Insight/insightStore.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// the other Openmost AI plugins dispatch the same event, so their panel and this one never overlap
const OVERLAY_OPEN_EVENT = 'matomo-ai-insight-overlay:open';
const OWNER = 'ChatGPT';
const OVERLAY_ID = 'ai-chat-insight-overlay-chatgpt';
const state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
  open: false,
  report: null,
  requestId: 0
});
let triggerCount = 0;
let insightStore_returnFocusTarget = null;
const insightState = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(state);
function nextTriggerId() {
  triggerCount += 1;
  return `ai-chat-insight-trigger-${triggerCount}`;
}
function isTriggerActive(triggerId) {
  var _state$report;
  return state.open && ((_state$report = state.report) === null || _state$report === void 0 ? void 0 : _state$report.triggerId) === triggerId;
}
function openInsight(report, trigger) {
  state.report = Object.assign({}, report);
  state.open = true;
  state.requestId += 1;
  insightStore_returnFocusTarget = trigger;
  window.dispatchEvent(new CustomEvent(OVERLAY_OPEN_EVENT, {
    detail: {
      owner: OWNER
    }
  }));
}
function closeInsight() {
  state.open = false;
}
/**
 * The same trigger closes the panel, another report's trigger switches it to that report.
 */
function toggleInsight(report, trigger) {
  if (isTriggerActive(report.triggerId)) {
    closeInsight();
    return;
  }
  openInsight(report, trigger);
}
/**
 * The trigger that opened the panel, when it is still in the page (a reloaded widget replaces it).
 */
function getReturnFocusTarget() {
  return insightStore_returnFocusTarget && insightStore_returnFocusTarget.isConnected ? insightStore_returnFocusTarget : null;
}
function resetInsightStore() {
  state.open = false;
  state.report = null;
  state.requestId = 0;
  insightStore_returnFocusTarget = null;
}
if (typeof window !== 'undefined') {
  window.addEventListener(OVERLAY_OPEN_EVENT, event => {
    const {
      detail
    } = event;
    if ((detail === null || detail === void 0 ? void 0 : detail.owner) !== OWNER) {
      closeInsight();
    }
  });
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Insight/InsightTrigger.vue?vue&type=script&lang=ts




const InsightTriggervue_type_script_lang_ts_default_ = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    IconAi: IconAi
  },
  props: {
    widgetParams: {
      type: Object,
      required: true
    },
    aiName: {
      type: String,
      required: true
    },
    aiLabel: {
      type: String,
      required: true
    },
    aiColor: {
      type: String,
      default: '#00A67E'
    },
    // vue-entry parses attributes as JSON, a numeric title arrives as a number
    reportTitle: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      triggerId: nextTriggerId(),
      overlayId: OVERLAY_ID
    };
  },
  computed: {
    buttonTitle() {
      return Object(external_CoreHome_["translate"])('ChatGPT_AskQuestion', this.aiLabel);
    },
    isActive() {
      return isTriggerActive(this.triggerId);
    }
  },
  methods: {
    onClick() {
      toggleInsight({
        triggerId: this.triggerId,
        title: String(this.reportTitle),
        widgetParams: this.widgetParams
      }, this.$refs.button);
    }
  }
});

const InsightTriggervue_type_script_lang_ts_injectCSSVars_ = () => {
  Object(external_commonjs_vue_commonjs2_vue_root_Vue_["useCssVars"])(_ctx => ({
    "555ef8f8": _ctx.aiColor
  }));
};
const InsightTriggervue_type_script_lang_ts_setup_ = InsightTriggervue_type_script_lang_ts_default_.setup;
InsightTriggervue_type_script_lang_ts_default_.setup = InsightTriggervue_type_script_lang_ts_setup_ ? (props, ctx) => {
  InsightTriggervue_type_script_lang_ts_injectCSSVars_();
  return InsightTriggervue_type_script_lang_ts_setup_(props, ctx);
} : InsightTriggervue_type_script_lang_ts_injectCSSVars_;
/* harmony default export */ var InsightTriggervue_type_script_lang_ts = (InsightTriggervue_type_script_lang_ts_default_);
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Insight/InsightTrigger.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Insight/InsightTrigger.vue?vue&type=style&index=0&id=660adc52&lang=less&scoped=true
var InsightTriggervue_type_style_index_0_id_660adc52_lang_less_scoped_true = __webpack_require__("fbb5");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Insight/InsightTrigger.vue





InsightTriggervue_type_script_lang_ts.render = InsightTriggervue_type_template_id_660adc52_scoped_true_render
InsightTriggervue_type_script_lang_ts.__scopeId = "data-v-660adc52"

/* harmony default export */ var InsightTrigger = (InsightTriggervue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Insight/InsightOverlay.vue?vue&type=template&id=6c09aabc&scoped=true

const InsightOverlayvue_type_template_id_6c09aabc_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-6c09aabc"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n);
const InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_1 = ["id", "aria-labelledby"];
const InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_2 = {
  class: "ai-chat-overlay__header"
};
const InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_3 = {
  class: "ai-chat-overlay__mark",
  "aria-hidden": "true"
};
const InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_4 = {
  class: "ai-chat-overlay__heading"
};
const InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_5 = ["id"];
const InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_6 = ["title"];
const InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_7 = ["aria-label", "title"];
const InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_8 = {
  class: "ai-chat-overlay__body"
};
function InsightOverlayvue_type_template_id_6c09aabc_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconAi = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("IconAi");
  const _component_ChatIcon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ChatIcon");
  const _component_Chat = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Chat");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "ai-chat-overlay"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", {
      id: _ctx.overlayId,
      ref: "panel",
      class: "ai-chat-overlay ai-chat-theme",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": _ctx.titleId,
      onKeydown: _cache[1] || (_cache[1] = (...args) => _ctx.onPanelKeydown && _ctx.onPanelKeydown(...args))
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("header", InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_IconAi, {
      "ai-name": _ctx.aiName
    }, null, 8, ["ai-name"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", {
      id: _ctx.titleId,
      class: "ai-chat-overlay__title"
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.insightsTitle), 9, InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_5), _ctx.reportTitle ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", {
      key: 0,
      class: "ai-chat-overlay__report",
      title: _ctx.reportTitle
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.reportTitle), 9, InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_6)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "ai-chat-icon-button ai-chat-overlay__close",
      "aria-label": _ctx.closeText,
      title: _ctx.closeText,
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args))
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ChatIcon, {
      name: "close",
      size: 18
    })], 8, InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_7)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_8, [_ctx.report ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Chat, {
      key: _ctx.report.triggerId,
      ref: "chat",
      variant: "panel",
      "ai-name": _ctx.aiName,
      "ai-label": _ctx.aiLabel,
      "ai-color": _ctx.aiColor,
      "api-method": _ctx.apiMethod,
      "widget-params": _ctx.report.widgetParams
    }, null, 8, ["ai-name", "ai-label", "ai-color", "api-method", "widget-params"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 40, InsightOverlayvue_type_template_id_6c09aabc_scoped_true_hoisted_1), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isOpen]])]),
    _: 1
  });
}
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Insight/InsightOverlay.vue?vue&type=template&id=6c09aabc&scoped=true

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/ChatGPT/vue/src/Components/Insight/InsightOverlay.vue?vue&type=script&lang=ts







const FOCUSABLE = ['a[href]', 'button:not([disabled])', 'textarea:not([disabled])', 'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'].join(',');
// one class per plugin: closing this panel because another AI plugin opens its own must not
// unlock the scroll that plugin has just locked
const PAGE_SCROLL_LOCK_CLASS = 'ai-chat-page-scroll-locked-chatgpt';
const InsightOverlayvue_type_script_lang_ts_default_ = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    Chat: Chat,
    ChatIcon: ChatIcon,
    IconAi: IconAi
  },
  props: {
    aiName: {
      type: String,
      required: true
    },
    aiLabel: {
      type: String,
      required: true
    },
    aiColor: {
      type: String,
      default: '#00A67E'
    },
    apiMethod: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      overlayId: OVERLAY_ID,
      titleId: `${OVERLAY_ID}-title`
    };
  },
  computed: {
    isOpen() {
      return insightState.open;
    },
    report() {
      return insightState.report;
    },
    requestId() {
      return insightState.requestId;
    },
    reportTitle() {
      var _this$report;
      return ((_this$report = this.report) === null || _this$report === void 0 ? void 0 : _this$report.title) || '';
    },
    insightsTitle() {
      return Object(external_CoreHome_["translate"])('ChatGPT_Insights');
    },
    closeText() {
      return Object(external_CoreHome_["translate"])('ChatGPT_CloseInsights');
    }
  },
  watch: {
    // every opening, or switch to another report, asks for an insight; closing never does
    async requestId() {
      await Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])();
      const chat = this.$refs.chat;
      if (!chat) {
        return;
      }
      chat.focusInput();
      chat.onSubmit();
    },
    isOpen(open) {
      document.documentElement.classList.toggle(PAGE_SCROLL_LOCK_CLASS, open);
      if (open) {
        document.addEventListener('keydown', this.onDocumentKeydown);
        return;
      }
      document.removeEventListener('keydown', this.onDocumentKeydown);
      this.restoreFocus();
    }
  },
  mounted() {
    watchDarkSurface();
    // another page, period or segment: the insight of the open report is outdated
    window.addEventListener('hashchange', this.close);
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.close);
    document.removeEventListener('keydown', this.onDocumentKeydown);
    document.documentElement.classList.remove(PAGE_SCROLL_LOCK_CLASS);
  },
  methods: {
    close() {
      closeInsight();
    },
    restoreFocus() {
      const panel = this.$refs.panel;
      const active = document.activeElement;
      // a click elsewhere in the page already moved the focus, leave it there
      if (active && active !== document.body && panel && !panel.contains(active)) {
        return;
      }
      const returnFocusTarget = getReturnFocusTarget();
      if (returnFocusTarget) {
        returnFocusTarget.focus();
      }
    },
    onDocumentKeydown(event) {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        this.close();
      }
    },
    // keeps the Tab focus inside the dialog
    onPanelKeydown(event) {
      if (event.key !== 'Tab') {
        return;
      }
      const panel = this.$refs.panel;
      const focusable = Array.from(panel.querySelectorAll(FOCUSABLE))
      // v-show hides the "scroll to latest" button with an inline display
      .filter(element => !element.closest('[style*="display: none"]'));
      if (!focusable.length) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }
});

const InsightOverlayvue_type_script_lang_ts_injectCSSVars_ = () => {
  Object(external_commonjs_vue_commonjs2_vue_root_Vue_["useCssVars"])(_ctx => ({
    "2079b26e": _ctx.aiColor
  }));
};
const InsightOverlayvue_type_script_lang_ts_setup_ = InsightOverlayvue_type_script_lang_ts_default_.setup;
InsightOverlayvue_type_script_lang_ts_default_.setup = InsightOverlayvue_type_script_lang_ts_setup_ ? (props, ctx) => {
  InsightOverlayvue_type_script_lang_ts_injectCSSVars_();
  return InsightOverlayvue_type_script_lang_ts_setup_(props, ctx);
} : InsightOverlayvue_type_script_lang_ts_injectCSSVars_;
/* harmony default export */ var InsightOverlayvue_type_script_lang_ts = (InsightOverlayvue_type_script_lang_ts_default_);
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Insight/InsightOverlay.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./plugins/ChatGPT/vue/src/Components/Insight/InsightOverlay.vue?vue&type=style&index=0&id=6c09aabc&lang=less&scoped=true
var InsightOverlayvue_type_style_index_0_id_6c09aabc_lang_less_scoped_true = __webpack_require__("44d2");

// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/Components/Insight/InsightOverlay.vue





InsightOverlayvue_type_script_lang_ts.render = InsightOverlayvue_type_template_id_6c09aabc_scoped_true_render
InsightOverlayvue_type_script_lang_ts.__scopeId = "data-v-6c09aabc"

/* harmony default export */ var InsightOverlay = (InsightOverlayvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/ChatGPT/vue/src/index.ts
// Pages



// Components










// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ }),

/***/ "fbb5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_InsightTrigger_vue_vue_type_style_index_0_id_660adc52_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0645");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_InsightTrigger_vue_vue_type_style_index_0_id_660adc52_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_v16_dist_index_js_ref_1_1_InsightTrigger_vue_vue_type_style_index_0_id_660adc52_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

/******/ });
});
//# sourceMappingURL=ChatGPT.umd.js.map