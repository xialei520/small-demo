/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../aaa/src/test/index.js":
/*!********************************!*\
  !*** ../aaa/src/test/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sum: () => (/* binding */ sum)\n/* harmony export */ });\nconsole.log(\"aaa模块加载成功\");\r\nlet sum = function (a, b) {\r\n  console.log(\"计算结果：\", a + b);\r\n};\r\n\n\n//# sourceURL=webpack://webpack-test/../aaa/src/test/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var aaa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aaa */ \"../aaa/src/test/index-exposed.js\");\n/* harmony import */ var aaa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aaa__WEBPACK_IMPORTED_MODULE_0__);\n\r\n(0,aaa__WEBPACK_IMPORTED_MODULE_0__.sum)(1, 9);\r\nconsole.log(\"我是main\", AAA);\r\n\n\n//# sourceURL=webpack://webpack-test/./src/index.js?");

/***/ }),

/***/ "../aaa/src/test/index-exposed.js":
/*!****************************************!*\
  !*** ../aaa/src/test/index-exposed.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(/*! -!./index.js */ \"../aaa/src/test/index.js\");\nvar ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(/*! ../../../node_modules/.pnpm/registry.npmmirror.com+expose-loader@4.1.0_webpack@5.88.1/node_modules/expose-loader/dist/runtime/getGlobalThis.js */ \"../node_modules/.pnpm/registry.npmmirror.com+expose-loader@4.1.0_webpack@5.88.1/node_modules/expose-loader/dist/runtime/getGlobalThis.js\");\nvar ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;\nif (typeof ___EXPOSE_LOADER_GLOBAL_THIS___[\"AAA\"] === 'undefined') ___EXPOSE_LOADER_GLOBAL_THIS___[\"AAA\"] = ___EXPOSE_LOADER_IMPORT___;\nelse throw new Error('[exposes-loader] The \"AAA\" value exists in the global scope, it may not be safe to overwrite it, use the \"override\" option')\nmodule.exports = ___EXPOSE_LOADER_IMPORT___;\n\n\n//# sourceURL=webpack://webpack-test/../aaa/src/test/index-exposed.js?");

/***/ }),

/***/ "../node_modules/.pnpm/registry.npmmirror.com+expose-loader@4.1.0_webpack@5.88.1/node_modules/expose-loader/dist/runtime/getGlobalThis.js":
/*!************************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/registry.npmmirror.com+expose-loader@4.1.0_webpack@5.88.1/node_modules/expose-loader/dist/runtime/getGlobalThis.js ***!
  \************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n// eslint-disable-next-line func-names\nmodule.exports = function () {\n  if (typeof globalThis === \"object\") {\n    return globalThis;\n  }\n  var g;\n  try {\n    // This works if eval is allowed (see CSP)\n    // eslint-disable-next-line no-new-func\n    g = this || new Function(\"return this\")();\n  } catch (e) {\n    // This works if the window reference is available\n    if (typeof window === \"object\") {\n      return window;\n    }\n\n    // This works if the self reference is available\n    if (typeof self === \"object\") {\n      return self;\n    }\n\n    // This works if the global reference is available\n    if (typeof __webpack_require__.g !== \"undefined\") {\n      return __webpack_require__.g;\n    }\n  }\n  return g;\n}();\n\n//# sourceURL=webpack://webpack-test/../node_modules/.pnpm/registry.npmmirror.com+expose-loader@4.1.0_webpack@5.88.1/node_modules/expose-loader/dist/runtime/getGlobalThis.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;