importScripts('settings.js');
importScripts('popup.js');

loadSettings().then(settings => {
    updateIconClick(settings);
});

chrome.action.onClicked.addListener(tab => {
    loadSettings().then(settings => {
        loadSelected().then(sel => {
            let isel = settings.findIndex(x => {
                return (sel && x.mode == sel.mode && x.value == sel.value)
            });
            let i = isel + 1;
            while (true) {
                if (i >= settings.length) i = 0;
                if (i == isel) break; // back to first
                if (settings[i].cycle == true) break;
            }
            switchProxy(settings[i]);
        });
    });
});

