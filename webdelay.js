WebDelay = new function() {

	this.onTabLoad = function(tab) {
		if(tab.status == 'loading') {

			var matchList = eval('(' + localStorage["matchList"] + ')');
			var delayTime = Number(localStorage["delayTime"]);
			var delayedTabs = eval('(' + localStorage["delayedTabs"] + ')');
			
			var alreadyDelayed = false;
			
			for(var i = 0;i<delayedTabs.length && !alreadyDelayed;i++) {
				if(delayedTabs[i] == tab.id) {
					alreadyDelayed = true;
				}
			}
			
			if(!alreadyDelayed) {
				for(var r=0;r<matchList.length;r++) {
					var R = new RegExp(matchList[r], "i");
			
					if(tab.url.match(R)) {
						delayedTabs.push(tab.id);
						localStorage["delayedTabs"] = JSON.stringify(delayedTabs);

						this.delayPage(tab, delayTime, tab.url);
					}
				
				}
			}
		}
	}

	this.delayPage = function(tab, delay, url) {
		chrome.tabs.update(tab.id, {
		    'url': chrome.extension.getURL('delay.html?delay='+delay)
		})

		setTimeout("chrome.tabs.update("+tab.id+", {'url': '"+url+"'})", delay);
	}
}
