<?php

namespace App\Http\Controllers;

use App\Models\FacilityRequest;
use Illuminate\Http\Request;

class FacilityRequestController extends Controller
{
    public function index()
    {
        return response()->json(
            FacilityRequest::with('user')
                ->latest('id')
                ->get()
        );
    }

    public function store(Request $request)
    {
        $requestData =
            FacilityRequest::create([
                'user_id'      => $request->user_id,
                'nama_barang'  => $request->nama_barang,
                'link_toko'    => $request->link_toko,
                'deskripsi'    => $request->deskripsi,
                'status'       => 'Pending'
            ]);

        return response()->json(
            $requestData,
            201
        );
    }

    public function show($id)
    {
        return response()->json(
            FacilityRequest::with('user')
                ->findOrFail($id)
        );
    }

    public function update(
        Request $request,
        $id
    ) {
        $requestData =
            FacilityRequest::findOrFail($id);

        $requestData->update(
            $request->all()
        );

        return response()->json(
            $requestData
        );
    }

    public function destroy($id)
    {
        $requestData =
            FacilityRequest::findOrFail($id);

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
            FacilityRequest::with('user')
                ->where(
                    'user_id',
                    $id
                )
                ->latest('id')
                ->get()
        );
    }
}