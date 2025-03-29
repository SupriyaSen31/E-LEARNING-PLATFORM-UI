// For menu Button
function openMenu() {
    document.getElementById("menu").style.display = "block";
}

function closeMenu() {
    document.getElementById("menu").style.display = "none";
}

// For Courses
const courses = [
    { name: "Web Development", desc: "Learn HTML, CSS, JavaScript", link: "#" },
    { name: "React.js Mastery", desc: "Master React and state management", link: "#" },
    { name: "UI/UX Design", desc: "Create engaging UI experiences", link: "#" }
];

const courseList = document.querySelector("course-container");

courses.forEach(course => {
    let courseCard = document.createElement("div");
    courseCard.classList.add("course-card");
    
    courseCard.innerHTML = `
        <h2>${course.name}</h2>
        <p>${course.desc}</p>
        <button class="enroll-btn">Enroll Now</button>
        <button class="details-btn" onclick="window.location.href='${course.link}'">View Details</button>
    `;

    courseList.appendChild(courseCard);
});

// For Home page
function toggleCourses() {
    let section = document.getElementById("courseSection");
    section.classList.toggle("hidden");
}


document.addEventListener("DOMContentLoaded", function () {
    loadProgress();
    loadEnrollStatus();
});

// For Course Page
function enrollCourse(courseId) {
    localStorage.setItem(`enrolled-${courseId}`, true);
    alert("You have successfully enrolled in the course!");
    document.getElementById(`course-${courseId}`).classList.add("enrolled");
    // document.querySelector(`.course-card[data-id="${courseId}"]`).classList.add("enrolled");

}

// For Video Embedding
function watchVideo(videoURL) {
    document.getElementById("video-frame").src = videoURL;
    document.getElementById("video-modal").style.display = "block";
}

function closeVideo() {
    document.getElementById("video-modal").style.display = "none";
    document.getElementById("video-frame").src = "";
}

// Progress Button
function completeLesson(courseId) {
    let progressBar = document.getElementById(`progress-bar-${courseId}`);
    let progressText = document.getElementById(`progress-${courseId}`);
    let progressValue = parseInt(progressBar.value);

    if (progressValue < 100) {
        progressValue += 20;
        if (progressValue > 100) progressValue = 100;
        
        progressBar.value = progressValue;
        progressText.innerText = progressValue;
    } else {
        alert("Course already completed!");
    }
}

function loadProgress() {
    document.querySelectorAll(".course-card").forEach((courseCard, index) => {
        let courseId = index + 1;
        let progress = localStorage.getItem(`progress-${courseId}`) || 0;
        courseCard.querySelector(`#progress-${courseId}`).innerText = progress;
        courseCard.querySelector(`#progress-bar-${courseId}`).value = progress;
    });
}

function loadEnrollStatus() {
    document.querySelectorAll(".course-card").forEach((courseCard, index) => {
        let courseId = index + 1;
        if (localStorage.getItem(`enrolled-${courseId}`)) {
            courseCard.classList.add("enrolled");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const completeBtns = document.querySelectorAll(".complete-btn");

    completeBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            let progressBar = this.parentElement.querySelector("progress");
            let progressText = this.parentElement.querySelector(".progress-text");
            let progressValue = 0;

            this.disabled = true; 

            let interval = setInterval(() => {
                if (progressValue >= 100) {
                    clearInterval(interval);
                    progressText.innerText = "Completed! 🎉";
                } else {
                    progressValue += 5;
                    progressBar.value = progressValue;
                    progressText.innerText = `Progress: ${progressValue}%`;
                }
            }, 200);
        });
    });
});
