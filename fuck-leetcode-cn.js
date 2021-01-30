// ==UserScript==
// @name         Fuck leetcode-cn.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       keaising
// @match        https://leetcode.com/*
// @grant        none
// ==/UserScript==

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function removeDiv() {
  for (let i = 1; i < 20; i++) {
    let banner = document.getElementById("cn-banner");
    if (banner) {
      banner.remove();
      break;
    }
    await sleep(300);
  }
}

(function () {
  "use strict";
  $(document).ready(function () {
    removeDiv();
  });
})();
