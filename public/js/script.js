document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const form = document.getElementById('predictionForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('predictBtn');
            const btnText = document.getElementById('btnText');
            const spinner = document.getElementById('spinner');
            
            // Show loading state
            btn.disabled = true;
            btnText.textContent = 'Analyzing...';
            spinner.classList.remove('d-none');
            
            // Submit form
            this.submit();
        });
    }
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.progress-bar').forEach(bar => {
          // Get the width value safely
          let width = parseFloat(bar.style.width) || 0;
          width = Math.max(0, Math.min(100, width));
          
          // Apply color classes based on value
          if (width < 30) {
            bar.classList.add('low');
          } else if (width < 70) {
            bar.classList.add('medium');
          } else {
            bar.classList.add('high');
          }
          
          // Ensure proper display
          bar.style.width = width + '%';
          bar.textContent = width.toFixed(1) + '%';
        });
      });
    // Handle details button clicks
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const disease = this.getAttribute('data-disease');
            const detailsDiv = document.getElementById(`details-${disease.replace(' ', '-')}`);
            
            // Toggle visibility
            if (detailsDiv.style.display === 'none') {
                // Fetch details if not already loaded
                if (!detailsDiv.innerHTML) {
                    detailsDiv.innerHTML = '<p>Loading details...</p>';
                    
                    fetch(`/treatment/${encodeURIComponent(disease)}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.error) {
                                detailsDiv.innerHTML = `<p>Error: ${data.error}</p>`;
                            } else {
                                // Format the details with line breaks
                                const formattedDetails = data.details.replace(/\n/g, '<br>');
                                detailsDiv.innerHTML = formattedDetails;
                            }
                        })
                        .catch(error => {
                            detailsDiv.innerHTML = `<p>Failed to load details: ${error.message}</p>`;
                        });
                }
                
                detailsDiv.style.display = 'block';
                this.textContent = 'Hide Details';
            } else {
                detailsDiv.style.display = 'none';
                this.textContent = 'Details';
            }
        });
    });
});