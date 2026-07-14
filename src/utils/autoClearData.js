export function autoClearLocalStorage(ttlHours = 24) {
  if (typeof window === "undefined") return; // ensure it's running on client

  const now = Date.now();
  const setupTime = localStorage.getItem("setupTime");

  if (!setupTime) {
    // first time
    localStorage.setItem("setupTime", now.toString());
  } else {
    // check if more than ttlHours passed
    const timePassed = now - parseInt(setupTime, 10);
    const ttl = ttlHours * 60 * 60 * 1000;

    if (timePassed > ttl) {
      localStorage.clear(); // 🔥 clear everything
      localStorage.setItem("setupTime", now.toString()); // reset timer
    }
  }
}
