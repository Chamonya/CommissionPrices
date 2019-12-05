import "./styles.css";
// -- Variable Definition --
var shadingCheckbox = document.getElementById("shadingCheck");
var shadingDiv = document.getElementById("shadingDiv");
var shadingRadios = document.getElementsByName("shadingStyle");
var addCharsCheckbox = document.getElementById("addCharsCheck");
var addCharsDiv = document.getElementById("charDiv");
var backgroundCheckbox = document.getElementById("backgroundCheck");
var backgroundDiv = document.getElementById("backgroundDiv");
var backgroundRadios = document.getElementsByName("backgroundComplexity");
var panelCheckbox = document.getElementById("panelCheck");
var panelDiv = document.getElementById("panelDiv");
var baseDropdown = document.getElementById("basePrice");
var lineRadios = document.getElementsByName("lineStyle");
var colorCheck = document.getElementById("colorCheck");
var cloverCheck = document.getElementById("cloverCheck");
var mysaCheck = document.getElementById("mysaCheck");
var customCharsAmt = document.getElementById("customCharsAmt");
var internalCheck = document.getElementById("internalCheck");
var excessiveCumCheck = document.getElementById("excessiveCumCheck");
var extremeAltVerCheck = document.getElementById("extremeAltVerCheck");
var panelAmt = document.getElementById("panelAmt");
var priceText = document.getElementById("price");
var sketchImg = document.getElementById("sketchImg");
var lineartImg = document.getElementById("lineartImg");
var colorImg = document.getElementById("colorImg");
var cellShadingImg = document.getElementById("cellShadeImg");
var softShadingImg = document.getElementById("softShadeImg");

function updateExampleImg() {
  // Todo
}

//rough workaround since codesandbox won't call functions onclick for some reason? I'm so confused lol
function loop () {

  // -- Checkboxes for hidden elements --
  if (shadingCheckbox.checked) {
    shadingDiv.hidden = false;
  }
  else {
    shadingDiv.hidden = true;
  }

  if (addCharsCheckbox.checked) {
    addCharsDiv.hidden = false;
  }
  else {
    addCharsDiv.hidden = true;
  }

  if (backgroundCheckbox.checked) {
    backgroundDiv.hidden = false;
  }
  else {
    backgroundDiv.hidden = true;
  }

  if (panelCheckbox.checked) {
    panelDiv.hidden = false;
  }
  else {
    panelDiv.hidden = true;
  }

  // -- Actual price calculations --

  //Base Price
  var basePrice = 0;
  switch(baseDropdown.options[baseDropdown.selectedIndex].value) {
    case "headshot":
      basePrice = 5;
      break;
    case "bust":
      basePrice = 8;
      break;
    case "kneeUp":
      basePrice = 10;
      break;
    case "fullbody":
      basePrice = 13;
      break;
    default:
      basePrice = 0;
      break;
  }
  
  //Quality Price
  var qualityPrice = basePrice;
  var qualityPerc = 0;
  
  for (var i = 0, length = lineRadios.length; i < length; i++)
  {
    if (lineRadios[i].checked) {
      if (lineRadios[i].value === "lineart") {
        qualityPerc += 0.5;
        lineartImg.hidden = false;
        sketchImg.hidden = true;
      }
      else {
        lineartImg.hidden = true;
        sketchImg.hidden = false;
      }
    }
  }
  if (colorCheck.checked) {
    qualityPerc += 0.4;
    colorImg.hidden = false;
  }
  else {
    colorImg.hidden = true;
  }
  if (shadingCheckbox.checked) {
    for (var i = 0, length = shadingRadios.length; i < length; i++)
    {
      if (shadingRadios[i].checked) {
        switch (shadingRadios[i].value) {
          case "cell":
            qualityPerc += 0.6;
            cellShadingImg.hidden = false;
            softShadingImg.hidden = true;
            break;
          case "soft":
            qualityPerc += 0.9;
            cellShadingImg.hidden = true;
            softShadingImg.hidden = false;
            break;
          default:
            break;
        }
      }
    }
  }
  else {
    cellShadingImg.hidden = true;
    softShadingImg.hidden = true;
  }
  qualityPrice = basePrice + (basePrice * qualityPerc);

  //Extras Price
  var extrasPrice = qualityPrice;
  var extrasPerc = 0;
  var extrasBonus = 0;

  if (addCharsCheckbox.checked) {
    extrasPerc += customCharsAmt.value * 0.5;
    if (cloverCheck.checked) {
      extrasPerc += 0.4;
    }
    if (mysaCheck.checked) {
      extrasPerc += 0.4;
    }
  }
  if (backgroundCheckbox.checked) {
    for (var i = 0, length = backgroundRadios.length; i < length; i++)
    {
      if (backgroundRadios[i].checked) {
        switch (backgroundRadios[i].value) {
          case "simple":
            extrasBonus += 12;
            break;
          case "detailed":
            extrasBonus += 35;
            break;
          default:
            break;
        }
      }
    }
  }
  if (internalCheck.checked) {
    extrasPerc += 0.1;
  }
  if (excessiveCumCheck.checked) {
    extrasBonus += 10;
  }
  if (extremeAltVerCheck.checked) {
    extrasBonus += 10;
  }
  extrasPrice = qualityPrice + (qualityPrice * extrasPerc) + extrasBonus;

  //After Extras
  var afterExtrasPerc = 0;
  if (panelCheckbox.checked) {
    afterExtrasPerc += panelAmt.value * 0.75;
  }

  //Finally, calculate price
  var price = extrasPrice + (extrasPrice * afterExtrasPerc);
  price = price.toFixed(2);
  priceText.innerHTML = `<center>Price:<br>$` + price.toString() + `</center>`;
}

setInterval(loop, 100);

//why the fff won't functions be called when using onclick???
/*function change() {
  alert("test2");
}

function OnShadingChecked(shadingCheckbox, shadingDiv) {
  console.log("test");
  if (shadingCheckbox.checked) {
    shadingDiv.hidden = false;
  }
  else {
    shadingDiv.hidden = true;
  }
}*/
