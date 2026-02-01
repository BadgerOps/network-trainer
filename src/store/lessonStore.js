import { create } from 'zustand'

// Lesson definitions organized by module
export const LESSONS = {
  // ============================================
  // MODULE 1: FOUNDATIONS
  // ============================================
  'intro-networks': {
    id: 'intro-networks',
    module: 1,
    title: 'What is a Network?',
    icon: '🌐',
    difficulty: 'beginner',
    duration: '5 min',
    description: 'Learn what computer networks are and why we need them',
    steps: [
      {
        id: 1,
        title: 'Welcome, Netrunner!',
        content: `Imagine if every time you wanted to share a photo with a friend, you had to physically hand them a USB drive. That would be slow and annoying, right?

**That's why we have networks!** A network is simply a way for computers to talk to each other, so they can share information instantly.

Every time you browse the web, send a message, or stream a video - you're using a network!`,
        action: null
      },
      {
        id: 2,
        title: 'Your Home Network',
        content: `Right now, you probably have a network at home! It includes:

• Your **router** (the box from your internet provider)
• Your phone, laptop, TV, and other devices
• The connections between them (WiFi or cables)

When you watch Netflix or send a text, data travels through this network! The router is like a traffic controller, directing data to the right device.`,
        action: null
      },
      {
        id: 3,
        title: 'Meet the Hardware',
        content: `Networks are built with different types of devices:

• **Routers** - Connect different networks together (like your home to the internet)
• **Switches** - Connect devices within the same network
• **Computers/Servers** - The devices that send and receive data

Each has a specific job. Think of routers as border guards and switches as mail sorters!`,
        action: null
      },
      {
        id: 4,
        title: 'Build Your First Network!',
        content: `Time to get hands-on! Drag a **Router** and a **Computer** from the left panel onto the canvas.

These will be the building blocks of your first network. Don't worry - you can't break anything here!`,
        action: {
          type: 'add-devices',
          required: ['router', 'computer'],
          hint: 'Drag a Router and Computer from the HARDWARE section to the canvas'
        }
      },
      {
        id: 5,
        title: 'Making Connections',
        content: `Great! Now let's connect them. In real life, this could be:

• An **ethernet cable** (the cable that plugs into your computer)
• **WiFi** (wireless radio signals)

Click on a port on the router, then click on the computer's port to create a connection. You'll see the ports light up!`,
        action: {
          type: 'create-connection',
          hint: 'Click a port on the Router, then click a port on the Computer to link them'
        }
      },
      {
        id: 6,
        title: 'Mission Complete! 🎉',
        content: `Congratulations! You just created your first network!

**What you learned:**
• Networks let computers share information instantly
• Routers connect different networks together
• Switches connect devices in the same network
• Connections can be cables (ethernet) or wireless (WiFi)

Ready to learn about IP addresses? They're how devices find each other!`,
        action: null
      }
    ]
  },

  'ip-addresses': {
    id: 'ip-addresses',
    module: 1,
    title: 'IP Addresses Explained',
    icon: '🏠',
    difficulty: 'beginner',
    duration: '8 min',
    description: 'Understand how computers find each other on a network',
    steps: [
      {
        id: 1,
        title: 'The Street Address of the Internet',
        content: `When you mail a letter, you need the person's address. Without it, the mail carrier wouldn't know where to deliver it!

**IP addresses work the same way.** Every device on a network has a unique address so other devices can find it.

"IP" stands for **Internet Protocol** - the system that handles addressing.`,
        action: null
      },
      {
        id: 2,
        title: 'What Do IP Addresses Look Like?',
        content: `An IPv4 address looks like this: **192.168.1.10**

It's four numbers separated by dots. Each number can be from 0 to 255.

Think of it like: **Building.Floor.Apartment.Room**

• 192 = Building (network)
• 168 = Floor (subnetwork)
• 1 = Apartment (local group)
• 10 = Room (specific device)`,
        action: null
      },
      {
        id: 3,
        title: 'Private vs Public Addresses',
        content: `There are two types of IP addresses:

**Private addresses** - Used inside your home/office:
• 192.168.x.x (most common at home)
• 10.x.x.x (often used in businesses)
• 172.16.x.x to 172.31.x.x

**Public addresses** - Used on the internet

Your router has BOTH! It translates between your private home network and the public internet. This is called NAT (Network Address Translation).`,
        action: null
      },
      {
        id: 4,
        title: 'Configure Your Device',
        content: `Let's give your computer an address! Click on a computer in your network to select it.

Then look at the configuration panel on the right. Enter:
• **IP Address:** 192.168.1.10
• **Subnet Mask:** 255.255.255.0 (we'll explain this soon!)

The subnet mask tells the device which part is the "neighborhood" and which is the "house number".`,
        action: {
          type: 'configure-ip',
          hint: 'Select a device and set its IP address in the right panel'
        }
      },
      {
        id: 5,
        title: 'The Gateway - Your Exit Door',
        content: `One more important setting: the **Default Gateway**.

This is the IP address of your router - the door to the rest of the world! When your computer wants to reach something outside its local network, it sends data to the gateway.

Usually the gateway is .1 of your network:
• If your IP is 192.168.1.10
• Your gateway is probably 192.168.1.1`,
        action: null
      },
      {
        id: 6,
        title: 'Networking Knowledge Unlocked! 🌟',
        content: `Excellent work! Now you understand:

• IP addresses are like street addresses for computers
• They have 4 numbers from 0-255 (in IPv4)
• Private addresses (192.168.x.x) are used in local networks
• The default gateway is your exit to other networks
• Subnet masks define your "neighborhood"

Next up: Learn how data actually travels through the network!`,
        action: null
      }
    ]
  },

  'sending-data': {
    id: 'sending-data',
    module: 1,
    title: 'How Data Travels',
    icon: '📦',
    difficulty: 'beginner',
    duration: '10 min',
    description: 'Watch data move through a network step by step',
    steps: [
      {
        id: 1,
        title: 'Breaking Data Into Packets',
        content: `Imagine sending a huge book through the mail. It's too big for one envelope, right? You'd split it into chapters!

Networks work the same way! Large files are broken into small **packets** that travel independently and reassemble at the destination.

A single webpage might be hundreds of packets. A video stream? Thousands per second!`,
        action: null
      },
      {
        id: 2,
        title: 'Inside a Packet',
        content: `Each packet is like a smart envelope. It contains:

📬 **Source Address** - Who sent it (your IP)
📭 **Destination Address** - Where it's going (target IP)
🔢 **Sequence Number** - Which piece this is (so they reassemble in order)
📦 **Payload** - The actual data chunk

This information is stored in **headers** - the packet's label.`,
        action: null
      },
      {
        id: 3,
        title: 'The Journey Begins',
        content: `When you click "Send" on a message, here's what happens:

1. Your data gets split into packets
2. Each packet gets headers added
3. Packets travel hop-by-hop through devices
4. At each hop, devices read the destination and forward it
5. Destination computer reassembles the pieces

It's like a relay race, but with data!`,
        action: null
      },
      {
        id: 4,
        title: 'Watch Data Flow!',
        content: `Let's send some data! First, set up a network with two computers connected through a switch or router.

Then expand "TRANSMIT DATA" in the left panel:
1. Select your source computer
2. Select a target computer
3. Choose "Ping" as the protocol
4. Click TRANSMIT and watch the packet travel!`,
        action: {
          type: 'send-packet',
          hint: 'Use the TRANSMIT DATA panel to send a Ping between two devices'
        }
      },
      {
        id: 5,
        title: 'Ping - The Network Hello',
        content: `You just sent a **Ping**! It's the simplest network message:

"Hey, are you there?"

And the reply says: "Yes, I'm here!"

This is how technicians test if devices can communicate. If a ping fails, something's wrong with the connection or configuration.

Try sending other packet types to see different behaviors!`,
        action: null
      },
      {
        id: 6,
        title: 'Data Transfer Expert! 🎓',
        content: `Amazing progress! Now you understand:

• Data travels in small **packets** for efficiency
• Each packet has **headers** with addressing info
• Devices forward packets toward their destination
• **Ping** tests if two devices can communicate
• Packets reassemble at the destination

Next up: Learn about switches and how they direct traffic!`,
        action: null
      }
    ]
  },

  // ============================================
  // MODULE 2: SWITCHES & LOCAL NETWORKS
  // ============================================
  'switches': {
    id: 'switches',
    module: 2,
    title: 'The Switch - Traffic Director',
    icon: '🔀',
    difficulty: 'beginner',
    duration: '8 min',
    description: 'Learn how switches connect devices and direct traffic',
    steps: [
      {
        id: 1,
        title: 'The Problem: Too Many Cables',
        content: `Imagine connecting 10 computers directly to each other. You'd need 45 cables! And for 100 computers? Over 4,900 cables!

That's where **switches** come in. Instead of connecting everything to everything, you connect everything to ONE switch.

It's like having a central mail room instead of everyone delivering their own mail!`,
        action: null
      },
      {
        id: 2,
        title: 'What Switches Do',
        content: `A switch is like a smart traffic controller:

• **Receives** data from one device
• **Reads** the destination address (MAC address)
• **Sends** it only to the right port

Unlike a hub (which sends to everyone), a switch only sends data where it needs to go. This makes networks much faster and more efficient!`,
        action: null
      },
      {
        id: 3,
        title: 'MAC Addresses - Hardware IDs',
        content: `Switches use **MAC addresses**, not IP addresses!

A MAC address is burned into every network device at the factory. It looks like: **AA:BB:CC:DD:EE:FF**

Think of it as a device's fingerprint - unique and permanent. IP addresses can change, but MAC addresses (usually) don't.

Switches keep a table matching each MAC address to a port.`,
        action: null
      },
      {
        id: 4,
        title: 'Build a Switched Network',
        content: `Let's see this in action! Create a network with:

• 1 **Switch** in the center
• 4 **Computers** around it
• Connect each computer to the switch

This is a classic "star topology" - all devices connect to a central point.`,
        action: {
          type: 'add-devices',
          required: ['switch', 'computer', 'computer', 'computer', 'computer'],
          hint: 'Add 1 Switch and 4 Computers, then connect them all to the Switch'
        }
      },
      {
        id: 5,
        title: 'Learning MAC Addresses',
        content: `When you first power on a switch, its MAC table is empty. It learns through a clever process:

1. **Device A sends data** - Switch sees "A is on port 1"
2. **Switch doesn't know destination** - Sends to ALL ports (flooding)
3. **Device B replies** - Switch learns "B is on port 3"
4. **Next time** - Switch sends directly, no flooding!

Send some packets and watch the switch learn!`,
        action: {
          type: 'send-packet',
          hint: 'Send packets between computers and observe the switch behavior'
        }
      },
      {
        id: 6,
        title: 'Switch Master! 🔌',
        content: `Great work! You've learned:

• Switches **reduce cable complexity** with star topology
• They use **MAC addresses** (hardware IDs) to forward data
• Switches **learn** which device is on which port
• They only send data to the **correct port** (not everywhere)
• **Flooding** happens when destination is unknown

Next: Learn about VLANs - virtual networks within a switch!`,
        action: null
      }
    ]
  },

  'vlans': {
    id: 'vlans',
    module: 2,
    title: 'VLANs - Virtual Networks',
    icon: '🏢',
    difficulty: 'beginner',
    duration: '12 min',
    description: 'Separate your network into virtual sections for security',
    steps: [
      {
        id: 1,
        title: 'One Network, Many Problems',
        content: `Imagine a company where:
• Accounting can see Engineering's traffic
• The CEO's data travels past intern desks
• A virus on one PC can spread everywhere

Yikes! Even with switches, all devices on a network can technically "hear" each other.

**VLANs** (Virtual LANs) solve this by creating invisible walls!`,
        action: null
      },
      {
        id: 2,
        title: 'What Are VLANs?',
        content: `A VLAN is like having multiple separate switches... using just one physical switch!

Devices in the same VLAN can talk to each other.
Devices in different VLANs **cannot** - even if plugged into the same switch!

• **VLAN 10**: Accounting (ports 1-4)
• **VLAN 20**: Engineering (ports 5-8)

Each VLAN is its own broadcast domain.`,
        action: null
      },
      {
        id: 3,
        title: 'VLAN IDs and Tags',
        content: `Every VLAN has an ID number (1-4094). Packets get "tagged" with this number.

**Access ports**: Connect to computers, assign one VLAN
**Trunk ports**: Carry multiple VLANs between switches

When a packet leaves an access port, the tag is stripped.
When it travels on a trunk, the tag stays so the next switch knows which VLAN it belongs to.`,
        action: null
      },
      {
        id: 4,
        title: 'Create VLANs',
        content: `Let's set up departments! With your switch selected:

1. Create **VLAN 10** and name it "Sales"
2. Create **VLAN 20** and name it "Engineering"
3. Assign 2 computers to each VLAN

Look for the VLAN configuration in the device panel!`,
        action: {
          type: 'configure-vlan',
          hint: 'Select the switch and configure VLANs in the right panel'
        }
      },
      {
        id: 5,
        title: 'Test VLAN Isolation',
        content: `Now for the moment of truth! Try sending packets:

✅ **Computer in VLAN 10 → Computer in VLAN 10** = Works!
❌ **Computer in VLAN 10 → Computer in VLAN 20** = Blocked!

Even though they're on the same switch, VLANs create complete separation. This is powerful for security!`,
        action: {
          type: 'send-packet',
          hint: 'Try sending packets within a VLAN and between VLANs'
        }
      },
      {
        id: 6,
        title: 'VLAN Architect! 🏗️',
        content: `Excellent! You've mastered:

• VLANs create **virtual separation** on physical switches
• Each VLAN has an **ID number** (1-4094)
• **Access ports** belong to one VLAN
• **Trunk ports** carry multiple VLANs
• VLANs provide **security** and **organization**

But wait - what if VLANs need to talk to each other? That's where routing comes in!`,
        action: null
      }
    ]
  },

  // ============================================
  // MODULE 3: ROUTING & THE INTERNET
  // ============================================
  'routers': {
    id: 'routers',
    module: 3,
    title: 'Routers - Network Connectors',
    icon: '🌍',
    difficulty: 'intermediate',
    duration: '10 min',
    description: 'Learn how routers connect different networks together',
    steps: [
      {
        id: 1,
        title: 'The Problem: Isolated Networks',
        content: `VLANs and separate switches create isolated networks. But what if:

• The Sales team needs to access the company server?
• Your home network needs internet access?
• Two offices in different cities need to communicate?

**Routers** are the bridges between networks!`,
        action: null
      },
      {
        id: 2,
        title: 'What Routers Do',
        content: `A router:

• Has multiple **interfaces** (connections to different networks)
• Uses **IP addresses** to make forwarding decisions
• Maintains a **routing table** - a map of how to reach networks
• Decrements **TTL** (Time To Live) to prevent infinite loops

Unlike switches (Layer 2/MAC), routers operate at Layer 3 (IP addresses).`,
        action: null
      },
      {
        id: 3,
        title: 'The Routing Table',
        content: `The routing table is the router's GPS. It contains:

| Network       | Next Hop      | Interface |
|---------------|---------------|-----------|
| 192.168.1.0/24| Direct        | Gi0/0     |
| 192.168.2.0/24| Direct        | Gi0/1     |
| 0.0.0.0/0     | 10.0.0.1      | Gi0/2     |

The last row (0.0.0.0/0) is the **default route** - "if I don't know where to send it, try here."`,
        action: null
      },
      {
        id: 4,
        title: 'Build a Routed Network',
        content: `Create a network with:

• 1 **Router** in the center
• 2 **Switches** - one on each side
• 2 **Computers** connected to each switch

Connect each switch to a different router interface. This simulates two separate departments!`,
        action: {
          type: 'add-devices',
          required: ['router', 'switch', 'switch', 'computer', 'computer', 'computer', 'computer'],
          hint: 'Create a router connecting two switch networks with computers'
        }
      },
      {
        id: 5,
        title: 'Configure Router Interfaces',
        content: `Each router interface needs its own IP address - one for each network it connects to:

• **Interface to Switch 1**: 192.168.1.1 / 255.255.255.0
• **Interface to Switch 2**: 192.168.2.1 / 255.255.255.0

These IPs become the **gateway** for devices on each network. Configure the computers to use their local router interface as the gateway!`,
        action: {
          type: 'configure-ip',
          hint: 'Configure router interfaces and set gateways on computers'
        }
      },
      {
        id: 6,
        title: 'Test Cross-Network Communication',
        content: `Now send a ping from a computer on network 1 to a computer on network 2!

Watch the packet:
1. Leave the source PC
2. Go to the switch
3. Reach the router (the gateway!)
4. Router forwards to the other interface
5. Switch on network 2
6. Arrives at destination PC!`,
        action: {
          type: 'send-packet',
          hint: 'Ping across networks and watch the router forward the packet'
        }
      },
      {
        id: 7,
        title: 'Routing Expert! 🛣️',
        content: `Outstanding! You've learned:

• Routers **connect different networks**
• They use **IP addresses** and routing tables
• Each interface has its own IP (the **gateway** for that network)
• The **default route** handles unknown destinations
• Packets cross networks by going through routers

Next: Understanding subnetting - the math behind network addressing!`,
        action: null
      }
    ]
  },

  'subnetting': {
    id: 'subnetting',
    module: 3,
    title: 'Subnetting Basics',
    icon: '✂️',
    difficulty: 'intermediate',
    duration: '15 min',
    description: 'Learn to divide networks into smaller pieces',
    steps: [
      {
        id: 1,
        title: 'Why Divide Networks?',
        content: `Imagine having one giant network with 16 million devices (a /8 network). Problems:

• Every broadcast reaches EVERYONE
• Security nightmare
• Impossible to manage

**Subnetting** lets you divide one big network into smaller, manageable pieces. Like dividing a city into neighborhoods!`,
        action: null
      },
      {
        id: 2,
        title: 'The Subnet Mask Explained',
        content: `Remember those 255.255.255.0 numbers? That's a **subnet mask**!

It tells devices: "Which part of the IP is the network? Which part is the device?"

**255.255.255.0** means:
• First 3 numbers (192.168.1) = Network portion
• Last number (.10) = Host/device portion

So 192.168.1.10 and 192.168.1.50 are on the same network.
But 192.168.1.10 and 192.168.2.10 are NOT!`,
        action: null
      },
      {
        id: 3,
        title: 'CIDR Notation',
        content: `Typing 255.255.255.0 is tedious. So we use **CIDR notation**: /24

The number represents how many bits are used for the network:
• **/24** = 255.255.255.0 (256 addresses, 254 usable)
• **/16** = 255.255.0.0 (65,536 addresses)
• **/8** = 255.0.0.0 (16+ million addresses)

Common subnets:
• Home networks: /24 (254 devices)
• Small office: /25 (126 devices)
• Point-to-point: /30 (2 devices)`,
        action: null
      },
      {
        id: 4,
        title: 'Calculating Subnet Sizes',
        content: `Quick math for subnet sizes:

**Addresses in subnet** = 2^(32-CIDR)

• /24 → 2^8 = 256 addresses (254 usable*)
• /25 → 2^7 = 128 addresses (126 usable)
• /26 → 2^6 = 64 addresses (62 usable)

*Two addresses are always reserved:
• First = Network address (192.168.1.0)
• Last = Broadcast address (192.168.1.255)`,
        action: null
      },
      {
        id: 5,
        title: 'Splitting a Network',
        content: `Let's split 192.168.1.0/24 into two subnets:

Original: 192.168.1.0/24 (256 addresses)
Split into /25:

**Subnet A**: 192.168.1.0/25
• Range: 192.168.1.1 - 192.168.1.126
• Gateway: 192.168.1.1

**Subnet B**: 192.168.1.128/25
• Range: 192.168.1.129 - 192.168.1.254
• Gateway: 192.168.1.129`,
        action: null
      },
      {
        id: 6,
        title: 'Practice: Same Network?',
        content: `Quick check - are these on the same /24 network?

✅ 192.168.1.10 and 192.168.1.200 - YES (same first 3 octets)
❌ 192.168.1.10 and 192.168.2.10 - NO (different 3rd octet)
❌ 10.0.0.5 and 192.168.1.5 - NO (completely different)

Devices on the SAME subnet can talk directly.
Devices on DIFFERENT subnets need a router!`,
        action: null
      },
      {
        id: 7,
        title: 'Subnet Specialist! 🔢',
        content: `Well done! You've mastered:

• Subnet masks define **network vs host portions**
• CIDR notation (/24) is shorthand for masks
• **Subnetting** divides networks into smaller pieces
• **Network** and **broadcast** addresses are reserved
• Same-subnet = direct communication
• Different-subnet = needs routing

Next: Inter-VLAN routing - making VLANs talk through routers!`,
        action: null
      }
    ]
  },

  // ============================================
  // MODULE 4: PROTOCOLS & PORTS
  // ============================================
  'tcp-udp': {
    id: 'tcp-udp',
    module: 4,
    title: 'TCP vs UDP',
    icon: '📡',
    difficulty: 'intermediate',
    duration: '8 min',
    description: 'Understand the two main transport protocols',
    steps: [
      {
        id: 1,
        title: 'Two Ways to Send Data',
        content: `When sending data over a network, you have two main choices:

**TCP** - Transmission Control Protocol
Like a phone call: reliable, ordered, confirmed

**UDP** - User Datagram Protocol
Like shouting across a room: fast, no guarantees

Both have their place. Let's learn when to use each!`,
        action: null
      },
      {
        id: 2,
        title: 'TCP - The Reliable One',
        content: `TCP guarantees delivery through:

**3-Way Handshake** (before sending data):
1. Client: "SYN - Hey, want to connect?"
2. Server: "SYN-ACK - Sure, I'm ready!"
3. Client: "ACK - Great, let's go!"

**Acknowledgments**: Every packet gets confirmed
**Retransmission**: Lost packets are re-sent
**Ordering**: Packets arrive in sequence

Used for: Web pages, email, file downloads`,
        action: null
      },
      {
        id: 3,
        title: 'UDP - The Fast One',
        content: `UDP just sends data. No handshake, no confirmation!

**Advantages**:
• Less overhead (no tracking/confirming)
• Lower latency (no waiting for ACKs)
• Simpler implementation

**Disadvantages**:
• Packets can be lost
• Packets can arrive out of order
• No congestion control

Used for: Video calls, gaming, streaming, DNS`,
        action: null
      },
      {
        id: 4,
        title: 'See the Difference',
        content: `Let's compare! Set up two connected devices and try:

1. Send a **TCP** packet - watch the handshake happen first
2. Send a **UDP** packet - notice it just goes!

In real networks:
• Losing a TCP packet? It gets resent.
• Losing a UDP packet? It's just gone (acceptable for video - one missed frame isn't worth the delay).`,
        action: {
          type: 'send-packet',
          hint: 'Send both TCP and UDP packets to compare their behavior'
        }
      },
      {
        id: 5,
        title: 'Choosing the Right Protocol',
        content: `Use **TCP** when:
• Data integrity is critical (banking, email)
• You need ordered delivery (file transfers)
• Loss is unacceptable (database sync)

Use **UDP** when:
• Speed matters more than reliability (gaming)
• Real-time is critical (video calls)
• Some loss is acceptable (streaming)
• Simple query/response (DNS)`,
        action: null
      },
      {
        id: 6,
        title: 'Protocol Pro! 🔄',
        content: `Excellent! You now know:

• **TCP**: Reliable, ordered, connection-oriented
• **UDP**: Fast, simple, connectionless
• TCP uses **3-way handshake** to establish connections
• TCP **acknowledges** and **retransmits** lost data
• UDP just sends - fire and forget!
• Choose based on your application's needs

Next: Learn about ports - how one IP serves many services!`,
        action: null
      }
    ]
  },

  'ports': {
    id: 'ports',
    module: 4,
    title: 'Ports - Application Doors',
    icon: '🚪',
    difficulty: 'intermediate',
    duration: '8 min',
    description: 'Learn how ports direct traffic to applications',
    steps: [
      {
        id: 1,
        title: 'One IP, Many Services',
        content: `A single server might run:
• Web server (HTTP)
• Email server (SMTP)
• Database
• SSH remote access

They all share ONE IP address. How does incoming data know which application to go to?

**Ports!** They're like apartment numbers in a building.`,
        action: null
      },
      {
        id: 2,
        title: 'What Are Ports?',
        content: `Ports are numbers from **0 to 65,535** that identify specific services:

Full address: **192.168.1.10:80**
• 192.168.1.10 = IP address (the building)
• 80 = Port number (the apartment)

When data arrives, the OS looks at the port number and sends it to the right application listening on that port.`,
        action: null
      },
      {
        id: 3,
        title: 'Well-Known Ports',
        content: `Ports 0-1023 are **well-known ports** - reserved for common services:

| Port | Service | Description |
|------|---------|-------------|
| 20/21 | FTP | File Transfer |
| 22 | SSH | Secure Shell |
| 23 | Telnet | Remote access (insecure) |
| 25 | SMTP | Email sending |
| 53 | DNS | Domain names |
| 80 | HTTP | Web (unencrypted) |
| 443 | HTTPS | Web (encrypted) |

These are standard - everyone uses them!`,
        action: null
      },
      {
        id: 4,
        title: 'Registered & Dynamic Ports',
        content: `Beyond well-known ports:

**Registered Ports** (1024-49151):
Used by specific applications
• 3306 - MySQL database
• 3389 - Remote Desktop
• 8080 - Alternative HTTP

**Dynamic/Private Ports** (49152-65535):
Assigned temporarily for client connections
When you browse the web, YOUR side uses a random high port!`,
        action: null
      },
      {
        id: 5,
        title: 'See Ports in Action',
        content: `Send different packet types and watch the port numbers:

• **HTTP** → Port 80
• **HTTPS** → Port 443
• **DNS** → Port 53

Click on a packet to inspect it - you'll see both source and destination ports in the header!`,
        action: {
          type: 'send-packet',
          hint: 'Send HTTP and DNS packets, then inspect their port numbers'
        }
      },
      {
        id: 6,
        title: 'Port Expert! 🎯',
        content: `Fantastic! You've learned:

• Ports are like **apartment numbers** for IP addresses
• Range: **0-65,535**
• **Well-known ports** (0-1023): Standard services
• **Registered ports** (1024-49151): Specific apps
• **Dynamic ports** (49152+): Temporary client ports
• Key ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS)

Congratulations - you've completed the Protocols module!`,
        action: null
      }
    ]
  }
}

// Challenge definitions
export const CHALLENGES = {
  'basic-lan': {
    id: 'basic-lan',
    title: 'Build a Home Network',
    icon: '🏠',
    difficulty: 'easy',
    description: 'Connect two computers through a router',
    timeLimit: null,
    objectives: [
      {
        id: 1,
        text: 'Add a router to the network',
        check: (state) => state.devices.some(d => d.type === 'router')
      },
      {
        id: 2,
        text: 'Add two computers',
        check: (state) => state.devices.filter(d => d.type === 'computer').length >= 2
      },
      {
        id: 3,
        text: 'Connect both computers to the router',
        check: (state) => {
          const router = state.devices.find(d => d.type === 'router')
          const computers = state.devices.filter(d => d.type === 'computer')
          if (!router || computers.length < 2) return false
          return computers.every(pc =>
            state.connections.some(c =>
              (c.source.deviceId === pc.id && c.target.deviceId === router.id) ||
              (c.target.deviceId === pc.id && c.source.deviceId === router.id)
            )
          )
        }
      },
      {
        id: 4,
        text: 'Give each computer an IP address',
        check: (state) => {
          const computers = state.devices.filter(d => d.type === 'computer')
          return computers.every(pc => pc.interfaces[0]?.ip)
        }
      }
    ],
    hints: [
      'Start by adding a router from the sidebar',
      'Computers need to be connected to something to communicate',
      'Click on a device to configure its IP address'
    ]
  },

  'ping-test': {
    id: 'ping-test',
    title: 'Can You Reach Me?',
    icon: '📡',
    difficulty: 'easy',
    description: 'Successfully ping between two devices',
    objectives: [
      {
        id: 1,
        text: 'Build a network with at least 2 endpoint devices',
        check: (state) => {
          const endpoints = state.devices.filter(d => d.type === 'computer' || d.type === 'server')
          return endpoints.length >= 2
        }
      },
      {
        id: 2,
        text: 'Connect the devices together',
        check: (state) => state.connections.length >= 1
      },
      {
        id: 3,
        text: 'Configure IP addresses on both endpoints',
        check: (state) => {
          const endpoints = state.devices.filter(d => d.type === 'computer' || d.type === 'server')
          return endpoints.length >= 2 && endpoints.slice(0, 2).every(d => d.interfaces[0]?.ip)
        }
      },
      {
        id: 4,
        text: 'Successfully send a ping',
        check: (state, simState) => simState?.logs?.some(l =>
          l.message?.includes('received') && l.level === 'success'
        )
      }
    ],
    hints: [
      'Make sure both devices have IP addresses configured',
      'Devices need to be on the same subnet to ping directly',
      'Use the TRANSMIT DATA panel to send a ping'
    ]
  },

  'vlan-isolation': {
    id: 'vlan-isolation',
    title: 'Divide and Conquer',
    icon: '🏢',
    difficulty: 'medium',
    description: 'Create separate VLANs that cannot communicate',
    objectives: [
      {
        id: 1,
        text: 'Add a switch with at least 4 connected computers',
        check: (state) => {
          const switches = state.devices.filter(d => d.type === 'switch')
          const computers = state.devices.filter(d => d.type === 'computer')
          if (switches.length === 0 || computers.length < 4) return false
          const switchDevice = switches[0]
          let connectedCount = 0
          computers.forEach(pc => {
            if (state.connections.some(c =>
              (c.source.deviceId === pc.id && c.target.deviceId === switchDevice.id) ||
              (c.target.deviceId === pc.id && c.source.deviceId === switchDevice.id)
            )) connectedCount++
          })
          return connectedCount >= 4
        }
      },
      {
        id: 2,
        text: 'Create VLAN 10 (Sales)',
        check: (state) => {
          const switches = state.devices.filter(d => d.type === 'switch' || d.type === 'l3switch')
          return switches.some(sw => sw.vlans?.some(v => v.id === 10))
        }
      },
      {
        id: 3,
        text: 'Create VLAN 20 (Engineering)',
        check: (state) => {
          const switches = state.devices.filter(d => d.type === 'switch' || d.type === 'l3switch')
          return switches.some(sw => sw.vlans?.some(v => v.id === 20))
        }
      },
      {
        id: 4,
        text: 'Assign 2 computers to each VLAN',
        check: (state) => {
          const computers = state.devices.filter(d => d.type === 'computer')
          const vlan10Count = computers.filter(c => c.interfaces[0]?.vlan === 10).length
          const vlan20Count = computers.filter(c => c.interfaces[0]?.vlan === 20).length
          return vlan10Count >= 2 && vlan20Count >= 2
        }
      }
    ],
    hints: [
      'VLANs are configured on the switch',
      'Each computer port needs to be assigned to a VLAN',
      'Use VLAN 10 for Sales and VLAN 20 for Engineering'
    ]
  },

  'router-connect': {
    id: 'router-connect',
    title: 'Bridge the Gap',
    icon: '🌉',
    difficulty: 'medium',
    description: 'Connect two separate networks with a router',
    objectives: [
      {
        id: 1,
        text: 'Create two separate switched networks',
        check: (state) => {
          const switches = state.devices.filter(d => d.type === 'switch')
          return switches.length >= 2
        }
      },
      {
        id: 2,
        text: 'Add computers to each network',
        check: (state) => {
          const switches = state.devices.filter(d => d.type === 'switch')
          const computers = state.devices.filter(d => d.type === 'computer')
          if (switches.length < 2) return false
          return switches.every(sw =>
            computers.some(pc =>
              state.connections.some(c =>
                (c.source.deviceId === pc.id && c.target.deviceId === sw.id) ||
                (c.target.deviceId === pc.id && c.source.deviceId === sw.id)
              )
            )
          )
        }
      },
      {
        id: 3,
        text: 'Connect both switches to a router',
        check: (state) => {
          const router = state.devices.find(d => d.type === 'router')
          const switches = state.devices.filter(d => d.type === 'switch')
          if (!router || switches.length < 2) return false
          return switches.every(sw =>
            state.connections.some(c =>
              (c.source.deviceId === sw.id && c.target.deviceId === router.id) ||
              (c.target.deviceId === sw.id && c.source.deviceId === router.id)
            )
          )
        }
      },
      {
        id: 4,
        text: 'Configure different subnets (192.168.1.x and 192.168.2.x)',
        check: (state) => {
          const computers = state.devices.filter(d => d.type === 'computer')
          const hasSubnet1 = computers.some(c => c.interfaces[0]?.ip?.startsWith('192.168.1.'))
          const hasSubnet2 = computers.some(c => c.interfaces[0]?.ip?.startsWith('192.168.2.'))
          return hasSubnet1 && hasSubnet2
        }
      },
      {
        id: 5,
        text: 'Successfully ping across networks',
        check: (state, simState) => simState?.logs?.some(l =>
          l.message?.includes('received') && l.level === 'success'
        )
      }
    ],
    hints: [
      'Each network needs its own subnet (e.g., 192.168.1.0 and 192.168.2.0)',
      'Router interfaces need IPs on each subnet',
      'Computers need the router as their gateway'
    ]
  }
}

export const useLessonStore = create((set, get) => ({
  // State
  mode: 'sandbox', // sandbox, lesson, challenge
  currentLesson: null,
  currentStep: 0,
  completedLessons: [],
  currentChallenge: null,
  completedObjectives: [],
  completedChallenges: [],

  // Mode actions
  setMode: (mode) => set({ mode }),

  // Lesson actions
  startLesson: (lessonId) => {
    const lesson = LESSONS[lessonId]
    if (!lesson) return
    set({
      mode: 'lesson',
      currentLesson: lesson,
      currentStep: 0
    })
  },

  nextStep: () => {
    set((state) => {
      if (!state.currentLesson) return state
      const maxStep = state.currentLesson.steps.length - 1
      if (state.currentStep >= maxStep) {
        // Lesson complete!
        return {
          completedLessons: state.completedLessons.includes(state.currentLesson.id)
            ? state.completedLessons
            : [...state.completedLessons, state.currentLesson.id],
          currentStep: maxStep
        }
      }
      return { currentStep: state.currentStep + 1 }
    })
  },

  prevStep: () => {
    set((state) => ({
      currentStep: Math.max(0, state.currentStep - 1)
    }))
  },

  endLesson: () => {
    set({
      mode: 'sandbox',
      currentLesson: null,
      currentStep: 0
    })
  },

  // Challenge actions
  startChallenge: (challengeId) => {
    const challenge = CHALLENGES[challengeId]
    if (!challenge) return
    set({
      mode: 'challenge',
      currentChallenge: challenge,
      completedObjectives: []
    })
  },

  checkObjectives: (networkState, simState) => {
    set((state) => {
      if (!state.currentChallenge) return state

      const completed = state.currentChallenge.objectives
        .filter(obj => obj.check(networkState, simState))
        .map(obj => obj.id)

      // Check if all objectives complete
      if (completed.length === state.currentChallenge.objectives.length) {
        return {
          completedObjectives: completed,
          completedChallenges: state.completedChallenges.includes(state.currentChallenge.id)
            ? state.completedChallenges
            : [...state.completedChallenges, state.currentChallenge.id]
        }
      }

      return { completedObjectives: completed }
    })
  },

  endChallenge: () => {
    set({
      mode: 'sandbox',
      currentChallenge: null,
      completedObjectives: []
    })
  },

  // Progress
  getLessonProgress: () => {
    const state = get()
    return {
      completed: state.completedLessons.length,
      total: Object.keys(LESSONS).length
    }
  },

  getChallengeProgress: () => {
    const state = get()
    return {
      completed: state.completedChallenges.length,
      total: Object.keys(CHALLENGES).length
    }
  }
}))
