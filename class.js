const courses = [
    {
        code: "COP2001",
        name: "Introduction to Programming",
        prerequisites: [],
        note: "This course is a prerequisite for many advanced programming classes."
    },
    {
        code: "COP2800",
        name: "Advanced Programming",
        prerequisites: ["COP2001"],
        note: "Must take COP2001 before enrolling."
    },
    {
        code: "COP3000",
        name: "Web Development",
        prerequisites: ["COP2001", "COP2800"],
        note: "Must take either COP2001 or COP2800 to enroll."
    },
    {
        code: "COP4900",
        name: "Capstone Project",
        prerequisites: ["COP3000"],
        note: "You must complete Web Development before taking this course."
    }
];

const completedCoursesSelect = document.getElementById('completedCourses');
const classListElement = document.getElementById('classList');

// Populate completed courses select options
courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course.code;
    option.textContent = course.name;
    completedCoursesSelect.appendChild(option);
});

// Function to show available classes based on completed courses
function showAvailableClasses() {
    const completedCourses = Array.from(completedCoursesSelect.selectedOptions).map(option => option.value);
    classListElement.innerHTML = ''; // Clear previous results

    courses.forEach(course => {
        // Check if course can be taken based on prerequisites
        const canTake = course.prerequisites.length === 0 || course.prerequisites.some(prereq => completedCourses.includes(prereq));

        if (canTake) {
            const li = document.createElement('li');
            li.textContent = `${course.name} (${course.code}): ${course.note}`;
            classListElement.appendChild(li);
        }
    });

    // Disable courses that conflict with OR prerequisites
    disableConflictingCourses();
}

// Function to disable conflicting courses
function disableConflictingCourses() {
    const completedCourses = Array.from(completedCoursesSelect.selectedOptions).map(option => option.value);
    
    // Disable options based on taken courses
    if (completedCourses.includes("COP2001")) {
        completedCoursesSelect.querySelector(`option[value="COP2800"]`).disabled = true;
    } else if (completedCourses.includes("COP2800")) {
        completedCoursesSelect.querySelector(`option[value="COP2001"]`).disabled = true;
    }
}