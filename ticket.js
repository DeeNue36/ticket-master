// * Get DOM Elements

// * Sections to be displayed toggled
const ticketApplicationContainer = document.querySelector('.ticket-application');
const displayTicket = document.querySelector('.ticket-container');

// * Ticket Application Form and Inputs
const ticketApplicationForm = document.querySelector('.ticket-form');
const selectImage = document.querySelector('.upload');
const avatarInput = document.querySelector('#avatar');
const nameInput = document.querySelector('#fullname');
const emailInput = document.querySelector('#email');
const githubInput = document.querySelector('#github-uname');

// * File Upload Container
const fileUploadContainer = document.querySelector('.file-upload');

// * Upload Instructions
const uploadInstructionsSubtext = document.querySelector('.upload-instructions-subtext');

// * Error Messages
const avatarErrorMessage = document.querySelector('.avatar-error-message');
const nameErrorMessage = document.querySelector('.name-error-message');
const emailErrorMessage = document.querySelector('.email-error-message');
const githubErrorMessage = document.querySelector('.github-error-message');

// * Submit Button
const generateTicket = document.getElementById('generate-ticket');

// * Upload Image Text and Image Control Buttons
const uploadInstructions = document.querySelector('.upload-instructions');
const uploadControl = document.querySelector('.upload-controls');
const removeImage = document.querySelector('.remove-button');
const changeImage = document.querySelector('.change-button');

// * Ticket Container
const ticketContainer = document.querySelector('.ticket-container');


//! Trigger the file selector when the element is clicked
selectImage.addEventListener('click', function(){
    avatarInput.click();
});


//* Image that the user uploads declared globally to enable access in any function
let userSelectedImage;


//! Listens for a file to be selected, creates an image element and displays the image 
avatarInput.addEventListener('change', function() {
    userSelectedImage = this.files[0];
    const reader = new FileReader();
    const fileSize = userSelectedImage.size;
    const fileSizeInMB = fileSize / (1024 * 1024);

    avatarErrorMessage.innerHTML = ''; // Clear any previous error messages to avoid duplication or multiple error messages
    avatarInput.value = ''; // Clear the input value to allow re-uploading the same file and trigger change event
    
    //* Check if the image uploaded is a .JPG or .PNG file
    const fileExtension = userSelectedImage.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'jpg' && fileExtension !== 'png') {

        uploadInstructionsSubtext.style.display = 'none';

        //? Create and append the info-circle SVG element 
        const infoCircle = createInfoCircle();
        avatarErrorMessage.appendChild(infoCircle);

        //* If the file is not a .JPG or .PNG file and is more than 500KB, display an error
        if (fileSizeInMB > 0.5) {
            // ? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a .JPG or .PNG file under 500KB.');
            avatarErrorMessage.appendChild(errorMessage);

            //? Add error animation
            avatarErrorAnimation();
            return;
        } 
        //* If the file is not a .JPG or .PNG file and is less than 500KB, display an error
        else {
            // ? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a .JPG or .PNG file.');
            avatarErrorMessage.appendChild(errorMessage);

            //? Add error animation
            avatarErrorAnimation();
            return;
        }
    }

    //* If the file is a .JPG or .PNG file, check if the image is more than or less than 500KB
    if (fileSizeInMB > 0.5) {
        uploadInstructionsSubtext.style.display = 'none';

        //? Create and append the info-circle SVG element 
        const infoCircle = createInfoCircle();
        avatarErrorMessage.appendChild(infoCircle);

        //? Create and append the error message
        const errorMessage = createErrorMessage('File too large. Please upload a photo under 500KB.');
        avatarErrorMessage.appendChild(errorMessage);

        //? Add error animation
        avatarErrorAnimation();

        return;
    }
    else {
        avatarErrorMessage.innerHTML = '';
        uploadInstructionsSubtext.style.display = 'block';
    }

    // * If the file is a .JPG or .PNG file and is less than or equal to 500KB, display the image
    reader.onload = () => {
        const imgUrl = reader.result;
        selectImage.innerHTML = '';
        const img = document.createElement('img');
        img.src = imgUrl;
        selectImage.appendChild(img);
        img.classList.add('uploaded-image');
        uploadInstructions.style.display = 'none';
        uploadControl.style.display = 'flex';
        avatarInput.disabled = true; // Disable the avatar input field once an image has been uploaded
    };

    reader.readAsDataURL(userSelectedImage);
});


//! Event Listener — Remove the uploaded image 
removeImage.addEventListener('click', function() {
    avatarInput.disabled = false;
    selectImage.innerHTML = '';
    avatarInput.value = '';
    avatarErrorMessage.innerHTML = '';
    uploadInstructions.style.display = 'block'; //? Display the upload instructions
    uploadControl.style.display = 'none'; //? Hide the upload control buttons
    uploadInstructionsSubtext.style.display = 'block'; //? Display the upload instructions subtext
});


//! Event Listener — Change the uploaded image 
changeImage.addEventListener('click', function() {
    avatarInput.disabled = false;
    avatarInput.value = '';
    avatarInput.click(); //? OR selectImage.click();
});


//! Drag and Drop Image Upload Event Listeners
selectImage.addEventListener('dragover', function(e) {
    e.preventDefault();
    selectImage.style.border = '1px dashed #8784a4';
});
selectImage.addEventListener('dragleave', function() {
    selectImage.style.border = '1px solid #8784a480';
});
selectImage.addEventListener('drop', function(e) {
    e.preventDefault();
    // The DataTransfer object's files property returns a DataTransferItemList object,
    // which is a list of the files being dragged. We assign this to the files variable.
    const files = e.dataTransfer.files;
    avatarInput.files = files;
    avatarInput.dispatchEvent(new Event('change'));
    selectImage.style.border = '1px solid #8784a480';
});


//! Generate Ticket Button Event Listener
generateTicket.addEventListener('click', function(e) {
    e.preventDefault();
    const isAvatarValid = validateAvatar();
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isGithubUsernameValid = validateGithubUsername();

    if (isAvatarValid && isFullNameValid && isEmailValid && isGithubUsernameValid) {
        //? Display the ticket
        displayTicket.classList.remove('hide');
        ticketApplicationContainer.classList.add('hide');
    }
    else {
        return;
    }

    // Get the values of the form
    const avatarImage = userSelectedImage;
    const userAvatar = URL.createObjectURL(avatarImage);
    const fullName = nameInput.value;
    const email = emailInput.value;
    const githubUsername = githubInput.value;

    const ticketID = Math.floor(Math.random() * 10000);

    //* Create the ticket HTML
    const ticketHTML = `
        <header class="user-ticket-ready">
                <img src="images/logo-full.svg" class="company-logo" alt="Coding Conf logo" />
                <h1 class="congrats-text">
                    Congrats, <span class="ticket-owner-name">${fullName}</span> 
                    Your ticket is ready
                </h1>
                <p class="confirmation-text">
                    We've emailed your ticket details to 
                    <span class="ticket-owner-email">${email}</span>
                    and will send updates in the run up to the event.
                </p>
            </header>

            <!-- * Ticket -->
            <div class="ticket">
                <!-- * Main Ticket Area -->
                <div class="main-area">
                    <!-- * Company Event Logo and Name -->
                    <div class="ticket-logo-container">
                        <img src="images/logo-mark.svg" alt="ticket-logo" class="ticket-logo">
                        <h2 class="ticket-company-name">Coding Conf</h2>
                    </div>
                    <!-- * Event Details: Date and Location -->
                    <div class="event-details">
                        <p class="date-and-location">
                            July 24, 2025 / Austin, TX
                        </p>
                    </div>

                    <!-- * User Ticket Details -->
                    <div class="ticket-user-details">
                        <div class="user-avatar">
                            <img src="${userAvatar}" class="user-avatar-img" alt="user avatar" />
                        </div>

                        <div class="user-ticket-info">
                            <h3 class="user-fullname">${fullName}</h3>
                            
                            <div class="user-github">
                                <img src="images/icon-github.svg" class="github-icon" alt="github icon" />
                                <span class="user-github-username">@${githubUsername}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- * Minor/Smaller Ticket Area -->
                <div class="minor-area">
                    <div class="ticket-id">
                        <span class="ticket-id-number">
                            #${ticketID.toString().padStart(5, '0')}
                        </span>
                    </div>
                </div>

            </div>
    `;

    ticketContainer.innerHTML = ticketHTML;

});


//* —————————————————————————————— FUNCTIONS ———————————————————————————————— //

//! Create the info-circle SVG element
function createInfoCircle(){
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const infoCircle = document.createElementNS(svgNamespace, 'svg');
    infoCircle.setAttribute('width', '16');
    infoCircle.setAttribute('height', '16');
    infoCircle.setAttribute('fill', 'none');
    infoCircle.setAttribute('viewBox', '0 0 16 16');

    const path1 = document.createElementNS(svgNamespace, 'path');
    path1.setAttribute('stroke', '#e16151');
    path1.setAttribute('stroke-linecap', 'round');
    path1.setAttribute('stroke-linejoin', 'round');
    path1.setAttribute('d', 'M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z');

    const path2 = document.createElementNS(svgNamespace, 'path');
    path2.setAttribute('fill', '#e16151');
    path2.setAttribute('d', 'M8.004 10.462V7.596ZM8 5.57v-.042Z');

    const path3 = document.createElementNS(svgNamespace, 'path');
    path3.setAttribute('stroke', '#e16151');
    path3.setAttribute('stroke-linecap', 'round');
    path3.setAttribute('stroke-linejoin', 'round');
    path3.setAttribute('d', 'M8.004 10.462V7.596M8 5.569v-.042');

    infoCircle.appendChild(path1);
    infoCircle.appendChild(path2);
    infoCircle.appendChild(path3);

    infoCircle.classList.add('error-info-circle');

    return infoCircle; // Returns the result of the function: (the info-circle SVG element) when it is called anywhere in the code
}


//! Create the error message element
function createErrorMessage(error) {
    const message = document.createElement('span');
    message.classList.add('message');
    message.innerText= error;

    return message; // Returns the result of the function: (the error message) when it is called anywhere in the code
}


// ! Validate an image upload by size and file type
function validateAvatar() {
    const avatar = avatarInput.files[0];
    const avatarFileSize = avatar?.size; // Optional chaining operator to safely access the size property
    const avatarFileSizeInMB = avatarFileSize / (1024 * 1024);
    const fileExtension = avatar?.name.split('.').pop().toLowerCase();

    avatarErrorMessage.innerHTML = '';

    //* Validates if an image/avatar has been uploaded
    if (selectImage.querySelector('img')) {
        return true; // If an image has been uploaded, the function returns true
    }

    //* Validates if no image has been uploaded
    if (!avatar) {
        uploadInstructionsSubtext.style.display = 'none';

        //? Check if the error message already exists before creating a new one
        if (!avatarErrorMessage.querySelector('.error-info-circle')) { 

            //? Create and append the info-circle SVG element 
            const infoCircle = createInfoCircle();
            avatarErrorMessage.appendChild(infoCircle);
    
            //? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a photo.');
            avatarErrorMessage.appendChild(errorMessage);
        }
    }
    //* Validates if the uploaded image is not a .JPG or .PNG file
    else if (fileExtension !== 'jpg' && fileExtension !== 'png') {
        uploadInstructionsSubtext.style.display = 'none';

        //? Create and append the info-circle SVG element 
        const infoCircle = createInfoCircle();
        avatarErrorMessage.appendChild(infoCircle);

        // * Validates if the unsupported image type size is greater or less than 500KB
        if (avatarFileSizeInMB > 0.5) {
            //? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a .JPG or .PNG file under 500KB.');
            avatarErrorMessage.appendChild(errorMessage);
            console.log(fileSizeInMB);
        } 
        else {
            //? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a .JPG or .PNG file.');
            avatarErrorMessage.appendChild(errorMessage);
        }
    } 
    //* Validates if the .JPG or .PNG image size is greater than 500KB
    else if (avatarFileSizeInMB > 0.5) {
        uploadInstructionsSubtext.style.display = 'none';

        //? Create and append the info-circle SVG element 
        const infoCircle = createInfoCircle();
        avatarErrorMessage.appendChild(infoCircle);

        //? Create and append the error message
        const errorMessage = createErrorMessage('File too large. Please upload a photo under 500KB.');
        avatarErrorMessage.appendChild(errorMessage);
    }
}


//! Validate full name
function validateFullName() {
    const fullName = nameInput.value;
    const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;

    //* Validate full name input
    if (fullName === '' || !fullNameRegex.test(fullName)) {

        //? If the error message doesn't exist create and display it
        if (!nameErrorMessage.querySelector('.error-info-circle')) { 

            //? Create and append the info-circle SVG element 
            const infoCircle = createInfoCircle();
            nameErrorMessage.appendChild(infoCircle);
    
            //? Create and append the error message
            const errorMessage = createErrorMessage('Please enter your full name');
            nameErrorMessage.appendChild(errorMessage);

            //? Add error border color
            nameInput.style.border = '1px solid var(--button-background-color-hover)';
        }
        //? Add error animation
        fullnameErrorAnimation();
        return false; // Return false if the input is invalid
    }
    else {
        nameErrorMessage.innerHTML = '';
        nameInput.style.border = '1px solid var(--form-background-color)';
        return true; // Return true if the input is valid
    }
}


//! Validate email
function validateEmail() {
    const email = emailInput.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //* Validate email input
    if (email === '' || !emailRegex.test(email)) {

        //? Check if the error message already exists before creating a new one
        if (!emailErrorMessage.querySelector('.error-info-circle')) {

            //? Create and append the info-circle SVG element 
            const infoCircle = createInfoCircle();
            emailErrorMessage.appendChild(infoCircle);
    
            //? Create and append the error message
            const errorMessage = createErrorMessage('Please enter a valid email address');
            emailErrorMessage.appendChild(errorMessage);

            //? Add error border color
            emailInput.style.border = '1px solid var(--button-background-color-hover)';
        }
        return false; // Return false if the input is invalid
    }
    else {
        emailErrorMessage.innerHTML = '';
        emailInput.style.border = '1px solid var(--form-background-color)';
        return true; // Return true if the input is valid
    }
}


//! Validate github username
function validateGithubUsername() {
    const githubUsername = githubInput.value;

    //* Validate github username input
    if (githubUsername === '') {

        //? Check if the error message already exists before creating a new one
        if (!githubErrorMessage.querySelector('.error-info-circle')) {

            //? Create and append the info-circle SVG element 
            const infoCircle = createInfoCircle();
            githubErrorMessage.appendChild(infoCircle);
    
            //? Create and append the error message
            const errorMessage = createErrorMessage('Please enter your GitHub username');
            githubErrorMessage.appendChild(errorMessage);

            //? Add error border color
            githubInput.style.border = '1px solid var(--button-background-color-hover)';
        }
        return false; // Return false if the input is invalid
    }
    else {
        githubErrorMessage.innerHTML = '';
        githubInput.style.border = '1px solid var(--form-background-color)';
        return true; // Return true if the input is valid
    }
}


//! Avatar Input Error Animation Function
const avatarErrorAnimation = () => {
    fileUploadContainer.classList.add('error-vibrate');
    setTimeout(() => {
        fileUploadContainer.classList.remove('error-vibrate');
    }, 2000);
}


//! Fullname Input Error Animation Function
const fullnameErrorAnimation = () => {
    nameInput.classList.add('error-vibrate');
    setTimeout(() => {
        nameInput.classList.remove('error-vibrate');
    }, 2000);
}


// todo: create the remaining error animations for email and github username
// todo: add the avatar error animation to the validateAvatar function
// todo: remove the background image in the upload element(selectImage) when an image is successfully uploaded
