const token = localStorage.getItem("token");
if (!token) {
  alert("No token found, please login");
  window.location.href = "index.html";
}

// LOAD STUDENTS DROPDOWN
async function loadStudents() {
  const res = await fetch("http://localhost:3000/students", {
    headers: { "Authorization": "Bearer " + token }
  });
  const data = await res.json();

  const select = document.getElementById("studentSelect");
  select.innerHTML = "";
  data.forEach(s => {
    select.innerHTML += `<option value="${s.student_id}">${s.first_name} ${s.last_name}</option>`;
  });
}

// LOAD COURSES DROPDOWN
async function loadCourses() {
  const res = await fetch("http://localhost:3000/courses", {
    headers: { "Authorization": "Bearer " + token }
  });
  const data = await res.json();

  const select = document.getElementById("courseSelect");
  select.innerHTML = "";
  data.forEach(c => {
    select.innerHTML += `<option value="${c.course_id}">${c.course_name}</option>`;
  });
}

// ENROLL OPERATION
async function enroll() {
  const student_id = document.getElementById("studentSelect").value;
  const course_id = document.getElementById("courseSelect").value;
  const semester = document.getElementById("semester").value;

  const res = await fetch("http://localhost:3000/enrollments", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ student_id, course_id, semester })
  });

  const data = await res.json();
  alert(data.message);
  loadEnrollments();
}

// LOAD ENROLLMENT TABLE
async function loadEnrollments() {
  const res = await fetch("http://localhost:3000/enrollments/student/1", {
    headers: { "Authorization": "Bearer " + token }
  });

  // NOTE: For simple demo we load student 1
  const data = await res.json();

  const tbody = document.querySelector("#enrollmentTable tbody");
  tbody.innerHTML = "";

  data.forEach(e => {
    tbody.innerHTML += `
      <tr>
        <td>${e.enroll_id}</td>
        <td>${e.Student ? e.Student.first_name : ""}</td>
        <td>${e.Course ? e.Course.course_name : ""}</td>
        <td>${e.semester}</td>
      </tr>
    `;
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

loadStudents();
loadCourses();
loadEnrollments();
