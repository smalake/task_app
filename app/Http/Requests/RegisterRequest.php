<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            'username' => ['required', 'min:8', Rule::unique('users')->ignore($this->user->id ?? null)],
            'email' => ['required', 'email', Rule::unique('users')->ignore($this->user->id ?? null)],
            'password' => ['required', 'min:8']
        ];
    }

    public function messages()
    {
        return [
            'username.required' => 'ユーザ名は8文字以上である必要があります',
            'username.min' => 'ユーザ名は8文字以上である必要があります',
            'username.unique' => 'このユーザ名はすでに使われています',
            'email.required' => 'メールアドレスは入力する必要があります',
            'email.email' => 'メールアドレスが不正です',
            'email.unique' => 'このメールアドレスはすでに使われています',
            'password.min' => 'パスワードは8文字以上である必要があります',
            'password.min' => 'パスワードは8文字以上である必要があります',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $res = response()->json(
            [
                'errors' => $validator->errors(),
            ],
            400
        );
        throw new HttpResponseException($res);
    }
}