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


//! Trigger the file selector when the element is clicked
selectImage.addEventListener('click', function(){
    avatarInput.click();
});


//! Listens for a file to be selected, creates an image element and displays the image 
avatarInput.addEventListener('change', function() {
    const userSelectedImage = this.files[0];
    const reader = new FileReader();

    const fileSize = userSelectedImage.size;
    const fileSizeInMB = fileSize / (1024 * 1024);

    avatarErrorMessage.innerHTML = ''; // Clear any previous error messages
    
    //* Check if the image is .JPG or .PNG
    const fileExtension = userSelectedImage.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'jpg' && fileExtension !== 'png') {

        uploadInstructionsSubtext.style.display = 'none';

        //? Create and append the info-circle SVG element 
        const infoCircle = createInfoCircle();
        avatarErrorMessage.appendChild(infoCircle);

        if (fileSizeInMB > 0.5) {
            // ? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a .JPG or .PNG file under 500KB.');
            avatarErrorMessage.appendChild(errorMessage);
            return;
        } 
        else {
            // ? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a .JPG or .PNG file.');
            avatarErrorMessage.appendChild(errorMessage);
            return;
        }
    }

    //* Check if the image is under 500KB
    if (fileSizeInMB > 0.5) {
        uploadInstructionsSubtext.style.display = 'none';

        //? Create and append the info-circle SVG element 
        const infoCircle = createInfoCircle();
        avatarErrorMessage.appendChild(infoCircle);

        //? Create and append the error message
        const errorMessage = createErrorMessage('File too large. Please upload a photo under 500KB.');
        avatarErrorMessage.appendChild(errorMessage);
        return;
    }
    else {
        avatarErrorMessage.innerHTML = '';
        uploadInstructionsSubtext.style.display = 'block';
    }

    reader.onload = () => {
        const imgUrl = reader.result;
        selectImage.innerHTML = '';
        const img = document.createElement('img');
        img.src = imgUrl;
        selectImage.appendChild(img);
        img.classList.add('uploaded-image');
        uploadInstructions.style.display = 'none';
        uploadControl.style.display = 'flex';
    };

    reader.readAsDataURL(userSelectedImage);
});


//! Remove the uploaded image 
removeImage.addEventListener('click', function() {
    selectImage.innerHTML = '';
    avatarInput.value = '';
    avatarErrorMessage.innerHTML = '';
    uploadInstructions.style.display = 'block'; //? Display the upload instructions
    uploadControl.style.display = 'none'; //? Hide the upload control buttons
    uploadInstructionsSubtext.style.display = 'block'; //? Display the upload instructions subtext
});


//! Change the uploaded image
changeImage.addEventListener('click', function() {
    avatarInput.value = '';
    console.log('Change image button clicked');
    avatarInput.click(); //? OR selectImage.click();
});


//! Drag and Drop Image Upload
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


//! Generate Ticket Button
generateTicket.addEventListener('click', function(e) {
    e.preventDefault();
    // const fullName = nameInput.value;

    // const email = emailInput.value;
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const githubUsername = githubInput.value;

    validateAvatar();
    validateFullName();
    validateEmail();
    validateGithubUsername();

    // const formData = new FormData();
    // formData.append('avatar', avatar);
    // formData.append('fullName', fullName);
    // formData.append('email', email);
    // formData.append('githubUsername', githubUsername);

    // ticketApplicationContainer.classList.add('hide');
    // displayTicket.classList.remove('hide');
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

    return infoCircle; // Returns the result of the function: the info-circle SVG element when it is called anywhere in the code
}


//! Create the error message element
function createErrorMessage(error) {
    const message = document.createElement('span');
    message.classList.add('message');
    message.innerText= error;

    return message; // Returns the result of the function: the error message when it is called anywhere in the code
}


// ! Validate an image upload by size and file type
function validateAvatar() {
    const avatar = avatarInput.files[0];
    const avatarFileSize = avatar?.size; // Optional chaining operator to safely access the size property
    const avatarFileSizeInMB = avatarFileSize / (1024 * 1024);
    const fileExtension = avatar?.name.split('.').pop().toLowerCase();

    avatarErrorMessage.innerHTML = '';
    uploadInstructionsSubtext.style.display = 'none';

    //* Validate if an image/avatar has been uploaded
    if (!avatar || avatarFileSizeInMB > 0.5) {

        //? Check if the error message already exists before creating a new one
        if (!avatarErrorMessage.querySelector('.error-info-circle')) { 
            // uploadInstructionsSubtext.style.display = 'none';

            //? Create and append the info-circle SVG element 
            const infoCircle = createInfoCircle();
            avatarErrorMessage.appendChild(infoCircle);
    
            //? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a photo.');
            avatarErrorMessage.appendChild(errorMessage);
        }
    }
    else if (fileExtension !== 'jpg' && fileExtension !== 'png') {
        //? Create and append the info-circle SVG element 
        const infoCircle = createInfoCircle();
        avatarErrorMessage.appendChild(infoCircle);

        if (fileSizeInMB > 0.5) {
            //? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a .JPG or .PNG file under 500KB.');
            avatarErrorMessage.appendChild(errorMessage);
        } 
        else {
            //? Create and append the error message
            const errorMessage = createErrorMessage('Please upload a .JPG or .PNG file.');
            avatarErrorMessage.appendChild(errorMessage);
        }
    } 
    else if (fileSizeInMB > 0.5) {
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

    //* Validate full name input
    if (fullName === '') {

        //? Check if the error message already exists before creating a new one
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
    }
    else {
        nameErrorMessage.innerHTML = '';
        nameInput.style.border = '1px solid var(--form-background-color)';
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
    }
    else {
        emailErrorMessage.innerHTML = '';
        emailInput.style.border = '1px solid var(--form-background-color)';
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
    }
    else {
        githubErrorMessage.innerHTML = '';
        githubInput.style.border = '1px solid var(--form-background-color)';
    }
}
