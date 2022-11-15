<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;

protected $fillable = [
    'photo'
];


    public function user()
{
    return $this->morphOne(User::class, 'userable');
}

public function posts()
{
  return $this->hasMany(Post::class,'customer_id', 'id');
}


}
