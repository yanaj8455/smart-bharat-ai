// Document Assistant
function showDocuments() {
    let service = document.getElementById("service").value;
    let output = document.getElementById("documents");

    if (service === "Passport") {
        output.innerHTML = `
        <h3>Required Documents</h3>
        <ul>
            <li>Aadhaar Card</li>
            <li>PAN Card</li>
            <li>Address Proof</li>
            <li>Passport Size Photo</li>
        </ul>`;
    } else if (service === "Aadhaar") {
        output.innerHTML = `
        <h3>Required Documents</h3>
        <ul>
            <li>Identity Proof</li>
            <li>Address Proof</li>
        </ul>`;
    } else if (service === "PAN Card") {
        output.innerHTML = `
        <h3>Required Documents</h3>
        <ul>
            <li>Aadhaar Card</li>
            <li>Passport Size Photo</li>
        </ul>`;
    } else if (service === "Driving Licence") {
        output.innerHTML = `
        <h3>Required Documents</h3>
        <ul>
            <li>Learner Licence</li>
            <li>Identity Proof</li>
            <li>Address Proof</li>
        </ul>`;
    } else {
        output.innerHTML = "<p>Please select a service.</p>";
    }
}

// Government Scheme Recommendation
function recommendScheme() {
    let age = document.getElementById("age").value;
    let category = document.getElementById("category").value;
    let result = document.getElementById("schemeResult");

    if (category == "Student") {
        result.innerHTML = "<h3>Recommended Scheme</h3><p>🎓 PM Vidya & National Scholarship Portal</p>";
    } else if (category == "Farmer") {
        result.innerHTML = "<h3>Recommended Scheme</h3><p>🌾 PM Kisan Samman Nidhi</p>";
    } else if (category == "Women") {
        result.innerHTML = "<h3>Recommended Scheme</h3><p>👩 Beti Bachao Beti Padhao & Sukanya Samriddhi Yojana</p>";
    } else if (category == "Senior Citizen") {
        result.innerHTML = "<h3>Recommended Scheme</h3><p>👴 Atal Pension Yojana</p>";
    } else {
        result.innerHTML = "<p>Please select a category.</p>";
    }
}

// Chatbot Assistant (Ask AI)
async function askAI() {
    const message = document.getElementById("message").value;

    if (!message.trim()) {
        alert("Please enter a question first!");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();
        
        // Response show karne ke liye (Make sure aapke HTML me id="response" wala div ho)
        const responseDiv = document.getElementById("response");
        if (responseDiv) {
            responseDiv.innerHTML = `<p><strong>AI:</strong> ${data.reply}</p>`;
        } else {
            console.log("Reply from AI:", data.reply);
        }
    } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Backend server se connect nahi ho paa raha hai. Check karo ki Flask app chal rahi hai ya nahi!");
    }
}