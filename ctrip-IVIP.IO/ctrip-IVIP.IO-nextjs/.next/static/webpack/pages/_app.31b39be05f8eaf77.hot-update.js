"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/components/Layout/index.tsx":
/*!*****************************************!*\
  !*** ./src/components/Layout/index.tsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Layout\": function() { return /* binding */ Layout; },\n/* harmony export */   \"UserContext\": function() { return /* binding */ UserContext; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/index.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ant-design/icons */ \"./node_modules/@ant-design/icons/es/index.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/constants */ \"./src/constants/index.ts\");\n/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./index.module.css */ \"./src/components/Layout/index.module.css\");\n/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_index_module_css__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/request */ \"./src/utils/request.ts\");\n/* harmony import */ var _utils_useCurrentUser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/useCurrentUser */ \"./src/utils/useCurrentUser.ts\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst UserContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);\nconst { Header , Content , Sider  } = antd__WEBPACK_IMPORTED_MODULE_8__.Layout;\nconst ITEMS = [\n    {\n        key: \" hotel\",\n        label: \"我的\",\n        role: _constants__WEBPACK_IMPORTED_MODULE_4__.USER_ROLE.USER,\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_9__.HomeOutlined, {}, void 0, false, {\n            fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n            lineNumber: 28,\n            columnNumber: 15\n        }, undefined),\n        children: [\n            {\n                label: \"酒店预订\",\n                key: \"/hotel\",\n                role: _constants__WEBPACK_IMPORTED_MODULE_4__.USER_ROLE.USER\n            },\n            {\n                label: \"订单查询\",\n                key: \"/indent\",\n                role: _constants__WEBPACK_IMPORTED_MODULE_4__.USER_ROLE.USER\n            }\n        ]\n    },\n    {\n        key: \"management \",\n        label: \"后台管理\",\n        role: _constants__WEBPACK_IMPORTED_MODULE_4__.USER_ROLE.ADMIN,\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_9__.SnippetsOutlined, {}, void 0, false, {\n            fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n            lineNumber: 38,\n            columnNumber: 15\n        }, undefined),\n        children: [\n            {\n                label: \"订单管理\",\n                key: \"/management\",\n                role: _constants__WEBPACK_IMPORTED_MODULE_4__.USER_ROLE.ADMIN\n            },\n            {\n                label: \"用户管理\",\n                key: \"/management/user\",\n                role: _constants__WEBPACK_IMPORTED_MODULE_4__.USER_ROLE.ADMIN\n            }\n        ]\n    }\n];\nconst Layout = (param)=>{\n    let { children  } = param;\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const user = (0,_utils_useCurrentUser__WEBPACK_IMPORTED_MODULE_7__.useCurrentUser)();\n    const activeMenu = router.pathname;\n    const defaultOpenKeys = [\n        activeMenu.split(\"/\")[1]\n    ];\n    const handlemenuclick = (param)=>{\n        let { key  } = param;\n        router.push(key);\n    };\n    const user_items = [\n        {\n            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {\n                href: \"/indent\",\n                children: \"我的订单\"\n            }, void 0, false, {\n                fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                lineNumber: 59,\n                columnNumber: 20\n            }, undefined),\n            key: \"0\"\n        },\n        {\n            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                onClick: ()=>{\n                    const res = _utils_request__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"/api/logout\");\n                    localStorage.removeItem(\"user\");\n                    antd__WEBPACK_IMPORTED_MODULE_8__.message.success(\"退出成功\");\n                    router.push(\"/login\");\n                },\n                children: \"登出\"\n            }, void 0, false, {\n                fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                lineNumber: 63,\n                columnNumber: 21\n            }, undefined),\n            key: \"1\"\n        }\n    ];\n    const items = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{\n        if ((user === null || user === void 0 ? void 0 : user.role) === _constants__WEBPACK_IMPORTED_MODULE_4__.USER_ROLE.USER) {\n            return ITEMS.filter((item)=>{\n                // if (item.children) {\n                //     item.children = item.children.filter(\n                //         (k) => k.role === USER_ROLE.USER\n                //     );\n                // }\n                return item.role === _constants__WEBPACK_IMPORTED_MODULE_4__.USER_ROLE.USER;\n            });\n        } else {\n            return ITEMS;\n        }\n    }, [\n        user\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_10___default().body),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Layout, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Header, {\n                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_10___default().header),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                src: \"/financeLogo.png\",\n                                width: 40,\n                                height: 40,\n                                className: (_index_module_css__WEBPACK_IMPORTED_MODULE_10___default().financeLogo),\n                                alt: \"\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                lineNumber: 97,\n                                columnNumber: 25\n                            }, undefined),\n                            \"携程购物管理平台\",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: (_index_module_css__WEBPACK_IMPORTED_MODULE_10___default().user),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Dropdown, {\n                                    menu: {\n                                        items: user_items\n                                    },\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                        onClick: (e)=>e.preventDefault(),\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Space, {\n                                            children: [\n                                                user === null || user === void 0 ? void 0 : user.name,\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_9__.DownOutlined, {}, void 0, false, {\n                                                    fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                                    lineNumber: 105,\n                                                    columnNumber: 41\n                                                }, undefined)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                            lineNumber: 103,\n                                            columnNumber: 37\n                                        }, undefined)\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                        lineNumber: 102,\n                                        columnNumber: 33\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                    lineNumber: 101,\n                                    columnNumber: 29\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                lineNumber: 100,\n                                columnNumber: 25\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                        lineNumber: 96,\n                        columnNumber: 21\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Layout, {\n                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_10___default().sectionInner),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Sider, {\n                                width: 200,\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Menu, {\n                                    mode: \"inline\",\n                                    selectedKeys: [\n                                        activeMenu\n                                    ],\n                                    defaultOpenKeys: defaultOpenKeys,\n                                    style: {\n                                        height: \"100%\",\n                                        borderRight: 0\n                                    },\n                                    items: items,\n                                    onClick: handlemenuclick\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                    lineNumber: 113,\n                                    columnNumber: 29\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                lineNumber: 112,\n                                columnNumber: 25\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Layout, {\n                                className: (_index_module_css__WEBPACK_IMPORTED_MODULE_10___default().sectioncontent),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(UserContext.Provider, {\n                                    value: user,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Content, {\n                                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_10___default().content),\n                                        children: children\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                        lineNumber: 125,\n                                        columnNumber: 33\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                    lineNumber: 124,\n                                    columnNumber: 29\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                                lineNumber: 122,\n                                columnNumber: 25\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                        lineNumber: 111,\n                        columnNumber: 21\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n                lineNumber: 95,\n                columnNumber: 17\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n            lineNumber: 94,\n            columnNumber: 13\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"D:\\\\ctrip-shopping-admin-react\\\\src\\\\components\\\\Layout\\\\index.tsx\",\n        lineNumber: 93,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Layout, \"UNYFKqZVUQknMvbLssKDsy2/OL0=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter,\n        _utils_useCurrentUser__WEBPACK_IMPORTED_MODULE_7__.useCurrentUser\n    ];\n});\n_c = Layout;\nvar _c;\n$RefreshReg$(_c, \"Layout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFXdkMsZ0VBQVc7MENBQ3hCLDRFQUFDSCwwQ0FBUUE7b0NBQUNvRCxNQUFNO3dDQUFFYixPQUFPVDtvQ0FBVzs4Q0FDaEMsNEVBQUN1Qjt3Q0FBRXBCLFNBQVMsQ0FBQ3FCLElBQU1BLEVBQUVDLGNBQWM7a0RBQy9CLDRFQUFDdEQsdUNBQUtBOztnREFDRHNCLGlCQUFBQSxrQkFBQUEsS0FBQUEsSUFBQUEsS0FBTWlDLElBQUk7OERBQ1gsOERBQUN6RCwyREFBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQU1qQyw4REFBQ0osd0NBQVVBO3dCQUFDK0MsV0FBV3ZDLHdFQUFtQjs7MENBQ3RDLDhEQUFDVTtnQ0FBTWtDLE9BQU87MENBQ1YsNEVBQUNuRCxzQ0FBSUE7b0NBQ0Q4RCxNQUFLO29DQUNMQyxjQUFjO3dDQUFDbkM7cUNBQVc7b0NBQzFCRSxpQkFBaUJBO29DQUNqQmtDLE9BQU87d0NBQUVaLFFBQVE7d0NBQVFhLGFBQWE7b0NBQUU7b0NBQ3hDdEIsT0FBT0E7b0NBQ1BOLFNBQVNMOzs7Ozs7Ozs7OzswQ0FHakIsOERBQUNqQyx3Q0FBVUE7Z0NBQUMrQyxXQUFXdkMsMEVBQXFCOzBDQUV4Qyw0RUFBQ08sWUFBWXFELFFBQVE7b0NBQUNDLE9BQU96Qzs4Q0FDekIsNEVBQUNYO3dDQUFROEIsV0FBV3ZDLG1FQUFjO2tEQUM3QmlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNyQyxFQUFDO0dBekZZMUI7O1FBQ01JLGtEQUFTQTtRQUNYVSxpRUFBY0E7OztLQUZsQmQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvTGF5b3V0L2luZGV4LnRzeD84ZjdkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQcm9wc1dpdGhDaGlsZHJlbiwgUmVhY3ROb2RlLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZHVjZXIsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBNZW51UHJvcHMsIG1lc3NhZ2UgfSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHsgTGF5b3V0IGFzIEFudGRsYXlvdXQsIE1lbnUgfSBmcm9tICdhbnRkJztcclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5pbXBvcnQgcm91dGVyLCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IHsgRG93bk91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG5pbXBvcnQgeyBEcm9wZG93biwgU3BhY2UgfSBmcm9tICdhbnRkJztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5pbXBvcnQgeyBVU0VSX1JPTEUgfSBmcm9tIFwiQC9jb25zdGFudHNcIjtcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL2luZGV4Lm1vZHVsZS5jc3MnO1xyXG5pbXBvcnQgeyBzZXRMb2dvdXQgfSBmcm9tICdAL2FwaS91c2VyJztcclxuaW1wb3J0IHsgU25pcHBldHNPdXRsaW5lZCwgSG9tZU91dGxpbmVkIH0gZnJvbSBcIkBhbnQtZGVzaWduL2ljb25zXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcbmltcG9ydCByZXF1ZXN0IGZyb20gJ0AvdXRpbHMvcmVxdWVzdCc7XHJcbmltcG9ydCB7IHVzZUN1cnJlbnRVc2VyIH0gZnJvbSAnQC91dGlscy91c2VDdXJyZW50VXNlcic7XHJcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgVXNlclR5cGUgfSBmcm9tICdAL3R5cGUvdXNlcic7XHJcblxyXG5leHBvcnQgY29uc3QgVXNlckNvbnRleHQgPSBjcmVhdGVDb250ZXh0PFVzZXJUeXBlIHwgbnVsbD4obnVsbCk7XHJcblxyXG5jb25zdCB7IEhlYWRlciwgQ29udGVudCwgU2lkZXIgfSA9IEFudGRsYXlvdXQ7XHJcblxyXG5jb25zdCBJVEVNUyA9IFtcclxuICAgIHtcclxuICAgICAgICBrZXk6IFwiIGhvdGVsXCIsXHJcbiAgICAgICAgbGFiZWw6IFwi5oiR55qEXCIsXHJcbiAgICAgICAgcm9sZTogVVNFUl9ST0xFLlVTRVIsXHJcbiAgICAgICAgaWNvbjogPEhvbWVPdXRsaW5lZCAvPixcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICB7IGxhYmVsOiBcIumFkuW6l+mihOiuolwiLCBrZXk6IFwiL2hvdGVsXCIsIHJvbGU6IFVTRVJfUk9MRS5VU0VSLCB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiBcIuiuouWNleafpeivolwiLCBrZXk6IFwiL2luZGVudFwiLCByb2xlOiBVU0VSX1JPTEUuVVNFUiwgfSxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBrZXk6IFwibWFuYWdlbWVudCBcIixcclxuICAgICAgICBsYWJlbDogXCLlkI7lj7DnrqHnkIZcIixcclxuICAgICAgICByb2xlOiBVU0VSX1JPTEUuQURNSU4sXHJcbiAgICAgICAgaWNvbjogPFNuaXBwZXRzT3V0bGluZWQgLz4sXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgeyBsYWJlbDogXCLorqLljZXnrqHnkIZcIiwga2V5OiBcIi9tYW5hZ2VtZW50XCIsIHJvbGU6IFVTRVJfUk9MRS5BRE1JTiB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiBcIueUqOaIt+euoeeQhlwiLCBrZXk6IFwiL21hbmFnZW1lbnQvdXNlclwiLCByb2xlOiBVU0VSX1JPTEUuQURNSU4gfSxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxuXVxyXG5cclxuZXhwb3J0IGNvbnN0IExheW91dDogUmVhY3QuRkM8UHJvcHNXaXRoQ2hpbGRyZW4+ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xyXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgICBjb25zdCB1c2VyID0gdXNlQ3VycmVudFVzZXIoKTtcclxuXHJcbiAgICBjb25zdCBhY3RpdmVNZW51ID0gcm91dGVyLnBhdGhuYW1lO1xyXG4gICAgY29uc3QgZGVmYXVsdE9wZW5LZXlzID0gW2FjdGl2ZU1lbnUuc3BsaXQoXCIvXCIpWzFdXTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVtZW51Y2xpY2s6IE1lbnVQcm9wc1tcIm9uQ2xpY2tcIl0gPSAoeyBrZXkgfSkgPT4ge1xyXG4gICAgICAgIHJvdXRlci5wdXNoKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlcl9pdGVtczogTWVudVByb3BzWydpdGVtcyddID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IDxMaW5rIGhyZWY9Jy9pbmRlbnQnPuaIkeeahOiuouWNlTwvTGluaz4sXHJcbiAgICAgICAgICAgIGtleTogJzAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogKDxkaXZcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSByZXF1ZXN0LmdldChgL2FwaS9sb2dvdXRgKVxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MoXCLpgIDlh7rmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyLnB1c2goXCIvbG9naW5cIik7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICDnmbvlh7pcclxuICAgICAgICAgICAgPC9kaXY+KSxcclxuICAgICAgICAgICAga2V5OiAnMScsXHJcbiAgICAgICAgfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgaXRlbXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgICAgICBpZiAodXNlcj8ucm9sZSA9PT0gVVNFUl9ST0xFLlVTRVIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIElURU1TLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGl0ZW0uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpdGVtLmNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbi5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIChrKSA9PiBrLnJvbGUgPT09IFVTRVJfUk9MRS5VU0VSXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnJvbGUgPT09IFVTRVJfUk9MRS5VU0VSO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gSVRFTVM7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW3VzZXJdKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYm9keX0+XHJcbiAgICAgICAgICAgIDxtYWluPlxyXG4gICAgICAgICAgICAgICAgPEFudGRsYXlvdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPEhlYWRlciBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPScvZmluYW5jZUxvZ28ucG5nJyB3aWR0aD17NDB9IGhlaWdodD17NDB9IGNsYXNzTmFtZT17c3R5bGVzLmZpbmFuY2VMb2dvfSBhbHQ9JycgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5pC656iL6LSt54mp566h55CG5bmz5Y+wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiDnlKjmiLfkuIvmi4noj5zljZUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLnVzZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duIG1lbnU9e3sgaXRlbXM6IHVzZXJfaXRlbXMgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgb25DbGljaz17KGUpID0+IGUucHJldmVudERlZmF1bHQoKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGFjZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt1c2VyPy5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvd25PdXRsaW5lZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1NwYWNlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L0hlYWRlcj5cclxuICAgICAgICAgICAgICAgICAgICA8QW50ZGxheW91dCBjbGFzc05hbWU9e3N0eWxlcy5zZWN0aW9uSW5uZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2lkZXIgd2lkdGg9ezIwMH0gPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlPVwiaW5saW5lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e1thY3RpdmVNZW51XX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0T3BlbktleXM9e2RlZmF1bHRPcGVuS2V5c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJywgYm9yZGVyUmlnaHQ6IDAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcz17aXRlbXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlbWVudWNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9TaWRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEFudGRsYXlvdXQgY2xhc3NOYW1lPXtzdHlsZXMuc2VjdGlvbmNvbnRlbnR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIOWcqOWtkOe7hOS7tuS4reS9v+eUqCBjb25zdCB1c2VyID0gdXNlQ29udGV4dChVc2VyQ29udGV4dCkgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VXNlckNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3VzZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250ZW50IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRlbnR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Vc2VyQ29udGV4dC5Qcm92aWRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9BbnRkbGF5b3V0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQW50ZGxheW91dD5cclxuICAgICAgICAgICAgICAgIDwvQW50ZGxheW91dD5cclxuICAgICAgICAgICAgPC9tYWluPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VNZW1vIiwibWVzc2FnZSIsIkxheW91dCIsIkFudGRsYXlvdXQiLCJNZW51IiwiSW1hZ2UiLCJ1c2VSb3V0ZXIiLCJEb3duT3V0bGluZWQiLCJEcm9wZG93biIsIlNwYWNlIiwiVVNFUl9ST0xFIiwic3R5bGVzIiwiU25pcHBldHNPdXRsaW5lZCIsIkhvbWVPdXRsaW5lZCIsIkxpbmsiLCJyZXF1ZXN0IiwidXNlQ3VycmVudFVzZXIiLCJjcmVhdGVDb250ZXh0IiwiVXNlckNvbnRleHQiLCJIZWFkZXIiLCJDb250ZW50IiwiU2lkZXIiLCJJVEVNUyIsImtleSIsImxhYmVsIiwicm9sZSIsIlVTRVIiLCJpY29uIiwiY2hpbGRyZW4iLCJBRE1JTiIsInJvdXRlciIsInVzZXIiLCJhY3RpdmVNZW51IiwicGF0aG5hbWUiLCJkZWZhdWx0T3BlbktleXMiLCJzcGxpdCIsImhhbmRsZW1lbnVjbGljayIsInB1c2giLCJ1c2VyX2l0ZW1zIiwiaHJlZiIsImRpdiIsIm9uQ2xpY2siLCJyZXMiLCJnZXQiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwic3VjY2VzcyIsIml0ZW1zIiwiZmlsdGVyIiwiaXRlbSIsImNsYXNzTmFtZSIsImJvZHkiLCJtYWluIiwiaGVhZGVyIiwic3JjIiwid2lkdGgiLCJoZWlnaHQiLCJmaW5hbmNlTG9nbyIsImFsdCIsInNwYW4iLCJtZW51IiwiYSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm5hbWUiLCJzZWN0aW9uSW5uZXIiLCJtb2RlIiwic2VsZWN0ZWRLZXlzIiwic3R5bGUiLCJib3JkZXJSaWdodCIsInNlY3Rpb25jb250ZW50IiwiUHJvdmlkZXIiLCJ2YWx1ZSIsImNvbnRlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Layout/index.tsx\n"));

/***/ })

});