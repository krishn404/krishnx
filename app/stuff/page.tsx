"use client"

import { motion } from "framer-motion"
import { BottomBar } from "@/components/bottom-bar"
import CircularGallery from '@/components/CircularGallery'

const items = [
  {
    image: '/stuff/1.jpg',
    link: 'https://open.spotify.com/album/64nzw1hciU2HeRra0WrsX7?si=oh_uQaEuRSKyMQJRBYzbVA',
    title: 'Dont care',
    description: 'Dont care'
  },
  {
    image: '/stuff/2.jpg',
    link: 'https://open.spotify.com/album/55t8hCtPRKpoRf7fnrO3Vl?si=Aegp06mFSYqTahshoww0Wg',
    title: 'Budget Free Style',
    description: 'Budget Free Style'
  },
  {
    image: '/stuff/3.jpg',
    link: 'https://open.spotify.com/album/1W2vOmFT3Mlh8Y6XBuH7sa?si=WIxGBYkpTpiz9FdVKlkM3A',
    title: 'Comeback',
    description: 'Comeback'
  },
  {
    image: 'stuff/4.jpg',
    link: 'https://open.spotify.com/album/3urwOXlrU62qF7hqPMwrU5?si=xBkRCRz_S2u6ORD2AC0lRQ',
    title: 'Workflow',
    description: 'Workflow'
  },
  {
    image: '/stuff/5.jpg',
    link: 'https://open.spotify.com/album/68efD7cxdoBsE4ChG9Fq5B?si=RMbfBec2T8C7ezWkSqjiog',
    title: 'Khota',
    description: 'Khota'
  },
  {
    image: '/stuff/6.jpg',
    link: 'https://open.spotify.com/album/5oRdkDO6QMoHSGxRGPDqjN?si=CLe6aMYBT9qkPlyCkLf4eQ',
    title: 'Pen nd Paper',
    description: 'Pen nd Paper'
  },
  {
    image: '/stuff/7.jpg',
    link: 'https://open.spotify.com/album/05O6dqNxG5JT0VYw52YTwh?si=6fTC1udCR9KCWeGVFkgjQw',
    title: 'Rasta',
    description: 'Rasta'
  },
  {
    image: 'stuff/8.png',
    link: 'https://open.spotify.com/album/4ujqOzBQxkmc2r2JKp0hG0?si=JlVF-RWySQSV56w5UEBODA',
    title: 'Step In',
    description: 'Step In'
  },
  {
    image: 'stuff/9.jpg',
    link: 'https://open.spotify.com/album/4xuylSoWI5ZCznQpJZa3t7?si=KmF3G2oNQ_SaquKjdG6OhA',
    title: 'Aashiyana',
    description: 'Aashiyana'
  },
  {
    image: 'stuff/10.jpg',
    link: 'https://open.spotify.com/album/4dvt5WMfrERMldvONUrT2T?si=3ZYdMNWgQPev4imhHmSlSg',
    title: 'Reply',
    description: 'Reply'
  },
  {
    image: 'stuff/11.jpg',
    link: 'https://open.spotify.com/album/3yD6313QADntGNdwEEcaae?si=l3iMX3KwR8GXLWSluupV7w',
    title: 'Im That G',
    description: 'Im That G'
  },
  {
    image: 'stuff/12.png',
    link: 'https://open.spotify.com/album/7i0XvpTTMshJeHdJ1ckTAa?si=e6TZvXeUQauKLB6NAEHaoQ',
    title: 'Vecna',
    description: 'Vecna'
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
          <div className="w-full max-w-full mx-auto gallery-fade-mask" style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
            <CircularGallery 
              items={items.map(({ image, title }) => ({ image, text: title }))}
              bend={0.9} 
              textColor="#ffffff" 
              borderRadius={0.05} 
              scrollEase={0.02}
            />
          </div>
        </motion.div>
      </main>
      <BottomBar />
    </div>
  )
}
