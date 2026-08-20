<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'content', 'is_published', 'user_id', 'questions_count'];

    protected $casts = [
        'content' => 'array',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}