export const productDemoEmailTemplate = (details, schoolName, username) => `
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
    <h2>Subject: Product Demo Sheduled </h2>
    <p>${username} has scheduled product demo with ${schoolName}. Here are the following details:</p>
    <ul>
        <li><strong>Support required from expert team:</strong> ${details.support_required}</li>
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;