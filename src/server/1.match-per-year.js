


function matchesPerYear(matches){

  const matchPerYear = {};
    for(let index = 0; index < matches.length; index++){
     const seasons = matches[index].season;
     if(matchPerYear[seasons]){
      
        matchPerYear[seasons] = matchPerYear[seasons]+1;
    
     }
     else{
        matchPerYear[seasons] = 1;
     }
    
    }
    return matchPerYear;
}

    
module.exports = {matchesPerYear};
    
    
   