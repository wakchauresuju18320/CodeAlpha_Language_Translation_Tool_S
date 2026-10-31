
async function translateText() {

    const text = document.getElementById("inputText").value;
    const source = document.getElementById("source").value;
    const target = document.getElementById("target").value;

    if (text.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    const result = document.getElementById("result");
    result.innerText = "Translating...";

    try {
        const url =
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(text) +
        "&langpair=" +
        encodeURIComponent(source + "|" + target);

        const response = await fetch(url);
        const data = await response.json();

        result.innerText = data.responseData.translatedText;

    } catch (error) {
        result.innerText = "Translation failed. Check internet connection.";
    }
}

function copyText() {

    const text = document.getElementById("result").innerText;

    navigator.clipboard.writeText(text)
        .then(() => alert("Text copied successfully!"))
        .catch(() => alert("Please copy the text manually."));
}

function speakText() {

    const text = document.getElementById("result").innerText;
    const language = document.getElementById("target").value;

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language;

    window.speechSynthesis.speak(speech);
}
