// ==UserScript==
// @name         Shorts off! YouTube
// @version      0.1.0
// @description  Remove Shorts™ from YouTube
// @author       man90 (https://github.com/octoman90)
// @namespace    https://github.com/octoman90/shorts-off-youtube/
// @updateURL    https://github.com/octoman90/shorts-off-youtube/raw/master/index.user.js
// @downloadURL  https://github.com/octoman90/shorts-off-youtube/raw/master/index.user.js
// @supportURL   https://github.com/octoman90/shorts-off-youtube/issues
// @license      GPL-3.0
// @match        *://www.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(() => {
	function observe() {
		const ytdApp = document.querySelector("ytd-app")

		if (!ytdApp) {
			return
		}

		(new MutationObserver((mutations) => {
			mutations.forEach(({ target }) => {
				if (!["YTD-VIDEO-RENDERER", "YTD-GRID-VIDEO-RENDERER"].includes(target.tagName)) {
					return
				}

				if ("WEB_PAGE_TYPE_SHORTS" !== target?.data?.navigationEndpoint?.commandMetadata?.webCommandMetadata?.webPageType) {
					return
				}

				target.remove()
			})
		})).observe(ytdApp, {
			childList: true,
			subtree: true,
		})
	}

	if (["complete", "interactive"].includes(document.readyState)) {
		observe()
	} else {
		document.addEventListener("DOMContentLoaded", function loadHandler() {
			document.removeEventListener("DOMContentLoaded", loadHandler)
			observe()
		})
	}
})()
