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
}
