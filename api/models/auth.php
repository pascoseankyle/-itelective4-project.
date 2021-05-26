<?php

class Auth {

private $conn;
private $sql;
private $data = array();
private $info = [];
private $status =array();
private $failed_stat = array(
	'remarks'=>'failed',
	'message'=>'Failed to retrieve the requested records'
);
private $success_stat = array(
	'remarks'=>'success',
	'message'=>'Successfully retrieved the requested records'
);
public function __construct($db){
	$this->conn = $db;
}
function encryptPassword($pword): ?string{
    $hashFormat ="$2y$10$";
    $saltLength =22;
    $salt = $this->generateSalt($saltLength);
    return crypt($pword, $hashFormat.$salt);
}
function generateSalt($len){
    $urs=md5(uniqid(mt_rand(), true));
    $b64string = base64_encode($urs);
    $mb64string = str_replace('+','.', $b64string);
    return substr($mb64string, 0, $len);
}
function registerUser($dt){
    $payload = $dt;
    $encryptedPassword = $this->encryptPassword($dt->user_password);
    $payload = array(
    'user_email'=>$dt->user_email,
    'pword'=>$this->encryptPassword($dt->user_password)
    );
    if($dt->user_type == '' ){ 
        $dt->user_type = '1'; 
    }
    $this->sql = "INSERT INTO 
    `tbl_users`(`user_fullname`, `user_password`, `user_location`, `user_email`, `user_mobile`, `user_type`)
    VALUES ('$dt->user_fullname','$encryptedPassword','$dt->user_location','$dt->user_email','$dt->user_mobile', '$dt->user_type')";
    $this->conn->query($this->sql);
    $this->data = $payload;
    return array(
	'status'=>$this->status,
	'payload'=>$this->data,
	'prepared_by'=>'Inventory Staff',
	'timestamp'=>date('D M j, Y h:i:s e')
	);
}
function generalQuery($query){
    $this->result = $this->conn->query($query);
    $rowCount = $this->result->num_rows;
    if ($this->result->num_rows>0) {
        while($res = $this->result->fetch_assoc()){
            array_push($this->data,$res);
        }
    return $this->info = array(
    'status'=>array(
    'remarks'=>true,
    'message'=>'Data retrieval successful.'
    ),
    'data' =>$this->data,
    'payload'=>$this->data,
    'dataCount'=>$rowCount,
    'timestamp'=>date('D M j, Y h:i:s e'),
    'prepared_by'=>'Inventory Staff'
    );
    } else {
    return $this->info = array('status'=>array(
    'remarks'=>false,
    'payload'=>$this->data,
    'dataCount'=>$rowCount,
    'message'=>'Data retrieval failed.'),
    'timestamp'=>date('D M j, Y h:i:s e'),
    'prepared_by'=>'Inventory Staff' );
    }
}
function loginUser($dt){
    $payload = $dt;
    $allowed = 'success';
    $uname = $this->conn->real_escape_string($dt->user_email);
    $pword = $this->conn->real_escape_string($dt->user_password);
    $this->sql="SELECT * FROM tbl_users WHERE user_email='$uname' LIMIT 1";
    if($result=$this->conn->query($this->sql)){
         if($result->num_rows>0){
            $res=$result->fetch_assoc();
            if($this->pwordCheck($pword, $res['user_password'])){
                http_response_code(200);
                $this->data = array(
                    'id'=>$res['user_id'],
                    'name'=>$res['user_fullname'],
                    'location'=>$res['user_location'],
                    'email'=>$res['user_email'],
                    'access'=>$allowed
                );
                $this->status = array(
                'remarks'=>'success',
                'message'=>'Successfully logged in',
                );
            }else{
                http_response_code(401);
                $this->status = array(
                    'remarks'=>'failed',
                    'message'=>'Incorrect username or password',
                );
            }
        }else{
            http_response_code(401);
            $this->status = array(
            'remarks'=>'failed',
            'message'=>'Incorrect username or password',
            );
        }
    }else{
        http_response_code(401);
        $this->status = array(
        'remarks'=>'failed',
        'message'=>'Incorrect username or password',
        );
    }
    return array(
    'status'=>$this->status,
    'payload'=>$this->data,
    'prepared_by'=>'Inventory Staff',
    'timestamp'=>date('D M j, Y G:i:s T')
    );
}
function pwordCheck($pw, $existingpw){
    $hash=crypt($pw, $existingpw);
    if($hash === $existingpw){return true;} else {return false;}
}
function updateUser($dt) {
    $payload = $dt;
    $this->sql="UPDATE `tbl_users` SET `user_fullname`='$dt->user_fullname',`user_location`='$dt->user_location' WHERE `user_id`='$dt->user_id'";
    $this->conn->query($this->sql);
    return $this->select('tbl_users', null);
}
function select($table, $filter_data) {
    $this->sql = "SELECT * FROM $table";

    if($filter_data!=null){
        $this->sql = "SELECT * tbl_ingredients WHERE prod_id ='$filter_data'";
    }

    if($result = $this->conn->query($this->sql)){
        if($result->num_rows>0){
            while($res = $result->fetch_assoc()){
                array_push($this->data, $res);
            }
            $this->status = $this->success_stat;
            http_response_code(200);
        }
    }
    return array(
        'status'=>$this->status,
        'payload'=>$this->data,
        'prepared_by'=>'Inventory bois',
        'timestamp'=>date('D M j, Y G:i:s T')
    );
}
}
?>