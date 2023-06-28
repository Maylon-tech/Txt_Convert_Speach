const voiceList = document.querySelector('select')
const textarea = document.querySelector('textarea'),
speechBtn = document.querySelector('button')

let synth = speechSynthesis
isSpeaking = true

voices()

function voices() {
    for(let voice of synth.getVoices()){ 
        // Selectiong "Google US english" voice as default.
        let selected = voice.name === "Google US English" ? "selected" : ""
        // Creating an option tag with passing voice name and lang.
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML("beforeend", option)  //Inserting option tag beforeend of select
    }
}

synth.addEventListener('voiceschanged', voices)


// Funcao para pegar o text do Textarea e converter para Speech (Voice!)
function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text)
    // If the available device voice name is equal to the user selected voice name
    // then set the speech voice to the user selected voice.
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utternance.voice = voice
        }
    }
    speechSynthesis.speak(utternance)  //Speak the Speech \ Utternance
}


// Evento para capturar dados do Textarea.
speechBtn.addEventListener('click', e => {
    e.preventDefault()
    if(textarea.value !== ''){
        if(!synth.speaking){   // If an utternance \ speech is not currently in the process of speech
            textToSpeech(textarea.value)
        }

        if(textarea.value.length > 80){

            if(isSpeakinng){
                synth.resume()
                isSpeaking = false
                speechBtn.innerText = "Pause Speech"
            }else {
                synth.pause()
                isSpeaking = true
                speechBtn.innerText = "Resume Speech"
            }

            //Checking is uternance \ speech in speaking process or not in every 100ms
            //If not then set the value of isSpeaking to true and change the button text
            setInterval(() => {
                if(!synth.speaking && !isSpeaking) {
                    isSpeaking = true
                    speechBtn.innerText = "Convert to Speech"
                }
            })
        } else {
            speechBtn.innerText = "Convert to Speech"
        }
    }
})