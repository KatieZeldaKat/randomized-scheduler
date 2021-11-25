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
    // Remove any previous schedules
    var scheduleContainer = document.querySelector("#schedule-container");
    scheduleContainer.innerHTML = "";
    scheduleContainer.appendChild(document.createElement("div"));

    // Get values from the web page
    var numPerDay = document.querySelector("#num-per-day").value;
    var startDate = new Date(document.querySelector("#start-date").value);
    var endDate = new Date(document.querySelector("#end-date").value);

    // Get the difference in dates and convert to weeks
    var dateDiffMs = endDate - startDate;
    var weeks = Math.floor(dateDiffMs / 1000 / 60 / 60 / 24 / 7) + 1;

    // Initialize info for iterating through the weeks
    var iterator = 0;
    var randomArray = generateRandomArray(peopleNames.length);
    var currentDay = new Date(startDate);
    currentDay.setDate(currentDay.getDate() + 1);

    for (var week = 0; week < weeks; week++) {
        var dayLabel = document.createElement("label");
        dayLabel.innerHTML = currentDay.toLocaleDateString();
        scheduleContainer.appendChild(dayLabel);
        scheduleContainer.appendChild(document.createElement("br"));

        var list = document.createElement("ul");

        for (var person = 0; person < numPerDay; person++) {
            var personItem = document.createElement("li");
            personItem.innerHTML = peopleNames[randomArray[iterator]];
            list.appendChild(personItem);
            iterator++;

            // Prevent overflow
            if (iterator >= peopleNames.length) {
                iterator = 0;
                randomArray = generateRandomArray(peopleNames.length);
            }
        }

        currentDay.setDate(currentDay.getDate() + 7);
        scheduleContainer.appendChild(list);
        scheduleContainer.appendChild(document.createElement("br"));
    }
}

function generateRandomArray(size) {
    // Create array of values counting up by index
    var result = [];
    for (var i = 0; i < size; i++) {
        result.push(i);
    }

    // Durstenfeld's version of Fisher-Yates
    for (var i = size - 1; i > 0; i--) {
        // Get value less than the current range
        var roll = Math.floor(Math.random() * i);

        // Swap the values to make the resut at end of array
        var temp = result[i];
        result[i] = result[roll];
        result[roll] = temp;
    }

    return result;
}
