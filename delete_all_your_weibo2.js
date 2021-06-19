// ==UserScript==
// @name         Delete all your weibo
// @namespace    http://weibo.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://weibo.com/p/*
// @icon         https://www.google.com/s2/favicons?domain=weibo.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var s = document.createElement('script'); s.setAttribute('src', 'https://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js');
    s.onload = function () {
        setInterval(function () {
            var dom = document.getElementsByTagName("div");
            var match = new Array();
            var ids = new Array();
            for (var i in dom) {
                if ((typeof dom[i]) === "object") {
                    if (dom[i].getAttribute("action-type") === "feed_list_item") {
                        //console.log(dom[i]);
                        match.push(dom[i]);
                        for (var k in dom[i].attributes) {
                            if (dom[i].attributes[k].name === "mid") {
                                ids.push(dom[i].attributes[k].nodeValue);
                            }
                        }
                    }
                }
            }
            for (var j in ids) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://weibo.com/aj/mblog/del?ajwvr=6');
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(encodeURI('mid=' + ids[j]));
            }
            location.reload();
        }, 2000);
    };

    document.head.appendChild(s);
})();

