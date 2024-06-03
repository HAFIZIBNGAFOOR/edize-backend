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
        <li><strong>Price for Classed:</strong> ${details.Price_for_class}</li>
        <li><strong>Total Deal Value Year 1:</strong> ${details.total_deal.year1}</li>
        <li><strong>Total Deal Value Year 2:</strong> ${details.total_deal.year2}</li>
        <li><strong>Total Deal Value Year 3:</strong> ${details.total_deal.year3}</li>
    </ul>
    <h4>Students Count for each class</h4>
    <ul>
     ${details.students_count.map(participant => `
    <li>Class: ${participant.class}  Count: ${participant.count}</li>
    `).join('')}
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;
