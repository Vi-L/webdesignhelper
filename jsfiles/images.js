import * as m from "../script.js"
// constructor(id, childrenIdList, text, icon)

const imagesChoice = new m.ChoiceNode(0, [2, 3], "I need images", "<i class='fas fa-images fa-3x'></i>")
const iconsChoice = new m.ChoiceNode(1, [], "I need icons", "<i class='fas fa-mouse-pointer fa-3x'></i>")  //leaf

const randomChoice = new m.ChoiceNode(2, [4, 5], "I need random images", "<i class='fas fa-random fa-3x'></i>")
const specificChoice = new m.ChoiceNode(3, [], "I need images of specific things", "<i class='fas fa-tag fa-3x'></i>") // leaf

const blankChoice = new m.ChoiceNode(4, [], "I need blank images with dimension labels", "<i class='fas fa-ruler-combined fa-3x'></i>") //leaf
const realChoice = new m.ChoiceNode(5, [6, 7], "I need real images with subjects in them", "<i class='fas fa-camera fa-3x'></i>")

const normChoice = new m.ChoiceNode(6, [], "I want normal images", "<i class='fas fa-file-image fa-3x'></i>") //leaf
const funChoice = new m.ChoiceNode(7, [], "I want silly images", "<i class='fas fa-grin-squint fa-3x'></i>") // leaf

//other varibles
const parent = m.$(".choices-parent")
const choicesList = [imagesChoice, iconsChoice, randomChoice, specificChoice, blankChoice, realChoice, normChoice, funChoice]
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
  window.location.href = "/pages/images.html"
}

function fillWithContent() {
  let backButton = document.createElement("button")
  backButton.innerHTML = "<i class='fas fa-backward'></i> Back to Questionnaire"
  backButton.className = "back-button"
  backButton.onclick = setWindowHref
  m.$(".images-content").appendChild(backButton)
  
  let iframe = document.createElement("iframe")
  switch(chosenId) {
    case iconsChoice.id:
      iframe.src = "../subpages/images/icons.html"
      break;
    case specificChoice.id:
      iframe.src = "../subpages/images/specific.html"
      break;
    case blankChoice.id:
      iframe.src = "../subpages/images/blank.html"
      break;
    case normChoice.id:
      iframe.src = "../subpages/images/norm.html"
      break;
    case funChoice.id:
      iframe.src = "../subpages/images/fun.html"
      break;
  }
  parent.appendChild(iframe)
}

// fill page with initial choices
m.clearChoiceNodes(parent)
m.addInitial(parent, choicesList, 2, clickHandler)
