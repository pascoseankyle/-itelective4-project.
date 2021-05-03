<?php

class Post{
  private $conn;
  private $sql;
  private $info = [];
  private $data = array();
  private $status;
  private $failed_stat = array (
    'remarks' => 'failed',
    'message' => 'Failed to retrieve requested records'
  );
  private $success_stat = array (
    'remarks' => 'success',
    'message' => 'Successfully retrieved records'
  );

  public function __construct($db){
			$this->conn = $db;
  }

  function select($table, $filter_data){ // Select posts from tbl_post DESC
    $this->sql="SELECT * FROM `$table` ORDER BY post_id DESC";
    if ($filter_data != null) {
      $this->sql = "SELECT * FROM `$table` WHERE id = $filter_data";
    }
    if ($result = $this->conn->query($this->sql)) {
      if ($result->num_rows > 0) {
          while($res = $result->fetch_assoc()){
            array_push($this->data, $res);
          }
        $this->status = $this->success_stat;
        http_response_code(200);
      }
      else{
        $this->status = $this->failed_stat;
        http_response_code(400);
      }
    }
    return array(
      'status'=>$this->status,
      'payload'=>$this->data,
      'prepared by'=>'sean pasco, test app',
      'timestamp'=>date('D M j, Y G:i:s T')
    );
  }

  function select_tenant($table, $filter_data){ // Select posts from tbl_posts_tenant DESC
    $this->sql="SELECT * FROM `$table` ORDER BY post_tenant_id DESC";
    if ($filter_data != null) {
      $this->sql = "SELECT * FROM `$table` WHERE id = $filter_data";
    }
    if ($result = $this->conn->query($this->sql)) {
      if ($result->num_rows > 0) {
          while($res = $result->fetch_assoc()){
            array_push($this->data, $res);
          }
        $this->status = $this->success_stat;
        http_response_code(200);
      }
      else{
        $this->status = $this->failed_stat;
        http_response_code(400);
      }
    }
    return array(
      'status'=>$this->status,
      'payload'=>$this->data,
      'prepared by'=>'sean pasco, test app',
      'timestamp'=>date('D M j, Y G:i:s T')
    );
  }

}
 ?>
