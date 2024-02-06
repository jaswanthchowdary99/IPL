

function calculateMatchesWonPerTeamPerYear(matches){
return matches.reduce((acc, match) => {
    const {season ,winner} = match;
    if(acc[season] == undefined){
        acc[season] = {};
    }
    if(acc[season][winner] == undefined){
        acc[season][winner] = 1;
    }
    else{
        acc[season][winner]++;
    }
    return acc;

},{});
}

 
module.exports = {calculateMatchesWonPerTeamPerYear};