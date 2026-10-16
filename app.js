// Pure, Performance-Focused Client Logic for the Logistics Sales Pitch Engine
document.addEventListener('DOMContentLoaded', () => {
    
    // Core Configuration Dimensions
    const UNIT_WEIGHT_KG = 4.8; // Weight of a standard 10MPa maxi brick
    
    // UI Elements
    const qtyInput = document.getElementById('brick-qty');
    const massOutput = document.getElementById('mass-output');
    const truckOutput = document.getElementById('truck-output');
    const logisticsAdvice = document.getElementById('logistics-advice');
    const countdownTimer = document.getElementById('countdown-timer');

    // 1. Real-Time Tonnage Calculation Engine
    function calculateLogistics() {
        const qty = parseInt(qtyInput.value) || 0;
        
        // Compute structural mass
        const totalWeightKg = qty * UNIT_WEIGHT_KG;
        const tons = (totalWeightKg / 1000).toFixed(1);
        
        // Render raw data output
        massOutput.textContent = `${tons} Tons`;
        
        // Apply Fleet-Matching Rules & Psychological Feedback
        if (qty === 0) {
            truckOutput.textContent = "Enter Quantity";
            logisticsAdvice.textContent = "Please provide an order size to check truck assignments.";
            logisticsAdvice.style.color = "var(--text-secondary)";
            logisticsAdvice.style.backgroundColor = "transparent";
            logisticsAdvice.style.borderColor = "var(--border-color)";
        } else if (tons <= 1.3) {
            truckOutput.textContent = "Bakkie / Light Trailer";
            logisticsAdvice.textContent = "Ideal for small DIY drop-offs or quick yard collections.";
            setAlertState('green');
        } else if (tons <= 4.0) {
            truckOutput.textContent = "4-Ton Truck Required";
            logisticsAdvice.textContent = "Standard residential delivery scale. Fits tight gate entryways.";
            setAlertState('green');
        } else if (tons <= 8.0) {
            truckOutput.textContent = "8-Ton Drop-side Truck";
            logisticsAdvice.textContent = "Medium developer delivery size. Requires wide gate access.";
            setAlertState('green');
        } else {
            // High tonnage warning triggers code 10 requirement conversation
            truckOutput.textContent = "Code 10 / Mechanical Crane Truck";
            logisticsAdvice.textContent = "Heavy industrial load. Requires open terrain and crane offloading clearance.";
            setAlertState('orange');
        }
    }

    function setAlertState(type) {
        if(type === 'orange') {
            logisticsAdvice.style.color = 'var(--accent-orange)';
            logisticsAdvice.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
            logisticsAdvice.style.borderColor = 'rgba(249, 115, 22, 0.2)';
        } else {
            logisticsAdvice.style.color = 'var(--accent-green)';
            logisticsAdvice.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
            logisticsAdvice.style.borderColor = 'rgba(34, 197, 94, 0.2)';
        }
    }

    // Attach Event Listeners for real-time reactivity
    qtyInput.addEventListener('input', calculateLogistics);

    // 2. Production Urgency Engine (Simulated Curing Cycle)
    let totalSeconds = (4 * 24 * 60 * 60) + (12 * 60 * 60) + (45 * 60); // 4 days, 12h, 45m
    
    function updateCountdown() {
        if (totalSeconds <= 0) {
            countdownTimer.textContent = "Batch Clearing Now";
            return;
        }
        
        totalSeconds--;
        
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;
        
        // Pad zeros cleanly
        const dDisplay = String(days).padStart(2, '0');
        const hDisplay = String(hours).padStart(2, '0');
        const mDisplay = String(minutes).padStart(2, '0');
        const sDisplay = String(seconds).padStart(2, '0');
        
        countdownTimer.textContent = `${dDisplay}d ${hDisplay}h ${mDisplay}m ${sDisplay}s`;
    }

    // Initialize scripts
    calculateLogistics();
    setInterval(updateCountdown, 1000);
});