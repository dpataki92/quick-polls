const BASE_URL = "http://localhost:3000"
const PENDING_POLLS_URL = `${BASE_URL}/polls`
const CLOSED_POLLS_URL = `${BASE_URL}/polls/closed`


document.addEventListener("DOMContentLoaded", () => {
    
    // hiding dashboard and newsfeed when clicking on creat poll
    const create = document.getElementById("createPoll");
    create.addEventListener("click", () => {
        const panel = document.querySelector(".panel");
        if (panel.style.display === "none") {
            panel.style.display = "block";
            document.querySelector("#createPoll h4").innerText = "Create Poll"
          } else {
            panel.style.display = "none";
            document.querySelector("#createPoll h4").innerText = "Back to dashboard"
          }
    })

    // 
})