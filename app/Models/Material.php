<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'display_name',
        'stored_name',
        'file_path',
        'file_size',
        'mime_type',
    ];
}