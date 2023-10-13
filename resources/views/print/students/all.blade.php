@extends('print-layout.table')
@section('headers')
    <th>Name</th>
    <th>Mobile</th>
    <th>Email</th>
    <th>Gender</th>
    <th>D.O.B</th>
@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $dat)
        <tr>
            <td>{{$i}}</td>
            <td>{{$dat->name}}</td>
            <td>
                {{$dat->phone_number}} <br>
                {{$dat->alt_phone_number}}
            </td>
            <td>{{$dat->email}}</td>
            <td>{{$dat->gender}}</td>
            <td>{{$dat->dob}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
