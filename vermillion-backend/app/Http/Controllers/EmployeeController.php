<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return response()->json(User::orderBy('id', 'desc')->get());
    }

   public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6', // Tambahkan validasi password wajib
            'role' => 'required|string',
        ], [
            'email.unique' => 'Email ini sudah digunakan oleh karyawan lain.',
            'password.min' => 'Password minimal harus 6 karakter.'
        ]);

        $data = $request->all();
        $data['password'] = bcrypt($request->password); 

        $employee = User::create($data);
        return response()->json($employee, 201);
    }

    public function update(Request $request, $id)
    {
        $employee = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'role' => 'required|string',
        ]);

        $data = $request->all();

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        } else {
            unset($data['password']);
        }

        $employee->update($data);
        return response()->json($employee);
    }

    public function destroy($id)
    {
        $employee = User::findOrFail($id);
        $employee->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}