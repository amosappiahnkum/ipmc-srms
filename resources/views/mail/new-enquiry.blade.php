<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        html, body {
            font-family: Arial, sans-serif;
        }

        .container {
            width: 100%;
            background: #efefef;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 20px;
            padding-bottom: 20px;
        }

        .mail-body {
            width: 50%;
            padding: 20px;
            border-radius: 5px;
            background: white;
            margin: 10px auto;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="mail-body">
        <div style="border-bottom: solid rgb(206,206,206) 1px; padding-bottom: 10px;">
            <img height="auto" width="100"
                 src="https://drive.google.com/uc?export=view&id=18japcGqsITAuumjdB9ijbzfPKzFw62WN" alt="LOGO">
            <p style="margin: 0">TAKORADI</p>
        </div>
        <div>
            <p>Hi,</p>
            <p>A new enquiry has been submitted and it's pending your review.</p>
            <br>
            <a href="{{$url ?? ''}}" target="_blank" rel="noopener noreferrer"
               style="border-radius: 5px; padding: 10px; background: #e50000; color: white; text-decoration: none">
                Review Now
            </a>
            <br>
            <br>
            <br>
            Thanks,<br>
            {{ config('app.name') }}
        </div>
    </div>
</div>
</body>
</html>
