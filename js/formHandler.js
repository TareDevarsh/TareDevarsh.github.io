let db;

// Open (or create) the database
const dbName = "ContactFormDB";
const request = indexedDB.open(dbName, 1);

request.onerror = function(event) {
  console.error("Database error: " + event.target.error);
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("Database opened successfully");
};

request.onupgradeneeded = function(event) {
  db = event.target.result;
  const objectStore = db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
  console.log("Object store created");
};

function saveFormData() {
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const contact = {
    fname: fname,
    lname: lname,
    email: email,
    subject: subject,
    message: message,
    date: new Date()
  };

  const transaction = db.transaction(["contacts"], "readwrite");
  const objectStore = transaction.objectStore("contacts");
  const request = objectStore.add(contact);

  request.onsuccess = function(event) {
    console.log("Contact added to the database");
    document.getElementById('contactForm').reset();
    alert("Your message has been saved!");
  };

  request.onerror = function(event) {
    console.error("Error adding contact: " + event.target.error);
    alert("There was an error saving your message. Please try again.");
  };
}
