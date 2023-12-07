import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="p-8">
    <h1 className="text-3xl font-bold mb-4">All-Star StatBoard</h1>
      <p className="mb-2"><Link href="/player" className="text-blue-500">Player</Link></p>
      <p><Link href="/team" className="text-blue-500">Team</Link></p>
      <Image
      src="/nba-logo.png"
      width={200}
      height={300}
      alt=""
    />
    </main>
    
  );
}
