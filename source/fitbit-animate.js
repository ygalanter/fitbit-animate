export function fitbit_animate(elements) {
  
  return new Promise(function(resolve) {

      function callback(timestamp) { // main animation function
        let time = timestamp - start; // calculating time passed since animation start
        i = 0;

        // looping thru elements
        for(; i < iMax; ++i) {
           if (elements[i].from !== elements[i].to && elements[i].dur !== 0) { //only performing animation if needed
              if (time >= elements[i].dur) { //if duration time passed - assigning final value
                elements[i].elem.groupTransform[elements[i].prop][elements[i].subprop] = elements[i].to; 
              } else { // otherwise incrementing from "property"
                elements[i].elem.groupTransform[elements[i].prop][elements[i].subprop] = elements[i].from + (elements[i].to - elements[i].from)*time/elements[i].dur;
              }
            }
       }

        if (time < maxdur) requestAnimationFrame(callback) // if time passes below max duation time in elements - repeating animation
        else resolve(elements) // otherwise resolving promise

      }
    
      let maxdur = 0;
      let i = 0; const iMax = elements.length;
  
      // preprocessing elements
      for(; i < iMax; ++i)  {
        if (isNaN(elements[i].from)) { // if "from" is not set - assuming current element property as "from"
          elements[i].from = elements[i].elem.groupTransform[elements[i].prop][elements[i].subprop];
        }
        if (elements[i].dur === 0) {  // if duration is 0 or from equal to - no animation needed - setting final value
          elements[i].elem.groupTransform[elements[i].prop][elements[i].subprop] = elements[i].to;
        } else if (elements[i].dur > maxdur) { // otherwise calculation max duration
          maxdur = elements[i].dur
        }
      }

      let start = new Date(); // marking start of animation time

      requestAnimationFrame(callback); //starting animation

  })
  
}