{
    "s2svpnEnable": 0,
    "guiS2svpnTNum": 3,
    "guiS2svpnT": [
        {
            "gid": 268959744,
            "name": "site-to-site",
            "type": 0,
            "enable": 0,
            "remoteGwType": 1,
            "remoteGw": "192.168.210.1",
            "wanId": 983040,
            "localNetworkId": 65550,
            "remoteNetworkId": 65551,
            "phase1AuthType": 0,
            "presharedkey": "12345678",
            "ikePolicyId": 268763136,
            "transformPolicyId": 268828672,
            "pfsEnable": 0,
            "dpdEnable": 1,
            "dpdaction": 1,
            "dpddelay": 10,
            "dpdtimeout": 30,
            "vpnaclTNum": 7,
            "vpnaclT": [
                {
                    "zoneName": "LAN",
                    "actionType": 1
                },
                {
                    "zoneName": "WAN",
                    "actionType": 1
                },
                {
                    "zoneName": "DMZ",
                    "actionType": 1
                },
                {
                    "zoneName": "VPN",
                    "actionType": 1
                },
                {
                    "zoneName": "GUEST",
                    "actionType": 1
                },
                {
                    "zoneName": "SSLVPN",
                    "actionType": 1
                },
                {
                    "zoneName": "VOICE",
                    "actionType": 1
                }
            ],
            "wanFailoverEnable": 0,
            "backupPolicyEnable": 0,
            "backupPolicyName": "",
            "fallbackTime": 5,
            "infoStatus": 0,
            "cgiAction": 0
        },
	{
            "gid": 268959745,
            "name": "site-to-site2",
            "type": 0,
            "enable": 0,
            "remoteGwType": 1,
            "remoteGw": "192.168.110.1",
            "wanId": 983040,
            "localNetworkId": 65550,
            "remoteNetworkId": 65551,
            "phase1AuthType": 0,
            "presharedkey": "12345678",
            "ikePolicyId": 268763136,
            "transformPolicyId": 268828672,
            "pfsEnable": 0,
            "dpdEnable": 1,
            "dpdaction": 1,
            "dpddelay": 10,
            "dpdtimeout": 30,
            "vpnaclTNum": 0,
            "vpnaclT": [],
            "wanFailoverEnable": 0,
            "backupPolicyEnable": 0,
            "backupPolicyName": "",
            "fallbackTime": 5,
            "infoStatus": 0,
            "cgiAction": 0
        },
	{
            "gid": 268959746,
            "name": "site-to-site3",
            "type": 0,
            "enable": 1,
            "remoteGwType": 1,
            "remoteGw": "192.168.10.1",
            "wanId": 983040,
            "localNetworkId": 65550,
            "remoteNetworkId": 65551,
            "phase1AuthType": 0,
            "presharedkey": "12345678",
            "ikePolicyId": 268763136,
            "transformPolicyId": 268828672,
            "pfsEnable": 0,
            "dpdEnable": 1,
            "dpdaction": 1,
            "dpddelay": 10,
            "dpdtimeout": 30,
            "vpnaclTNum": 4,
            "vpnaclT": [
                {
                    "zoneName": "VPN",
                    "actionType": 1
                },
                {
                    "zoneName": "GUEST",
                    "actionType": 1
                },
                {
                    "zoneName": "SSLVPN",
                    "actionType": 1
                },
                {
                    "zoneName": "VOICE",
                    "actionType": 1
                }
            ],
            "wanFailoverEnable": 0,
            "backupPolicyEnable": 0,
            "backupPolicyName": "",
            "fallbackTime": 5,
            "infoStatus": 1,
            "cgiAction": 0
        }
    ]
}
