<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class ResetEmailandPassword extends Controller
{
    /**
 * Update the authenticated user's password.
 */
public function updateEmail(Request $request)
{
    $request->validate([
        'current_email' => ['required', 'email'],
        'email' => ['required', 'email', 'unique:users,email'],
    ]);

    $user = $request->user();

    // Check if the current email matches the user's current email in the database
    if ($request->current_email !== $user->email) {
        return response()->json([
            'message' => 'Current email does not match.',
        ], 422);
    }

    // If the current email matches, update to the new email
    $user->update([
        'email' => $request->email,
    ]);

    return response()->json([
        'message' => 'Email updated successfully!',
        'user' => $user,
    ], 200);
}



/**
 * Update the authenticated user's email.
 */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required'],
            'new_password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = $request->user();

        // Check if the current password matches
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect!',
            ], 400);
        }

        // Update the password
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return response()->json([
            'message' => 'Password updated successfully!',
        ], 200);
    }

    public function updateName(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $user = $request->user();

        $user->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Name updated successfully!',
            'user' => $user,
        ], 200);
    }
}


