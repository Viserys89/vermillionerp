<?php

namespace App\Http\Controllers;

use App\Models\Facility;
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

    public function store(Request $request)
    {
        $facility =
            Facility::findOrFail(
                $request->facility_id
            );

        // cek stok tersedia
        if ($facility->available_quantity <= 0) {

            return response()->json([
                'message' => 'Fasilitas habis'
            ], 400);

        }

        // kurangi stok
        $facility->available_quantity--;

        $facility->save();

        // simpan request
        $requestData =
            FacilityRequest::create([
                'user_id' => $request->user_id,
                'facility_id' => $request->facility_id,
                'request_date' => $request->request_date,
                'start_datetime' => $request->start_datetime,
                'end_datetime' => $request->end_datetime,
                'purpose' => $request->purpose,
                'status' => 'Pending'
            ]);

        return response()->json(
            $requestData,
            201
        );
    }

    public function update(Request $request, $id)
    {
        $facilityRequest =
            FacilityRequest::findOrFail($id);

        $facilityRequest->update(
            $request->all()
        );

        return response()->json(
            $facilityRequest
        );
    }

   public function destroy($id)
{
    $requestData =
        FacilityRequest::findOrFail($id);

    $facility =
        Facility::findOrFail(
            $requestData->facility_id
        );

    $facility->available_quantity++;

    $facility->save();

    $requestData->delete();

    return response()->json([
        'message' => 'Request deleted'
    ]);
}

    public function approve($id)
    {
        $requestData =
            FacilityRequest::findOrFail($id);

        $requestData->status =
            'Approved';

        $requestData->save();

        return response()->json(
            $requestData
        );
    }

    public function reject($id)
    {
        $requestData =
            FacilityRequest::findOrFail($id);

        $requestData->status =
            'Rejected';

        $requestData->save();

        return response()->json(
            $requestData
        );
    }

    public function getByUser($id)
{
    return response()->json(
        FacilityRequest::with([
            'facility',
            'user'
        ])
        ->where('user_id', $id)
        ->get()
    );
}
}