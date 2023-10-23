@extends('print-layout.print')
<style>
    table {
        font-family: 'Arial', sans-serif;
        width: fit-content;
        margin-bottom: 1rem;
        color: #000;
        vertical-align: top;
        border-collapse: collapse;
        margin-left: auto;
        margin-right: auto;
    }

    th {
        border: solid 1px #bbbbbb;
        text-transform: capitalize;
        color: #1c1c1c;
        font-size: 12px;
        font-weight: bold;
        padding: 10px;
        margin: 0;
    }

    td {
        padding: 10px;
        font-size: 10px;
        font-weight: lighter;
        margin: 0;
        border: solid #bbbbbb 1px;
    }

    table > tbody > tr:nth-of-type(odd) > * {
        background: rgba(26, 26, 26, 0.04);
        color: #000000;
    }

    @page {
        margin: 15px !important;
    }
</style>
@section('print-content')
    {{--        @extends('print-layout.print-logo')--}}
    <div style="text-align: center; text-transform: uppercase">
        <p>IPMC Tarkoadi</p>
    </div>
    <div style="text-align: center; margin-bottom: 5px;">
        <b>Start Date:</b> {{ $data['batch']->start_date }} |
        <b>Batch Time:</b> {{ \Carbon\Carbon::parse($data['batch']->batch_time)->format('h:i a') }} |
        <b>Lecturer:</b> {{ $data['batch']->staff?->name }}
    </div>
    <div style="text-align: center; text-transform: uppercase">
        <p>{{$data['batch']->program->allPrograms->name}} | {{$data['month']->format('F, Y')}}</p>
    </div>
    <table>
        <thead>
        <tr>
            <th>#</th>
            <th>Student&nbsp;Name</th>
            <th>Mobile&nbsp;Number</th>
            @foreach($data['dates'] as $date)
                <th>{{$date}}</th>
            @endforeach
        </tr>
        </thead>
        <tbody>
        @php($i= 1)
        @foreach($data['batch']->enrollments as $enrollment)
            <tr>
                <td>{{$i}}</td>
                <td>{{$enrollment->student->name}}</td>
                <td>{{$enrollment->student->phone_number}}</td>
                @foreach($data['dates'] as $date)
                    <td>&nbsp;</td>
                @endforeach
            </tr>
            @php($i++)
        @endforeach
        </tbody>
    </table>
@endsection
