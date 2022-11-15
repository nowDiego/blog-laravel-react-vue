<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
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
            'name' => 'required|max:255',
            'email' => 'required|max:255',
            'password' => 'required|max:255',
        ];
    }

    
    public function messages()
{
    return [
        'name.required' => 'Usuário é obrigatório',
        'name.max' => 'Você excedeu o número máximo de caracteres deste campo', 

        'email.required' => 'E-mail é obrigatório',
        'email.max' => 'Você excedeu o número máximo de caracteres deste campo',
        'email.email'=>'E-mail inválido', 

        'password.required' => 'Password é obrigatório',
        'password.max' => 'Você excedeu o número máximo de caracteres deste campo', 
    ];
}
}
