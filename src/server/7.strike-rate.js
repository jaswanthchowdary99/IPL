

function calculateHighestBatsmanStrikeRate (matches,deliveries){

    const batsmanStrike = {};
    for(let index of matches){
        if(batsmanStrike[index.season] == undefined){
            batsmanStrike[index.season] = {};
        }
        for(let index1 of deliveries){
           if(batsmanStrike[index.season][index1.batsman] == undefined){
                batsmanStrike[index.season][index1.batsman] = {runs1 :0 , balls : 0};
           }
           else{
            batsmanStrike[index.season][index1.batsman].runs1 = batsmanStrike[index.season][index1.batsman].runs1 + Number(index1.batsman_runs);
            batsmanStrike[index.season][index1.batsman].balls++;
           }
        }
    }
    
    let strikeRate = [];
    for(let season1 in batsmanStrike){
        for(let batsman1 in batsmanStrike[season1]){
            const{runs1, balls} = batsmanStrike[season1][batsman1];
             let strikeRate1 = (runs1 / balls) * 100;
             strikeRate.push(season1,batsman1,strikeRate1);
        }
    }
    return strikeRate;
 }
 

 module.exports = {calculateHighestBatsmanStrikeRate};
