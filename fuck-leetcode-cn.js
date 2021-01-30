// ==UserScript==
// @name         Fuck leetcode-cn.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       keaising
// @match        https://leetcode.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

async function removeDiv() {
    let banner = document.getElementById("cn-banner");
    if (banner) {
      banner.parentNode.removeChild(banner);
    } else {
      setTimeout(removeDiv, 300)
    }
}

(function () {
  "use strict";
   removeDiv()
})();

