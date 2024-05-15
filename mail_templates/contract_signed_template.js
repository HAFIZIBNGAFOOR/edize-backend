export const contractSignedEmailTemplate = (schoolName, username) => `
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
    <p>${username} Completed Contract Signed with ${schoolName}</p>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;
