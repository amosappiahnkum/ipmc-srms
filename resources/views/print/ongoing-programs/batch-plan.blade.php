@extends('print-layout.print')
<style>
    table {
        font-family: 'Arial', sans-serif;
        width: 100%;
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
        padding: 5px;
        font-size: 12px;
        font-weight: lighter;
        margin: 0;
        border: solid #bbbbbb 1px;
    }

    table > tbody > tr:nth-of-type(odd) > * {
        background: rgba(26, 26, 26, 0.04);
        color: #000000;
    }

    p {
        line-height: 5px;
    }
    @page {
        margin: 15px !important;
    }
    div {
        break-inside: avoid;
        break-after: auto;
    }

    table, th {
        break-inside: avoid;
    }
</style>
@section('print-content')
    @extends('print-layout.print-logo') <br>
    <table>
        <tbody>
        <tr style="text-transform: uppercase;">
            <td colspan="4" style="border-right: none">
                <div>
                    <p><b>Course Name:</b> {{$data['batch']->program->allPrograms->name}}</p>
                    <p><b>Course Duration:</b> {{$data['totalDuration']}} Weeks</p>
                    <p><b>Instructor Name:</b> {{$data['batch']->staff?->name}}</p>
                </div>
            </td>
            <td colspan="2" style="border-left: none">
                <div style="text-align: right">
                    <p><b>Lab:</b>{{$data['batch']->room}} <b>Time:</b> {{$data['batch']->batch_time}} </p>
                    <p><b>Batch Start Date:</b> {{$data['batch']->start_date}}</p>
                    <p><b>Proposed End Date:</b> {{$data['batch']->end_date}}</p>
                </div>
            </td>
        </tr>
        <tr>
            <td style="width: 20px !important;"><b>S.N</b></td>
            <td><b>Module Name</b></td>
            <td><b>Duration</b></td>
            <td><b>Proposed<br>Start Date</b></td>
            <td><b>Proposed<br>End Date</b></td>
            <td><b>Proposed<br>Electronic Exam/<br>Project Viva Date</b></td>
        </tr>
        @php($i = 1)
        @php($startDate = '')
        @foreach($data['modules'] as $key => $module)
            <tr>
                <td style="width: 20px !important;">{{$i}}</td>
                <td>{{ucwords(strtolower($module->module->name))}}</td>
                <td>{{$module->duration->duration}} Week{{$module->duration->duration > 1 ? 's' : ''}}</td>
                @php($endDate = \App\Helpers\Helper::getDate($key == 0 ? $data['batch']->start_date : $startDate, $module->duration->duration, $key))
                <td>
                   {{$key == 0 ? $data['batch']->start_date : \Carbon\Carbon::parse($startDate)->addWeekday()->format('d-m-Y')}}
                </td>
                <td>
                    {{$endDate['end']}}
                </td>
                <td>
                    {{$endDate['exam']}}
                </td>
            </tr>
            @php($startDate = $endDate['exam'])
            @php($i++)
        @endforeach
        <tr>
            <td></td>
            <td><b>Total Duration</b></td>
            <td colspan="4"><b>{{$data['totalDuration']}} Weeks</b></td>
        </tr>
        <tr>
            <td colspan="6">
                <p>Electronic, Practical & Viva exam: On completion of each module</p>
                <p>Please notify the Administrator immediately in case any of the modules is not completed with in the stipulated time.</p>
            </td>
        </tr>
        </tbody>
    </table>
@endsection
