<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'title' => 'sometimes|required|string|max:255',
            'year' => 'sometimes|required|integer|min:1900|max:' . (date('Y') + 1),
            'location' => 'sometimes|required|string|max:255',
            'significance' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'employee_id' => 'sometimes|required|exists:employees,id',
        ];
    }
}
