<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class NewEnquiryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name'            => ['required', 'string', 'max:100'],
            'last_name'             => ['required', 'string', 'max:100'],
            'other_name'            => ['nullable', 'string', 'max:100'],
            'phone_number'          => ['required', 'string', 'max:20'],
            'alt_phone_number'      => ['nullable', 'string', 'max:20'],
            'email'                 => ['nullable', 'email', 'max:150'],
            'programs'              => ['required', 'array', 'min:1'],
            'programs.*'            => ['integer', 'exists:programs,id'],
            'other_program'         => ['nullable', 'string', 'max:255'],

            'preferred_timings'     => ['nullable', 'array'],
            'preferred_timings.*'   => ['string', 'max:100'],

            'other_preferred_timing'=> ['nullable', 'string', 'max:100'],

            'heard.*'                 => ['string', 'max:100'],
            'other_heard'           => ['nullable', 'string', 'max:100'],

            'branch_id'             => ['required', 'integer', 'exists:branches,id'],

            'school_name'           => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'programs.required' => 'Please select at least one program.',
            'programs.*.exists' => 'One of the selected programs is invalid.',
            'branch_id.exists'  => 'Selected branch does not exist.',
        ];
    }
}
