function updateImg(imageName) {
  var url;
  switch (imageName) {
    case "sketch":
      url = 'https://lh3.google.com/u/0/d/1_sos09-ftqKykKt0sj58MAgFnYqr-NgT=w1359-h937-iv1';
      break;
    case "sketch_cell":
      url = 'https://lh3.google.com/u/0/d/1vfilHNrhrGwZx7UPWpguhC82t2O4DsMN=w1920-h937-iv1';
      break;
    case "sketch_soft":
      url = 'https://lh3.google.com/u/0/d/1eAsZorFxzbA3Xi7Xo29ubkvsAkazNTFu=w1920-h937-iv1';
      break;
    case "sketch_colour":
      url = 'https://lh3.google.com/u/0/d/12znbj6NHNWNe3C275_WWPc22E7Qq2bEt=w1920-h937-iv1';
      break;
    case "sketch_colour_cell":
      url = 'https://lh3.google.com/u/0/d/1J5tabSMtpC9y6_TFh8MZXO4SIFXZUdUr=w1920-h937-iv1';
      break;
    case "sketch_colour_soft":
      url = 'https://lh3.google.com/u/0/d/1WoYrh-wBJlPvOqWFCDGgmqmCxtarKGfz=w1920-h937-iv1';
      break;
    case "line":
      url = 'https://lh3.google.com/u/0/d/1TpokpX1CrDaZ3TBVQ7NZXdokd6RqhAIV=w1920-h937-iv1';
      break;
    case "line_cell":
      url = 'https://lh3.google.com/u/0/d/1xk3-O2hPYCoYcvt57n_o7fhkMOWTRVPJ=w1920-h937-iv1';
      break;
    case "line_soft":
      url = 'https://lh3.google.com/u/0/d/1wCk9dItkET5yCNksRrnHnfCGbERaSeZv=w1920-h937-iv1';
      break;
    case "line_colour":
      url = 'https://lh3.google.com/u/0/d/1s_TA8J33l5bf_c6mT_f8wb--1wT-9kn9=w1920-h937-iv1';
      break;
    case "line_colour_cell":
      url = 'https://lh3.google.com/u/0/d/1jFtLjfFb9NUndgX6pK2_K2T1s5icOXxu=w1920-h937-iv1';
      break;
    case "line_colour_soft":
      url = 'https://lh3.google.com/u/0/d/1KMEKJHY4ShO6bCHbliwIG_1WThdP9I5e=w1920-h937-iv1';
      break;
    default:
      url = 'https://lh3.google.com/u/0/d/1_sos09-ftqKykKt0sj58MAgFnYqr-NgT=w1359-h937-iv1';
      break;
  }
  $('#bgImg').attr("src",url);
}

function showShading() {
  if ($('#shadingCheck').is(':checked')) {
    shadingDiv.hidden = false;
    $('#shadingCell').prop("checked", true);
  } else {
    shadingDiv.hidden = true;
    $('#shadingCell').prop("checked", false);
    $('#shadingSoft').prop("checked", false);
  }
}

function showChars() {
  if ($('#addCharsCheck').is(':checked')) {
    $('#charDiv').show('fast');
  } else {
    $('#charDiv').hide('fast');
  }
}

function showBackground() {
  var backgroundCheckbox = document.getElementById("backgroundCheck");
  var backgroundDiv = document.getElementById("backgroundDiv");
  if (backgroundCheckbox.checked) {
    backgroundDiv.hidden = false;
    $('#backgroundSimple').prop("checked", true);
  } else {
    backgroundDiv.hidden = true;
    $('#backgroundSimple').prop("checked", false);
    $('#backgroundDetailed').prop("checked", false);
  }
}


function loop() {
  // -- Variable Definition --
  var imagename;
  var addCharsCheckbox = document.getElementById("addCharsCheck");
  var backgroundCheckbox = document.getElementById("backgroundCheck");
  var backgroundDiv = document.getElementById("backgroundDiv");
  var panelCheckbox = document.getElementById("panelCheck");
  var panelDiv = document.getElementById("panelDiv");
  var customCharsAmt = document.getElementById("customCharsAmt");
  var panelAmt = document.getElementById("panelAmt");
  var priceText = document.getElementById("price");

  // -- Checkboxes for hidden elements --

  if (backgroundCheckbox.checked) {
    backgroundDiv.hidden = false;
  } else {
    backgroundDiv.hidden = true;
  }

  if (panelCheckbox.checked) {
    panelDiv.hidden = false;
  } else {
    panelDiv.hidden = true;
  }

  // -- Actual price calculations --

  //Base Price
  var basePrice = parseInt($('#basePrice').val());

  //Quality Price
  var qualityPrice = basePrice;
  var qualityPerc = 0;

  if ($('#sketch').is(':checked')) {
    imagename="sketch"
  }
  if ($('#line').is(':checked')){
    qualityPerc += parseFloat($('#line').val());
    imagename="line"
  }
  if ($('#colorCheck').is(':checked')) {
    qualityPerc += parseFloat($('#colorCheck').val());
    imagename= imagename + "_colour"
  }

  if ($('#shadingCell').is(':checked')) {
    qualityPerc += parseFloat($('#shadingCell').val());
    imagename = imagename + "_cell";
  }
  if ($('#shadingSoft').is(':checked')) {
    qualityPerc += parseFloat($('#shadingSoft').val());
    imagename = imagename + "_soft";
  }

  qualityPrice = basePrice + (basePrice * qualityPerc);

  //Extras Price
  var extrasPrice = qualityPrice;
  var extrasPerc = 0;
  var extrasBonus = 0;

  if (addCharsCheckbox.checked) {
    extrasPerc += customCharsAmt.value * 0.5;
    if ($('#kamiCheck').is(':checked')) {
      extrasPerc += parseFloat($('#kamiCheck').val());
    }
  }

  if ($('#backgroundSimple').is(':checked')) {
    extrasBonus += parseFloat($('#backgroundSimple').val());
  }
  if ($('#backgroundDetailed').is(':checked')) {
    extrasBonus += parseFloat($('#backgroundDetailed').val());
  }
  if ($('#internalCheck').is(':checked')) {
    extrasPerc += parseFloat($('#internalCheck').val());
  }
  if ($('#excessiveCheck').is(':checked')) {
    extrasBonus += parseFloat($('#excessiveCheck').val());
  }
  if ($('#extremeAltVerCheck').is(':checked')) {
    extrasBonus += parseFloat($('#extremeAltVerCheck').val());
  }

  extrasPrice = qualityPrice + (qualityPrice * extrasPerc) + extrasBonus;

  //After Extras
  var afterExtrasPerc = 0;
  if (panelCheckbox.checked) {
    afterExtrasPerc += panelAmt.value * 0.75;
  }

  //Finally, calculate price
  var price = extrasPrice + extrasPrice * afterExtrasPerc;
  price = price.toFixed(2);
  priceText.innerHTML = '$' + price.toString();

  updateImg(imagename);
}

