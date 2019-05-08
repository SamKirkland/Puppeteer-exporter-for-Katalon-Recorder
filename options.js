const enableCheckbox = document.querySelector('#enable');
const saved = document.querySelector('#saved');


function changeGoogleAnalyticsOption() {
    const GAEnabled = enableCheckbox.checked;
    chrome.storage.sync.set(
        {
            GAEnabled: GAEnabled
        },
        () => {
            saved.style.display = "inline-block";
            setTimeout(() => { saved.style.display = "none"; }, 2500);
        }
    );
}

function restoreOptions() {
    chrome.storage.sync.get(
        ['GAEnabled'],
        (items) => {
            const enabledOrDefault = items.GAEnabled === undefined || items.GAEnabled;
            enableCheckbox.checked = enabledOrDefault;
        }
    );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
enableCheckbox.addEventListener('change', changeGoogleAnalyticsOption);