// Quiz state
let currentQuestion = 0;
let answers = {};
let userName = '';
let userAge = '';
const totalQuestions = 4;

// Cookie personality results - mapped by cookie flavor
const personalityResults = {
    chocolate: {
        name: "Choco Hero Cookie",
        description: "Bold, adventurous, and privacy-conscious!"
    },
    strawberry: {
        name: "Frosted Thinker Cookie",
        description: "Thoughtful, sophisticated, and privacy-aware!"
    },
    butter: {
        name: "Classic Butter Cookie",
        description: "Timeless, reliable, and privacy-respecting!"
    },
    peanut: {
        name: "Peanut Power Cookie",
        description: "Energetic, surprising, and privacy-protected!"
    },
    default: {
        name: "Cinnamon Dream Cookie",
        description: "Warm, kind, and privacy-smart!"
    }
};

// Function to determine personality based on answers
function determinePersonality() {
    // Question 0 is the cookie flavor question in quiz2
    const cookieFlavor = answers[0];
    
    // Primary determination based on cookie flavor
    if (cookieFlavor && personalityResults[cookieFlavor]) {
        return personalityResults[cookieFlavor];
    }
    
    // Fallback to default if no flavor selected
    return personalityResults.default;
}

// Initialize quiz
document.addEventListener('DOMContentLoaded', function() {
    setupQuiz();
    
    // Setup name input
    const nameInput = document.getElementById('name-input');
    const nameSubmit = document.getElementById('name-submit');
    const nameSkip = document.getElementById('name-skip');
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleNameSubmit();
        }
    });
    
    nameSubmit.addEventListener('click', handleNameSubmit);
    nameSkip.addEventListener('click', handleNameSkip);
    
    // Setup age input
    const ageInput = document.getElementById('age-input');
    const ageSubmit = document.getElementById('age-submit');
    const ageSkip = document.getElementById('age-skip');
    
    ageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAgeSubmit();
        }
    });
    
    ageSubmit.addEventListener('click', handleAgeSubmit);
    ageSkip.addEventListener('click', handleAgeSkip);
});

function setupQuiz() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', handleAnswer);
    });
    
    // Set initial progress
    document.getElementById('quiz-progress').style.width = '0%';
}

function handleAnswer(event) {
    const questionIndex = currentQuestion;
    const questionElement = event.target.closest('.question');
    const value = event.target.getAttribute('data-value');
    
    // Store answer
    answers[questionIndex] = value;
    
    // Move to next question
    currentQuestion++;
    
    if (currentQuestion < totalQuestions) {
        // Hide current question
        questionElement.classList.remove('active');
        
        // Show next question
        setTimeout(() => {
            const nextQuestion = document.querySelector(`[data-question="${currentQuestion}"]`);
            nextQuestion.classList.add('active');
            updateProgress();
        }, 300);
    } else {
        // Quiz complete
        setTimeout(() => {
            showResult();
        }, 300);
    }
}

function handleNameSubmit() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();
    
    if (name === '') {
        nameInput.focus();
        return;
    }
    
    userName = name;
    answers[2] = name;
    
    // Show CookieBot response with privacy message
    const responseDiv = document.getElementById('name-response');
    responseDiv.innerHTML = '<span class="bot-icon-small">🤖</span>"Got it — your name is encrypted 🔐 and stored only on your device. I can\'t see it!"';
    setTimeout(() => {
        responseDiv.classList.add('show');
    }, 100);
    
    // Move to next question after showing response
    setTimeout(() => {
        moveToNextQuestion();
    }, 2500);
}

function handleNameSkip() {
    answers[2] = null;
    
    // Move to next question immediately
    moveToNextQuestion();
}

function handleAgeSubmit() {
    const ageInput = document.getElementById('age-input');
    const age = ageInput.value.trim();
    
    if (age === '' || parseInt(age) < 1 || parseInt(age) > 120) {
        ageInput.focus();
        return;
    }
    
    userAge = age;
    answers[3] = age;
    
    // Show CookieBot response with privacy message
    const responseDiv = document.getElementById('age-response');
    responseDiv.innerHTML = '<span class="bot-icon-small">🤖</span>"Don\'t worry — your age is stored locally and stays hidden, even from me."';
    setTimeout(() => {
        responseDiv.classList.add('show');
    }, 100);
    
    // Move to next question after showing response
    setTimeout(() => {
        moveToNextQuestion();
    }, 2500);
}

function handleAgeSkip() {
    answers[3] = null;
    
    // Quiz complete
    setTimeout(() => {
        showResult();
    }, 300);
}

function moveToNextQuestion() {
    const questionElement = document.querySelector('.question.active');
    questionElement.classList.remove('active');
    
    currentQuestion++;
    
    if (currentQuestion < totalQuestions) {
        setTimeout(() => {
            const nextQuestion = document.querySelector(`[data-question="${currentQuestion}"]`);
            nextQuestion.classList.add('active');
            updateProgress();
        }, 300);
    } else {
        // Quiz complete
        setTimeout(() => {
            showResult();
        }, 300);
    }
}

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('quiz-progress').style.width = progress + '%';
}

function resetResponses() {
    const nameResponse = document.getElementById('name-response');
    const ageResponse = document.getElementById('age-response');
    if (nameResponse) {
        nameResponse.classList.remove('show');
        nameResponse.innerHTML = '';
    }
    if (ageResponse) {
        ageResponse.classList.remove('show');
        ageResponse.innerHTML = '';
    }
}

function showResult() {
    // Hide quiz section
    document.getElementById('quiz-section').classList.remove('active');
    
    // Show result section
    document.getElementById('result-section').classList.add('active');
    
    // Determine personality based on actual answers
    const result = determinePersonality();
    document.getElementById('result-title').textContent = `You are a ${result.name}!`;
    document.querySelector('.result-description').textContent = result.description;
    
    // Animate privacy features
    setTimeout(() => {
        animatePrivacyFeatures();
    }, 500);
    
    // Animate progress bar
    setTimeout(() => {
        animateProgressBar();
    }, 1000);
    
    // Setup restart button
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
}

function animatePrivacyFeatures() {
    const privacyItems = document.querySelectorAll('.privacy-item');
    privacyItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
        }, index * 300);
    });
}

function animateProgressBar() {
    const progressBar = document.getElementById('data-progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    let progress = 0;
    const targetProgress = 10;
    
    const interval = setInterval(() => {
        progress += 0.5;
        if (progress >= targetProgress) {
            progress = targetProgress;
            clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
        progressPercentage.textContent = Math.round(progress) + '%';
    }, 50);
}

function restartQuiz() {
    // Reset state
    currentQuestion = 0;
    answers = {};
    userName = '';
    userAge = '';
    
    // Reset input fields
    document.getElementById('name-input').value = '';
    document.getElementById('age-input').value = '';
    
    // Reset responses
    resetResponses();
    
    // Reset all questions
    document.querySelectorAll('.question').forEach((q, index) => {
        q.classList.remove('active');
        if (index === 0) {
            q.classList.add('active');
        }
    });
    
    // Reset privacy items
    document.querySelectorAll('.privacy-item').forEach(item => {
        item.classList.remove('show');
    });
    
    // Reset progress
    document.getElementById('quiz-progress').style.width = '0%';
    document.getElementById('data-progress-bar').style.width = '0%';
    document.getElementById('progress-percentage').textContent = '0%';
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show quiz section
    document.getElementById('quiz-section').classList.add('active');
    
    // Re-setup quiz
    setupQuiz();
}

