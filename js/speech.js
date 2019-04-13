
/**
 * 
 */
function say(something) {
  dialogueBox.value = something;
  speechSynthesis.speak(
    new SpeechSynthesisUtterance(something)
  );
}
