// Quiz state
let currentQuestion = 0;
let answers = {};
const totalQuestions = 5;

// Personality results
const personalityResults = [
    {
        name: "Cinnamon Dream Cookie",
        description: "Sweet, kind-hearted, and always ready to share your last bite! You love cozy nights, warm lights, and baking with friends."
    },
    {
        name: "Choco Hero Cookie",
        description: "Bold and adventurous! You're not afraid to take risks and always go for the extra chocolate chips. Life is too short for plain cookies!"
    },
    {
        name: "Frosted Thinker Cookie",
        description: "Thoughtful and sophisticated, you appreciate the finer things in life. You're elegant, refined, and always have the perfect cookie for every occasion."
    },
    {
        name: "Peanut Power Cookie",
        description: "Energetic and full of surprises! You're the life of the party and always bring excitement wherever you go. Crunchy and unforgettable!"
    },
    {
        name: "Classic Butter Cookie",
        description: "Timeless and reliable, you're the friend everyone can count on. Simple pleasures bring you the most joy, and you value tradition."
    }
];

// Data insights mapping
const insightsMap = {
    chocolate: {
        answer: "You like chocolate",
        insight: "You might be more impulsive when shopping 🍫"
    },
    strawberry: {
        answer: "You prefer fruity flavors",
        insight: "You're likely open to trying new things and enjoy variety 🌈"
    },
    butter: {
        answer: "You prefer classic flavors",
        insight: "You value tradition and might be more cautious with purchases 🛒"
    },
    peanut: {
        answer: "You like crunchy textures",
        insight: "You prefer products with substance and might read reviews before buying 📝"
    },
    "after-school": {
        answer: "You said 'after school'",
        insight: "You're likely a student and live near a school 🏫"
    },
    "late-night": {
        answer: "You eat cookies late at night",
        insight: "You're probably a night owl and might shop online during evening hours 🌙"
    },
    stressed: {
        answer: "You eat cookies when stressed",
        insight: "You're likely to make emotional purchases, especially during stressful times 💳"
    },
    social: {
        answer: "You like 'posting on social media'",
        insight: "You spend time online and might click cookie ads 🍪💻"
    },
    online: {
        answer: "You buy cookies online",
        insight: "I now know your buying habits and maybe your location 🗺️"
    },
    friends: {
        answer: "You share with friends",
        insight: "You're social and likely have a network I can analyze 👥"
    },
    self: {
        answer: "You keep cookies for yourself",
        insight: "You're independent, but I can still track your individual preferences 🎯"
    }
};

// Initialize quiz
document.addEventListener('DOMContentLoaded', function() {
    setupQuiz();
});

function setupQuiz() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', handleAnswer);
    });
    
    updateProgress();
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

function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('quiz-progress').style.width = progress + '%';
}

function showResult() {
    // Hide quiz section
    document.getElementById('quiz-section').classList.remove('active');
    
    // Generate random personality result
    const randomResult = personalityResults[Math.floor(Math.random() * personalityResults.length)];
    
    // Update result content
    document.getElementById('result-title').textContent = `You are a ${randomResult.name}!`;
    document.getElementById('result-description').innerHTML = randomResult.description;
    
    // Show result section
    document.getElementById('result-section').classList.add('active');
    
    // Setup reveal button
    document.getElementById('reveal-btn').addEventListener('click', showReveal);
}

function showReveal() {
    // Hide result section
    document.getElementById('result-section').classList.remove('active');
    
    // Show reveal section
    document.getElementById('reveal-section').classList.add('active');
    
    // Generate insights based on answers
    generateInsights();
    
    // Animate progress bar
    setTimeout(() => {
        animateProgressBar();
    }, 500);
    
    // Setup restart button
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
}

function generateInsights() {
    const insightsList = document.getElementById('insights-list');
    insightsList.innerHTML = '';
    
    const shownInsights = new Set();
    
    // Generate insights from answers
    Object.values(answers).forEach((answer, index) => {
        if (insightsMap[answer] && !shownInsights.has(answer)) {
            const insightItem = document.createElement('div');
            insightItem.className = 'insight-item';
            insightItem.innerHTML = `
                <strong>${insightsMap[answer].answer}</strong>
                <p>→ ${insightsMap[answer].insight}</p>
            `;
            insightsList.appendChild(insightItem);
            shownInsights.add(answer);
        }
    });
    
    // Add some default insights if not enough
    if (shownInsights.size < 3) {
        const defaultInsights = [
            {
                answer: "You completed the quiz",
                insight: "I know you're engaged with interactive content and likely to respond to prompts 🎯"
            },
            {
                answer: "You clicked through all questions",
                insight: "I can track your browsing patterns and time spent on pages ⏱️"
            }
        ];
        
        defaultInsights.forEach((insight, idx) => {
            const insightItem = document.createElement('div');
            insightItem.className = 'insight-item';
            insightItem.innerHTML = `
                <strong>${insight.answer}</strong>
                <p>→ ${insight.insight}</p>
            `;
            insightsList.appendChild(insightItem);
        });
    }
    
    // Animate insights appearing
    const insightItems = insightsList.querySelectorAll('.insight-item');
    insightItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
        }, index * 300);
    });
}

function animateProgressBar() {
    const progressBar = document.getElementById('data-progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    let progress = 0;
    const targetProgress = 90;
    
    const interval = setInterval(() => {
        progress += 2;
        if (progress >= targetProgress) {
            progress = targetProgress;
            clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
        progressPercentage.textContent = progress + '%';
    }, 30);
}

function restartQuiz() {
    // Reset state
    currentQuestion = 0;
    answers = {};
    
    // Reset all questions
    document.querySelectorAll('.question').forEach((q, index) => {
        q.classList.remove('active');
        if (index === 0) {
            q.classList.add('active');
        }
    });
    
    // Reset progress
    document.getElementById('quiz-progress').style.width = '20%';
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

