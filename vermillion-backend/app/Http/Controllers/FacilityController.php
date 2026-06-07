<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;

class FacilityController extends Controller
{
    public function index()
    {
        return response()->json(
            Facility::all()
        );
    }

    public function show($id)
    {
        return response()->json(
            Facility::findOrFail($id)
        );
    }

    public function store(Request $request)
    {
        $facility = Facility::create($request->all());

        return response()->json($facility, 201);
    }

    public function update(Request $request, $id)
    {
        $facility = Facility::findOrFail($id);

        $facility->update($request->all());

        return response()->json($facility);
    }

    public function destroy($id)
    {
        Facility::destroy($id);

        return response()->json([
            'message' => 'Facility deleted'
        ]);
    }
}