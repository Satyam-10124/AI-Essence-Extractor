const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const loader = document.getElementById("loader");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const textarea = e.target;

  // Enable the button only if text length is between 200 and 100,000 characters
  if (textarea.value.length >= 200 && textarea.value.length <= 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  // Show loading spinner on submit button
  submitButton.classList.add("submit-button--loading");
  loader.style.display = "block"; // Show the loader

  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Send the text to the server using fetch API
  fetch('summarize', requestOptions)
    .then(response => response.json())  // Handle response as JSON
    .then(data => {
      summarizedTextArea.value = data.summary;  // Assuming the response has a 'summary' field
      submitButton.classList.remove("submit-button--loading");
      loader.style.display = "none";  // Hide the loader when data is loaded
    })
    .catch(error => {
      console.log(error.message);
      submitButton.classList.remove("submit-button--loading");
      loader.style.display = "none";  // Hide the loader in case of error
    });
}
