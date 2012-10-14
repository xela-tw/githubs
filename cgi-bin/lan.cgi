{
  "guiLanIfTNum": 1,
  "guiLanIfT": [
    {
      "gid": 7000,
      "name": "Bridge01",
      "address": "10.10.10.1",
      "netmask": "25.255.255.0",
      "stp": 0,
      "dhcpPool": "Bridge01_DHCP_POOL",
      "interfaces": "1000;1001;8000",
      "zone": 9990,
      "ipv6Address": "::",
      "ipv6PrefixLength": "0",
      "cgiAction": 0
    }
  ],
  "guiIpAliasTNum": 1,
  "guiIpAliasT": [
    {
      "ipAliasCnt": 2,
      "address": "10.10.10.10;10.10.10.30",
      "netmask": "255.255.255.0; 255.255.255.0"
    }
  ],
  "guiDhcpsTNum": 1,
  "guiDhcpsT": [
    {
      "gid": 2019,
      "type": "1",
      "startIp": "10.10.10.200",
      "endIp": "10.10.10.250",
      "relayIp": "",
      "leaseTime": 1440,
      "gateway": "10.10.10.1",
      "dns1": "8.8.8.8",
      "dns2": "",
      "wins1": "",
      "wins2": "",
      "domainName": "myDomain"
    }
  ]
}
