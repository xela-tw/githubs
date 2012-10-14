{
  "guiVlanIfTNum": "2",
  "guiVlanIfT": [
    {
      "gid": 8080,
      "port": 1,
      "name": "VLAN1",
      "type": 0,
      "interface": "GE1",
      "vid": 9,
      "address": "192.168.9.1",
      "netmask": "255.255.255.0",
      "dhcpPool": "VLAN1_POOL",
      "mtuMode": 0,
      "mtuValue": "1500",
      "zoneId": 9999,
      "ipv6Address":"fd7a:b34f:1e85::1",
      "ipv6PrefixLength":64,
      "cgiAction": 0
    },
    {
      "gid": 8081,
      "port": 2,
      "name": "VLAN2",
      "type": 0,
      "interface": "GE1",
      "vid": 19,
      "address": "192.168.19.1",
      "netmask": "255.255.255.0",
      "dhcpPool": "",
      "mtuMode": 0,
      "mtuValue": 1500,
      "zoneId": 9999,
      "ipv6Address":"fd20:2755:3d3e::1",
      "ipv6PrefixLength":64,
      "cgiAction": 0
    }
  ],
  "guiIpAliasTNum": 2,
  "guiIpAliasT": [
    {
      "ipAliasCnt": 1,
      "address": "9.9.9.9",
      "netmask": "255.255.255.0"
    },
    {
      "ipAliasCnt": 2,
      "address": "4.4.4.4;7.7.7.7",
      "netmask": "255.255.0.0;255.0.0.0"
    }
  ],
  "guiDhcpsTNum": 2,
  "guiDhcpsT": [
    {
      "gid": 2010,
      "type": 1,
      "startIp": "192.168.9.100",
      "endIp": "192.168.9.200",
      "relayIp": "",
      "leaseTime": 1440,
      "gateway": "192.168.9.1",
      "dns1": "8.8.8.8",
      "dns2": "",
      "wins1": "",
      "wins2": "",
      "domainName": "myDomain"
    },
    {
      "gid": 2011,
      "type": 2,
      "startIp": "",
      "endIp": "",
      "relayIp": "12.34.56.78",
      "leaseTime": "",
      "gateway": "",
      "dns1": "",
      "dns2": "",
      "wins1": "",
      "wins2": "",
      "domainName": ""
    }
  ]
} 
