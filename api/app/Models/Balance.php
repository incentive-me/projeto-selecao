<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'initial_value',
        'remaining_value',
    ];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function getName()
    {
        return $this->attributes['name'];
    }

    public function setName($value)
    {
        $this->attributes['name'] = strtolower($value);
    }

    public function getDescription()
    {
        return $this->attributes['description'];
    }

    public function setDescription($value)
    {
        $this->attributes['description'] = strtolower($value);
    }

    public function getInitialValue()
    {
        return $this->attributes['initial_value'];
    }

    public function setInitialValue($value)
    {
        $this->attributes['initial_value'] = strtolower($value);
    }

    public function getRemainingValue()
    {
        return $this->attributes['remaining_value'];
    }

    public function setRemainingValue($value)
    {
        $this->attributes['remaining_value'] = strtolower($value);
    }
}
