export const prospectEmailTemplate = (schoolDetails, username) => `
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
    <h2>Subject: Prospect</h2>
    <p>The following User ${username} has added a New School Prospect. Here are the details:</p>
    <ul>
        <li><strong>Name of School:</strong> ${schoolDetails.name}</li>
        <li><strong>Address:</strong> ${schoolDetails.address}</li>
        <li><strong>District:</strong> ${schoolDetails.district}</li>
        <li><strong>State:</strong> ${schoolDetails.state}</li>
        <li><strong>UDISE Number:</strong> ${schoolDetails.UDSE_Number}</li>
        <li><strong>Phone Number:</strong> ${schoolDetails.phone}</li>
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;