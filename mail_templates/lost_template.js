export const lostEmailTemplate = (details, schoolName, username) => `
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
    <h2>Subject: Lost</h2>
    <p>${username} has Lost ${schoolName}. Here are the following details:</p>
    <ul>
        <li><strong>Lost Remarks:</strong> ${details.remarks}</li>
        <li><strong>Prospect for Next Year :</strong> ${details.next_year_prospect}</li>
    </ul>
    <p>Best Regards,</p>
    <p>${username}</p>
</body>
</html>
`;
export const sampleEmailTemplate = () => `
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
    <h2>Subject: Testing</h2>
    <p>Sample testing mail success</p>
   
</body>
</html>
`;
