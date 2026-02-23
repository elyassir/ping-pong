import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Clean up existing data ───────────────────────────────────────────────
  await prisma.userMessage.deleteMany()
  await prisma.directUser.deleteMany()
  await prisma.direct.deleteMany()
  await prisma.groupMessages.deleteMany()
  await prisma.invites.deleteMany()
  await prisma.group.deleteMany()
  await prisma.notifications.deleteMany()
  await prisma.friendship.deleteMany()
  await prisma.blocked.deleteMany()
  await prisma.game.deleteMany()
  await prisma.user.deleteMany()

  // ─── Create Users ─────────────────────────────────────────────────────────
  console.log('👤 Creating users...')

  const alice = await prisma.user.create({
    data: {
      real_name: 'Alice Johnson',
      username: 'alice_j',
      fusername: 'alice_j_42',
      bio: 'Ping-pong champion 🏓 | Speed & strategy is my game.',
      image: 'https://i.pravatar.cc/150?img=47',
      onlineStatus: true,
      level: 8,
      win: 18,
      lose: 4,
      // Achievements: first_win = scored first win, speed_demon = won 3 in a row fast,
      // combo_master = 10 wins, legend = 20 wins
      achievement: 'first_win,speed_demon,combo_master,legend',
      ftime: false,
      inGame: false,
    },
  })

  const bob = await prisma.user.create({
    data: {
      real_name: 'Bob Smith',
      username: 'bob_smith',
      fusername: 'bob_smith_99',
      bio: 'Casual gamer here to learn and improve 🎮',
      image: 'https://i.pravatar.cc/150?img=12',
      onlineStatus: true,
      level: 4,
      win: 7,
      lose: 11,
      achievement: 'first_win',
      ftime: false,
      inGame: false,
    },
  })

  console.log(`✅ Created users: ${alice.username}, ${bob.username}`)

  // ─── Create Friendship ────────────────────────────────────────────────────
  console.log('🤝 Creating friendship...')

  await prisma.friendship.create({
    data: {
      sender: alice.username,
      reciever: bob.username,
      status: 'accepted',
    },
  })

  console.log('✅ Friendship created')

  // ─── Create Direct Chat ───────────────────────────────────────────────────
  console.log('💬 Creating direct messages...')

  const direct = await prisma.direct.create({ data: {} })

  await prisma.directUser.createMany({
    data: [
      { username: alice.username, directId: direct.id },
      { username: bob.username, directId: direct.id },
    ],
  })

  const chatMessages = [
    { sender: alice.username, receiver: bob.username, text: 'Hey Bob! Ready for a rematch? 🏓' },
    { sender: bob.username, receiver: alice.username, text: 'Always! But this time I\'ll beat you for sure 😤' },
    { sender: alice.username, receiver: bob.username, text: 'Haha, we\'ll see about that! Join the game?' },
    { sender: bob.username, receiver: alice.username, text: 'Give me 5 minutes and I\'m in 🎮' },
    { sender: alice.username, receiver: bob.username, text: 'No rush, I\'ll warm up in the meantime 💪' },
    { sender: bob.username, receiver: alice.username, text: 'OK I\'m ready. Let\'s go!' },
    { sender: alice.username, receiver: bob.username, text: 'GG! That was a close one 🔥' },
    { sender: bob.username, receiver: alice.username, text: 'Yeah you got lucky this time 😂 Rematch tomorrow?' },
    { sender: alice.username, receiver: bob.username, text: 'Deal! Same time tomorrow 🤝' },
    { sender: bob.username, receiver: alice.username, text: 'See you then. Great game btw!' },
  ]

  for (const msg of chatMessages) {
    await prisma.userMessage.create({
      data: {
        sender_name: msg.sender,
        reciepient_name: msg.receiver,
        content: msg.text,
        directId: direct.id,
        seen: true,
      },
    })
    // Small delay to spread timestamps
    await new Promise((res) => setTimeout(res, 5))
  }

  console.log(`✅ Created ${chatMessages.length} direct messages`)

  // ─── Create Group Chat ────────────────────────────────────────────────────
  console.log('🗨️  Creating group chat...')

  const group = await prisma.group.create({
    data: {
      name: 'Pong Arena 🏓',
      passcode: '',
      type: 'Public',
      desc: 'The official ping-pong hangout for competitive players!',
      image: 'https://i.pravatar.cc/150?img=66',
      userId: alice.id,
      members: {
        connect: [{ id: alice.id }, { id: bob.id }],
      },
      admins: {
        connect: [{ id: alice.id }],
      },
    },
  })

  const groupMessages = [
    { sender: alice.username, text: 'Welcome to Pong Arena everyone! 🏓' },
    { sender: bob.username, text: 'This is awesome! Finally a place for us ping-pong fans 🎉' },
    { sender: alice.username, text: 'Feel free to challenge each other for matches here!' },
    { sender: bob.username, text: 'Already challenged alice_j to a rematch 😤' },
    { sender: alice.username, text: 'And I\'m going to win again 😂🏆' },
  ]

  for (const msg of groupMessages) {
    await prisma.groupMessages.create({
      data: {
        sender_name: msg.sender,
        content: msg.text,
        groupId: group.id,
      },
    })
    await new Promise((res) => setTimeout(res, 5))
  }

  console.log(`✅ Created group "${group.name}" with ${groupMessages.length} messages`)

  // ─── Create Game History (Statistics) ────────────────────────────────────
  console.log('🎮 Creating game history...')

  const games = [
    // Alice wins
    { p1: alice, p2: bob, s1: 7, s2: 3 },
    { p1: alice, p2: bob, s1: 7, s2: 5 },
    { p1: alice, p2: bob, s1: 7, s2: 1 },
    { p1: alice, p2: bob, s1: 7, s2: 6 },
    { p1: alice, p2: bob, s1: 7, s2: 2 },
    // Bob wins
    { p1: bob, p2: alice, s1: 7, s2: 4 },
    { p1: bob, p2: alice, s1: 7, s2: 5 },
    // More alice wins
    { p1: alice, p2: bob, s1: 7, s2: 0 },
    { p1: alice, p2: bob, s1: 7, s2: 3 },
    // Recent games
    { p1: bob, p2: alice, s1: 7, s2: 6 },
    { p1: alice, p2: bob, s1: 7, s2: 4 },
  ]

  for (const game of games) {
    await prisma.game.create({
      data: {
        playerOUsername: game.p1.username,
        playerTUsername: game.p2.username,
        playerOScore: game.s1,
        playerTScore: game.s2,
        PlayerOImage: game.p1.image,
        PlayerTImage: game.p2.image,
      },
    })
    await new Promise((res) => setTimeout(res, 5))
  }

  console.log(`✅ Created ${games.length} game records`)

  // ─── Create Notifications ─────────────────────────────────────────────────
  console.log('🔔 Creating notifications...')

  await prisma.notifications.createMany({
    data: [
      {
        content: 'bob_smith sent you a friend request!',
        reciepientUsername: alice.username,
        senderUsername: bob.username,
        type: 'friend_request',
        seen: true,
      },
      {
        content: 'alice_j accepted your friend request!',
        reciepientUsername: bob.username,
        senderUsername: alice.username,
        type: 'friend_accepted',
        seen: false,
      },
      {
        content: 'alice_j challenged you to a game!',
        reciepientUsername: bob.username,
        senderUsername: alice.username,
        type: 'game_invite',
        seen: false,
      },
    ],
  })

  console.log('✅ Notifications created')

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log('\n🎉 Seed complete! Summary:')
  console.log(`   👤 Users      : alice_j (level 8, 18W/4L), bob_smith (level 4, 7W/11L)`)
  console.log(`   🤝 Friendship : alice_j ↔ bob_smith (accepted)`)
  console.log(`   💬 DM Chat    : ${chatMessages.length} messages`)
  console.log(`   🗨️  Group Chat : "Pong Arena 🏓" with ${groupMessages.length} messages`)
  console.log(`   🎮 Games      : ${games.length} matches (alice_j 8W, bob_smith 3W)`)
  console.log(`   🔔 Notifs     : 3 notifications`)
  console.log(`\n   🏅 Achievements:`)
  console.log(`      alice_j   → first_win, speed_demon, combo_master, legend`)
  console.log(`      bob_smith → first_win`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })