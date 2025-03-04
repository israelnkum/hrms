<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePublicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'sometimes|string|max:255',
            'authors' => 'sometimes|array',
            'authors.*' => 'string',
            'publication_date' => 'nullable|date',
            'publisher' => 'nullable|string|max:255',
            'edition' => 'nullable|string|max:255',
            'volume_and_issue_number' => 'nullable|string|max:255',
            'isbn_issn' => 'nullable|string|max:255',
            'doi' => 'nullable|string|max:255',
            'employee_id' => 'sometimes|exists:employees,id'
        ];
    }
}
