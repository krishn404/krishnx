"use client"

import { motion } from "framer-motion"
import { BottomBar } from "@/components/bottom-bar"
import InfiniteMenu from "@/components/InfiniteMenu"

const items = [
  {
    image: '/stuff/1.jpg',
    link: 'https://open.spotify.com/album/64nzw1hciU2HeRra0WrsX7?si=oh_uQaEuRSKyMQJRBYzbVA',
    title: 'Item 1',
    description: 'Dont care'
  },
  {
    image: '/stuff/2.jpg',
    link: 'https://open.spotify.com/album/55t8hCtPRKpoRf7fnrO3Vl?si=Aegp06mFSYqTahshoww0Wg',
    title: 'Item 2',
    description: 'Budget Free Style'
  },
  {
    image: '/stuff/3.jpg',
    link: 'https://open.spotify.com/album/1W2vOmFT3Mlh8Y6XBuH7sa?si=WIxGBYkpTpiz9FdVKlkM3A',
    title: 'Item 3',
    description: 'Comeback'
  },
  {
    image: 'stuff/4.jpg',
    link: 'https://open.spotify.com/album/3urwOXlrU62qF7hqPMwrU5?si=xBkRCRz_S2u6ORD2AC0lRQ',
    title: 'Item 4',
    description: 'Workflow'
  },
  {
    image: '/stuff/5.jpg',
    link: 'https://open.spotify.com/album/68efD7cxdoBsE4ChG9Fq5B?si=RMbfBec2T8C7ezWkSqjiog',
    title: 'Item 5',
    description: 'Khota'
  },
  {
    image: '/stuff/6.jpg',
    link: 'https://open.spotify.com/album/5oRdkDO6QMoHSGxRGPDqjN?si=CLe6aMYBT9qkPlyCkLf4eQ',
    title: 'Item 6',
    description: 'Pen nd Paper'
  },
  {
    image: '/stuff/7.jpg',
    link: 'https://open.spotify.com/album/05O6dqNxG5JT0VYw52YTwh?si=6fTC1udCR9KCWeGVFkgjQw',
    title: 'Item 7',
    description: 'Rasta'
  },
  {
    image: 'stuff/8.png',
    link: 'https://open.spotify.com/album/4ujqOzBQxkmc2r2JKp0hG0?si=JlVF-RWySQSV56w5UEBODA',
    title: 'Item 8',
    description: 'Step In'
  },
  {
    image: 'stuff/9.jpg',
    link: 'https://open.spotify.com/album/4xuylSoWI5ZCznQpJZa3t7?si=KmF3G2oNQ_SaquKjdG6OhA',
    title: 'Item 8',
    description: 'Aashiyana'
  }
];

export default function StuffPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full"
        >
          <h1 className="text-4xl font-bold mb-8">Art works</h1>
          <div style={{ height: '600px', position: 'relative' }}>
            <InfiniteMenu items={items} />
          </div>
        </motion.div>
      </main>
      <BottomBar />
    </div>
  )
}
