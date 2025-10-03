import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
        <div
          style={{
            fontSize: 24,
            background: '#1a1a1a',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            borderRadius: '50%',
          }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="20"
                height="20"
            >
                <path d="M12 2l-2.5 5L2 9.5l4.5 3L8 18l4-2.5 4 2.5 1.5-5.5L22 9.5l-7.5-2.5L12 2z" />
                <path d="M12 12l-4 8h8l-4-8z" />
            </svg>
        </div>
    ),
    {
      ...size,
    }
  )
}
