<?php  
    
    class Database {
        private $host = 'localhost';
        private $username = 'root';
        private $password = '';
        private $dbname = 'db_tenant_hunt'; // Database name
        private $conn;

        function connect() {

            try{
                $this->conn = new mysqli($this->host,$this->username,$this->password,$this->dbname);
                $this->conn->set_charset('utf8');
            }catch (mysqli_ssql_exception $e){
                throw $e;
            }
            return $this->conn;

        }
    }

?>
