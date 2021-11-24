var peopleNames = [];
var peopleListItems = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log("Start website");
});

function addPerson() {
    var nameInput = document.querySelector("#add-person-name");
    var name = nameInput.value;
    if (name !== "") {
        nameInput.value = "";
        peopleNames.push(name);

        // Add person to list on page
        var peopleList = document.querySelector("#people-list");
        var li = document.createElement("li");
        li.id = `list-item-${peopleNames.length - 1}`;
        li.innerHTML = name;
        peopleList.appendChild(li);
        peopleListItems.push(li);

        console.log(peopleNames);
        updateRemovePersonIndex();
    }
}

function removePerson() {
    var index = document.querySelector("#remove-person-index").value - 1;

    peopleListItems[index].parentNode.removeChild(peopleListItems[index]);
    peopleNames.splice(index, 1);
    peopleListItems.splice(index, 1);
    updateRemovePersonIndex();
}

function updateRemovePersonIndex() {
    var removePersonIndex = document.querySelector("#remove-person-index")
    removePersonIndex.value = peopleNames.length;
    removePersonIndex.max = peopleNames.length;
}

function generateSchedule() {
    
}
