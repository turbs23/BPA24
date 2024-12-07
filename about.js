document.addEventListener("DOMContentLoaded", () => {
    const summaries = document.querySelectorAll(".summary");
  
    summaries.forEach(summary => {
      summary.addEventListener("click", () => {
        const details = summary.nextElementSibling;
        if (details) {
          const isHidden = details.classList.toggle("hidden");
          
          summary.setAttribute("aria-expanded", !isHidden);
        }
      });
    });
  });
  
