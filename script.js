// Road Runner Rentals - Main JavaScript

// Store data across pages using localStorage
const RRRental = {
    // Data storage
    saveData: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    getData: function(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    
    // Bike selection
    selectedBike: null,
    setSelectedBike: function(bike) {
        this.selectedBike = bike;
        this.saveData('selectedBike', bike);
    },
    
    getSelectedBike: function() {
        if (!this.selectedBike) {
            this.selectedBike = this.getData('selectedBike');
        }
        return this.selectedBike;
    },
    
    // Date selection
    selectedDate: null,
    setSelectedDate: function(date) {
        this.selectedDate = date;
        this.saveData('selectedDate', date);
    },
    
    getSelectedDate: function() {
        if (!this.selectedDate) {
            this.selectedDate = this.getData('selectedDate') || 'April 30, 2025';
        }
        return this.selectedDate;
    },
    
    // Form data
    formData: null,
    setFormData: function(data) {
        this.formData = data;
        this.saveData('formData', data);
    },
    
    getFormData: function() {
        if (!this.formData) {
            this.formData = this.getData('formData');
        }
        return this.formData;
    },
    
    // Clear data (after booking complete or cancellation)
    clearData: function() {
        localStorage.removeItem('selectedBike');
        localStorage.removeItem('selectedDate');
        localStorage.removeItem('formData');
        this.selectedBike = null;
        this.selectedDate = null;
        this.formData = null;
    }
};

// Bike data for the prototype
const bikeData = [
    {
        id: 1,
        name: "Giant Contend AR 1",
        price: 55,
        accessories: ["Flat Repair Kit"],
        description: "A comfort road bike with clearance for gravel tires. Features an aluminum frame and carbon fork and seatpost for a light, comfortable ride. Equipped with Shimano 105 11-speed drivetrain with an 11-34 cassette and 50/34 crankset. Wide range gearing is great for the Huckleberry Loop or climbing Mt. Lemmon. Includes Shimano hydraulic disc brakes for consistent braking under all conditions.",
        image: "placeholder-road.jpg"
    },
    {
        id: 2,
        name: "Giant Stance",
        price: 55,
        accessories: ["Flat Repair Kit"],
        description: "A fun-loving trail bike with grippy plus-sized tires and smooth suspension that handles rocks, roots, and ruts with traction and control. Features 27.5+ or 29\" wheels (based on size), FlexPoint rear suspension with 120mm travel, and dropper post. The lightweight ALUXX aluminum frame is built for durability and performance on the trail.",
        image: "placeholder-mountain.jpg"
    },
    {
        id: 3,
        name: "Giant Escape 2",
        price: 45,
        accessories: ["Flat Repair Kit"],
        description: "A versatile hybrid bike with a lightweight ALUXX aluminum frame, upright positioning, and quality components for a smooth, comfortable ride. Features a high-quality composite fork and innovative D-Fuse seatpost to absorb shocks and vibrations. The disc brakes deliver powerful performance in any conditions, and the 700c wheels provide speed and efficiency.",
        image: "placeholder-hybrid.jpg"
    },
    {
        id: 4,
        name: "Biria E-Bike",
        price: 85,
        accessories: ["Flat Repair Kit", "Charger"],
        description: "This folding e-bike features a stylish frame with an ultra-low step-through design and integrated Lithium-ion battery. With a 500 Watt motor, it has a range of 22-30 miles per charge. This pedal-assist electric bike also has a throttle and weighs only 52 lbs (including battery). Perfect for exploring murals, eateries, The Loop, or Tucson neighborhoods.",
        image: "placeholder-ebike.jpg"
    },
    {
        id: 5,
        name: "Aventon Pace 500",
        price: 85,
        accessories: ["Flat Repair Kit", "Charger"],
        description: "The Pace 500 e-bike provides the perfect balance of comfort and power. With an upright cruiser frame and cushy saddle, you'll enjoy excellent riding posture. The large battery offers up to a 60-mile range, and the powerful motor gets you where you're going quickly. Five levels of pedal assist plus a throttle function let you decide how much energy to expend.",
        image: "placeholder-ebike2.jpg"
    },
    {
        id: 6,
        name: "Kids Bike",
        price: 30,
        accessories: ["Helmet", "Flat Repair Kit"],
        description: "Sized just right for young riders, our kids bikes come with safety features and optional training wheels.",
        image: "placeholder-kids.jpg"
    }
];

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Handle booking confirmation
function confirmBooking(formData) {
    const selectedBike = RRRental.getSelectedBike();
    const selectedDate = RRRental.getSelectedDate();
    
    // In a real app, this would send data to a server
    // For this prototype, we'll just save it and show a confirmation
    
    RRRental.setFormData(formData);
    
    // Show confirmation message
    const confirmationHTML = `
        <h2>Thank you! Your reservation for ${selectedDate} is confirmed.</h2>
        <div class="confirmation-details">
            <p><strong>Bike:</strong> ${selectedBike.name}</p>
            <p><strong>Date:</strong> ${selectedDate}</p>
            <p><strong>Price:</strong> $${selectedBike.price}</p>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p>We'll see you at 6177 E Broadway Blvd.</p>
        </div>
        <div class="booking-action">
            <a href="index.html" class="button primary-button" id="go-home">Return to Home</a>
        </div>
    `;
    
    // Create and display modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'confirmation-modal';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal__content">
                ${confirmationHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    openModal('confirmation-modal');
    
    // Add event listener to the Return to Home button
    document.getElementById('go-home').addEventListener('click', function() {
        RRRental.clearData(); // Clear data when returning home
        closeModal('confirmation-modal');
        window.location.href = 'index.html';
    });
}

// Initialize placeholder images on page load
function initializePlaceholderImages() {
    const placeholders = document.querySelectorAll('img[src="placeholder-image.jpg"]');
    
    placeholders.forEach(img => {
        // Set a solid color background based on the alt text
        const altText = img.getAttribute('alt') || '';
        let bgColor;
        
        if (altText.includes('Mountain')) bgColor = '#4CAF50';
        else if (altText.includes('Road')) bgColor = '#2196F3';
        else if (altText.includes('Cruiser')) bgColor = '#FF9800';
        else if (altText.includes('Hybrid')) bgColor = '#9C27B0';
        else if (altText.includes('E-Bike')) bgColor = '#F44336';
        else if (altText.includes('Kids')) bgColor = '#FFEB3B';
        else bgColor = '#607D8B';
        
        // Create canvas for the placeholder
        const canvas = document.createElement('canvas');
        canvas.width = img.width || 360;
        canvas.height = img.height || 180;
        
        const ctx = canvas.getContext('2d');
        
        // Fill background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add bike icon outline
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 3;
        
        // Simple bike icon (just a rough sketch)
        ctx.beginPath();
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 5;
        
        // Draw wheels
        ctx.beginPath();
        ctx.arc(centerX - radius, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX + radius, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Draw frame
        ctx.beginPath();
        ctx.moveTo(centerX - radius, centerY);
        ctx.lineTo(centerX, centerY - radius);
        ctx.lineTo(centerX + radius, centerY);
        ctx.lineTo(centerX - radius, centerY);
        ctx.stroke();
        
        // Add bike type text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(altText, centerX, centerY + radius + 30);
        
        // Replace the img src with the canvas data URL
        img.src = canvas.toDataURL();
    });
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    console.log('RoadRunner Rentals JS initialized');
    
    // Generate placeholder images
    initializePlaceholderImages();
    
    // Detect which page we're on and initialize accordingly
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
        // Home page initialization
        console.log('Home page loaded');
    } 
    else if (currentPath.includes('rentals-list.html')) {
        // Rentals list page
        console.log('Rentals list page loaded');
        
        // Update date in filter bar
        const datePicker = document.querySelector('.date-picker span');
        if (datePicker) {
            datePicker.textContent = RRRental.getSelectedDate();
        }
        
        // Add click event for date picker
        const datePickerEl = document.querySelector('.date-picker');
        if (datePickerEl) {
            datePickerEl.addEventListener('click', function() {
                alert('In a full implementation, this would open a date picker component.');
            });
        }
    }
    else if (currentPath.includes('bike-detail.html')) {
        // Bike detail page
        console.log('Bike detail page loaded');
        
        // Load bike details from URL param or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const bikeId = urlParams.get('id') || 1; // Default to first bike
        
        // Find bike in data
        const bike = bikeData.find(b => b.id == bikeId) || bikeData[0];
        RRRental.setSelectedBike(bike);
        
        // Update page with bike details
        const bikeTitle = document.querySelector('.bike-detail__title');
        const bikePrice = document.querySelector('.bike-detail__price');
        const bikeImage = document.querySelector('.bike-detail__image');
        const bikeDescription = document.querySelector('.bike-detail__description p');
        const sizeNote = document.querySelector('.bike-detail__sizing .size-note');
        
        if (bikeTitle) bikeTitle.textContent = bike.name;
        if (bikePrice) bikePrice.textContent = `$${bike.price} / day`;
        if (bikeImage) {
            bikeImage.alt = bike.name;
            // The placeholder will be handled by initializePlaceholderImages
        }
        if (bikeDescription) {
            bikeDescription.textContent = bike.description;
        }
        
        // Show/hide size note depending on if it's an e-bike
        if (sizeNote) {
            if (bike.name.includes('E-Bike') || bike.name.includes('Pace')) {
                sizeNote.style.display = 'block';
            } else {
                sizeNote.style.display = 'none';
            }
        }
    }
    else if (currentPath.includes('booking-step1.html')) {
        // Booking step 1 page (date selection)
        console.log('Booking step 1 page loaded');
        
        const days = document.querySelectorAll('.calendar-day:not(.disabled)');
        const nextButton = document.getElementById('next-button');
        
        // Set initial state based on pre-selected date
        let dateSelected = true;
        
        // Handle date selection
        days.forEach(day => {
            day.addEventListener('click', function() {
                // Remove selected class from all days
                days.forEach(d => d.classList.remove('selected'));
                
                // Add selected class to clicked day
                this.classList.add('selected');
                
                // Update selected date
                const month = document.querySelector('.calendar-month').textContent.split(' ')[0];
                const date = `${month} ${this.textContent}, 2025`;
                RRRental.setSelectedDate(date);
                
                // Enable next button if it was disabled
                if (nextButton) {
                    nextButton.classList.remove('disabled');
                }
                dateSelected = true;
            });
        });
    }
    else if (currentPath.includes('booking-step2.html')) {
        // Booking step 2 page (user info)
        console.log('Booking step 2 page loaded');
        
        const form = document.getElementById('rider-info-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value
                };
                
                // Validate form
                if (!formData.name || !formData.email || !formData.phone) {
                    alert('Please fill in all fields');
                    return;
                }
                
                // Process booking
                confirmBooking(formData);
            });
        }
    }
    else if (currentPath.includes('services.html')) {
        // Services page
        console.log('Services page loaded');
        // No special initialization needed for services page
    }
}); 