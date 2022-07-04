var button = document.getElementById("copy"),
input = document.getElementById("first");

button.addEventListener("click", function(event) {
    event.preventDefault();
    input.select();
    document.execCommand("copy");
});

var button = document.getElementById("copy2"),
input2 = document.getElementById("second");

button.addEventListener("click", function(event) {
    event.preventDefault();
    input2.select();
    document.execCommand("copy");
});

const translateBtn = document.querySelector(".translate"),
selected = document.querySelectorAll("select"),
exchange = document.querySelector(".exchange"),
first = document.querySelector("#first"),
second = document.querySelector("#second"),
icons = document.querySelectorAll(".tr i");

exchange.addEventListener("click", () => {
    //exchanging language and text
    let tempText = first.value,
    tempLang = selected[0].value;
    selected[0].value = selected[1].value;
    selected[1].value = tempLang;
    first.value = second.value;
    second.value = tempText;
});

translateBtn.addEventListener("click", () =>{
    let text = first.value;
    from = selected[0].value; //getting firstselect tag value
    to = selected[1].value; //getting secondselect tag value
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`;
    //fetching api respnose and returning it by parsing it into a js object
    //and in another then method, receiving that object
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        second.value = data.responseData.translatedText;
    })
    console.log(text, from, to);
});

icons.forEach(icon =>{
    icon.addEventListener("click", ({target}) => {
        if (target.classList.contains("fa-volume-up")) {
            let speech;
            if (target.id == "vol1") {
                speech = new SpeechSynthesisUtterance(first.value);
                speech.lang = selected[0].value;
                console.log("okay");
            }   else {
                speech = new SpeechSynthesisUtterance(second.value);
                speech.lang = selected[1].value;
                console.log("okay.2");
            }
            speechSynthesis.speak(speech);
        }
    });
});


// if (target.classList.contains("fa-copy")) {
//     if (target.id == "from") {
//         navigator.clipboard.writeText(first.value);
//     }   else {
//         navigator.clipboard.writeText(second.value);
//     }
// }
// Initialize new SpeechSynthesisUtterance object


// var val = document.getElementsByClassName("tr from").value;

// speech.lang = "en-GB";

// let voices = []; // global array of available voices

// window.speechSynthesis.onvoiceschanged = () => {
//   // Get List of Voices
//   voices = window.speechSynthesis.getVoices();

//   // Initially set the First Voice in the Array.
//   speech.voice = voices[9];
// };

// document.querySelector("#vol").addEventListener("click", () => {
//     speech.lang = "en-GB";
//     // Set the text property with the value of the textarea
//   speech.text = document.querySelector("#first").value;

//   // Start Speaking
//   window.speechSynthesis.speak(speech);
// });    
   

