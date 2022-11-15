<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
            'title' => 'required|max:255',
            'content' => 'required',
            'category' => 'required|exists:categories,id|max:255',
        
            'street' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:255',
            'zip_code' => 'required|max:255',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Título é obrigatório',
            'title.max' => 'Você excedeu o número máximo de caracteres deste campo', 
                    
            'content.required' => 'Conteúdo é obrigatório',           
           
            'category.required' => 'Categoria é obrigatória',
            'category.max' => 'Você excedeu o número máximo de caracteres deste campo', 
            'category.exists' => 'Categoria  inválida',


            'street.required' => 'Campo Rua é obrigatório',
            'street.max' => 'Você excedeu o número máximo de caracteres deste campo', 
           
            'city.required' => 'Campo Cidade é obrigatório',
            'city.max' => 'Você excedeu o número máximo de caracteres deste campo', 
           
            'state.required' => 'Campo Estado é obrigatório',
            'state.max' => 'Você excedeu o número máximo de caracteres deste campo', 
           
            'zip_code.required' => 'Campo Cep é obrigatório',
            'zip_code.max' => 'Você excedeu o número máximo de caracteres deste campo', 
           
       
        ];
    }

}
