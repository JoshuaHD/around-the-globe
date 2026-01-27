<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $guarded = [];

    public function legs()
    {
        return $this->hasMany(TripLeg::class)->orderBy('start_date');
    }
}
