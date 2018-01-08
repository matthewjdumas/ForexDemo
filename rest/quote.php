<?php
	class Quote {
		private $conn; 
		private $table_name = "gbpusd";

		private $stockdate;
		private $openprice;
		private $high;
		private $low;
		private $closeprice;
		private $volume;

		public $maxDate; 
		public $minDate; 

		public function __construct($db, $maxDate, $minDate) {
			$this->conn = $db;
			$this->maxDate = $maxDate;
			$this->minDate = $minDate;
		}

		function read(){
 
		    // select all query
		    $query = "SELECT stockdate, openprice, high, low, closeprice, volume FROM " . $this->table_name . " WHERE stockdate <= '". $this->maxDate ."' AND stockdate >= '".$this->minDate."';";
		 
		 	//echo $query;
		    // prepare query statement
		    $stmt = $this->conn->prepare($query);
		 
		    // execute query
		    $stmt->execute();
		 
		    return $stmt;
		}

	}
?>