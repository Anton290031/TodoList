<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    protected $casts = ['deadline' => 'datetime'];

    protected $fillable = [
        'title',
        'description',
        'priority',
        'deadline',
        'is_complete',
        'project_id',
        'user_id',
    ];
}
