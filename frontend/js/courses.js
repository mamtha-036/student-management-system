const token = localStorage.getItem("token");

if (!token) {
  alert("No token found, please login");
  window.location.href = "index.html";
}

// LOAD COURSES
async function loadCourses() {
  const res = await fetch("http://localhost:3000/courses", {
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();

  const tbody = document.querySelector("#courseTable tbody");
  tbody.innerHTML = "";

  data.forEach(course => {
    const row = `
      <tr>
        <td>${course.course_id}</td>
        <td>${course.course_name}</td>
        <td>${course.course_code}</td>
        <td>${course.credit_hours}</td>
        <td><button onclick="deleteCourse(${course.course_id})">Delete</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// ADD COURSE
async function addCourse() {
  const course = {
    course_name: document.getElementById("course_name").value,
    course_code: document.getElementById("course_code").value,
    credit_hours: parseInt(document.getElementById("credit_hours").value)
  };

  const res = await fetch("http://localhost:3000/courses", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(course)
  });

  const data = await res.json();
  alert(data.message);
  loadCourses();
}

// DELETE COURSE
async function deleteCourse(id) {
  const res = await fetch("http://localhost:3000/courses/" + id, {
    method: "DELETE",
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();
  alert(data.message);
  loadCourses();
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

loadCourses();
