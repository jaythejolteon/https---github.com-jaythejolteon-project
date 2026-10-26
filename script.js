
const deadlineForm = document.querySelector("#deadline-form");
const assignmentInput = document.querySelector("#assignment-name");
const dueDateInput = document.querySelector("#due-date");
const deadlineResult = document.querySelector("#deadline-result");

deadlineForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const assignmentName = assignmentInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!assignmentName || !dueDate) {
    deadlineResult.textContent =
      "Please enter an assignment name and due date.";
    deadlineResult.className = "result error";
  } else {
    // Compare calendar dates, avoiding time-of-day differences.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(dueDate + "T00:00:00");
    const daysLeft = Math.round(
      (deadline.getTime() - today.getTime()) / 86400000
    );

    if (daysLeft < 0) {
      deadlineResult.textContent =
        assignmentName + " is overdue. Please check your deadline.";
      deadlineResult.className = "result error";
    } else if (daysLeft <= 2) {
      const timing = daysLeft === 0
        ? "today"
        : daysLeft === 1
          ? "tomorrow"
          : "in 2 days";

      deadlineResult.textContent =
        "Reminder: " + assignmentName + " is due " + timing +
        ". Start working on it now!";
      deadlineResult.className = "result warning";
    } else {
      deadlineResult.textContent =
        assignmentName + " is not due soon. You have " +
        daysLeft + " days to prepare.";
      deadlineResult.className = "result success";
    }
  }
});
