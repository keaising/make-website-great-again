// ==UserScript==
// @name         Delete all your weibo
// @namespace    http://weibo.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://weibo.com/*
// @icon         https://www.google.com/s2/favicons?domain=weibo.com
// @grant        none
// ==/UserScript==

// 用法:
// 1. 安装油猴脚本
// 2. 在油猴脚本中新建一个脚本文件, 将本文件内所有内容粘过去
// 3. 打开微博自己的主页.

// 注意事项
// 1. 脚本会在打开自己主页的时候自动执行, 刷新页面也会继续删, 直到删完
// 2. 如果删到某个时间点不想删了, 在油猴脚本中取消本脚本的执行(最好是删除本脚本)

(function () {
    'use strict';


    setInterval(function () {
        window.scrollTo(0, document.body.scrollHeight);
    }, 3000);
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
    }, 20000);
})();

