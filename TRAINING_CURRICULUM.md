# NETRUNNER Training Curriculum

## Overview

A progressive learning path from complete beginner to network competency. Each module builds on the previous, with hands-on challenges to reinforce concepts.

---

## Module 1: Foundations (Beginner)

### 1.1 What is a Network?
**Duration:** 5 min | **Type:** Lesson

**Learning Objectives:**
- Understand why networks exist
- Identify common network devices
- Recognize the concept of connections

**Interactive Steps:**
1. Introduction - why we need networks (analogy: mail system)
2. Meet the devices - Router, Switch, Computer
3. **Hands-on:** Drag a router and computer onto the canvas
4. **Hands-on:** Create a connection between them
5. Summary and congratulations

**Challenge:** *Build Your First Network*
- Place 1 router, 2 computers
- Connect both computers to the router

---

### 1.2 IP Addresses - Finding Each Other
**Duration:** 8 min | **Type:** Lesson

**Learning Objectives:**
- Understand what IP addresses are
- Recognize IPv4 format (xxx.xxx.xxx.xxx)
- Know the difference between private and public IPs

**Interactive Steps:**
1. The "street address" analogy
2. Anatomy of an IP address (4 octets)
3. Private vs Public addresses
4. **Hands-on:** Assign IP addresses to devices
5. What happens without an IP? (demonstration)
6. Summary

**Challenge:** *Address Your Network*
- Configure IPs for 3 devices
- Use the 192.168.1.x range
- Verify no duplicate IPs

---

### 1.3 How Data Travels - Packets
**Duration:** 10 min | **Type:** Lesson

**Learning Objectives:**
- Understand data is broken into packets
- Know basic packet structure (headers + payload)
- Watch packets travel through a network

**Interactive Steps:**
1. Breaking data into pieces (envelope analogy)
2. What's in a packet header?
3. **Hands-on:** Send a ping between two devices
4. Watch the packet animate through the network
5. **Hands-on:** Click on a packet to inspect it
6. Summary

**Challenge:** *Ping Pong*
- Set up a network with 2 endpoints
- Successfully ping between them
- Observe the reply packet

---

## Module 2: Switches & Local Networks (Beginner-Intermediate)

### 2.1 The Switch - Traffic Director
**Duration:** 8 min | **Type:** Lesson

**Learning Objectives:**
- Understand what a switch does
- Learn about MAC addresses
- Know how switches learn and forward

**Interactive Steps:**
1. Problem: Too many direct connections
2. Solution: The switch as a hub
3. MAC addresses - hardware identities
4. **Hands-on:** Build a network with a switch
5. Watch the switch learn MAC addresses
6. Flooding vs Forwarding demonstration
7. Summary

**Challenge:** *Switch It Up*
- Create a network with 1 switch, 4 computers
- Connect all computers to the switch
- Send traffic and observe MAC table building

---

### 2.2 VLANs - Virtual Networks
**Duration:** 12 min | **Type:** Lesson

**Learning Objectives:**
- Understand why VLANs exist
- Configure access ports and VLANs
- See traffic isolation in action

**Interactive Steps:**
1. Problem: One big network = chaos
2. Solution: Virtual separation with VLANs
3. VLAN IDs and their meaning
4. **Hands-on:** Assign ports to different VLANs
5. Demonstration: Traffic isolation
6. Access vs Trunk ports (intro)
7. Summary

**Challenge:** *Divide and Conquer*
- Create 2 VLANs (VLAN 10: Sales, VLAN 20: Engineering)
- Put 2 computers in each VLAN
- Verify computers in same VLAN can communicate
- Verify computers in different VLANs cannot

---

## Module 3: Routing & The Internet (Intermediate)

### 3.1 Routers - Network Connectors
**Duration:** 10 min | **Type:** Lesson

**Learning Objectives:**
- Understand routers connect different networks
- Learn about routing tables
- Know what a default gateway is

**Interactive Steps:**
1. Problem: VLANs/networks can't talk
2. Solution: Routers to the rescue
3. Multiple interfaces, multiple networks
4. Routing tables - the decision maker
5. **Hands-on:** Configure router interfaces
6. **Hands-on:** Add static routes
7. Default gateway - the exit door
8. Summary

**Challenge:** *Route It*
- Connect two switches via a router
- Configure router interfaces with IPs
- Set default gateways on endpoints
- Ping across networks

---

### 3.2 Subnetting Basics
**Duration:** 15 min | **Type:** Lesson

**Learning Objectives:**
- Understand what a subnet is
- Read subnet masks
- Calculate network and broadcast addresses

**Interactive Steps:**
1. Why divide networks?
2. Subnet masks explained (255.255.255.0)
3. CIDR notation (/24, /16, etc.)
4. **Interactive:** Subnet calculator tool
5. Determining if two IPs are on same subnet
6. Practice problems
7. Summary

**Challenge:** *Subnet Master*
- Given a /24 network, split it into 2 /25 subnets
- Configure devices correctly in each subnet
- Verify routing between subnets

---

### 3.3 Inter-VLAN Routing
**Duration:** 12 min | **Type:** Lesson

**Learning Objectives:**
- Understand router-on-a-stick concept
- Configure trunk ports
- Enable communication between VLANs

**Interactive Steps:**
1. Problem: VLANs still can't talk
2. Solution 1: Router-on-a-stick
3. Trunk ports - carrying multiple VLANs
4. Sub-interfaces on routers
5. **Hands-on:** Configure trunk and sub-interfaces
6. Alternative: L3 switches
7. Summary

**Challenge:** *VLAN Bridge*
- Set up 2 VLANs
- Configure router-on-a-stick
- Ping between VLANs successfully

---

## Module 4: Protocols & Ports (Intermediate)

### 4.1 TCP vs UDP
**Duration:** 8 min | **Type:** Lesson

**Learning Objectives:**
- Understand connection-oriented vs connectionless
- Know when to use each protocol
- Recognize common TCP/UDP applications

**Interactive Steps:**
1. TCP - the reliable courier (phone call analogy)
2. UDP - the fast messenger (shouting analogy)
3. TCP handshake demonstration
4. **Hands-on:** Send TCP vs UDP packets
5. Compare the visualizations
6. Common protocols and their types
7. Summary

---

### 4.2 Ports - Application Doors
**Duration:** 8 min | **Type:** Lesson

**Learning Objectives:**
- Understand what ports are
- Know well-known port numbers
- See port numbers in packet headers

**Interactive Steps:**
1. One IP, many services
2. Ports as apartment numbers
3. Well-known ports (80, 443, 22, 53)
4. **Hands-on:** Send HTTP request (port 80)
5. **Hands-on:** Send DNS query (port 53)
6. Inspect packets to see ports
7. Summary

---

## Module 5: Troubleshooting (Advanced)

### 5.1 When Things Go Wrong
**Duration:** 15 min | **Type:** Lesson + Lab

**Scenarios:**
1. No IP address configured
2. Wrong subnet mask
3. Missing default gateway
4. VLAN mismatch
5. Cable disconnected

**For each scenario:**
- Symptom demonstration
- Diagnostic steps
- How to fix it

---

### 5.2 Packet Tracing
**Duration:** 10 min | **Type:** Lab

**Skills:**
- Following a packet hop-by-hop
- Reading packet headers
- Identifying where packets are dropped

---

## Capstone Challenges

### Challenge: Build a Small Office Network
- 2 departments (VLANs)
- 1 server room
- Internet connectivity
- All devices can reach each other
- Internet access works

### Challenge: Troubleshoot the Broken Network
- Given a broken network topology
- Find and fix 5 issues
- Restore full connectivity

### Challenge: Design from Requirements
- Given business requirements
- Design the network from scratch
- Implement and verify

---

## Progression System

```
🔴 Beginner     → Modules 1-2
🟡 Intermediate → Modules 3-4
🟢 Advanced     → Module 5 + Capstones
⚡ Netrunner     → All completed
```

Each completed lesson/challenge awards XP and unlocks badges.
