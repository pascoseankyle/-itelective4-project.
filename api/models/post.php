<?php 
	class Post {
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
// Fuctions ----------------------------------------------------------
		// SELECT TABLE 
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
// ----------------- GENERAL QUERY -------------- //
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
                    'prepared_by'=>'Inventory Admin'
                );
            } 
			else {
                return $this->info = array('status'=>array(
                'remarks'=>false,
                'payload'=>$this->data,
                'dataCount'=>$rowCount,
                'message'=>'Data retrieval failed.'),
                'timestamp'=>date('D M j, Y h:i:s e'),
                'prepared_by'=>'Inventory Admin'
			 	);
            }
        }
// ------------- CRUD POST -------------------- //
		// ADD POST
		function addPost($dt) {
            $payload = $dt;
            $this->sql = "INSERT INTO
            `tbl_post`(`post_id`, `post_title`, `post_location`, `post_price_month`, `post_description`, `user_id_fk`) 
            VALUES
            ('NULL', '$dt->post_title', '$dt->post_location', '$dt->post_price_month', 
            '$dt->post_description','$dt->user_id')"; 
            $this->conn->query($this->sql);
            $this->data = $payload;
            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Staff',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
		// DELETE POST
		function deletePost($dt) {
            $payload = $dt;
            $this->sql = "DELETE FROM tbl_post WHERE post_id = '$dt->post_id'"; 
            $this->conn->query($this->sql);
            $this->data = $payload;
            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
		// UPDATE POST
		function updatePost($dt){
            $payload = $dt;
            $this->sql = "UPDATE tbl_post SET post_title='$dt->post_title',
             post_location='$dt->post_location', post_price_month='$dt->post_price_month', 
             post_description='$dt->post_description' WHERE post_id=$dt->post_id";
            $this->conn->query($this->sql);
            return $this->select('tbl_post', null);
        }
//---------------------- CURD TENANT POST ---------------------------

        function addPostTenant($dt) {
            $payload = $dt;
            $this->sql = "INSERT INTO
            `tbl_tenant`(`post_tenant_title`, `post_tenant_location`, `post_tenant_budget`, `user_id_fk`) 
            VALUES
            ('$dt->title', '$dt->location', '$dt->budget', '$dt->id')"; 
            $this->conn->query($this->sql);
            $this->data = $payload;
            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Staff',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
	}
?>
