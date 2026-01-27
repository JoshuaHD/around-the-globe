<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TripLeg extends Model
{
    protected $guarded = [];

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function origin()
    {
        return $this->belongsTo(Location::class, 'origin_location_id');
    }

    public function destination()
    {
        return $this->belongsTo(Location::class, 'destination_location_id');
    }
}
