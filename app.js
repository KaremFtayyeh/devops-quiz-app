let questions = [];
let currentQuestion = null;

fetch("data/questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadTopics();
    });

function loadTopics() {
    const topicSelect = document.getElementById("topicSelect");
    const topics = [...new Set(questions.map(q => q.topic))];

    topics.forEach(topic => {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });

    topicSelect.addEventListener("change", () => {
        loadQuestion(topicSelect.value);
    });

    if (topics.length > 0) {
        loadQuestion(topics[0]);
    }
function loadQuestion(topic) {
    const filtered = questions.filter(q => q.topic === topic);
    currentQuestion = filtered[Math.floor(Math.random() * filtered.length)];

    document.getElementById("question").textContent = currentQuestion.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });

    document.getElementById("feedback").textContent = "";
}
function checkAnswer(index) {
    const feedback = document.getElementById("feedback");

    if (index === currentQuestion.answerIndex) {
        feedback.textContent = "Correct! " + currentQuestion.explanation;
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Incorrect. " + currentQuestion.explanation;
        feedback.style.color = "red";
    }
}

}
