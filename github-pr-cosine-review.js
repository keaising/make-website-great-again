// ==UserScript==
// @name         GitHub PR Cosine Review
// @namespace    https://github.com/keaising
// @version      0.1
// @description  Add a Review tab next to "Files changed" on GitHub PR pages, linking to review.cosine.ren
// @author       keaising
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const BUTTON_ATTR = "data-cosine-review";
  const FILES_TAB_PATH = /^\/([^/]+)\/([^/]+)\/pull\/(\d+)\/(files|changes)$/;
  const REVIEW_ICON_PATH =
    "M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 13H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25v-8.5C0 1.784.784 1 1.75 1ZM1.5 2.75v8.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Zm5.28 1.72a.75.75 0 0 1 0 1.06L5.31 7l1.47 1.47a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-2-2a.75.75 0 0 1 0-1.06l2-2a.75.75 0 0 1 1.06 0Zm2.44 0a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.69 7 9.22 5.53a.75.75 0 0 1 0-1.06Z";

  function findFilesTab() {
    const links = document.querySelectorAll('nav a[href$="/files"], nav a[href$="/changes"]');
    for (const link of links) {
      if (FILES_TAB_PATH.test(link.pathname) && !link.hasAttribute(BUTTON_ATTR)) {
        return link;
      }
    }
    return null;
  }

  function reviewUrl(filesTab) {
    const [, owner, repo, number] = filesTab.pathname.match(FILES_TAB_PATH);
    return `https://review.cosine.ren/gh/${owner}/${repo}/${number}`;
  }

  function createButton(filesTab) {
    const button = filesTab.cloneNode(true);
    button.setAttribute(BUTTON_ATTR, "");
    button.removeAttribute("id");
    button.removeAttribute("aria-current");
    button.removeAttribute("data-tab-item");
    button.target = "_blank";
    button.rel = "noopener";
    button.classList.remove("js-pjax-history-navigate");
    for (const cls of [...button.classList]) {
      if (cls.includes("selected")) {
        button.classList.remove(cls);
      }
    }

    let labelSet = false;
    for (const child of [...button.childNodes]) {
      if (child.nodeName.toLowerCase() === "svg") {
        const path = child.querySelector("path");
        if (path) {
          path.setAttribute("d", REVIEW_ICON_PATH);
        }
        continue;
      }
      if (!labelSet && child.textContent.includes("Files changed")) {
        child.textContent = child.textContent.replace("Files changed", "Review");
        labelSet = true;
        continue;
      }
      // Drop the file counter and its visually-hidden copy.
      if (child.nodeType === Node.ELEMENT_NODE) {
        child.remove();
      }
    }
    return button;
  }

  function ensureButton() {
    const filesTab = findFilesTab();
    if (!filesTab) {
      return;
    }
    let button = filesTab.parentElement.querySelector(`[${BUTTON_ATTR}]`);
    if (!button) {
      button = createButton(filesTab);
      filesTab.after(button);
    }
    // GitHub navigates between PRs without a full reload, so keep the link in sync.
    const url = reviewUrl(filesTab);
    if (button.href !== url) {
      button.href = url;
    }
  }

  let scheduled = false;
  function scheduleEnsure() {
    if (scheduled) {
      return;
    }
    scheduled = true;
    // requestAnimationFrame never fires while the tab is in the background.
    setTimeout(() => {
      scheduled = false;
      ensureButton();
    }, 100);
  }

  new MutationObserver(scheduleEnsure).observe(document.body, { childList: true, subtree: true });
  ensureButton();
})();
