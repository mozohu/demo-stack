#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <instance>" >&2
  exit 1
fi

name="$1"
envfile="instances/${name}/.env"
if [[ ! -f "$envfile" ]]; then
  echo "Missing env file: $envfile" >&2
  exit 2
fi

# 在 mw 容器內透過 smc_send 觸發一次 tempreport
# 路徑: smc_send → local MQTT → SMC mqtt-logger → Node-RED → MongoDB
docker compose -f compose.yml --env-file "$envfile" exec -T mw \
  perl -e '
use JSON;
use ivm;
use Error qw(:try);
use strict;
my $ivm=ivm->new();
my $stat=$ivm->smc_stat("sys");
my $temp_val;
my $sys_json=`/usr/bin/wget -qO- "http://rest/app/rest/sys.cgi" 2>/dev/null`;
if($sys_json){
  my $sys;
  try{ $sys=from_json($sys_json); }catch Error with{};
  if($sys and ref($sys->{vmc}) eq "HASH"){
    foreach my $k(qw(temp.0 temp.1 temp.2)){
      my $v=$sys->{vmc}->{$k};
      if(defined $v and $v ne "" and $v=~/^-?\d+\.?\d*$/){
        $temp_val=$v+0; last;
      }
    }
  }
}
my $s=$ivm->fs_to_obj("/var/lib/ivm/err_flags",{max_depth=>2});
my @fs;
foreach my $k(sort keys %{$s->{err_flags}//{}}) {
  next if $k eq "data";
  my $v=$s->{err_flags}->{$k};
  $v="" if ref($v);
  push @fs,"$k:$v";
}
my $content_str=join(",",@fs);
$ivm->smc_send("sys/hint",{tempreport=>{vmc=>"heartbeat",t=>$temp_val,no=>0,stat=>$stat,err_flags=>$content_str}});
print "OK: tempreport sent (stat=$stat, temp=" . ($temp_val // "null") . ")\n";
'
