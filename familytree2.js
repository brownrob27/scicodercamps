/* comment from user paul for php database

I have my details in a mysql database and used this perl script to complete the html page. I used the css code as shown but added

display: inline-block;
white-space: nowrap;
vertical-align: top;
margin: 0 -2px 0 -2px;
instead of
float: left;
for .tree li

#!/usr/bin/perl
use DBI;
use CGI;

print CGI::header();
my $Familyname = ‘Familyname’;#your family name here
#start of html code
print &lt;Familyname Family Tree#your family name here
#your css file here
endmarker

$db = ‘Families’; $host = ‘localhost’; $user = ‘user’; $password = ‘password’;#your details here
# connect
$dbh = DBI-&gt;connect(“DBI:mysql:database=$db;host=$host”, $user, $password, {RaiseError =&gt; 1});
#get rid of left over table descendant1
my $sth = $dbh-&gt;prepare(“DROP TABLE IF EXISTS descendants1″);
$sth-&gt;execute();
#make a new table descendants1
my $sth = $dbh-&gt;prepare(“CREATE TABLE descendants1 (ID INT, Family VARCHAR(30), First VARCHAR(30), Born DATE, FatherID INT, MotherID INT)”);
$sth-&gt;execute();

my $sth=$dbh-&gt;prepare(“select * from family where Family = ‘$Familyname’”);#select your familyname from your database
$sth-&gt;execute();

while(my ($ID, $Familyname, $Firstname, $Birth,$Death,$FatherID,$MotherID,$PartnerID,$Comments) = $sth-&gt;fetchrow_array()) {
#insert details into table descendants1
my $sth = $dbh-&gt;prepare(“insert into descendants1(ID,Family, First, Born,FatherID,MotherID) values (‘$ID’,'$Familyname’, ‘$Firstname’, ‘$Birth’, ‘$FatherID’, ‘$MotherID’)”);
$sth-&gt;execute();
}#end while 1
my $a = “0″;
my $b = “0″;
my $y =”0″;
my $x =”0″;
my $i = “1″;
$ID[$i] = “0″;
#more html
print &lt;
endmarker

while ($i &gt;0){
#select_oldest {
my $sth=$dbh-&gt;prepare(“select * from descendants1 where FatherID = ‘$ID[$i]‘ or MotherID = ‘$ID[$i]‘ order by Born ASC LIMIT 1″);
$sth-&gt;execute();
#while 3
while(my ($ID, $Familyname, $Firstname, $Birth,$Death,$FatherID,$MotherID,$PartnerID,$Comments) = $sth-&gt;fetchrow_array()) {
$y = “1″;
$x = “$i”;
if ($a&lt;$i){
#more html. If children present start a new list.
print “”;
$a++;
}
while ($a&gt;$i){
more html, end lists(may be more than one)
print “”;
$a–;
}

#reset x
$x=”1″;
#?mysql date format
my $sth = $dbh-&gt;prepare(“SELECT DATE_FORMAT(‘$Birth’, ‘%d/%c/%Y’)”);
$sth-&gt;execute();
while(my ($Birth) = $sth-&gt;fetchrow_array()) {
#more html. fill lists
print &lt;$Firstname $Familyname $Birth

endmarker
}
#delete selected descendant from descendants1 so they won’t be chosen again
my $sth=$dbh-&gt;prepare(“delete from descendants1 where ID = ‘$ID’”);
$sth-&gt;execute();
$i++;
$ID[$i]=$ID;
#select partner from original database
my $sth=$dbh-&gt;prepare(“select * from family where PartnerID = ‘$ID’”);
$sth-&gt;execute();
while(my ($ID, $Familyname, $Firstname, $Birth,$Death,$FatherID,$MotherID,$PartnerID,$Comments) = $sth-&gt;fetchrow_array()) {
my $sth = $dbh-&gt;prepare(“SELECT DATE_FORMAT(‘$Birth’, ‘%d/%c/%Y’)”);
$sth-&gt;execute();
while(my ($Birth) = $sth-&gt;fetchrow_array()) {
#more html. add partner with original selection
print &lt;and$Firstname $Familyname $Birth

endmarker

}
my $sth=$dbh-&gt;prepare(“delete from descendants1 where ID = ‘$ID’”);
$sth-&gt;execute();
}

}#end while 3
if ($y == “0″){
$ID[$i]++;
}
else{
if ($x == “1″){
$x=”0″;
$ID = $ID[$i];
}
else {
$i–;
$ID = $ID[$i];
}
}
}




I have added the following which then includes children with a different family name to ‘familyname’ who are still descended from the original person.



(added before the ‘delete from’ section)
my $sth=$dbh-&gt;prepare(“replace into descendants1(ID,Family, First, Born,FatherID,MotherID) select ID,Family, First, Born,FatherID,MotherID from family where FatherID =’$ID’ or MotherID = ‘$ID’”);
$sth-&gt;execute();
}#end while 7
*/
