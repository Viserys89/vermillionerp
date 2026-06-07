<?php

namespace App\Http\Controllers;

use App\Models\FacilityRequest;
use Illuminate\Http\Request;

class FacilityRequestController extends Controller
{
    public function index()
    {
        return response()->json(
            FacilityRequest::with([
                'facility',
                'user'
            ])->get()
        );
    }

    public function show($id)
    {
        return response()->json(
            FacilityRequest::with([
                'facility',
                'user'
            ])->findOrFail($id)
        );
    }

    public function store(Request $request)
    {
        $requestData = FacilityRequest::create(
            $request->all()
        );

        return response()->json(
            $requestData,
            201
        );
    }

    public function update(Request $request, $id)
    {
        $facilityRequest = FacilityRequest::findOrFail($id);

        $facilityRequest->update(
            $request->all()
        );

        return response()->json(
            $facilityRequest
        );
    }

    public function destroy($id)
    {
        FacilityRequest::destroy($id);

        return response()->json([
            'message' => 'Request deleted'
        ]);
    }

    public function approve($id)
    {
        $requestData = FacilityRequest::findOrFail($id);

        $requestData->status = 'Approved';
        $requestData->save();

        return response()->json($requestData);
    }

    public function reject($id)
    {
        $requestData = FacilityRequest::findOrFail($id);

        $requestData->status = 'Rejected';
        $requestData->save();

        return response()->json($requestData);
    }
}