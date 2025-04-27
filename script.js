// পিন কোড থেকে জায়গার তথ্য ফেচ করা
function fetchLocation() {
    const pinCode = document.getElementById('pinCode').value;
    if (pinCode.length === 6) { // ভারতীয় পিন কোড 6 ডিজিট
        fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
            .then(response => response.json())
            .then(data => {
                if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
                    const postOffice = data[0].PostOffice[0];
                    const place = `${postOffice.Name}, ${postOffice.District}, ${postOffice.State}`;
                    document.getElementById('place').value = place;
                } else {
                    alert('No location found for this pin code.');
                    document.getElementById('place').value = '';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error fetching location. Please try again.');
            });
    } else {
        document.getElementById('place').value = '';
    }
}

// জায়গা থেকে পিন কোড ফেচ করা
function fetchPinCode() {
    const place = document.getElementById('place').value.trim();
    if (place) {
        // পোস্ট অফিসের নাম ধরে সার্চ করা হবে
        const postOfficeName = place.split(',')[0]; // প্রথম অংশ (পোস্ট অফিসের নাম) নেওয়া
        fetch(`https://api.postalpincode.in/postoffice/${encodeURIComponent(postOfficeName)}`)
            .then(response => response.json())
            .then(data => {
                if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
                    const postOffice = data[0].PostOffice[0];
                    document.getElementById('pinCode').value = postOffice.Pincode;
                } else {
                    alert('No pin code found for this place.');
                    document.getElementById('pinCode').value = '';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error fetching pin code. Please try again.');
            });
    } else {
        document.getElementById('pinCode').value = '';
    }
}

// ফর্ম সাবমিট করা
function submitForm() {
    const pinCode = document.getElementById('pinCode').value;
    const place = document.getElementById('place').value;
    if (pinCode && place) {
        alert(`Logged in with Pin Code: ${pinCode} and Place: ${place}`);
    } else {
        alert('Please enter both Pin Code and Place.');
    }
}
