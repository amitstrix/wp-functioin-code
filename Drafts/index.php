<?php $dob = new DateTime('2005-07-23');
$today = new DateTimeImmutable('today');
$time = $dob->diff($today)->i;
$year = $dob->diff($today)->y;
$month = $dob->diff($today)->m;
$day = $dob->diff($today)->d;
echo "Age is" . " " . $year . "year" . " ", $month . "months" . " " . $day . "days" . $time;
?>