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


//* Trigger the file selector when the element is clicked
selectImage.addEventListener('click', function(){
    avatarInput.click();
});


//* Listens for a file to be selected, creates an image element and displays the image 
avatarInput.addEventListener('change', function() {
    const userSelectedImage = this.files[0];
    const reader = new FileReader();

    const fileSize = userSelectedImage.size;
    const fileSizeInMB = fileSize / (1024 * 1024);

    if (fileSizeInMB > 0.5) {
        uploadInstructionsSubtext.style.display = 'none';

        //? Create and append the info-circle SVG element
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

        avatarErrorMessage.appendChild(infoCircle);

         //? Create and append the error message
        const message = document.createElement('span');
            message.classList.add('message');
            avatarErrorMessage.appendChild(message);
            message.innerText = 'File too large. Please upload a photo under 500KB.';
        return;
    }
    else {
        avatarErrorMessage.innerHTML = '';
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


//* Remove the uploaded image 
removeImage.addEventListener('click', function() {
    selectImage.innerHTML = '';
    avatarInput.value = '';
    uploadInstructions.style.display = 'block'; //? Display the upload instructions
    uploadControl.style.display = 'none'; //? Hide the upload control buttons
});

//* Change the uploaded image
changeImage.addEventListener('click', function() {
    avatarInput.value = '';
    console.log('Change image button clicked');
    avatarInput.click(); //? OR selectImage.click();
});

//* Drag and Drop Image Upload
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


//* Generate Ticket Button
generateTicket.addEventListener('click', function(e) {
    e.preventDefault();
    const fullName = nameInput.value;
    const email = emailInput.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const githubUsername = githubInput.value;
    const avatar = avatarInput.files[0];

    if (!avatar) {
        //? Check if the error message already exists before creating a new one
        if (!avatarErrorMessage.querySelector('.error-info-circle')) { 
            uploadInstructionsSubtext.style.display = 'none';
            //? Create and append the info-circle SVG element 
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

            avatarErrorMessage.appendChild(infoCircle);

            //? Create and append the error message
            const message = document.createElement('span');
                message.classList.add('message');
                avatarErrorMessage.appendChild(message);
                message.innerText = 'File too large. Please upload a photo under 500KB.';
        }
        else {
            avatarErrorMessage.innerHTML = '';
        }
    }

    //! Validate full name input
    if (fullName === '') {
        //? Check if the error message already exists before creating a new one
        if (!nameErrorMessage.querySelector('.error-info-circle')) { 
            //? Create and append the info-circle SVG element 
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

            nameErrorMessage.appendChild(infoCircle);

            //? Create and append the error message
            const message = document.createElement('span');
                message.classList.add('message');
                nameErrorMessage.appendChild(message);
                message.innerText = 'Please enter your full name';

            //? Add error border color
            nameInput.style.border = '1px solid var(--button-background-color-hover)';
        }
    }
    else {
        nameErrorMessage.innerHTML = '';
        nameInput.style.border = '1px solid var(--form-background-color)';
    }

    //! Validate email input
    if (email === '' || !emailRegex.test(email)) {
        //? Check if the error message already exists before creating a new one
        if (!emailErrorMessage.querySelector('.error-info-circle')) {
            //? Create and append the info-circle SVG element 
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

            emailErrorMessage.appendChild(infoCircle);

            //? Create and append the error message
            const message = document.createElement('span');
                message.classList.add('message');
                emailErrorMessage.appendChild(message);
                message.innerText = 'Please enter a valid email address';

            //? Add error border color
            emailInput.style.border = '1px solid var(--button-background-color-hover)';
        }
    }
    else {
        emailErrorMessage.innerHTML = '';
        emailInput.style.border = '1px solid var(--form-background-color)';
    }

    //! Validate github username
    if (githubUsername === '') {
        //? Check if the error message already exists before creating a new one
        if (!githubErrorMessage.querySelector('.error-info-circle')) {
            //? Create and append the info-circle SVG element 
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

            

            const message = document.createElement('span');
                message.classList.add('message');
                githubErrorMessage.appendChild(message);
                message.innerText = 'Please enter your GitHub username';

            //? Add error border color
            githubInput.style.border = '1px solid var(--button-background-color-hover)';
        }
    }
    else {
        githubErrorMessage.innerHTML = '';
        githubInput.style.border = '1px solid var(--form-background-color)';
    }

    // const formData = new FormData();
    // formData.append('avatar', avatar);
    // formData.append('fullName', fullName);
    // formData.append('email', email);
    // formData.append('githubUsername', githubUsername);

    // ticketApplicationContainer.classList.add('hide');
    // displayTicket.classList.remove('hide');
});


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

    return infoCircle;
}


function createErrorMessage(error){
    const message = document.createElement('span');
    message.classList.add('message');
    message.innerText= error;

    return message;
}
