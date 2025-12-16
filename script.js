function inputValues(idOfElm)
{

    let error;

    let element = document.getElementById(`${idOfElm}`);
    let val = element.value;

    if(idOfElm==='reqdNumOfGems')
    {

        if(val.length>10 || Number(val)<0 || Number.isInteger(Number(val))===false)
            {
                error = document.getElementById('err0');
                error.style.visibility = 'visible';
                return -1;
            }
            else
            {
                error = document.getElementById('err0');
                error.style.visibility='hidden'
                return Number(val);
            }
            
    }

    else if(idOfElm==='avlNumOfGems')
    {

        
        if(val.length>10||Number(val)<0||Number.isInteger(Number(val))===false)
            {
                error = document.getElementById('err1');
                error.style.visibility = 'visible';
                return -1;
            }
            else
            {
                error = document.getElementById('err1');
                error.style.visibility = 'hidden';
                return Number(val);
            }
            

    }

    else if(idOfElm==='gemMineLevel')
    {

        if(Number(val)>10||Number(val)<0||Number.isInteger(Number(val))===false)
            {
                error = document.getElementById('err2');
                error.style.visibility = 'visible';
                return -1;
                
            }
            else
            {
                error = document.getElementById('err2');
                error.style.visibility = 'hidden';
                return Number(val);
            }
            
    }
    else if(idOfElm==='clockTowerLevel')
    {

        
        if(Number(val)>10||Number(val)<0||Number.isInteger(Number(val))===false)
            {
                error = document.getElementById('err3');
                error.style.visibility = 'visible';
                return -1;
                
            }
            else
            {
                error = document.getElementById('err3');
                error.style.visibility = 'hidden';
                return Number(val);
            }
    }
}



    

        
function gemMineAndClockTower(val)
{
let gemMineLvl = val[2];

const gemMinePerDayProduction = {0:Infinity,         //time taken to produce 1 gem for each level of the gem mine
                    1:40000,
                    2:36000,
                    3:32727,
                    4:30000,
                    5:27692,
                    6:25714,
                    7:22500,
                    8:20000,
                    9:18000,
                    10:17143
                }



let clockTowerLvl = val[3];

const netTimeGainedPerDay = {0:0,       //Indicated how much actual boost is provided by the clock tower in addition to 24 hours of a day for each clock tower level.
                    1:6720,
                    2:7680,
                    3:8640,
                    4:9600,
                    5:10560,
                    6:11520,
                    7:12480,
                    8:13440,
                    9:14400,
                    10:15360
                }

let cgmProductionPerDay = (86400+netTimeGainedPerDay[clockTowerLvl])/gemMinePerDayProduction[gemMineLvl];       // total production by the gemMine with clock tower boost once a day
return cgmProductionPerDay;
}



function gemBoxCounter(values)
{
    let gemBox = document.getElementById('gemBox');
    let reqdGems = values[0];
    let avlGems = values[1];
    let count =0;
    let newAvlGems = avlGems;
    let resultTag = document.getElementById('timeTakenText2');


    function newTime()
    {
        newAvlGems +=25;

        if(newAvlGems>=reqdGems)
        {
            count++;
            document.getElementById('counter').innerHTML=`x${count}`;
            resultTag.innerHTML = `0 days`;
            gemBox.removeEventListener('click' , newTime);
        }
        else
        {
            count++;
            document.getElementById('counter').innerHTML=`x${count}`;
            let reqdTime =reqdTimeCalculate(values, reqdGems, newAvlGems);
            let result = obtainTime(reqdTime);
            resultTag.innerHTML = `${result[0]}d ${result[1]}h ${result[2]}m ${result[3]}s`;  
        }
    }


    gemBox.addEventListener('click',newTime);

}

function obstacles()
{
    let obstacleNetProdPerDay =0;
    let homeBaseObs = document.getElementById('homeBaseObstacleToggle');
    let BuilderBaseObs = document.getElementById('builderBaseObstacleToggle');

    if(homeBaseObs.checked)
    {
        obstacleNetProdPerDay+=6;
    }
                        
    if(BuilderBaseObs.checked)
    {
        obstacleNetProdPerDay +=6;
    }

    return obstacleNetProdPerDay;
}

function reqdTimeCalculate(values ,reqdGems , avlGems)
{
    let netReqdGems = (Number(reqdGems)) - (Number(avlGems));
    let NetProductionPerDay = gemMineAndClockTower(values) + obstacles();

    let reqdTime = netReqdGems/NetProductionPerDay;
    reqdTime = parseFloat(reqdTime.toFixed(4));         //to round required time to 4 decimal places.
    return reqdTime;

}

function obtainTime(time)
{
    let remainingTime;

    let days = Math.floor(time);
    remainingTime = time-days;
    
    let hours = (remainingTime*24);
    remainingTime = hours;
    hours = Math.floor(remainingTime);
    remainingTime-=hours;


    let minutes = (remainingTime*60);
    remainingTime = minutes;
    minutes = Math.floor(remainingTime);
    remainingTime-= minutes;

    let seconds = (remainingTime*60);
    remainingTime = seconds;
    seconds = Math.floor(remainingTime);


    return [days,hours,minutes,seconds];
}

function checkType(arr)
{
    console.log(arr.length)
    for (i of arr)
    {
        if(i==-1)
            return false
    }

return true;
}

function mainFunction(val)
{

    let resultTag = document.getElementById('timeTakenText1');

    if(checkType(val) && val.length===4)
    {
        window.scrollBy({ top: 500, behavior: 'smooth'}); // Scroll down by 500 pixels
        let reqdGems = val[0];
        let avlGems = val[1];
        document.getElementById('counter').innerHTML=`x0`;
        document.getElementById('timeTakenText2').innerHTML = '';
        
        let elements = document.querySelectorAll('.timeTaken');
        elements.forEach(function(element) 
        {
            element.style.display = 'flex';
        });

        if(reqdGems <= avlGems) 
            {
                resultTag.innerHTML = ("0 days");   
                document.getElementById('timeTakenWithGb').style.display = 'none';
            }
            else
            {
                let reqdTime = reqdTimeCalculate(val, reqdGems , avlGems);
                let result = obtainTime(reqdTime);

                if((result[0] === Infinity) || (Number.isNaN(result[0])))
                {
                    resultTag.innerHTML =`Infinite d`; 
                }
                else
                {
                    resultTag.innerHTML =`${result[0]}d ${result[1]}h ${result[2]}m ${result[3]}s`;
                }
                document.getElementById('timeTakenWithGb').style.display = 'flex';
                gemBoxCounter(val);


            }
    }

} 


const inputs = document.querySelector('.parameters');
let val = [];

// Initialize sliders to 0
document.getElementById('gemMineDisplay').textContent = document.getElementById('gemMineLevel').value;
document.getElementById('clockTowerDisplay').textContent = document.getElementById('clockTowerLevel').value;

// Add specific listener for range updates
inputs.addEventListener('input', (event) => {
    // console.log('inputted');
    
    // Update display if it's a slider
    if(event.target.id === 'gemMineLevel') {
        document.getElementById('gemMineDisplay').textContent = event.target.value;
    } else if(event.target.id === 'clockTowerLevel') {
        document.getElementById('clockTowerDisplay').textContent = event.target.value;
    }

    if (event.target.classList.contains('inputs')) {
        let idOfElm = (event.target.id);
        if (idOfElm === 'reqdNumOfGems') {
            val[0] = inputValues(idOfElm);
        } else if (idOfElm === 'avlNumOfGems') {
            val[1] = inputValues(idOfElm);
        } else if (idOfElm === 'gemMineLevel') {
            val[2] = inputValues(idOfElm)
        } else if (idOfElm === 'clockTowerLevel') {
            val[3] = inputValues(idOfElm);
        }
        //console.log(val)

    }
});

document.getElementById('calcBtn').addEventListener('click', function() {
    console.log(val);
    mainFunction(val);
});


