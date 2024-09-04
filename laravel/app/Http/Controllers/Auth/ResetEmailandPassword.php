<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ResetEmailandPassword extends Controller
{
    /**
 * Update the authenticated user's password.
 */
    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = Auth::user();

        if (!password_verify($request->input('current_password'), $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect',
            ], 401);
        }

        $user = Auth::user(); // Authenticated user
        if ($user instanceof \App\Models\User) {
            $user->update([
                'password' => bcrypt($request->input('new_password')),
            ]);
    }


    return response()->json([
        'success' => true,
        'message' => 'Password updated successfully',
    ], 200);
}

/**
 * Update the authenticated user's email.
 */
    public function updateEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:8',
            'new_email' => 'required|string|email|max:255|unique:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = Auth::user();

        if (!password_verify($request->input('password'), $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Password is incorrect',
            ], 401);
        }

        $user = Auth::user(); // Authenticated user
        if ($user instanceof \App\Models\User) {
            $user->update([
                'email' => bcrypt($request->input('new_email')),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Email updated successfully',
        ], 200);
}


}
