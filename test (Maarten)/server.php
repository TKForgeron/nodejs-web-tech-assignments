<?php
$provided = json_decode($_POST["submission"]);

$quiz = $provided->quiz;
$question = $provided->question;
$submission = $provided->answer;


if ($submission=="test"){
    $feedback = "true";
}else{
    $feedback = "false";
}

echo $quiz.",".$question.": ".$feedback;
?>