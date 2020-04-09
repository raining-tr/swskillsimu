(function (w, d) {
    'use strict'
    let theElement = d.getElementById("isPromiseSupportedLabel");
    let text;
    if (typeof (Promise) !== "undefined") {
        text = d.createTextNode("The web browser you're using supports Promise object.");
        theElement.classList.add("text-feature-supported");
    } else {
        text = d.createTextNode("The web browser you're using doesn't support Promise object. Please update your browser or use a browser which supports the feature.");
        // https://caniuse.com/#feat=promises
        // Click here to see more information about browsers support Promise
        let theMoreInfo = d.createElement("a");
        theMoreInfo.text = "(Click here to see more information about browsers support Promise)";
        theMoreInfo.href = "https://caniuse.com/#feat=promises";
        theMoreInfo.target = "_blank";
        theElement.classList.add("text-feature-missing");
        theElement.parentNode.appendChild(d.createElement("br"));
        theElement.parentNode.appendChild(theMoreInfo);
    }
    theElement.appendChild(text);

    d.getElementById("commit-link").href = "https://github.com/" + window.appdata["github-repo"] + "/commits/master";

    if (w.SkillTreeData.hasOwnProperty("CharacterTable")) {
        let characterTable = w.SkillTreeData.CharacterTable,
            domCharacterList = d.getElementById("character_select");

        let characterNames = Object.keys(characterTable);

        for (let i = 0; i < characterNames.length; i++) {
            let characterData = characterTable[characterNames[i]];
            if (typeof (characterData) === "object" && characterData.hasOwnProperty("url")) {
                let elementImg = d.createElement("img"),
                    elementHyperlink = d.createElement("a");
                elementImg.draggable = false;
                elementImg.alt = characterNames[i];
                elementImg.classList.add("center-block");
                elementImg.classList.add("characterimage");
                if (characterData.selectImage) {
                    elementImg.src = characterData.selectImage;
                }
                elementHyperlink.appendChild(elementImg);

                if (characterData.hasOwnProperty("enabled") && !characterData.enabled) {
                    elementHyperlink.href = "javascript:void(0)";
                    elementImg.classList.add("disabled");
                    if (characterData.hasOwnProperty("reason") && typeof (characterData.reason) === "string") {
                        elementHyperlink.addEventListener("click", function (e) {
                            e.preventDefault();
                            alert(characterData.reason);
                        }, true);
                    } else {
                        elementHyperlink.addEventListener("click", function (e) {
                            e.preventDefault();
                        }, true);
                    }
                } else {
                    elementHyperlink.href = characterData.url;
                }
                let theDiv = d.createElement("li");
                theDiv.classList.add("one");
                theDiv.appendChild(elementHyperlink);
                domCharacterList.appendChild(theDiv);

            }
        }
    }

    d.getElementById("jsEnabled").remove();
})(window, document);
