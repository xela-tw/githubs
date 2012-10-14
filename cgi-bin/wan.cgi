{
    "wanIpIfT":[
	{"gid":"851974", "name":"WAN1", "wanProto":"1", "wanProto_v6":"0", "address":"192.168.100.100/24", "portId":"269484032", "zoneId":"1048577", "macCloneEnable":"0", "macClone":"", "weight":"50", "netDetectEnable":"1", "netDetectMethod":"0", "netDetectPingIpId":"0", "netDetectDnsIpId":"0", "failoverEnable":"1", "backupWanName":"WAN2", "cgiAction":"0"},
	{"gid":"851975", "name":"WAN2", "wanProto":"0", "wanProto_v6":"0", "address":"192.168.100.254/24", "portId":"269484033", "zoneId":"1048577", "macCloneEnable":"0", "macClone":"", "weight":"50", "netDetectEnable":"0", "netDetectMethod":"0", "netDetectPingIpId":"0", "netDetectDnsIpId":"0", "failoverEnable":"0", "backupWanName":"", "cgiAction":"0"}
    ], 
    "ipAliasT":[
	{"address":"192.168.100.99;192.168.100.98", "netmask":"255.255.255.0;255.0.0.0"}, 
	{"address":"192.168.100.97", "netmask":"255.255.0.0"}
    ], 
    "staticipT":[
	{"gid":"269025280", "ip":"", "netmask":"255.255.255.0", "gateway":"", "mtuMode":"0", "mtu":"1500", "dnsMode":"0", "userDns1":"", "userDns2":""},
	{"gid":"269025281", "ip":"192.168.100.254", "netmask":"255.255.255.0", "gateway":"192.168.100.1", "mtuMode":"0", "mtu":"1500", "dnsMode":"1", "userDns1":"168.95.1.1", "userDns2":"168.95.1.2"}    
    ], 
    "dhcpcT":[
	{"gid":"271122432", "mtuMode":"0", "mtu":"1500", "dnsMode":"0", "userDns1":"", "userDns2":""},
	{"gid":"271122433", "mtuMode":"0", "mtu":"1500", "dnsMode":"0", "userDns1":"", "userDns2":""}
    ],
    "staticip6T":[
	{"gid":"268500992", "ip":"::","prefix":"0","gateway":"::","userDns1":"::","userDns2":"::"}, 
	{"gid":"268500993", "ip":"::","prefix":"0","gateway":"::","userDns1":"::","userDns2":"::"}
    ]
}
