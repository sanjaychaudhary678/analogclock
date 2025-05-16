const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');
const dateDisplay = document.getElementById("dateDisplay");
const timezoneSelect = document.getElementById("timezoneSelect");

let currentZone = "local";

timezoneSelect.addEventListener("change", () => {
  currentZone = timezoneSelect.value;
  updateClock(); // immediately reflect change
});

function updateClock() {
  const now = getCurrentTime(currentZone);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = (seconds * 6)-90;
  const minuteDeg = (minutes * 6 + seconds * 0.1)-90;
  const hourDeg = ((hours % 12) * 30 + minutes * 0.5)-90;

  secondHand.style.transform = `rotate(${secondDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[now.getDay()];
  const date = now.getDate();
  dateDisplay.textContent = `${day}/${date}`;
}

function getCurrentTime(zone) {
  if (zone === "local") return new Date();

  try {
    const options = { timeZone: zone, hour12: false };
    const formatter = new Intl.DateTimeFormat("en-US", {
      ...options,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      weekday: "short"
    });

    const parts = formatter.formatToParts(new Date());
    const timeParts = Object.fromEntries(parts.map(p => [p.type, p.value]));

    return new Date(`${timeParts.year}-${timeParts.month}-${timeParts.day}T${timeParts.hour}:${timeParts.minute}:${timeParts.second}`);
  } catch (e) {
    console.error("Invalid time zone:", zone);
    return new Date();
  }
}

setInterval(updateClock, 1000);
updateClock();
