// ==========================================
// SESSION 3
// JAVASCRIPT BASICS - VARIABLES AND FUNCTIONS
// ==========================================

const appName = "Dashboard Shell";

let userCount = 128;


function formatCurrency(amount) {
    return "Rp" + amount.toLocaleString("id-ID");
}


console.log(appName, "- Total users:", userCount);

console.log(formatCurrency(4210000));


// ==========================================
// SELECTING DOM ELEMENTS
// ==========================================

const statUsers = document.querySelector("#stat-users");

const statTransactions = document.querySelector("#stat-transactions");

const statAverage = document.querySelector("#stat-average");


// ==========================================
// POPULATING THE DOM WITH DATA
// ==========================================

function displayData() {

    statUsers.textContent = userCount;

    statTransactions.textContent = 54;

    statAverage.textContent = formatCurrency(4210000);

}


displayData();


// ==========================================
// EVENT HANDLING - MENU TOGGLE
// ==========================================

const menuToggle = document.querySelector("#menu-toggle");

const sidebar = document.querySelector("#sidebar");


menuToggle.addEventListener("click", () => {

    sidebar.classList.toggle("sidebar-open");

});


// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const navLinks = document.querySelectorAll(".nav-link");


navLinks.forEach((navLink) => {

    navLink.addEventListener("click", (event) => {

        navLinks.forEach((l) => l.classList.remove("active"));

        event.currentTarget.classList.add("active");

    });

});


// ==========================================
// REFRESH DATA BUTTON
// ==========================================

const btnRefresh = document.querySelector("#btn-refresh");


btnRefresh.addEventListener("click", () => {

    userCount = Math.floor(Math.random() * 500);

    displayData();

});


// ==========================================
// XSS DEMO - INNERHTML VS TEXTCONTENT
// ==========================================

const visitorNameInput = document.querySelector("#visitor-name");

const greetingOutput = document.querySelector("#greeting-output");


// UNSAFE

document.querySelector("#btn-greet-unsafe").addEventListener("click", () => {

    greetingOutput.innerHTML = "Hello, " + visitorNameInput.value + "!";

});


// SAFE

document.querySelector("#btn-greet-safe").addEventListener("click", () => {

    greetingOutput.textContent = "Hello, " + visitorNameInput.value + "!";

});


// ==========================================
// SESSION 4
// ASYNCHRONOUS API CONSUMPTION
// ==========================================


// STEP 3 - STATE CONTROLLER FUNCTION

const stateLoading = document.querySelector("#state-loading");

const stateEmpty = document.querySelector("#state-empty");

const stateError = document.querySelector("#state-error");

const userList = document.querySelector("#user-list");


function showState(state) {

    stateLoading.hidden = state !== "loading";

    stateEmpty.hidden = state !== "empty";

    stateError.hidden = state !== "error";

    userList.hidden = state !== "success";

}


// ==========================================
// STEP 4 - RENDERING DATA SAFELY
// ==========================================

function renderUsers(data) {

    userList.textContent = "";

    data.forEach((user) => {

        const li = document.createElement("li");

        li.textContent = user.name + " — " + user.email;

        userList.appendChild(li);

    });

}


// ==========================================
// STEP 5 - FETCH FUNCTION
// ==========================================

async function loadUsers(query = "") {

    showState("loading");

    try {

        const url = "https://jsonplaceholder.typicode.com/users" +

            (query ? "?username=" + encodeURIComponent(query) : "");

        const response = await fetch(url);


        if (!response.ok) {

            throw new Error("HTTP status: " + response.status);

        }


        const data = await response.json();


        if (data.length === 0) {

            showState("empty");

            return;

        }


        renderUsers(data);

        showState("success");


    } catch (error) {

        console.error("Failed to load data:", error);

        showState("error");

    }

}


// LOAD DATA BUTTON

document.querySelector("#btn-load-users").addEventListener("click", () => {

    loadUsers();

});


// SEARCH USERNAME

document.querySelector("#search-username").addEventListener("input", (event) => {

    loadUsers(event.target.value.trim());

});


// ==========================================
// STEP 6 - TESTING FAILURE STATE
// ==========================================

async function loadUsersBroken() {

    showState("loading");

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/no-such-user"
        );


        if (!response.ok) {

            throw new Error("HTTP status: " + response.status);

        }


        const data = await response.json();

        renderUsers(data);

        showState("success");


    } catch (error) {

        console.error("Failed to load data:", error);

        showState("error");

    }

}


document.querySelector("#btn-simulate-error").addEventListener("click", () => {

    loadUsersBroken();

});


// ==========================================
// STEP 7 - CORS FAILURE DEMO
// ==========================================

document.querySelector("#btn-cors-demo").addEventListener("click", async () => {

    showState("loading");

    try {

        const response = await fetch("https://www.google.com");

        const data = await response.text();

        console.log(data);

        showState("success");


    } catch (error) {

        console.error("Failed (likely CORS):", error);

        showState("error");

    }

});