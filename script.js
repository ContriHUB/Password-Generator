
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const strengthBar = document.querySelector('.strength-bar');
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

//Toggle function for blue/dark/white theme
document.addEventListener("DOMContentLoaded", function () {
    const currentMode = localStorage.getItem('mode') || 'light-mode';
    const heading = document.querySelector('h1');
    const paragraphs = document.querySelectorAll('p');
    const labels = document.querySelectorAll('label');
    const inputContainer = document.querySelector('.input-container');
    const displayContainer = document.querySelector('.display-container');
    const inputDisplay = document.querySelector('input[data-passwordDisplay]');
    const generateButton = document.getElementById('generateButton');
    const generateBtn = document.querySelector(".generateButton"); 
    const copyBtn = document.querySelector(".copyBtn");
    const tooltip = document.getElementById('tooltip');
    const updateSliderColor = (mode) => {
        const slider = document.querySelector('input[data-lengthSlider]');
        if (slider) {
            if (mode === 'light-mode') {
                slider.style.backgroundImage = 'linear-gradient(#0066ff, #0066ff)';
                slider.style.setProperty('--vb-yellow', '#ffcc00');
            } else {
                slider.style.backgroundImage = '';
                slider.style.setProperty('--vb-yellow', '');
            }
        }
    };
    const updateCheckboxStyles = (mode) => {
        const checkboxes = document.querySelectorAll('.check input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                if (mode === 'light-mode') {
                    checkbox.style.backgroundColor = 'hsl(177, 92%, 70%)';
                    checkbox.style.border = '2px solid darkred';
                    checkbox.style.color = 'blue';
                } else {
                    checkbox.style.backgroundColor = 'var(--vb-cyan)';
                    checkbox.style.border = 'none';
                    checkbox.style.color = 'white';
                }
            } else {
                checkbox.style.backgroundColor = '';
                checkbox.style.color = '';
                if (mode === 'light-mode') {
                    checkbox.style.border = '2px solid darkred';
                } else {
                    checkbox.style.border = '';
                }
            }
        });
    };
    const updateInputTextColor = (mode) => {
        inputDisplay.style.color = mode === 'light-mode' ? '#700067' : 'hsla(98, 100%, 50%, 0.957)';
    };
    const updatePlaceholderColor = (mode) => {
        if (mode === 'light-mode') {
            inputDisplay.style.setProperty('--placeholder-color', '#700067');
        } else {
            inputDisplay.style.setProperty('--placeholder-color', 'hsla(98, 100%, 50%, 0.957)');
        }
    };
    const updateGenerateButtonColor = (mode) => {
        if (generateButton) {
            generateButton.style.backgroundColor = mode === 'light-mode' ? '#001358' : 'blanchedalmond';
            generateBtn.style.color = mode === 'light-mode' ? 'white' : 'darkred';
        }
    };
    const applyModeStyles = (mode) => {
        document.body.className = mode;
        if (mode === 'light-mode') {
            heading.style.color = "darkred";
            document.getElementById('mode-icon').style.color = 'black';
            document.body.style.backgroundColor = "white";
            inputContainer.style.backgroundColor = "#D2D3D3";
            displayContainer.style.backgroundColor = "#D2D3D3";
            paragraphs.forEach(p => p.style.color = 'black');
            labels.forEach(label => label.style.color = 'black');
            generateBtn.style.backgroundColor = '#001358';
            generateBtn.style.color = 'white';
            copyBtn.style.color = 'darkred'; 
            tooltip.style.backgroundColor = '#0077FF';
            tooltip.style.color = '#FFEA00';
        } else {
            heading.style.color = "rgb(172, 199, 241)";
            document.getElementById('mode-icon').style.color = 'white';
            document.body.style.backgroundColor = "#121212";
            inputContainer.style.backgroundColor = "";
            displayContainer.style.backgroundColor = "";
            paragraphs.forEach(p => p.style.color = 'white');
            labels.forEach(label => label.style.color = 'white');
            generateBtn.style.backgroundColor = 'blanchedalmond';
            generateBtn.style.color = 'darkred';
            copyBtn.style.color = 'hsla(98, 100%, 50%, 0.957)';
            tooltip.style.backgroundColor = ''; 
            tooltip.style.color = ''; 
        }

        updateCheckboxStyles(mode);
        updateInputTextColor(mode);
        updatePlaceholderColor(mode);
        updateGenerateButtonColor(mode);
        updateSliderColor(mode);
    };

    // Initial setup based on stored mode or default
    applyModeStyles(currentMode);

    const toggleButton = document.getElementById('mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            const newMode = document.body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
            localStorage.setItem('mode', newMode);
            applyModeStyles(newMode);
        });
    }
    
    const checkboxes = document.querySelectorAll('.check input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateCheckboxStyles(localStorage.getItem('mode'));
        });
    });
});


//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//ste strength circle color to grey


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow - HW
}

function setStrengthBar(pswd_strength)
{
    /*This function sets the color and length of the strength bar based on pswd_strength
    passed to it*/
    let color="";
    if(pswd_strength>66)
        color="green"
    else if(pswd_strength>=33)
        color="yellow"
    else
        color="red"
    // pswd_strength is between 0 to 100.
    // By adding a % to the end will use it as width of strengthbar
    let w = pswd_strength.toString()+"%";
    strengthBar.style.width = w;
    strengthBar.style.backgroundColor = color;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    /*This function calculates the strength of password based on
    value of checkboxes and length of the password.
    
    To calculate the strength we first generate the pswd_strength between 0 and 1
    if uppercase letters are allowed we add 0.2 to strength
    if lowercase letters are allowed we add 0.2 to strength
    if numbers are allowed we add 0.3 to strength
    if symbols are allowed we add 0.3 to strength

    finally we multiply the strength so generated by password length
    Once done we call the setStrengthBar function to make the strengthBar
    reflect the new strength so calculated
    */
    let pswd_strength=0;
    pswd_strength+=uppercaseCheck.checked?0.2:0;
    pswd_strength+=lowercaseCheck.checked?0.2:0;
    pswd_strength+=numbersCheck.checked?0.3:0;
    pswd_strength+=symbolsCheck.checked?0.3:0;

    pswd_strength=pswd_strength*passwordLength*8;
    pswd_strength=pswd_strength>100?100:pswd_strength;
    setStrengthBar(pswd_strength);
}

// adding the eventlistener to the inputs so that
// when user changes any of the input the password strength is calculated again
// and the strength bar is updated accordingly
inputSlider.addEventListener('input',()=>calcStrength());
uppercaseCheck.addEventListener('change',()=>calcStrength());
lowercaseCheck.addEventListener('change',()=>calcStrength());
numbersCheck.addEventListener('change',()=>calcStrength());
symbolsCheck.addEventListener('change',()=>calcStrength());

const copyIcon = copyBtn.querySelector('.icon')

    // Generate password logic
    const generatePassword = () => {
        passwordDisplay.value = "YourGeneratedPassword"; // Replace with actual password generation logic
        // updateCopyButtonState();  // Enable copy button after generating password
    };

    // Copy password to clipboard and show feedback
    async function copyContent() {
        const passwordToCopy = passwordDisplay.value.trim(); // Get the trimmed password
        if (!passwordToCopy) return; // Don't proceed if there's no password

        try {
            await navigator.clipboard.writeText(passwordToCopy); // Copy to clipboard
           
        } catch (e) {
            copyMsg.innerText = "Failed"; // Show failure message
        }
        copyMsg.innerText = "Copied"; // Show copied message
        copyIcon.src = "https://img.icons8.com/ios-filled/50/40C057/checked-checkbox.png"; // Change icon to checked state
        copyIcon.classList.add('success'); // Add success class
        copyMsg.classList.add("active"); // Show the copy message

        // Set a timeout to reset the icon and message after 2 seconds
        setTimeout(() => {
            copyIcon.src = 'copy.svg'; // Reset icon to original
            copyIcon.classList.remove('success'); // Remove success class
            copyMsg.classList.remove("active"); // Hide the copy message
        }, 2000); // 2-second delay
    }

    // Event Listeners
    // passwordDisplay.addEventListener('input', updateCopyButtonState);  // For updating copy button state
    document.getElementById('generateButton')?.addEventListener('click', generatePassword);  // Password generation
    copyBtn.addEventListener('click', copyContent);  // Copy event

    // updateCopyButtonState();  // Initial state update


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});

