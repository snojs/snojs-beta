// SnoJS Snowstorm BETA 

// inside exe usable functions
function random(max) {
  return Math.floor(Math.random() * max);
}
function toggle(name){
	if(name){return false;}else{return true;}
}

let stored;
function save(input){
  stored = input;
}
function retrieve(){
  return stored;
}
// Grab all html elements to parse later
const getElms = () =>{
	var z;
  var arr = []
  z= document.getElementsByTagName("*");
  for(i=0;i<z.length;i++){
  	arr.push(z[i]);
  }
  return arr;
};
const elements = getElms();

// Mark the data tag and push jsonified vars to array
const parseData = () =>{
	var hasDataTag, jsonified;
  var possible = false;

	for(i=0;i<elements.length;i++){
  	hasDataTag = elements[i].getAttribute("data");
    if(hasDataTag != null){
      possible = true;
    	hasDataTag = JSON.parse(hasDataTag);
      return hasDataTag;
    }
  }
  if(!possible){
    hasDataTag = '{"undefined":"undefined"}';
    hasDataTag = JSON.parse(hasDataTag);
    return hasDataTag;
  }
};
const data = parseData();

const parseReval = () => {
  var hasReval;
  var revals = [];
  for(i=0;i<elements.length;i++){
    //check for reval attr
    hasReval = elements[i].getAttribute("react")
    if(hasReval != null){
      revals.push({"elem":elements[i],"oldTxt":elements[i].innerHTML});
    }else{
      if(elements[i].getAttribute("lint") != null){
        revals.push({"elem":elements[i],"oldTxt":elements[i].innerHTML});
      }
    }
  }
  return revals;
}
const reval = parseReval();

const parseIf = () =>{
	var hasIf;
  var ifs = [];
  for(i=0;i<elements.length;i++){
  	// Check for React attr
  	hasIf = elements[i].getAttribute("if");
    if(hasIf != null){
    	// Dont push data of React attr, only elem
    	ifs.push({"elem":elements[i],"attr":hasIf,"computed":undefined,"pre":"","post":""});
    }
  }
  return ifs;
};
const ifs = parseIf();

const parseClicker = () =>{
  var hasClick;
  var click = []
  for(i=0;i<elements.length;i++){
    // Check for the Click attr
    hasClick = elements[i].getAttribute("click");
    if(hasClick != null){
      click.push(elements[i]);
      // Add the click listener
      elements[i].addEventListener('click', function(evt){
        // take the data of hasClick to the function
        var bringClick = evt.currentTarget.getAttribute("click")
        var already = false;
        try{
	        for(let i = 0;i<Object.keys(data).length;i++){
	            if(bringClick.includes(Object.keys(data)[i])){
	                if(!already){
	                    bringClick = bringClick.replaceAll(Object.keys(data)[i],`data["${Object.keys(data)[i]}"]`)
	                }
	            }
	        }
	        already=true;
	        eval(bringClick);
	    }catch (error){
	        console.log("Error with clicker():"+error)
	    }
      })
    }
  }
  return click;
};
let click = parseClicker();

const exc = () => { 
  var hasExc;
  for(i=0;i<elements.length;i++){
    hasExc = elements[i].getAttribute("exc");
    if(hasExc != null){
      for(q=0;q<Object.keys(data).length;q++){
        if(hasExc.includes(Object.keys(data)[q])){
          hasExc = hasExc.replace(Object.keys(data)[q], `data.${Object.keys(data)[q]}`);
        }
      }
      eval(hasExc)
    }
  }
};exc();

window.main = function(){
	requestAnimationFrame( main );
  // reval checker basically react + something, similar to the react components
  if(reval.length > 0){
    // Regular loop Check for Object and iterate through reval
    for(i=0;i<Object.keys(data).length;i++){
      for(q=0;q<reval.length;q++){
        // Reset the reval elem to the original
        reval[q].elem.innerHTML = reval[q].oldTxt
        // if it contains the specific variable continue
        if(reval[q].elem.innerHTML.includes(Object.keys(data)[i]) || reval[q].elem.innerHTML.includes("{{")){
          // double reset in case of errors
          reval[q].elem.innerText = reval[q].oldTxt;
          // if the specific reval has already been computed to its final compiler friendly form aka {{count+1}} => "data.count+1"
          if(reval[q].computed != undefined){
            // Evaluate and render
            reval[q].elem.innerHTML = reval[q].elem.pre+eval(reval[q].computed)+reval[q].elem.post;
          }else{
            // if not then systematically replace {{count+1}} => data.count+1 and save the final to computed
            // for both pre and post you must rip the outside text from the element ex "hello world {{count+1}} yeah" the outside text has to go while also being saved as pre or post 
            let preDiv = reval[q].elem.innerText.split("{")
            let postDiv = reval[q].elem.innerText.split("}")
            reval[q].elem.pre = preDiv[0]
            reval[q].elem.post = postDiv[postDiv.length-1]
            let trueTxt = preDiv[preDiv.length-1].split("}")[0]
            trueTxt = trueTxt.replace(Object.keys(data)[i],`data.${Object.keys(data)[i]}`)
            // reval[q].elem.innerText = trueTxt
            // reval[q].elem.innerText = reval[q].elem.innerText.replace(Object.keys(data)[i],`data.${Object.keys(data)[i]}`)
            // reval[q].elem.innerText = reval[q].elem.innerText.replace("{{",``);
            // reval[q].elem.innerText = reval[q].elem.innerText.replace("}}",``);
            reval[q].computed = trueTxt
          }
        }
      }
    }
  }
  // If reactor
  if(ifs.length > 0){
    // loop both the object and the ifs to check for equality
    for(i=0;i<Object.keys(data).length;i++){
      for(q=0;q<ifs.length;q++){
        //Check if an attribute includes any valid variable
        if(ifs[q].attr.includes(Object.keys(data)[i])){
          // convert the attribute data from "count==5" to "data.count==5" then evaluate if its tru
          let trueAttr = ifs[q].attr.replace(Object.keys(data)[i],`data.${Object.keys(data)[i]}`)
          if(eval(trueAttr)){
            ifs[q].elem.style.display = "";
          }else{
            ifs[q].elem.style.display = "none";
          }
        }
      }
    }
  }
};main();
