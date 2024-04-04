// result JS   
function getDynamicCareerAdvice(answers) {
    let scores = {
        technology: 0,
        creative: 0,
        healthcare: 0,
        education: 0,
        entrepreneurship: 0,
        corporate: 0
    };

    answers.forEach((answer, index) => {
        switch (index) {
            case 0:
                if (answer.includes("Fast-paced and ever-changing")) scores.technology += 2;
                if (answer.includes("Creative and flexible")) scores.creative += 2;
                break;
            case 1:
                if (answer.includes("Communication")) scores.education += 2;
                if (answer.includes("Creative and artistic skills")) scores.creative += 2;
                break;
            case 2:
                if (answer.includes("Making a positive impact")) { scores.healthcare += 3; scores.education += 2; }
                break;
            case 3:
                if (answer.includes("As part of a team")) scores.corporate += 2;
                if (answer.includes("In a leadership role")) scores.entrepreneurship += 3;
                break;
            case 4:
                if (answer.includes("Mathematics and Technology")) scores.technology += 3;
                if (answer.includes("Creative Arts")) scores.creative += 3;
                break;
            case 5:
                if (answer.includes("Flexible hours")) { scores.technology += 2; scores.creative += 2; }
                if (answer.includes("9-5")) scores.corporate += 3;
                break;
            case 6:
                if (answer.includes("Very interested")) { scores.education += 3; scores.healthcare += 1; }
                break;
            case 7:
                if (answer.includes("Prefer to lead")) scores.entrepreneurship += 4;
                if (answer.includes("Prefer to follow")) { scores.corporate += 2; scores.education += 2; }
                break;
        }
    });

    let recommendedPath = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    let advice = {
        technology: 'A career in <mark>technology or startups</mark> could suit your dynamic nature and problem-solving skills.',
        creative: 'Your creativity and appreciation for the arts suggest a career in <mark>design, arts, or entertainment</mark>.',
        healthcare: 'Your desire to impact positively on others may find fulfillment in <mark>healthcare or wellness</mark>.',
        education: 'Your communicative strength and enjoyment in helping others learn could lead to a rewarding career in <mark>education</mark>.',
        entrepreneurship: 'Your leadership tendencies and preference for dynamic environments point towards <mark>entrepreneurship</mark>.',
        corporate: 'Your preference for structured tasks and teamwork aligns well with a career in a <mark>corporate</mark> setting.'
    };

    return advice[recommendedPath];
}


// JavaScript to fetch and display the answers and career advice goes here
document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById('results');
    const adviceContainer = document.getElementById('advice');
    let optionsArr = [];
    // Fetch and display all answers
    for (let i = 1; i <= 8; i++) { // Assuming 5 questions
        const answer = localStorage.getItem(`question_${i}`);
        optionsArr.push(answer)
        const questionElem = document.createElement('p');
        questionElem.textContent = `Question ${i}: ${answer}`;
        resultsContainer.appendChild(questionElem);
    }

    const advice = getDynamicCareerAdvice(optionsArr)
    adviceContainer.innerHTML = advice;
});