export const parentOrientationEmailTemplate = (details, schoolName, username) => `
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
    <h2>Subject: Parent Orientation</h2>
    <p>${username} Completed Parent Orientation with ${schoolName}. Here are the following details:</p>
    <ul>
        <li><strong>Parent Orientation Done Date:</strong> ${details.Parent_Orientation_Done_Date}</li>
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;
