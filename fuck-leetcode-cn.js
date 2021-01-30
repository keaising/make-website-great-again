// ==UserScript==
// @name         Fuck leetcode-cn.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       keaising
// @match        https://leetcode.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  Object.defineProperty(window, "renderTransfer2CnBar", {
    value: "shutup",
    writable: false,
    configurable: false,
  });
})();

