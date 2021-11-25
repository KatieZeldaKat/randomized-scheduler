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
    var numPerDay = +document.querySelector("#num-per-day").value;
    var startDate = new Date(document.querySelector("#start-date").value);
    var endDate = new Date(document.querySelector("#end-date").value);
    var shiftFrequency = +document.querySelector("#shift-frequency").value;
    var gracePeriod = +document.querySelector("#grace-period").value + 1;

    // Get the difference in dates and convert to weeks
    var dateDiffMs = endDate - startDate;
    var days = Math.floor(dateDiffMs / 1000 / 60 / 60 / 24) + 1;
    console.log("Days", days);

    // Generate random array accounting for grace period
    var shiftsArray = generateRandomArray(peopleNames.length);
    while (shiftsArray.length <= peopleNames.length * days / shiftFrequency / numPerDay) {
        var randomArray;

        // Find good grace period
        var found = false;
        while (!found) {
            found = true;
            randomArray = generateRandomArray(peopleNames.length);

            for (var shift = shiftsArray.length - gracePeriod * numPerDay; shift < shiftsArray.length; shift++) {
                for (var proposed = 0; proposed < gracePeriod * numPerDay - (shiftsArray.length - shift); proposed++) {
                    if (shiftsArray[shift] == randomArray[proposed]) {
                        found = false;
                    }
                }
            }
        }

        shiftsArray = shiftsArray.concat(randomArray);
    }
    console.log(shiftsArray);

    // Initialize info for iterating through the weeks
    var iterator = 0;
    var currentDay = new Date(startDate);
    currentDay.setDate(currentDay.getDate() + 1);

    var day = 0;
    while (day < days) {
        console.log(currentDay);
        console.log(shiftFrequency);
        var dayLabel = document.createElement("label");
        dayLabel.innerHTML = currentDay.toLocaleDateString();
        scheduleContainer.appendChild(dayLabel);
        scheduleContainer.appendChild(document.createElement("br"));

        var list = document.createElement("ul");

        for (var person = 0; person < numPerDay; person++) {
            var personItem = document.createElement("li");
            personItem.innerHTML = peopleNames[shiftsArray[iterator]];
            list.appendChild(personItem);
            iterator++;
        }

        currentDay.setDate(currentDay.getDate() + shiftFrequency);
        day += shiftFrequency;
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
