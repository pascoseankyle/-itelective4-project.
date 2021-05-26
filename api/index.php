<?php 
    date_default_timezone_set('Asia/Manila'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, POST, PATCH, OPTIONS, GET');
    header('Content-Type: application/json');    

    include_once './config/Database.php';
    include_once './models/post.php';
	include_once './models/auth.php';
    
	$database = new Database();
	$db = $database->connect(); // Database.php -> Database Clasee -> connect
	$post = new Post($db); // Post.php -> Post Class -> construct (db) _> Post functions
	$auth = new Auth($db);
	$data = array();

	$req = explode('/', rtrim($_REQUEST['request'], '/'));

	  switch ($_SERVER['REQUEST_METHOD']) {		

// ----------------------------- CASE :: POST -------------------------
		  case 'POST':
			  switch ($req[0]) {
				// -------------------- GET DATA  --------------------
				case 'all_post': // Get All Post // ----------- WORKING -----------
					echo json_encode($post->generalQuery("SELECT tbl_users.*,tbl_post.* FROM tbl_users INNER JOIN tbl_post ON tbl_users.user_id = tbl_post.user_id_fk ORDER BY tbl_post.post_id DESC"));					
				break;

				case 'all_user_post': // Get All User Post // -------- WORKING ---------
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->generalQuery("SELECT * FROM tbl_post WHERE user_id_fk  = '$d->user_id'"));					
				break;
				
				case 'tenant': // Get All Tenant Post // -----------WORKING ----------
					echo json_encode($post->generalQuery("SELECT tbl_tenant.*, tbl_users.* FROM tbl_tenant INNER JOIN tbl_users ON tbl_users.user_id = tbl_tenant.user_id_fk ORDER BY tbl_tenant.post_tenant_id DESC"));					
				break;
				// -------------------- CRUD POST ----------------------------
				case 'add_post': // Add Post ------- WORKING ------- WORKING ---------
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->addPost($d));
				break;

				case 'update_post': // Update Post // ---------- WORKING -------------
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->updatePost($d));
				break;
				
          		case 'delete_post': // Delete Post ---------- WORKING -----------
					$d = json_decode(base64_decode(file_get_contents("php://input")));
                    echo json_encode($post->deletePost($d));
				break;
				// -------------------- Auth --------------------
				case 'all_user': // Get All User Post // -------- WORKING ---------
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->generalQuery("SELECT * FROM `tbl_users` WHERE `user_id`='$d->id'"));					
				break;

				case 'update_user': // Update Post // ---------- WORKING -------------
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->updateUser($d));
				break;

				case 'register': // Add User // ------------ WORKING --------------
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->registerUser($d));
				break;

				case 'login': //  Login User // -------------- WORKING ---------------
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->loginUser($d));
				break;
				// ------------------ CRUD TENANT POST --------------------------
				
				case 'add_tenant': // Add Tenant Post
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->addPostTenant($d));
				break;
				
				default:
					http_response_code(400);
					echo "Bad Request";
				break;
			  }
		  break;
// ------------------------- CASE :: GET ------------------------------------
		  case 'GET':
			  switch ($req[0]) {

			  }
		  break;
		
		  default:
			  http_response_code(400);
			  echo "Bad Request";
		  break;
	  }

?>
