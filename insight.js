async function showInsights() {
    const zip = document.getElementById("zipInput").value.trim();
    const insightBox = document.getElementById("insightBox");
    const homeValue = document.getElementById("homeValue");

    if (zip.length !== 5) {
        homeValue.textContent = "Please enter a valid ZIP code.";
        insightBox.classList.remove("hidden");
        insightBox.classList.remove("opacity-0");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/zip-insight?zip=${zip}`);

        if (!response.ok) {
            throw new Error("ZIP not found");
        }

        const data = await response.json();

        homeValue.textContent =
            `$${data.avg_home_value.toLocaleString()} average home value in ${data.city}, ${data.state}`;

        insightBox.classList.remove("hidden");
        setTimeout(() => {
            insightBox.classList.remove("opacity-0");
        }, 50);

    } catch (err) {
        homeValue.textContent = "Unable to retrieve market data.";
        insightBox.classList.remove("hidden");
        insightBox.classList.remove("opacity-0");
    }
}
