const token = localStorage.getItem("token");

if (!token) {
  alert("No token found, please login");
  window.location.href = "index.html";
}

// FETCH & DISPLAY STUDENTS
async function loadStudents() {
  const res = await fetch("http://localhost:3000/students", {
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();

  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";

  data.forEach(student => {
    const row = `
      <tr>
        <td>${student.student_id}</td>
        <td>${student.first_name} ${student.last_name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.dob || ''}</td>
        <td>${student.gender || ''}</td>
        <td><button onclick="deleteStudent(${student.student_id})">Delete</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// ADD STUDENT
async function addStudent() {
  const student = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value
  };

  const res = await fetch("http://localhost:3000/students", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });

  const data = await res.json();
  alert(data.message);
  loadStudents();
}

// DELETE STUDENT
async function deleteStudent(id) {
  const res = await fetch("http://localhost:3000/students/" + id, {
    method: "DELETE",
    headers: { "Authorization": "Bearer " + token }
  });
  const data = await res.json();
  alert(data.message);
  loadStudents();
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// Initial load
loadStudents();
