<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        //
    }

    public function search(Request $request)
    {
        $query = Location::query();

        if ($request->has('q')) {
            $locations = $query->select(['id', 'iata', 'city', 'country', 'name'])
                ->where(function ($query) use ($request) {
                    $query->where('iata', 'like', "{$request->q}%")
                        ->orWhere('city', 'like', "{$request->q}%")
                        ->orWhere('name', 'like', "%{$request->q}%");
                })
                ->orderByRaw('CASE 
                        WHEN iata = ? THEN 3
                        WHEN city LIKE ? THEN 2
                        WHEN name LIKE ? THEN 1
                        ELSE 0
                    END DESC', [
                    $request->q,
                    "{$request->q}%",
                    "%{$request->q}%",
                ])
                ->limit(10)
                ->get();

            return response()->json($locations);
        }

        return response()->json([]);
    }
}
