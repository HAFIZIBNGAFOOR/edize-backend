export const proposalSignedEmailTemplate = (details, schoolName, username) => `
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
    <h2>Subject: Proposal Signed</h2>
    <p>${username} Completed Proposal Signed with ${schoolName}. Here are the following details:</p>
    <ul>
        <li><strong>PO Scan Copy:</strong> ${details.PO_scan_copy}</li>
        <li><strong>Rate:</strong> ${details.Rate}</li>
        <li><strong>PO Signed by:</strong> ${details.PO_signedBy}</li>
        <li><strong>Parent Orientation Date:</strong> ${details.Parent_Orientation_Date}</li>
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;
