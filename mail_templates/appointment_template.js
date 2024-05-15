export const appointmentEmailTemplate = (kdmDetails, schoolName, username) => `
<html>
<head>
    <style>
        body {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
    </style>
</head>
<body>
    <h2>Subject: Appointment Fixed</h2>
    <p>${username} has an Appointment Fixed with ${schoolName}. Here are the details:</p>
    <ul>
        <li><strong>KDM Name:</strong> ${kdmDetails.name}</li>
        <li><strong>KDM Mobile Number:</strong> ${kdmDetails.KDM_Mobile_Number}</li>
        <li><strong>KDM Designation:</strong> ${kdmDetails.KDM_Designation}</li>
        <li><strong>Meeting Schedule Date & Time:</strong> ${kdmDetails.KDM_Meeting_time}</li>
        <li><strong>City of School:</strong> ${kdmDetails.city_of_school}</li>
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;