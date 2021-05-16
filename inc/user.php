<?php

//Database Connection 
$conn = new mysqli('localhost','root','','vuejscuard');

//Data Recive with script page
$data = json_decode(file_get_contents('php://input'));

//isset action
$action = 'read';
if( isset($_GET['action']) ){
   $action = $_GET['action'];
}

//add new user for database connection
if( $action == 'add' ){
   
   //get file value
   $file_name = $_FILES["photo"]["name"];
   $file_name_tmp = $_FILES["photo"]["tmp_name"];

   //unique file name
   $unique_file_name = md5(time().rand()).'.'.$file_name;

   //file upload for photo folder
   move_uploaded_file($file_name_tmp, '../media/users/'. $unique_file_name);
   
   //value recive
   $name = $_POST['name'];
   $email = $_POST['email'];
   $cell = $_POST['cell'];
   $location = $_POST['location'];
   $gander = $_POST['gander'];

   //Data Send With Database
   $data = $conn -> query("INSERT INTO users (name, email, cell, location, gander, photo) VALUE ('$name','$email','$cell','$location','$gander', '$unique_file_name')");

}

//get all data
if(  $action == 'read'){

   //get data with datbase
   $data = $conn -> query("SELECT * FROM users ORDER By id DESC");
   
   //array object convert
   $all_user = [];
   while( $users = $data -> fetch_assoc() ){
      array_push($all_user, $users);
   }

   //json encode form array data
   echo json_encode($all_user);

}

//show all data
if(  $action == 'show'){

   $id = $_GET['id'];

   $data = $conn -> query("SELECT * FROM users WHERE id='$id'");
   $single_user_data = $data -> fetch_assoc();
   echo json_encode($single_user_data);

}

//delete all data
if(  $action == 'delete'){

   $id = $_GET['id'];
   $data = $conn -> query("DELETE FROM users WHERE id='$id'");

}

//edit all data
if(  $action == 'edit'){

   $id = $_GET['id'];

   $data = $conn -> query("SELECT * FROM users WHERE id='$id'");
   $edit_user_data = $data -> fetch_assoc();
   echo json_encode($edit_user_data);
}

//update all data
if(  $action == 'update'){

   //get file
   // $file_name = $_FILES['newPhoto']['name'];
   // $file_tmp_name = $_FILES['newPhoto']['tmp_name'];

   //file unique 
   // $unique_file_name = md5(time().rand()) .'.'. $file_name;
   
   //get all date form inputfileds
   $id = $_GET['id'];
   $name = $_POST['name'];
   $email = $_POST['email'];
   $cell = $_POST['cell'];
   $location = $_POST['location'];
   $gander = $_POST['gander'];

   $data = $conn -> query("UPDATE users SET name='$name', email='$email', cell='$cell', location='$location', gander='$gander' WHERE id='$id'");
}

/** 
 * searchUser user form Database
 */
if( $action == 'searchUser' ){

   //get value form Script Page
   $search_text =  $_GET['search'];

   $data = $conn -> query("SELECT * FROM users WHERE name LIKE '%$search_text%'");
   $all_user = [];
   while( $single_user = $data -> fetch_assoc() ){
      array_push($all_user, $single_user);
   }

   echojson_encode($all_user);
}

/** 
 * searchUserGander user form Database for Male
 */
if( $action == 'SearchMale' ){

   //get value
   $gander = $_GET['searchValue'];

   $data = $conn -> query("SELECT * FROM users WHERE gander='$gander'");
   $all_user = [];
   while( $gander_data = $data -> fetch_assoc() ){
      array_push($all_user, $gander_data);
   }
   echo json_encode($all_user);
}

/** 
 * SearchFemale user form Database for Male
 */
if( $action == 'SearchFemale' ){

   //get value
   $gander = $_GET['searchValue'];

   $data = $conn -> query("SELECT * FROM users WHERE gander='$gander'");
   $all_user = [];
   while( $gander_data = $data -> fetch_assoc() ){
      array_push($all_user, $gander_data);
   }
   echo json_encode($all_user);
}

/** 
 * locationSearch user form Database for Male
 */
if( $action == 'locationSearch' ){

   //get value
   $location = $_GET['location'];
   
   $data = $conn -> query("SELECT * FROM users WHERE location='$location'");
   $all_user = [];
   while( $gander_data = $data -> fetch_assoc() ){
      array_push($all_user, $gander_data);
   }
   echo json_encode($all_user);
}