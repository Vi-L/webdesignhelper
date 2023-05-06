import * as m from "../script.js"
// constructor(id, childrenIdList, text, icon)

// choices
const lipsumChoice = new m.ChoiceNode(0, [2, 3], "I need filler text", "<i class='fas fa-fill-drip fa-3x'></i>")
const fontsChoice = new m.ChoiceNode(1, [], "I need fonts", "<i class='fas fa-scroll fa-3x'></i>") //leaf 

const normChoice = new m.ChoiceNode(2, [], "I want normal filler text", "<i class='fas fa-font fa-3x'></i>") //leaf 
const funChoice = new m.ChoiceNode(3, [], "I want silly filler text", "<i class='far fa-grin-squint-tears fa-3x'></i>") //leaf

//other varibles
const parent = m.$(".choices-parent")
const choicesList = [lipsumChoice, fontsChoice, normChoice, funChoice]
let chosenId 

function clickHandler(node) {
  chosenId = node.id
  m.clearChoiceNodes(parent)
  let res = m.addChildrenChoices(parent, choicesList[chosenId], choicesList, clickHandler)
  if (res == "done") {
    fillWithContent()
  }
}

function setWindowHref() {
  window.location.href = "/pages/texts.html"
}

function fillWithContent() {
  let backButton = document.createElement("button")
  backButton.innerHTML = "<i class='fas fa-backward'></i> Back to Questionnaire"
  backButton.className = "back-button"
  backButton.onclick = setWindowHref
  m.$(".texts-content").appendChild(backButton)
  
  let iframe = document.createElement("iframe")
  switch(chosenId) {
    case fontsChoice.id:
      iframe.src = "../subpages/texts/fonts.html"
      break;
    case normChoice.id:
      iframe.src = "../subpages/texts/norm.html"
      break;
    case funChoice.id:
      iframe.src = "../subpages/texts/fun.html"
      break;
  }
  parent.appendChild(iframe)
}

// fill page with initial choices
m.clearChoiceNodes(parent)
m.addInitial(parent, choicesList, 2, clickHandler)

