let number = 0;

function setup() {
    if (!(localStorage.getItem('number') == null)) {
        number = parseInt(localStorage.getItem('number'));

        for (let i = 1; i <= number; i++) {
            let newRow = document.createElement("div");
            newRow.classList.add("row", "mb-2");

            let teamBtnGroup = document.createElement("div");
            teamBtnGroup.classList.add("btn-group", "team-btn-group", "btn-group-lg");
            teamBtnGroup.setAttribute("role", "group");
            teamBtnGroup.setAttribute("aria-label", "Team Button Group");

            let numberBtn = document.createElement("button");
            numberBtn.classList.add("btn", "number");
            numberBtn.setAttribute("style", "text-align: center;");
            numberBtn.setAttribute("data-bs-toggle", "modal");
            numberBtn.setAttribute("data-bs-target", "#teamModal");
            numberBtn.textContent = i;
            teamBtnGroup.appendChild(numberBtn);

            let teamName = localStorage.getItem(i);
            let teamNameBtn = document.createElement("button");
            teamNameBtn.classList.add("btn", "teamBtn");
            teamNameBtn.setAttribute("style", "text-align: left;");
            teamNameBtn.setAttribute("data-bs-toggle", "modal");
            teamNameBtn.setAttribute("data-bs-target", "#teamModal");
            teamNameBtn.textContent = teamName || "";
            teamBtnGroup.appendChild(teamNameBtn);

            let editBtn = document.createElement("button");
            editBtn.classList.add("btn", "editBtn");
            editBtn.setAttribute("style", "text-align: center;");
            editBtn.setAttribute("data-bs-toggle", "modal");
            editBtn.setAttribute("data-bs-target", "#teamModal");
            editBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                </svg>
            `;
            teamBtnGroup.appendChild(editBtn);

            newRow.appendChild(teamBtnGroup);

            document.querySelector(".container").appendChild(newRow);
        }
    } else {
        number = 0;
    }
}

window.addEventListener('keydown', function (e) {
    if(e.key == "c"){
        number = 0;
        localStorage.setItem('number', 0);
    }
  }, false);

document.getElementById("saveAddModal").addEventListener("mousedown", function(){
    number++;
    localStorage.setItem(number, document.getElementById("teamName").value);
    localStorage.setItem(number + "teleOp", document.getElementById("addTeleOpScore").value);
    localStorage.setItem(number + "auton", document.getElementById("addAutonScore").value);
    localStorage.setItem(number + "drone", document.getElementById("addDroneScore").value);
    localStorage.setItem(number + "hang", document.getElementById("addCanHang").value);
    localStorage.setItem(number + "notes", document.getElementById("addNotes").value);


    localStorage.setItem('number', number);

    let newRow = document.createElement("div");
    newRow.classList.add("row", "mb-2");

    let teamBtnGroup = document.createElement("div");
    teamBtnGroup.classList.add("btn-group", "team-btn-group", "btn-group-lg");
    teamBtnGroup.setAttribute("role", "group");
    teamBtnGroup.setAttribute("aria-label", "Team Button Group");

    let numberBtn = document.createElement("button");
    numberBtn.classList.add("btn", "number");
    numberBtn.setAttribute("style", "text-align: center;");
    numberBtn.setAttribute("data-bs-toggle", "modal");
    numberBtn.setAttribute("data-bs-target", "#teamModal");
    numberBtn.textContent = number;
    teamBtnGroup.appendChild(numberBtn);

    let teamNameBtn = document.createElement("button");
    teamNameBtn.classList.add("btn", "teamBtn");
    teamNameBtn.setAttribute("style", "text-align: left;");
    teamNameBtn.setAttribute("data-bs-toggle", "modal");
    teamNameBtn.setAttribute("data-bs-target", "#teamModal");
    teamNameBtn.textContent = document.getElementById("teamName").value;
    teamBtnGroup.appendChild(teamNameBtn);

    let editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn");
    editBtn.setAttribute("style", "text-align: center;");
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#teamModal");
    editBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        </svg>
    `;
    teamBtnGroup.appendChild(editBtn);

    newRow.appendChild(teamBtnGroup);

    document.querySelector(".container").appendChild(newRow);

    document.getElementById("teamName").value = "";
    document.getElementById("addTeleOpScore").value = "";
    document.getElementById("addAutonScore").value = "";
    document.getElementById("addDroneScore").selectedIndex = 0;
    document.getElementById("addCanHang").selectedIndex = 0;
    document.getElementById("addNotes").value = "";

    let modal = document.getElementById('addModal');
    let modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
});

// Add event listener to the container and listen for click events on the team buttons
document.querySelector(".container").addEventListener("click", function(event) {
    // Check if the clicked element is a team button
    if (event.target.classList.contains("teamBtn")) {
        let rowNumber = parseInt(event.target.parentNode.querySelector('.number').textContent);
        document.getElementById("teamModalLabel").textContent = localStorage.getItem(rowNumber);
        document.getElementById("teleOpScore").value = localStorage.getItem(rowNumber + "teleOp");
        document.getElementById("autonScore").value = localStorage.getItem(rowNumber + "auton");
        document.getElementById("droneScore").value = localStorage.getItem(rowNumber + "drone");
        document.getElementById("canHang").value = localStorage.getItem(rowNumber + "hang");
        document.getElementById("notes").value = localStorage.getItem(rowNumber + "notes");

        document.getElementById("saveChanges").addEventListener("mousedown", function(e){
            // localStorage.setItem(number, document.getElementById("teamModalLabel").value);
            localStorage.setItem(number + "teleOp", document.getElementById("teleOpScore").value);
            localStorage.setItem(number + "auton", document.getElementById("autonScore").value);
            localStorage.setItem(number + "drone", document.getElementById("droneScore").value);
            localStorage.setItem(number + "hang", document.getElementById("canHang").value);
            localStorage.setItem(number + "notes", document.getElementById("notes").value);

            let modal = document.getElementById('teamModal');
            let modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        });

    }
});