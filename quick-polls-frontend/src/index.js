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

class Poll {
  constructor(question, options, votes, end_date, vote_requirement) {
    this.question = question;
    this.options = options;
    this.votes = votes;
    this.end_date = end_date;
    this.vote_requirement = vote_requirement;
  }

  calculatePercentage() {
    const total = this.votes.length;
    const result = [];
    for (let i = 0; i < this.options.length; i++) {
      let optionData = [];
      let voteCount = 0;
      this.votes.forEach(v => {
        if (v.option_id === this.options[i].id) {
          voteCount += 1;
        }
      })
      optionData.push(this.options[i].description)
      optionData.push(Math.floor(voteCount / total * 100))
      result.push(optionData)
    }
    return result;
  }

}

function createNewDiagramFromPoll(poll) {
  let div = document.createElement("div");
  div.classList = "third extra";

  let title = document.createElement("h5");
  title.innerText = "Current results";
  title.style.fontWeight = "bold";

  for (let opt of poll.options) {

    let description = document.createElement("p");
    description.innerHTML = opt.description;

    let pollDiv = document.createElement("div");
    pollDiv.classList = "grey";

    let percentageDiv = document.createElement("div");
    let randomColor = ["red", "green", "orange", "blue", "yellow", "purple"][Math.floor((Math.random() * ["red", "green", "orange", "blue", "yellow", "purple"].length))]
    percentageDiv.classList = "container center padding " + randomColor;
    let percentageValue = poll.calculatePercentage().find(option => option[0] === opt.description)[1];
    percentageDiv.style.width = `${percentageValue}%`;
    percentageDiv.innerHTML = `${percentageValue}%`;
    
    pollDiv.appendChild(percentageDiv);
    div.appendChild(description);
    div.appendChild(pollDiv)
    
  }
  div.insertBefore(title, div.querySelector("p"));
  return div;
}

function createNewVotingFormFromPoll(poll) {
  let div = document.createElement("div");
  div.classList ="twothird extra";
  let table = document.createElement("table");
  table.classList = "table striped white";
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  div.appendChild(table);

  let question = document.createElement("h5");
  question.innerHTML = poll.question;
  question.style.fontWeight = 'bold';
  div.insertBefore(question, div.querySelector("table"));
  question.after(document.createElement("br"))

  for (let i = 0; i < poll.options.length; i++) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = poll.options[i].description;
    tr.appendChild(td)
    tbody.appendChild(tr)
  }
  if (poll.vote_requirement != null) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = "Voting requirement:" + poll.vote_requirement;
    tr.appendChild(td)
    tbody.appendChild(tr)
  }

  if (poll.end_date != null) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = "End date: " + poll.end_date;
    tr.appendChild(td)
    tbody.appendChild(tr)
  }
  return div;
}

function listPendingForms() {
  document.getElementById("pendingPolls").addEventListener("click", () => {
    fetch(PENDING_POLLS_URL)
    .then(resp => resp.json())
    .then(function (json) {
      let rowPaddingDiv = document.querySelector(".row-padding")

      if (rowPaddingDiv.style.display === "none") {

        rowPaddingDiv.style.display = "block";
        document.querySelector("#pendingPolls h4").innerText = "Pending Polls";
        document.querySelectorAll(".extra").forEach(e => {
          e.remove();
        })

      } else {

        rowPaddingDiv.style.display = "none";
        document.querySelector("#pendingPolls h4").innerText = "Back to dashboard";

        for (let i = 0; i < json.length; i++) {
          let poll = new Poll(json[i].question, json[i].options, json[i].votes, json[i].end_date, json[i].vote_requirement);
          let parent = document.createElement("div")
          parent.classList = "row-padding extra";
          parent.style.margin = "0 -16px";
          let diagramDiv = createNewDiagramFromPoll(poll);
          parent.appendChild(diagramDiv);
          let votingFormDiv = createNewVotingFormFromPoll(poll);
          parent.appendChild(votingFormDiv);
          parent.style.marginBottom = "50px";
          document.querySelector(".panel").appendChild(parent);
        }
      }
      
    })
  })
}