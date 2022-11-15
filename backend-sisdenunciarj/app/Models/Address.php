<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

       
   protected $fillable = [
    'street',
    'city',
    'state',
    'number',
    'zip_code',   
    'maps'       
   ];

   protected $casts = [
    'maps' => 'array',
];


public function post()
{
  return $this->belongsTo(Post::class, 'post_id', 'id');
}


}
