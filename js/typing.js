const word_list = [
    "ability", "able", "about", "above", "accept", "according", "account", "across",
    "action", "activity", "actually", "address", "administration", "admit", "adult", "affect",
    "after", "again", "against", "agency", "agent", "agree", "agreement", "ahead",
    "allow", "almost", "along", "already", "although", "always", "american", "among",
    "amount", "analysis", "animal", "another", "answer", "anyone", "anything", "appear",
    "apply", "approach", "area", "argue", "argument", "around", "arrive", "article",
    "artist", "assume", "attack", "attention", "attorney", "audience", "author", "authority",
    "available", "avoid", "beautiful", "because", "become", "before", "begin", "behavior",
    "behind", "believe", "benefit", "best", "better", "between", "beyond", "billion",
    "black", "blood", "blue", "board", "body", "book", "born", "both",
    "break", "bring", "brother", "budget", "build", "building", "business", "camera",
    "campaign", "cancer", "candidate", "capital", "career", "carry", "catch", "cause",
    "center", "central", "century", "certain", "certainly", "challenge", "chance", "change",
    "character", "charge", "check", "child", "choice", "choose", "church", "citizen",
    "civil", "claim", "class", "clear", "clearly", "close", "coach", "cold",
    "collection", "college", "color", "come", "commercial", "common", "community", "company",
    "compare", "computer", "concern", "condition", "conference", "congress", "consider", "consumer",
    "contain", "continue", "control", "cost", "could", "country", "couple", "course",
    "court", "cover", "create", "crime", "cultural", "culture", "current", "customer",
    "daughter", "death", "debate", "decade", "decide", "decision", "defense", "degree",
    "democrat", "democratic", "describe", "design", "despite", "detail", "determine", "develop",
    "development", "difference", "different", "difficult", "dinner", "direction", "director", "discover",
    "discuss", "discussion", "disease", "doctor", "door", "down", "draw", "dream",
    "drive", "during", "each", "early", "east", "easy", "economic", "economy",
    "education", "effect", "effort", "eight", "either", "election", "else", "employee",
    "energy", "enjoy", "enough", "enter", "entire", "environment", "environmental", "especially",
    "establish", "evening", "event", "every", "everyone", "everything", "evidence", "exactly",
    "example", "executive", "exist", "expect", "experience", "expert", "explain", "face",
    "factor", "fail", "family", "farmer", "fast", "father", "federal", "feeling",
    "field", "fight", "figure", "final", "finally", "financial", "find", "finger",
    "finish", "floor", "focus", "follow", "food", "foot", "force", "foreign",
    "forget", "form", "former", "forward", "friend", "front", "full", "future",
    "garden", "general", "generation", "get", "girl", "give", "glass", "goal",
    "good", "government", "great", "green", "ground", "group", "grow", "growth",
    "guess", "happy", "hard", "have", "head", "health", "hear", "heart",
    "heat", "heavy", "help", "herself", "high", "himself", "history", "hold",
    "hospital", "hotel", "hour", "house", "however", "huge", "human", "husband",
    "identify", "image", "imagine", "impact", "important", "improve", "include", "including",
    "increase", "indeed", "indicate", "individual", "industry", "information", "inside", "instead",
    "institution", "interest", "interesting", "international", "interview", "investment", "involve", "issue",
    "item", "itself", "job", "join", "just", "keep", "kill", "kind",
    "kitchen", "know", "knowledge", "land", "language", "large", "last", "late",
    "later", "laugh", "lead", "leader", "learn", "least", "leave", "legal",
    "less", "letter", "level", "light", "like", "likely", "limit", "line",
    "list", "listen", "little", "live", "local", "long", "look", "lose",
    "loss", "lot", "love", "machine", "magazine", "main", "maintain", "major",
    "majority", "make", "manage", "management", "manager", "market", "marriage", "material",
    "matter", "maybe", "mean", "measure", "media", "medical", "meet", "meeting",
    "member", "memory", "mention", "message", "method", "middle", "might", "military",
    "million", "mind", "minute", "miss", "model", "modern", "moment", "money"
];

document.addEventListener("DOMContentLoaded", async function() {
    const LEFT_WORDS_CONTAINER = document.getElementById("typing-test-container-left");
    const RIGHT_WORDS_CONTAINER = document.getElementById("typing-test-container-right");

    const TIME_INPUT = document.getElementById("time-input");

    const TIMER = document.getElementById("timer");

    TIME_INPUT.addEventListener("change", ()=>updateTimer())

    function formatTime(time_in_sec) {
        const minutes = Math.floor(time_in_sec / 60);
        let seconds = time_in_sec % 60;
    
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`
    }

    function updateTimer() {
        TIMER.innerHTML = formatTime(TIME_INPUT.value); 
    }


    let typing_input = document.getElementById("typing-test-input");
    const chars_typed_span = document.getElementById("chars-typed");
    const words_typed_span = document.getElementById("words-typed");
    const accuracy_span = document.getElementById("accuracy")
    let nums_used = []
    let word_list_212 = []
    for (let i = 0; i < 212; i++) {
        let repeated_word = true;
        while (repeated_word) {
            let rng = Math.round(Math.random() * 399);
            if (!nums_used.includes(rng)) {
                nums_used.push(rng);
                repeated_word = false;
                word_list_212.push(word_list[rng]);
            }
        }
    }

    for (let i = 0; i < 15; i++) {
        let word_span = document.createElement("span");
        word_span.innerHTML = word_list_212[i];
        word_span.setAttribute("style", "padding: 0px 0.33rem 0px 0px;font-size: 2rem;position: relative;z-index: -1;");
        word_span.setAttribute("class", "words");
        RIGHT_WORDS_CONTAINER.append(word_span);
    }
            
    let word_count = 0;
    let char_num = 0;
    let chars_typed = 0;
    let extra_chars = 0;
    let wrong_chars = 0;
    let accuracy = 0;
    let first_letter = true;
    let time_is_over = false;

    function reset() {
        word_count = 0;
        char_num = 0;
        chars_typed = 0;
        extra_chars = 0;
        wrong_chars = 0;
        accuracy = 0;
        first_letter = true;
        time_is_over = false;
    }
    
    function startTimer() {
        let timePassed = 0;
        let timeLeft = TIME_INPUT.value;
        let timerInterval = null;
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_INPUT.value - timePassed;

            TIMER.innerHTML = formatTime(timeLeft);

            if (timeLeft <= 20) {
                TIMER.style.color = "yellow";
            } 

            if (timeLeft <= 10) {
                TIMER.style.color = "red";
            } 

            if (timeLeft == 0) {
                typing_input.setAttribute("readonly", "");
                time_is_over = true;
                clearInterval(timerInterval);
                alert("Time's up!");
            }
        }, 1000);
    }

    function debounce(func, delay) {
        let debounceTimer;
        return function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
        }
    }

    function wordTyped() {
        if (time_is_over) {
            return;
        }
        if (first_letter) {
            startTimer();
            first_letter = false;
        }

        let next_word = document.getElementsByClassName("words")[0];
        let typed_value = typing_input.value.trimStart();

        if (next_word.innerHTML === "" && typed_value === word_list_212[word_count] + " ") {
            typing_input.style.textDecoration = "none";
            next_word.remove();
            word_count++;

            let new_word_span = document.createElement("span");
            new_word_span.innerHTML = word_list_212[word_count + 14];
            new_word_span.setAttribute("style", "padding: 0px 0.33rem 0px 0px;font-size: 2rem;position: relative;z-index: -1;");
            new_word_span.setAttribute("class", "words");
            RIGHT_WORDS_CONTAINER.append(new_word_span);

            let written_word_span = document.createElement("span");
            written_word_span.innerHTML = typing_input.value;
            written_word_span.setAttribute("style", "padding: 0px 0.33rem 0px 0px;font-size: 2rem;position: relative;z-index: -1;color: cornflowerblue;");
            LEFT_WORDS_CONTAINER.append(written_word_span);

            typing_input.value = "";
            resetInput();

            if (LEFT_WORDS_CONTAINER.childElementCount > 6) {
                LEFT_WORDS_CONTAINER.childNodes[0].remove();
            }

            char_num = 0;
            updateWPM();
            return;
        } else if (next_word.innerHTML === "" && typing_input.value !== "") {
            typing_input.style.textDecoration = "line-through";
            return;
        }

        let alpha_regex = /^[a-zA-Z]$/;
        if (alpha_regex.test(typed_value.slice(-1))) {
            typing_input.style.width = `calc(${typing_input.style.width} + 1rem)`;
        } else if (typed_value.slice(-1) === " " && typing_input.style.width !== "calc(0.75rem)") {
            typing_input.style.width = `calc(${typing_input.style.width} - 1rem)`;
        }

        if (typed_value === word_list_212[word_count].substring(0, char_num + 1)) {
            chars_typed++;
            char_num++;
            typing_input.style.textDecoration = "none";
            next_word.innerHTML = word_list_212[word_count].substring(char_num);
        } else if (typed_value.slice(-1) === " " && char_num !== 0) {
            chars_typed--;
            char_num--;
            next_word.innerHTML = word_list_212[word_count].substring(char_num);
        } else if (typed_value.slice(-1) !== next_word.innerHTML.substring(0, 1) && typed_value.slice(-1).length === 1) {
            typing_input.style.textDecoration = "line-through";
            extra_chars++;
            wrong_chars++;
        }
        
        updateAccuracy();
        updateStats();
    }

    function resetInput() {
        let typing_input_clone = typing_input.cloneNode();
        typing_input.remove();
        typing_input_clone.value = "";
        typing_input_clone.style.width = "calc(0.75rem)";
        LEFT_WORDS_CONTAINER.append(typing_input_clone);
        typing_input = typing_input_clone;
        typing_input.focus();
        typing_input.addEventListener("input", debounce(wordTyped, 300));
    }

    function updateWPM() {
        let wpm = word_count / (TIME_INPUT.value / 60);
        wpm = Math.round((wpm + Number.EPSILON) * 100) / 100;
        words_typed_span.innerHTML = `Words per minute: ${wpm}`;
    }

    function updateAccuracy() {
        accuracy = 100 - (wrong_chars * 100 / chars_typed);
        if (isNaN(accuracy)) {
            accuracy = 0;
        } else {
            accuracy = Math.round((accuracy + Number.EPSILON) * 100) / 100;
        }
    }

    function updateStats() {
        chars_typed_span.innerHTML = `Characters typed: ${chars_typed}`;
        accuracy_span.innerHTML = `Accuracy: ${accuracy}%`;
    }

    typing_input.addEventListener("input", debounce(wordTyped, 300));
})