//aliases for query selectors
export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)

export class ChoiceNode {
  constructor(id, childrenIdList, text, icon) {
    this.id = id;
    this.children = childrenIdList;
    this.text = text;
    this.icon = icon;
  }
  
  createChildren(choicesList, clickHandler) {
    if (this.children.length == 0) {
      return null
    }
    
    let results = []
    
    for (let i = 0; i < this.children.length; i++) {
      let child = document.createElement("div")
      child.className = "col choices-child"

      let iconDiv = document.createElement("div")
      iconDiv.innerHTML = choicesList[this.children[i]].icon
      let textDiv = document.createElement("div")
      textDiv.innerHTML = choicesList[this.children[i]].text
      child.appendChild(iconDiv)
      child.appendChild(textDiv)
      
      child.addEventListener("click", e => {
        clickHandler(choicesList[this.children[i]])
      })

      results.push(child)
    }
    
    return results
  }
}

export function clearChoiceNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function addInitial(parent, choicesList, initialNums, clickHandler) {
  let instructions = document.createElement("h5")
  instructions.innerHTML = "Select an option: "
  parent.appendChild(instructions)
  
  for (let i = 0; i < initialNums; i++) {
    let node = choicesList[i]
    let child = document.createElement("div")
    child.className = "col choices-child"
    
    let iconDiv = document.createElement("div")
    iconDiv.innerHTML = node.icon
    let textDiv = document.createElement("div")
    textDiv.innerHTML = node.text
    child.appendChild(iconDiv)
    child.appendChild(textDiv)
    
    child.addEventListener("click", e => {
        clickHandler(node)
      })
    
    parent.appendChild(child)
  }
}

export function addChildrenChoices(parent, node, choicesList, clickHandler) {
  let results = node.createChildren(choicesList, clickHandler)
  if (results == null) {
    return "done"
  }
  let instructions = document.createElement("h5")
  instructions.innerHTML = "Select an option: "
  parent.appendChild(instructions)
  for (let i = 0; i < results.length; i++) {
    parent.appendChild(results[i])
  }
}