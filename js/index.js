

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const questions = document.querySelectorAll(".question");
  let currentQuestionIndex = 0;

  function highlightSelection() {
    // Iterate over each question
    questions.forEach((question, index) => {
      // For each question, find the selected input
      const selectedInput = question.querySelector(
        'input[type="radio"]:checked'
      );
      // Remove the 'selected' class from all labels within this question
      question.querySelectorAll(".option").forEach((label) => {
        label.classList.remove("selected");
      });
      // If there is a selected input, add the 'selected' class to its parent label
      if (selectedInput) {
        selectedInput.parentElement.classList.add("selected");
      }
    });
  }

  function saveAnswer() {
    // Save the value of the selected radio button in local storage
    const selectedOption = questions[currentQuestionIndex].querySelector(
      'input[type="radio"]:checked'
    );
    if (selectedOption) {
      localStorage.setItem(
        `question_${currentQuestionIndex + 1}`,
        selectedOption.value
      );
    }
  }

  document
    .querySelectorAll('.question input[type="radio"]')
    .forEach((input) => {
      input.addEventListener("change", function () {
        // When an option is selected, show the "Next" button
        if (currentQuestionIndex < questions.length - 1) {
          nextBtn.style.display = "block";
        } else {
          submitBtn.style.display = "block";
        }
        // Highlight the selection
        highlightSelection();
      });
    });

  nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQuestionIndex < questions.length - 1) {
      questions[currentQuestionIndex].style.display = "none";
      currentQuestionIndex++;
      questions[currentQuestionIndex].style.display = "block";
      nextBtn.style.display = "none"; // Hide the Next button to encourage selection
    }
    // Highlight the selection for the next question if already selected
    highlightSelection();
  });

  document
    .getElementById("questionnaire")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      saveAnswer(); // Make sure to save the answer for the last question
      // All answers have been saved; perform the final action
      // alert("Form submitted!");
      window.location.href = 'result.html'; // Redirect to the results page

      // Here, you might clear local storage, redirect the user, etc.
    });
});