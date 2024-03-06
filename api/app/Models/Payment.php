<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'value',
        'balance_id'
    ];

    public function balance()
    {
        return $this->belongsTo(Balance::class);
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

    public function getValue()
    {
        return $this->attributes['value'];
    }

    public function setValue($value)
    {
        $this->attributes['value'] = number_format($value, 2);
    }
}
