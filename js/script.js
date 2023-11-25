///////////////////////////////////////////
// FE 23, Inlämning 2-Andréa Jandergren  //
// Sten sax påse                       ///
///////////////////////////////////////////

const btnForm = document.querySelector('button');
const btnStone = document.querySelector('#stoneSelected');
const btnScissor = document.querySelector('#scissorSelected');
const btnPaper = document.querySelector('#paperSelected');
const divElements = document.querySelector('.createNestedDivFirst');
const containerDiv = document.createElement('div');
let userChoice, compChoice;
let h3ElUser = document.querySelector('.userNumb');
let h3ElComputer = document.querySelector('.computerNumb');
let userScore = 0;
let computerScore = 0;
let roundCounter = 0;
let displayPlayerChoice = document.querySelector('.container-div-userChoice > img');
let displayComputerChoice = document.querySelector('.container-div-computerChoice > img');

//Slumpar datorns val och returnerar
function getComputerChoice() {
    const choices = ['sten', 'sax', 'papper'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Här placeras datorns och användarens poäng samt rundans nummer.
// ContainerDiv för att hålla elementen organiserade.
for (let i = 0; i < 1; i++) {
    if (i === 0) {
        document.body.appendChild(containerDiv);
        containerDiv.classList.add('createdContainerDiv');

        const divEl = document.createElement('div');
        containerDiv.appendChild(divEl);
        divEl.classList.add('createNestedDivFirst');
    }
}

/////////////////////////////////////////////
//Genererar output för spelets olika utfall//
/////////////////////////////////////////////

//Output för när användare vinner
function createH2UserWin() {
    const userName = document.querySelector('#inputName').value;
    const h4El = document.querySelector ('h4');
    userScore ++;
    h4El.innerText = `${userName} vann rundan`;
    h3ElUser.innerText = `${userName}: ${userScore}`;       
}

//Output för oavgjort
function createH2Undecided() {
    const h4El = document.querySelector('h4');
    h4El.innerText = 'Oavgjort '; 
}

//Output för när datorn vinner
function createH2ComputerWin() {
    const h4El = document.querySelector ('h4');
    computerScore ++;
    h4El.innerText = 'Datorn vann rundan';
    h3ElComputer.innerText = `Datorn: ${computerScore}`;
}

//Räknar antal rundor som körts
function displayRound(){
    roundCounter ++;
    const h2ElDisplayRound = document.querySelector('.showRound')
    h2ElDisplayRound.innerText = `Runda ${roundCounter}`;
}

////////////////////////////////////////
//Jämförelser för spelets olika utfall//
////////////////////////////////////////

//Jämför för att avgöra om det blev oavgjort
function compareUndecided() {
    if (userChoice === compChoice) {
        createH2Undecided();
        if(userChoice === 'sten' && compChoice === 'sten'){
            displayPlayerChoice.src = './img/stone.png'
            displayComputerChoice.src = './img/stone.png'
        }
        else if(userChoice === 'sax' && compChoice === 'sax'){
            displayPlayerChoice.src = './img/scissors.png'
            displayComputerChoice.src = './img/scissors.png'

        }
        else if(userChoice === 'papper' && compChoice === 'papper'){
            displayPlayerChoice.src = './img/file.png'
            displayComputerChoice.src = './img/file.png'
        }
        displayRound();
    }  
    
}  

// Jämför datorns val och användarval: sten
function compareStone() {
    if (compChoice === 'sax') {
        createH2UserWin(); 
        displayPlayerChoice.src = './img/stone.png';
        displayComputerChoice.src = './img/scissors.png';  
        displayRound();
    } 
    else if (compChoice === 'papper') {
        createH2ComputerWin();  
        displayComputerChoice.src = './img/file.png'; 
        displayPlayerChoice.src = './img/stone.png';
        displayRound();
    } 
}

// Jämför datorns val och användarval: sax
function compareScissor() {
    if (compChoice === 'sten') {
        createH2ComputerWin(); 
        displayComputerChoice.src = './img/stone.png';
        displayPlayerChoice.src = './img/scissors.png';
        displayRound();   
    } 
    else if (compChoice === 'papper') {
        createH2UserWin(); 
        displayComputerChoice.src = './img/file.png'; 
        displayPlayerChoice.src = './img/scissors.png';
        displayRound(); 
    } 
}

// Jämför datorns val och användarval: papper
function comparePaper() { 
   
    if (compChoice === 'sten') {
        createH2UserWin();
        displayPlayerChoice.src = './img/file.png';
        displayComputerChoice.src = './img/stone.png';
        displayRound();
       
    } else if (compChoice === 'sax') {
        createH2ComputerWin();
        displayComputerChoice.src = './img/scissors.png';
        displayPlayerChoice.src = './img/file.png';
        displayRound();
    }  
}

///////////////////////////////////////////////////////////////
// Återställer spel, anropas när checkforwinner kontrollerats// 
///////////////////////////////////////////////////////////////

 function resetGame() {
    displayPlayerChoice.src = 'data:,';
    displayPlayerChoice.alt = '';
    displayComputerChoice.src = 'data:,';
    displayComputerChoice.alt = '';
    const h4Elements = document.querySelectorAll('h4');
    h4Elements.forEach(element => {
        element.innerText = '';
    });
    userScore = 0;
    computerScore = 0;
    roundCounter = 0;
    const h2ElRemoveRound = document.querySelectorAll('.showRound');
    h2ElRemoveRound.forEach(element => {
        element.innerText = '';
    });
    // Uppdaterar  spelare och användares poäng
    const text = document.querySelector('#inputName').value;
    h3ElUser.innerText = `${text}: ${userScore}`;
    h3ElComputer.innerText = `Datorn: ${computerScore}`;

    // Tar bort vem som vann 
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length >= 2) {
        h1Elements[1].remove();
    }
    const h1El = document.createElement('h1');
    document.body.appendChild(h1El);  
}

/////////////////////////////////////////////////////////////////////////////////////
//Kontrollerar om antingen datorn eller användaren har uppnått "bäst av tre" poäng.//
////////////////////////////////////////////////////////////////////////////////////

function checkForWinner() {
    if (userScore === 3 || computerScore === 3) {
      const winner = userScore === 3 ? document.querySelector('#inputName').value : 'Datorn';

      // Visa vinnaren och rensa bort överflödiga h1-element.
      displayWinner(`${winner} `);
      const h1ElementsWithPosition = document.querySelectorAll('h1.position');
      h1ElementsWithPosition.forEach(function (h1Element) {
        h1Element.remove(); 
      });  
    } 
     // Om ingen har uppnått "bäst av tre" poäng än.
    else {
        const h1El = document.createElement('h1');
        document.body.appendChild(h1El);
        const userName = document.querySelector('#inputName').value;
        h1El.innerText = `Spelare: ${userName}`;
        h1El.classList.add('position');
        
        // Rensa bort överflödiga h1-element.
        const h1Elements = document.querySelectorAll('.createdh1El');
        h1Elements.forEach(function (h1Element) {
          h1Element.remove();
        });
    } 
}

  //Visar vinnaren och sätter en "delay" så att poängen hinner visas innan de nollställs
function displayWinner(winner) {
    const h1El = document.createElement('h1');
    document.body.appendChild(h1El);
    h1El.innerText = `${winner} vann hela rundan!`;
    h1El.classList.add('createdh1El'); 
    
    setTimeout(() => {
        resetGame();
    }, 2000);
}

////////////////////////
//Spelets olika events//
////////////////////////

//Skicka-knappens event
btnForm.addEventListener('click', (event) => {
    (event).preventDefault();
        const h1El = document.createElement('h1');
        document.body.appendChild(h1El);
        const userName = document.querySelector('#inputName').value;
        h1El.innerText = `Spelare: ${userName}`;
        h1El.classList.add('position');
      
        const h1Elements = document.querySelectorAll('.createdh1El');
        h1Elements.forEach(function (h1Element) {
          h1Element.remove();
        }); 
        resetGame(); 
});

//Sten-knappens event
btnStone.addEventListener('click', (event) => {
    (event).preventDefault();
    userChoice = 'sten';
    displayPlayerChoice.setAttribute('data-object', 'sten')
    displayPlayerChoice.alt ='sten icon'
    displayComputerChoice.alt ='sten icon'
    
    compChoice = getComputerChoice();
    compareUndecided();
    compareStone();
    checkForWinner(); 
});

//Sax-knappens event
btnScissor.addEventListener('click', (event) => {
    (event).preventDefault();
    userChoice = 'sax';
    displayPlayerChoice.setAttribute('data-object', 'sax')
    displayPlayerChoice.alt ='sax icon'
    displayComputerChoice.alt ='sax icon'
    compChoice = getComputerChoice();
    compareUndecided();
    compareScissor();
    checkForWinner();
      
    
});

//Papper-knappens event
btnPaper.addEventListener('click', (event)  => {
    (event).preventDefault();
    userChoice = 'papper';
    displayPlayerChoice.setAttribute('data-object', 'papper')
    displayPlayerChoice.alt ='papper icon'
    displayComputerChoice.alt ='papper icon'
    compChoice = getComputerChoice();
    compareUndecided();
    comparePaper();
    checkForWinner();
     
});
