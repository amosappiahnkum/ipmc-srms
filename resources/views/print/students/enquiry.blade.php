@extends('print-layout.print')
@section('print-content')
    <style>
        .print-container {
            display: flex !important;
            flex-wrap: wrap;
            gap: 20px !important;
            margin: 0;
        }

        .title {
            background: #d3d3d3;
            padding: 10px;
            border-radius: 5px;
            color: black;
            font-weight: 600;
            font-family: Arial, serif;
            margin: 0;
        }
        td {
            vertical-align: top;
            font-family: Arial, serif;
        }
    </style>
    @extends('print-layout.print-logo')
    <h1>ENQUIRY FORM</h1>
    <table>
        <tbody>
        <tr>
            <td colspan="3">
                <div>
                    <p class="title">Personal Information</p>
                    <div style="padding: 0 10px 0">
                        <p>Name: {{ $data->student->name }}</p>
                        <p>House Number: {{ $data->student->house_number }}</p>
                        <p>P.O. Box: {{ $data->student->box_address }}</p>
                        <p>Address: {{ $data->student->address }}</p>
                        <p>Country: {{ $data->student->country }}</p>
                        <p>Nationality: {{ $data->student->nationality }}</p>
                        <p>Email: {{ $data->student->email }}</p>
                        <p>Mobile Number: {{ $data->student->phone_number }}</p>
                        <p>Alt Mobile Number: {{ $data->student->alt_phone_number }}</p>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div>
                    <p class="title">Sponsor Details</p>
                    <div>
                        <p>{{$data->student->sponsor->name}}</p>
                        <p>{{$data->student->sponsor->email}}</p>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <p class="title">Preferred Course Timings</p>
                    <ul>
                        @foreach($data->preferred_timings as $time)
                            <li>{{$time}}</li>
                        @endforeach
                    </ul>
                </div>
            </td>
            <td>
                <div>
                    <p class="title">How did you hear about IPMC?</p>
                    <ul>
                        @foreach($data->heard as $heard)
                            <li>{{$heard}}</li>
                        @endforeach
                    </ul>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <div>
                    <p class="title">Interested Programs</p>
                   <ul>
                       @foreach($data->enquiryPrograms() as $program)
                           <li>{{$program->name}}</li>
                       @endforeach
                   </ul>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
@endsection
