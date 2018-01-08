<?php 
	class Database {

		private $host      =  "localhost";
  		private $user      =  "homebar_stocks";
  		private $password  =  "MPEB7fsBaPeY87fR";
  		private $database  =  "homebar_stockdata";

  		public $conn;

  		public function getConnection() {

  			$this->conn = null; 

  			try{
	            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database, $this->user, $this->password);
	            $this->conn->exec("set names utf8");
	        }catch(PDOException $exception){
	            echo "Connection error: " . $exception->getMessage();
	        }
 
        	return $this->conn;
  		}
	}
?>