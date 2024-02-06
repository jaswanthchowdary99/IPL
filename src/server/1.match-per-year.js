


function matchesPerYear(matches){

 return matches.reduce((acc,match)=>{
   const season = match.season;
   acc[season] = (acc[season] || 0) + 1;

   return acc;
 },{});
   
}

    
module.exports = {matchesPerYear};
    
    
   