const BASE_URL = "http://localhost:3000"
const PENDING_POLLS_URL = `${BASE_URL}/polls`
const CLOSED_POLLS_URL = `${BASE_URL}/polls/closed`


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".createForm");
    form.style.display = "none";

    // hiding dashboard and newsfeed when clicking on create poll
    const create = document.getElementById("createPoll");
    create.addEventListener("click", () => {
        const panel = document.querySelector(".panel");
        if (panel.style.display === "none") {
            panel.style.display = "block";
            document.querySelector("#createPoll h4").innerText = "Create Poll";
            form.style.display = "none";
          } else {
            panel.style.display = "none";
            document.querySelector("#createPoll h4").innerText = "Back to dashboard";
            form.style.display = "block";
          }
    })

    
})