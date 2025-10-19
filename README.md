<center> <h1><a href="https://beacon-in-a-bottle.vercel.app/"> Beacon In A Bottle</a> </h1></center>

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,nextjs,tailwind,ts" />
  <br/>
  <a href=""><kbd>⚫️ shadcn-ui</kbd></a>
</p>
<br/><br/>

# ⚡What is Beacon In a Bottle?

**Beacon In A Bottle** is a creative message-sharing platform that lets users send “signals” in the form of bottles. Each bottle can carry a unique message, idea, or inspiration to be discovered by others, fostering creativity, surprise, and connection.

The concept is inspired by the classic “message in a bottle,” reimagined digitally. Users can drop a bottle into the virtual ocean, and others can find it, read it, and react to it.

Here is a [video]() showcasing the platform in action.

# 🔥Features

- Drop bottles containing messages, ideas, or creative prompts
- Randomly discover bottles dropped by others
- Keep track of your sent and received bottles

# 🧬 Self Hosting Guide

### Prerequisites

- Node.js 20 or later
- npm or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/avalynndev/beacon-in-a-bottle.git
cd beacon-in-a-bottle
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Get a DATABASE URL from [neon.tech](https://neon.tech/)
   - Add your DATABASE URL to the `.env` file:

```
NEXT_PUBLIC_DATABASE_URL=""
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

By following these steps, you can host the Beacon In A Bottle web app on your own server and make it accessible to users.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Favalynndev%2Fbeacon-in-a-bottle)

## 📝 Notes and Credits

- AI has been used to generate the most of the svg files, and to tweak code things better looking.
- Files that have been generated using AI have been mentioned in the file iteself.
- This project was made for the theme "SIGNAL" for Siege hackclub.
