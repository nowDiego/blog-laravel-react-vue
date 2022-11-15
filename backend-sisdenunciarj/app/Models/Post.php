<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

      protected $fillable = [
        'title',
        'content',
        'photo',
        'customer_id',
        'category_id',
        'type_post_id',
        'status_post_id',
       
    ];


    public function customer()
    {
      return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function category()
  {
    return $this->belongsTo(Category::class, 'category_id', 'id');
  }

    public function typePost()
  {
    return $this->belongsTo(TypePost::class, 'type_post_id', 'id');
  }

  public function statusPost()
  {
    return $this->belongsTo(StatusPost::class, 'status_post_id', 'id');
  }


  public function address()
  {
    return $this->hasOne(Address::class, 'post_id' ,'id');
  }



}
