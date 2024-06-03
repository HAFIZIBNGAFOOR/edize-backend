export const contractSignedEmailTemplate = (schoolName,kdmDetails, username) => `
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
    <h2>Subject: Contract Signed</h2>
    <p>${username} Completed Contract Signed with ${schoolName}. Here are the following details:</p>
    <ul>
        <li><strong>On Boarding Meeting Date:</strong> ${kdmDetails.Boarding_meeting_date}</li>
        <li><strong>On Boarding Students Count:</strong> ${kdmDetails.Boarding_student_count}</li>
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;
