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

// 用法:
// 1. 安装油猴脚本
// 2. 在油猴脚本中新建一个脚本文件, 将本文件内所有内容粘过去
// 3. 打开微博自己的主页.

// 注意事项
// 1. 脚本会在打开自己主页的时候自动执行, 刷新页面也会继续删, 直到删完
// 2. 如果删到某个时间点不想删了, 在油猴脚本中取消本脚本的执行(最好是删除本脚本)

(function () {
    'use strict';

    var s = document.createElement('script'); s.setAttribute('src', 'https://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js');
    s.onload = function () {
        setInterval(function () {
            if (!$('a[action-type="feed_list_delete"]')) {
                $('a.next').click();
            }
            else {
                $('a[action-type="feed_list_delete"]')[0].click();
                $('a[action-type="ok"]')[0].click();
            }
            if ($('a[action-type="feed_list_delete_fast_reported"]')) {
                $('a[action-type="feed_list_delete_fast_reported"]')[0].click();
            }
            load$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
        }, 800);
    };

    document.head.appendChild(s);
})();

