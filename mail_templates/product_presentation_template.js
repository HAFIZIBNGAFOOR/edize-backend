export const productPresentationEmailTemplate = (details, schoolName, username) => `
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
        ul {
            padding-left: 20px;
        }
    </style>
</head>
<body>
    <h2>Subject: Product Presentation Done</h2>
    <p>${username} has Done Product Presentation with ${schoolName}. Here are the following details:</p>
    <h3>Demo attended by :</h3.
    <ul>
     ${details.demo_attended_by.map(participant => `
    <li>${participant}</li>
    `).join('')}
    </ul>
    <p>Demo done date: ${details.demo_done_date}</p>
    <p>Further Requirment of acadmic detailed demo: ${details.further_requirement}</p>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;
