export const hotLeadEmailTemplate = (details, schoolName, username) => `
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
    <h2>Subject: Hot Lead</h2>
    <p>${username} has obtained a Hot Lead with ${schoolName}. Here are the following details:</p>
    <p><strong>Product:</strong> ${details.product}<strong></p>
    <h3>Classes</h3>
    <ul>
        ${details.students_count.map(participant => `
        <li>${participant.class}</li>
        `).join('')}
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;
