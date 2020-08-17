const BASE_URL = "http://localhost:3000"
const PENDING_POLLS_URL = `${BASE_URL}/polls`
const CLOSED_POLLS_URL = `${BASE_URL}/polls/closed`


document.addEventListener("DOMContentLoaded", () => {
    createOrRemoveForm();
    listPendingForms();
    
})

// displays or hides creat poll form and dashboard based on user interaction
function createOrRemoveForm() {
  // hiding form for create poll by default
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
}

function listPendingForms() {
  document.getElementById("pendingPolls").addEventListener("click", () => {
    fetch(PENDING_POLLS_URL)
    .then(resp => resp.json())
    .then(function (json) {
      console.log(json[2]);
    })
  })
}