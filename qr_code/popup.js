async function getCurrentUrl() {
    //SPECIFIES THE QUERY OPTIONS
    //ACTIVE = TRUE, LAST FOCUSED WINDOW = SEARCHES FOR MOST RECENTLY CLICKED ON WINDOW
    let queryOptions = { active: true, lastFocusedWindow: true };
    //[TAB] GETS THE FIRST TAB USING THE QUERY OPTIONS SPECIFIED ABOVE
    let [tab] = await chrome.tabs.query(queryOptions);
    //GETS THE URL FROM THE TAB
    console.log("Active Tab URL:", tab.url);
    makeQRCode(tab.url);
    return tab.url;
}

function makeQRCode (text) {    
    const qrcodeContainer = document.getElementById("qrcodeContainer");

    if (!qrcodeContainer) {
        console.error("QR code container not found.");
        return;
    }

    qrcodeContainer.innerHTML = ""; // Optional: clear existing QR
    new QRCode(qrcodeContainer, {
        text: text,
        width: 128,
        height: 128,
    });
}

// Call it when the popup loads get Current Url only called once we have all the document info (page is loaded)
document.addEventListener("DOMContentLoaded", getCurrentUrl);