import {$, $$} from "../script.js"

// code for quick access forms on home page
let textForm = $(".quick-text-form")
let imageForm = $(".quick-image-form")

let res = ""

textForm.onsubmit = ((e) => {
  e.preventDefault()
  
  let textType = Array.from(document.getElementsByName("text-type")).find(r => r.checked).value;
  let paras = $("#para-num").value
  
  let url = `https://baconipsum.com/api/?type=${textType}&paras=${paras}`
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    res = ""
    for (let i = 0; i < data.length; i++) {
      res += data[i]
    }
    clearQuickContent()
    $(".quick-content").innerHTML = res
  })
})

$("#text-copy-button").onclick = ((e) => {
  navigator.clipboard.writeText(res).then(function() {
    alert("Successfully copied text to your clipboard!")
  }, function(err) {
    alert("Oh no! The copy was unsuccessful.")
    console.error('Async: Could not copy text: ', err);
  })
})


let sourceURL = ""
imageForm.onsubmit = ((e) => {
  e.preventDefault()
  
  let width = $("#width-num").value
  let height = $("#height-num").value
  
  sourceURL = ""
  sourceURL = `https://picsum.photos/seed/${width}/${height}`
  
  let image = document.createElement("img")
  image.src = sourceURL
  clearQuickContent()
  $(".quick-content").appendChild(image) 
})

function clearQuickContent() {
  let content = $(".quick-content")
  while (content.firstChild) {
    content.removeChild(content.firstChild)
  }
  content.innerHTML = ""
}

$("#image-copy-button").onclick = ((e) => {
  navigator.clipboard.writeText(sourceURL).then(function() {
    alert("Successfully copied the image source URL to your clipboard!")
  }, function(err) {
    alert("Oh no! The copy was unsuccessful.")
    console.error('Async: Could not copy text: ', err);
  })
})