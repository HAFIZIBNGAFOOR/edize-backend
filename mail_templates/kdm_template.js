export const kdmMeetingEmailTemplate = (kdmDetails, schoolName, username) => `
<html>
<head>
    <style>
        body {
            display: flex;
            flex-direction: column;
            gap: 20px;
            font-family: Arial, sans-serif;
        }
        h2 {
            margin: 0;
        }
        p {
            margin: 0;
        }
    </style>
</head>
<body>
    <h2>Subject: KDM Meeting</h2>
    <p>${username} has a KDM Meeting with ${schoolName}. Here are the following details:</p>
    <ul>
        <li><strong>KDM Meeting Done Date:</strong> ${kdmDetails.KDM_Meeting_Done_Date}</li>
        <li><strong>Demo Schedule:</strong> ${kdmDetails.demoSchedule ? 'Yes' : 'No'}</li>
        ${kdmDetails.demoSchedule ? `<li><strong>Demo Schedule Date:</strong> ${kdmDetails.demoScheduleDate}</li>` : ''}
        <ul>
        ${kdmDetails.facilities_available.map(participant => `
            <li>${participant}</li>
        `).join('')}
    </ul>
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;
